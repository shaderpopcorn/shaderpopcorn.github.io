uniform float time;
        uniform vec2 resolution;
        uniform vec2 mouse;
        uniform sampler2D logo;
        uniform sampler2D msdfH;
        uniform sampler2D msdfE;
        uniform float click;
        uniform float touch;

        float PI = 3.1415;

        vec2 Rotate2D(vec2 uv, float an){ float s = sin(an), c = cos(an); uv *= mat2(c,-s,s,c); return uv; }

        vec2 Scale2D(vec2 uv, vec2 zo){ float x = zo.x, y = zo.y; uv *= mat2(-x,y,x,y); return uv; }

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

            uv = Rotate2D(uv, PI/.8);
            //uv = Scale2D(uv, vec2(1.,.5));

            //-------------------------------------------------------------

            uv *= 10.;
            vec2 gv = fract(uv)-.5;
            vec2 id = floor(uv);
            float dist = length(uv)/4.;

            float d = length(gv);
            float r = mix(.01,mnp.x, sin(dist-time/5.)*.5+.5);
            float m = smoothstep(r,r*.9,d);

            vec4 ccm = vec4(m);

            //-------------------------------------------------------------

            col = mix(ccm,ccy,ccy.a);

            vec4 col1 = mix(col,texL,texL.a);
            vec4 col2 = mix(col1,texH,texH.a);
            vec4 col3 = mix(col2,texE,texE.a);

            gl_FragColor = col3;
        }
