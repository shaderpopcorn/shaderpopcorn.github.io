uniform float time;
        uniform vec2 resolution;
        uniform vec2 mouse;
        uniform sampler2D logo;
        uniform sampler2D msdfH;
        uniform sampler2D msdfE;
        uniform float click;
        uniform float touch;

        float PI = 3.1415;

        vec2 RotateUV(vec2 uv, float an){ float s = sin(an), c = cos(an); uv *= mat2(c,-s,s,c); return uv; }

        vec2 Rotate2D(vec2 uv, float an){ uv -= 0.5; float s = sin(an), c = cos(an); uv *= mat2(c,-s,s,c); uv += 0.5; return uv; }

        vec2 ScaleUV(vec2 uv, vec2 zo){ float x = zo.x, y = zo.y; uv *= mat2(-x,y,x,y); return uv; }

        float Box(vec2 st, vec2 sz, float sm){
            sz = vec2(0.5) - sz * 0.5;
            vec2 aa = vec2(sm * 0.5);
            vec2 uv = smoothstep(sz, sz + aa, st);
            uv *= smoothstep(sz, sz + aa, vec2(1.0) - st);
            return uv.x*uv.y;
        }

        float sdBox(vec2 uv, vec2 b){
            vec2 d = abs(uv)-b;
            return length(max(d,0.1)) + min(max(d.x,d.y),0.1);
        }

        vec2 Offset(vec2 st){
            vec2 uv;
            if(st.x>0.5) { uv.x = st.x - 0.5; }
            else { uv.x = st.x + 0.5; }
            if(st.y>0.5) { uv.y = st.y - 0.5; }
            else { uv.y = st.y + 0.5; }
            return uv;
        }

        void main(void){
            vec2 uv = (gl_FragCoord.xy-.5*resolution.xy)/resolution.y;
            vec4 col = vec4(0.);

            vec2 ut = uv;

            vec2 mnc;
            vec2 mnp;
            if(click == 1. || touch == 1.){
                mnc = (mouse.xy-.5*resolution.xy)/resolution.y;
                mnp = (mouse.xy-.0*resolution.xy)/resolution.y;
            } else {
                mnc = smoothstep(fract(time),fract(time)+.2,vec2(.0,.0));
                mnp = vec2(.5,.5);
            }

            vec2 utL = ut-vec2(mnc.x, clamp(-mnc.y, .0, -.0));
            utL *= mat2(10.,0., 0., 10.);
            vec4 texL = texture2D(logo,utL+vec2(.5, .5));

            float si = sin(length(utL)*5.-time);
            float co = cos(length(utL)*5.-time);
            texL *= smoothstep(4., 1., (si+co+si-co))*.5+.5*texL;

            vec2 utH = ut*vec2(1.,4.);
            utH *= mat2(4.,0.,0.,4.);
            vec4 texH = texture2D(msdfH,utH+vec2(.5,-7.));

            vec2 utE = ut*vec2(1.,8.);
            utE *= mat2(4.,0.,0.,4.);
            vec4 texE = texture2D(msdfE,utE+vec2(.5,15.55));

            ut.y = abs(ut.y);
            ut -= vec2(.0,.475);
            float dcy = abs(ut.y);
            float mcy = smoothstep(.04,.039,dcy);
            vec4 ccy = vec4(mcy);
            ccy *= vec4(.1,.1,.1,mcy*.9);

            //-------------------------------------------------------------

            //uv = RotateUV(uv, PI/.8);
            //uv = ScaleUV(uv, vec2(1.,.5));

            uv *= 10.;
            float dist = uv.x/4.;
            vec2 gv = fract(uv);
            vec2 cv = fract(uv)-.5;
            float d = sdBox(cv,vec2(0.2,0.2));
            float r = mix(.2,.375, sin(dist-time/4.));
            float m = smoothstep(r*.95,r,d);
            gv = Rotate2D(gv,PI*.25);
            vec2 offsetUV = Offset(gv);

            float mx = mnc.x*2.;
            vec4 ccm = vec4( Box(offsetUV,vec2(1.-fract(sin(mx)*.355-.64)),0.01) +                2.*Box(gv,vec2(fract(sin(mx)*.355-.64)),0.01))*m;

            //-------------------------------------------------------------

            col = mix(ccm,ccy,ccy.a);

            vec4 col1 = mix(col,texL,texL.a);
            vec4 col2 = mix(col1,texH,texH.a);
            vec4 col3 = mix(col2,texE,texE.a);

            gl_FragColor = col3;
        }
