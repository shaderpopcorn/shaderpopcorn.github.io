        uniform float time;
        uniform vec2 resolution;
        uniform vec2 mouse;

        uniform sampler2D logo;
        uniform sampler2D msdfH;
        uniform sampler2D msdfE;

        uniform float click;

        float pxRange = 1.;
        float PI = 3.1415;
        float spriteWidth = 1024., spriteHeight = 1024.;
        float horizontalNumber = 8., verticalNumber = 8.;

        vec2 Rotate2D(vec2 uv, float an){
            float s = sin(an), c = cos(an);
            uv *= mat2(c,-s,s,c); return uv; }

        vec2 Scale2D(vec2 uv, vec2 zo){
            float x = zo.x, y = zo.y;
            uv *= mat2(-x,y,x,y); return uv; }

        float median(float r, float g, float b) {
            return max(min(r, g), min(max(r, g), b)); }

        float C(vec2 uv, float id, sampler2D msdf) {
            vec2 spriteSheet = vec2(spriteWidth/horizontalNumber, spriteHeight/verticalNumber);
            float cols = spriteWidth/spriteSheet.x;
            float column = mod(id, cols)*.125;
            float row = floor(id/cols)*.125;
            uv = uv + vec2(column+.125, row+.125);
            float x1 = column; float x2 = column+.125; float y1 = row; float y2 = row+.125;

            if (uv.x<x1 || uv.x>x2 || uv.y<y1 || uv.y>y2) return float(0.);
            vec2 msdfUnit = pxRange/vec2(textureSize(msdf, 0.));
            vec3 sample = texture(msdf, uv).rgb;
            float sigDist = median(sample.r, sample.g, sample.b) - 0.5;
            sigDist *= dot(msdfUnit, 0.5/fwidth(uv));
            float opacity = clamp(sigDist + 0.5, 0.0, 1.0);
            return opacity;
        }

        float top(){
            float O = 0.; // opacity

            vec2 uh = gl_FragCoord.xy/vec2(1024.,1024.);
            uh.y = 1.-uh.y;
            uh -= vec2(.76,.05);
            uh *= mat2(1.,0.,0.,1.);

            O += C(uh-vec2(.0,.0),18.,msdfH); O += C(uh+vec2(-.039,.0),7.,msdfH); O += C(uh+vec2(-.0795,.0),0.,msdfH); O += C(uh+vec2(-.12,.0),3.,msdfH); O += C(uh+vec2(-.1575,.0),4.,msdfH); O += C(uh+vec2(-.195,.0),17.,msdfH);
            O += C(uh+vec2(-.2325,.0),15.,msdfH); O += C(uh+vec2(-.269,.0),14.,msdfH); O += C(uh+vec2(-.3085,.0),15.,msdfH); O += C(uh+vec2(-.344,.0),2.,msdfH); O += C(uh+vec2(-.382,.0),14.,msdfH); O += C(uh+vec2(-.422,.0),17.,msdfH); O += C(uh+vec2(-.461,.0),13.,msdfH);

            vec2 ue = gl_FragCoord.xy/vec2(1024.,1024.);
            ue.y = 1.-ue.y;
            ue -= vec2(.725,.08);
            ue *= mat2(2.25,0.,0.,2.25);

            O += C(ue+vec2(.0,.0),10.,msdfE); O += C(ue+vec2(-.0475,-.01),0.,msdfE); O += C(ue+vec2(-.099,-.02),24.,msdfE); O += C(ue+vec2(-.171,-.01),36.,msdfE);
            O += C(ue+vec2(-.244,-.01),18.,msdfE); O += C(ue+vec2(-.295,.0),7.,msdfE); O += C(ue+vec2(-.349,-.01),0.,msdfE); O += C(ue+vec2(-.399,.0),3.,msdfE); O += C(ue+vec2(-.455,-.01),4.,msdfE); O += C(ue+vec2(-.501,-.01),17.,msdfE);
            O += C(ue+vec2(-.5425,-.02),15.,msdfE); O += C(ue+vec2(-.595,-.01),14.,msdfE); O += C(ue+vec2(-.6495,-.02),15.,msdfE); O += C(ue+vec2(-.7,-.01),2.,msdfE); O += C(ue+vec2(-.75,-.01),14.,msdfE); O += C(ue+vec2(-.796,-.01),17.,msdfE); O += C(ue+vec2(-.836,-.01),13.,msdfE);
            O += C(ue+vec2(-.876,-.0325),44.,msdfE); O += C(ue+vec2(-.914,-.01),2.,msdfE); O += C(ue+vec2(-.965,-.01),14.,msdfE); O += C(ue+vec2(-1.031,-.01),12.,msdfE);

            return O;
        }

        void main(void){
            vec2 uv = (gl_FragCoord.xy-.5*resolution.xy)/resolution.y;
            vec4 col = vec4(0.);

            vec2 ut = uv;

            vec2 mnc;
            vec2 mnp;
            if(click == 1.){
                mnc = 2.*(mouse.xy-.25*resolution.xy)/resolution.y;
                mnp = 2.*(mouse.xy-.0*resolution.xy)/resolution.y;
            } else {
                mnc = smoothstep(fract(time),fract(time)+.2,vec2(.0,.0));
                mnp = vec2(.5,.5);
            }

            vec2 utt = ut-vec2(mnc.x, clamp(-mnc.y, .0, -.0));
            utt *= mat2(7.,0., 0., 7.);
            vec4 tex = texture2D(logo,utt+vec2(.5, .5));

            float si = sin(length(utt)*5.-time);
            float co = cos(length(utt)*5.-time);
            tex *= smoothstep(4., 1., (si+co+si-co))*.5+.5*tex;

            vec2 un = uv-vec2(mnc.x, clamp(-mnc.y, .0, -.0));

            float dc = length(un);
            float c = smoothstep(.051, .05, dc);
            vec4 cc = vec4(vec3(1.,0.,0.), c);

            uv = Rotate2D(uv, PI/2.);
            uv = Scale2D(uv, vec2(1.,.5));

            uv *= 10.;
            vec2 gv = fract(uv);
            gv -= .5;

            float an = PI/4.;
            gv *= mat2(cos(an),-sin(an),sin(an),cos(an));
            gv.x = abs(gv.x);

            float m;
            //if (mouse.x > .0) { m = smoothstep(.01, .0, sin(((gv.x+gv.y)-time/2.)*ceil(mnp.x*10.))); }
            //else { m = smoothstep(.01, .0, sin(((gv.x+gv.y)-time/2.)*ceil(mnp.x*10.))); }

            m = smoothstep(.01, .0, sin(((gv.x+gv.y)-time/7.)*ceil(mnp.x*14.)));

            vec4 ccm = vec4(m);
            col = mix(ccm, tex, tex.a);

            //vec4 fgColor = vec4(1.,1.,0.,.1.);

            //float opacity = top();
            //vec4 color = mix(col, fgColor, opacity);

            gl_FragColor = col;
        }
