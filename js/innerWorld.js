function init() {	
	var scene = new THREE.Scene();
	var gui = new dat.GUI();
var container, stats;
				container = document.createElement( 'div' );
				document.body.appendChild( container );
var info = document.createElement( 'div' );
				info.style.position = 'absolute';
				info.style.top = '10px';
				info.style.width = '100%';
				info.style.textAlign = 'center';
				info.innerHTML = '<a href="http://threejs.org" target="_blank" rel="noopener">three.js</a> webgl - interactive cubes';
				container.appendChild( info );

								stats = new Stats();
				container.appendChild( stats.dom );

	//generate objects
	var box = getBox(1,1,1);
	box.name = 'box-1';

	var light = new THREE.AmbientLight( 0x404040 ); // soft white light
	scene.add( light );

	var objects=[];

	var pointLight = getPointLight(1);
	var sphere = getSphere(0.05);
	var plane = getPlane(5,5)

	var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight,1,1000);
	var renderer = new THREE.WebGLRenderer();
	var controls = new THREE.OrbitControls(camera, renderer.domElement)

	//add objects to the scene
	scene.add(box);
	pointLight.add(sphere);
	scene.add(pointLight);
	scene.add(plane);
	objects.push(box);
	objects.push(plane);

	//boxGenerator(objects, scene);
	innerWorldLoad(10, objects, scene);
	//positions of objects
	camera.position.x=1;
	camera.position.y=2;
	camera.position.z=5;
	camera.lookAt(new THREE.Vector3(0,0,0));

	pointLight.position.y = 1.25;

	//radios
	plane.rotation.x = Math.PI/2;

	box.position.y = box.geometry.parameters.height/2;

	document.addEventListener('mousedown', blowup, false);

function blowup(event){
	event.preventDefault();
	var mouse3D = new THREE.Vector3( ( event.clientX / window.innerWidth ) * 2 - 1,   
									-( event.clientY / window.innerHeight ) * 2 + 1,  
										0.5 );
			var raycaster =  new THREE.Raycaster();
			raycaster.setFromCamera( mouse3D, camera );
			var intersects = raycaster.intersectObjects( objects );
console.log(intersects[0]);
console.log(objects.length)
			if ( intersects.length > 0 ) {
				intersects[ 0 ].object.material.color.setHex( Math.random() * 0xffffff );
				if (intersects[ 0 ].object.hitpts != 0){
					intersects[ 0 ].object.hitpts -=1;
					console.log(intersects[ 0 ].object.hitpts);
				}
				else {
					scene.remove(intersects[ 0 ].object);
					objects.pop();
					//displayYoutube(scene2);
				}
			}
}
	
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor('rgb(120,120,120)');

	//rendering onto the screen
	document.getElementById('webgl').appendChild(renderer.domElement);



	update(renderer,scene, camera, controls, stats);

	return scene;
};

function boxGenerator(objects, scene){
for (y=0; y<10; y++){
		for (x=0; x<10; x++){
		var taco = getBox(1,1,1);
		taco.position.z = x;
		taco.position.y = y;
		scene.add(taco);
		objects.push(taco);
		}
	}
}

function innerWorldLoad(size, objects, scene){

	var matrixI ={};
	var box, boxKey;
	var ranNum

	for ( x = 0; x < size; x++){
		for ( y = 0; y < size; y++){
			for ( z = 0; z < size; z++){
				
				//generate the ground floor
				if (y == 0) {												// if you are at the bottom make it all land	//BOTTOM
					//Place a land block
					box = getBox(1,1,1);
					box.position.z = z;
					box.position.x = x;
					
					//save in matrix for db and positioning information
					boxKey = [x,y,z];
					matrixI[String(boxKey)] = 'Land';
					objects.push(box);
					scene.add(box);
				}
				else if (1<y<20){											//SEA
					//Generate Land or Water. Water more probable
					//random number generator 30% chance Land and 70% chance Water
					ranNum = Math.random();
					if (ranNum<.3) {
						//if the position below you does not have land, then you cannot build
						//make a checkBox function here for help

						var boxBelow = String([x, y-1, z]);
						if (matrixI[boxBelow] == 'Land') {
							box = getBox(1,1,1);
							box.position.y = y;
							box.position.z = z;
							box.position.x = x;

							boxKey = [x,y,z];
							matrixI[String(boxKey)] = 'Land';
							objects.push(box);
							scene.add(box);
						}
						else {
							box = waterBox(1,1,1);
							box.position.y = y;
							box.position.z = z;
							box.position.x = x;

							boxKey = [x,y,z];
							matrixI[String(boxKey)] = 'Water';
							objects.push(box);
							scene.add(box);
						}

					}
					else {
						box = waterBox(1,1,1);
						box.position.y = y;
						box.position.z = z;
						box.position.x = x;

						boxKey = [x,y,z];
						matrixI[String(boxKey)] = 'Water';
						objects.push(box);
						scene.add(box);
					}
					
					//if it is water, have chance to place fish or animals
					

				}
				else if (20<y<50){											//LAND
					//Generate Land or Water (lakes) or Null
					//Generate trees provided the surround areas are clear
				}
				else {}
																			//SKY
					//50<y<size(70) //50 or above						
					//place clouds
					//chance of placing birds
			}
		}
	}
}

function getBox(w,h,d){
	var geometry = new THREE.BoxGeometry(w,h,d);
	var material = new THREE.MeshPhongMaterial({
		color: 0x00ff00
	});
	var mesh = new THREE.Mesh(
		geometry,
		material
		);
	return mesh;
}

function waterBox(w,h,d){
	var geometry = new THREE.BoxGeometry(w,h,d);
	var material = new THREE.MeshPhongMaterial({
		color: 0xf0ff00
	});
	var mesh = new THREE.Mesh(
		geometry,
		material
		);
	return mesh;
}

function getSphere(size){
	var geometry = new THREE.SphereGeometry(size, 24, 24);
	var material = new THREE.MeshBasicMaterial({
		color: 'rgb(255, 255, 255)'
	});
	var mesh = new THREE.Mesh(
		geometry,
		material
		);
	return mesh;
}

function getPointLight(intensity){
	var light = new THREE.PointLight(0xffffff, intensity);

	return light;
}

function getPlane(w,h){
	var geometry = new THREE.PlaneGeometry(w,h);
	var material = new THREE.MeshPhongMaterial({
		color: 0x00ff00,
		side: THREE.DoubleSide
	});
	var mesh = new THREE.Mesh(
		geometry,
		material
		);
	return mesh;
}


function update(renderer, scene, camera, controls, stats){
	renderer.render(
		scene,
		camera
	);

	var box = scene.getObjectByName('box-1');

	box.rotation.y += 0.001;
	box.rotation.z += 0.001;

	controls.update();

	requestAnimationFrame(function(){
		update(renderer,scene, camera, controls, stats);
	})

					stats.update();
}

var scene = init();