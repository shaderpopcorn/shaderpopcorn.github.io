        uniform float time;
        uniform vec2 resolution;
        uniform vec2 mouse;
        uniform sampler2D logo;
        uniform sampler2D msdfH;
        uniform sampler2D msdfE;
        uniform sampler2D msdfC;
        uniform sampler2D msdfI;
        uniform float click;
        uniform float touch;

        float PI = 3.1415;
        float PI2 = 6.283;

        //-------------------------------------------------------------

        vec2 Rotate2D(vec2 uv, float an){
            uv -= .5;
            float si = sin(an), co = cos(an);
            uv *=  mat2(co,-si,si,co);
            uv += .5;
            return uv;}

        float Box(vec2 uv, vec2 sz, float ed){
            sz = vec2(.5)-sz*.5;
            vec2 aa = vec2(ed*.5);
            vec2 m = smoothstep(sz, sz+aa, uv);
            m *= smoothstep(sz, sz+aa, vec2(1.)-uv);
            return m.x*m.y;}

        float sdBox(vec2 uv, vec2 sz){
            vec2 di = abs(uv)-sz;
            return length(min(max(di.x,di.y),.1))+length(min(max(di.x,di.y),.1));}

        vec2 Offset(vec2 uv){
            vec2 ov;
            if(uv.x>.5) ov.x = uv.x - .5;
            else ov.x = uv.x + .5;

            if(uv.y>.5) ov.y = uv.y - .5;
            else ov.y = uv.y + .5;
            return ov;}

        vec4 Shader(vec2 uv, vec2 mnc){
            uv *= 10.;
            vec2 gv = fract(uv);
            vec2 id = floor(uv);
            vec2 bv = fract(uv);
            float dist = id.x/4.;

            gv = Rotate2D(gv,PI*.25);
            vec2 offsetUV = Offset(gv);

            bv = Rotate2D(bv,PI*.25);
            float d = sdBox(bv-.5, vec2(sin(dist-time/4.)/5.5+.17));
            float m = smoothstep(.01,.02, d);

            float mx = mnc.x-.4;
            vec4 col = vec4(Box(offsetUV,vec2(1.-fract(mx*.355-.5)),.01) + 2.*Box(gv,vec2(fract(mx*.355-.5)),.01))*m;
            return col;}

        //-------------------------------------------------------------

         vec4 Pulse(vec2 uv, vec4 tex, vec2 offset){
            float si = sin(length(uv+offset)*5.-time);
            float co = cos(length(uv+offset)*5.-time);
            vec4 texA = smoothstep(4., .5, (si+co+si-co))*.5+.5*tex;
            return texA;
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
            vec4 texL = texture2D(logo, utL+vec2(.5,.7));
            texL *= Pulse(utL, texL, vec2(.0,.2));

            vec2 utH = ut*vec2(1.,4.);
            utH *= mat2(4.,0.,0.,4.);
            vec4 texH = texture2D(msdfH, utH+vec2(.5,-7.));

            vec2 utE = ut*vec2(1.,1.);
            utE *= mat2(20.,0.,0.,20.);
            vec4 texE = texture2D(msdfE, utE+vec2(2.425,9.875));
            texE *= Pulse(utE, texE, vec2(1.9,9.35));

            vec2 utC = ut*vec2(1.,1.);
            utC *= mat2(20.,0.,0.,20.);
            vec4 texC = texture2D(msdfC,utC+vec2(.5,9.875));
            texC *= Pulse(utC, texC, vec2(0,9.35));

            vec2 utI = ut*vec2(1.,1.);
            utI *= mat2(20.,0.,0.,20.);
            vec4 texI = texture2D(msdfI,utI+vec2(-1.45, 9.875));
            texI *= Pulse(utI, texI, vec2(-1.95,9.35));

            ut.y = abs(ut.y);
            ut -= vec2(.0,.475);
            float dcy = abs(ut.y);
            float mcy = smoothstep(.04,.039,dcy);
            vec4 ccy = vec4(mcy);
            ccy *= vec4(.0,.0,.0,mcy*.9);

            //-------------------------------------------------------------

            vec4 ccm = Shader(uv, mnc);

            //-------------------------------------------------------------

            col = mix(ccm,ccy,ccy.a);

            vec4 col1 = mix(col, texL, texL.a);
            vec4 col2 = mix(col1, texH, texH.a);
            vec4 col3 = mix(col2, texE, texE.a);
            vec4 col4 = mix(col3, texC, texC.a);
            vec4 col5 = mix(col4, texI, texI.a);

            gl_FragColor = col5;
        }
