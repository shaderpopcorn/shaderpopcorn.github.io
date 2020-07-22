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

        vec2 Tiling(vec2 p, float t){
            if (fract(t)>.5){
                if (fract(p.y*.5)>.5) p.x += fract(t)*2.;
                else p.x -= fract(t)*2.;}
            else {
                if (fract(p.x*.5)>.5) p.y += fract(t)*2.;
                else p.y -= fract(t)*2.;}
            return fract(p);}

        float sdStar5(vec2 p, float r, float rf){
            const vec2 k1 = vec2(0.809016994375, -0.587785252292);
            const vec2 k2 = vec2(-k1.x,k1.y);
            p.x = abs(p.x);
            p -= 2.0*max(dot(k1,p),0.01)*k1;
            p -= 2.0*max(dot(k2,p),0.01)*k2;
            p.x = abs(p.x);
            p.y -= r;
            vec2 ba = rf*vec2(-k1.y,k1.x) - vec2(0,1);
            float h = clamp( dot(p,ba)/dot(ba,ba), 0.0, r );
            return length(p-ba*h) * sign(p.y*ba.x-p.x*ba.y);}

        vec4 Shader(vec2 p, vec2 mnc){
            p -= .5;
            vec2 cv = (p+time/4.)*PI2*.5;

            p *= 7.;
            p = Tiling(p,time/20.);
            vec2 gv = fract(p)-.5;

            float ds = sdStar5(gv,.5,.34);
            float ms = 1.-smoothstep(.01,.02,ds);

            float dc = sdStar5(gv,.35,.34);
            float mc = 1.-smoothstep(.02,.01,dc);

            float m = mc*ms;

            mnc.x = mnc.x/2.+.5;
            float mx = mnc.x+.075;

            float an = -.4;
            gv *= mat2(cos(an),-sin(an),sin(an),cos(an));
            float a = atan(gv.y,gv.x)/PI2+.49;
            float f = smoothstep(mx,mx-.01, a);
            float n = m*f;

            return vec4(n);}
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
