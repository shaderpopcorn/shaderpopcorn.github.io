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

        float hexDist(vec2 uv){
            uv = abs(uv);
            float d = dot(uv, normalize(vec2(1.,1.73)));
            d = max(d, uv.x);
            return d;}

        vec4 Shader(vec2 uv, vec2 mnc){
            vec4 col = vec4(.0);
            uv *= 5.;

            float an = PI/2.;
            uv *= mat2(cos(an),-sin(an),sin(an),cos(an));

            vec2 r = vec2(1.,1.73);
            vec2 h = r*.5;

            vec2 gv;
            vec2 gv1 = mod(uv, r)-h;
            vec2 gv2 = mod(uv-h, r)-h;

            if(length(gv1) < length(gv2)) gv = gv1;
            else gv = gv2;

            float x = atan(gv.x,gv.y)/PI2+.5;
            float y = 0.;

            vec2 gvA = gv;
            vec2 gvB = gv;
            vec2 gvC = gv;

            float zo = (mnc.x+1.)*10.;

            if(x>0. && x<1./3.) {
                gvA += vec2(.25,.14);
                float anA = PI/3.;
                gvA *= mat2(cos(anA),-sin(anA),sin(anA),cos(anA));
                gvA *= zo;
                gvA.y = abs(gvA.y);
                gvA.y -= time/4.;
                float d = sin(gvA.x+gvA.y*1.73);
                float m = smoothstep(.1,.0,d);
                col += vec4(m);
            }

            if(x>1./3. && x<1./3.*2.) {
                gvB += vec2(.0,-.2925);
                float aB = PI/1.;
                gvB *= mat2(cos(aB),-sin(aB),sin(aB),cos(aB));
                gvB *= zo;
                gvB.y = abs(gvB.y);
                gvB.y -= time/4.;
                float d = sin(gvB.x+gvB.y*1.73);
                float m = smoothstep(.1,.0,d);
                col += vec4(m);
            }

            if(x>1./3.*2. && x<1.) {
                gvC += vec2(-.25,.14);
                float aC = 1.-PI/1.53;
                gvC *= mat2(cos(aC),-sin(aC),sin(aC),cos(aC));
                gvC *= zo;
                gvC.y = abs(gvC.y);
                gvC.y -= time/4.;
                float d = sin(gvC.x+gvC.y*1.73);
                float m = smoothstep(.1,.0,d);
                col += vec4(m);
            }
            return col;
        }

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
            texL *= Pulse(utL, texL, vec2(.0,.0));

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
