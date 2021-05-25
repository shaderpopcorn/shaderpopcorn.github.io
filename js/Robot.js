var Robot = function (game) {
    // call super class BABYLON.Mesh
    GameObject.call(this, "boothGeometry", game);

    /*-----------------------Car Body------------------------------------------*/ 
  
    //Car Body Material 
    var bodyMaterial = new BABYLON.StandardMaterial("body_mat", this.getScene());
        bodyMaterial.diffuseColor = new BABYLON.Color3(1.0, 0.25, 0.25);
        bodyMaterial.backFaceCulling = false;
    
    //Array of points for trapezium side of car.
    var side = [new BABYLON.Vector3(-0.4, 0.2, -0.2),
                new BABYLON.Vector3(0.4, 0.2, -0.2),
                new BABYLON.Vector3(0.5, -0.2, -0.2),
                new BABYLON.Vector3(-0.7, -0.2, -0.2)				
    ];
  
    side.push(side[0]);	//close trapezium
    
    //Array of points for the extrusion path
    var extrudePath = [new BABYLON.Vector3(0, 0, 0), new BABYLON.Vector3(0, 0, 0.4)];
    
    //Create body and apply material
    var carBody = BABYLON.MeshBuilder.ExtrudeShape("body", {shape: side, path: extrudePath, cap : BABYLON.Mesh.CAP_FRONT}, this.getScene());
    carBody.material = bodyMaterial;
    /*-----------------------End Car Body------------------------------------------*/
    
    /*-----------------------Wheel------------------------------------------*/ 
    
    //Wheel Material 
    var wheelMaterial = new BABYLON.StandardMaterial("wheel_mat", this.getScene());
    wheelMaterial.diffuseColor = new BABYLON.Color3(1.0, 1.0, 0.25);
    
    //Set color for wheel tread as black
    var faceColors=[];
    faceColors[1] = new BABYLON.Color3(0,0,0);
    
    //set texture for flat face of wheel 
    var faceUV =[];
    faceUV[0] = new BABYLON.Vector4(0,0,1,1);
    faceUV[2] = new BABYLON.Vector4(0,0,1,1);
    
    //create wheel front inside and apply material
    var wheelFI = BABYLON.MeshBuilder.CreateCylinder("wheelFI", {diameter: 0.3, height: 0.1, tessellation: 24, faceColors:faceColors, faceUV:faceUV}, this.getScene());
        wheelFI.material = wheelMaterial;
        
    //rotate wheel so tread in xz plane  
        wheelFI.rotate(BABYLON.Axis.X, Math.PI/2, BABYLON.Space.WORLD);
    wheelFI.parent = carBody;  
  
  
    /*-----------------------End Wheel------------------------------------------*/ 

    /*------------Create other Wheels as Instances, Parent and Position----------*/
    var wheelFO = wheelFI.createInstance("FO");
    wheelFO.parent = carBody;
    wheelFO.position = new BABYLON.Vector3(-0.45, -0.2, 0.28);

    var wheelRI = wheelFI.createInstance("RI");
    wheelRI.parent = carBody;
    wheelRI.position = new BABYLON.Vector3(0.25, -0.2, -0.28);

    var wheelRO = wheelFI.createInstance("RO");
    wheelRO.parent = carBody;
    wheelRO.position = new BABYLON.Vector3(0.25, -0.2, 0.28);

    wheelFI.position = new BABYLON.Vector3(-0.45, -0.2, -0.28);

    /*------------End Create other Wheels as Instances, Parent and Position----------*/

        /*-----------------------Path------------------------------------------*/ 
    
    // Create array of points to describe the curve
    var points = [];
    var n = 2000; // number of points
    var r = 5; //radius
    for (var i = 0; i < n + 1; i++) {
        points.push( new BABYLON.Vector3((r + (r/5)*Math.sin(8*i*Math.PI/n))* Math.sin(2*i*Math.PI/n), 0, (r + (r/10)*Math.sin(6*i*Math.PI/n)) * Math.cos(2*i*Math.PI/n)));
    }	
    
    //Draw the curve
    var track = BABYLON.MeshBuilder.CreateLines('track', {points: points}, this.getScene());
    track.color = new BABYLON.Color3(0, 0, 0);
    /*-----------------------End Path------------------------------------------*/ 
    
    /*-----------------------Ground------------------------------------------*/ 	
    //var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 3*r, height: 3*r}, this.getScene());
    /*-----------------------End Ground------------------------------------------*/ 	

    /*----------------Position and Rotate Car at Start---------------------------*/
    carBody.position.y = 0.4;
    carBody.position.z = r;

    var path3d = new BABYLON.Path3D(points);
    var normals = path3d.getNormals();
    var theta = Math.acos(BABYLON.Vector3.Dot(BABYLON.Axis.Z,normals[0]));
    carBody.rotate(BABYLON.Axis.Y, theta, BABYLON.Space.WORLD); 
    var startRotation = carBody.rotationQuaternion;
    /*----------------End Position and Rotate Car at Start---------------------*/

    /*----------------Animation Loop---------------------------*/
    var i=0;
    this.getScene().registerAfterRender(function() {
        carBody.position.x = points[i].x;
        carBody.position.z = points[i].z;
        wheelFI.rotate(normals[i], Math.PI/32, BABYLON.Space.WORLD); 
        wheelFO.rotate(normals[i], Math.PI/32, BABYLON.Space.WORLD);
        wheelRI.rotate(normals[i], Math.PI/32, BABYLON.Space.WORLD);
        wheelRO.rotate(normals[i], Math.PI/32, BABYLON.Space.WORLD);
        
        theta = Math.acos(BABYLON.Vector3.Dot(normals[i],normals[i+1]));
        var dir = BABYLON.Vector3.Cross(normals[i],normals[i+1]).y;
        var dir = dir/Math.abs(dir);
        carBody.rotate(BABYLON.Axis.Y, dir * theta, BABYLON.Space.WORLD);
        
        i = (i + 1) % (n-1);	//continuous looping  
        
        if(i == 0) {
            carBody.rotationQuaternion = startRotation;
        }
    });
   
    /*----------------End Animation Loop---------------------------*/ 
};

// object is a GameObject
Robot.prototype = Object.create(GameObject.prototype);

// its constructor is the 'Booth' function above
Robot.prototype.constructor = Robot;