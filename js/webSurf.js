function init() {	
	var scene = new THREE.Scene();
	var gui = new dat.GUI();

	var containers, stats;
	container = document.createElement( 'div' );
	document.body.appendChild( container );

	//triggerYoutubeSearch();

	//generate objects
	var box = getBox(1,1,1);
	box.name = 'box-1';
	var light = new THREE.AmbientLight( 0x404040 ); // soft white light
	scene.add( light );
	var pointLight = getPointLight(1);
	var sphere = getSphere(0.05);
	var plane = getPlane(5,5)
	var arm = getBox(1,1,1)''

	//Controllers PointLock
	var raycaster;
	raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );

	var blocker = document.getElementById( 'blocker' );
	var instructions = document.getElementById( 'instructions' );
	//Controllers PointLock End

	var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight,1,1000);
	var renderer = new THREE.WebGLRenderer();
	//var controls = new THREE.OrbitControls(camera, renderer.domElement)
	var controls = new THREE.PointerLockControls( camera );

//CONTROLS
	instructions.addEventListener( 'click', function () {

		controls.lock();

	}, false );

	controls.addEventListener( 'lock', function () {

		instructions.style.display = 'none';
		blocker.style.display = 'none';

	} );

	controls.addEventListener( 'unlock', function () {

		blocker.style.display = 'block';
		instructions.style.display = '';

	} );

	scene.add( controls.getObject() );
//CONTROLS END

/*
//52FPS for 1K
	for(i=0; i<1000; i++){

	var distanceBox = getBox(1,1,1);
	distanceBox.position.z = -i;
	scene.add(distanceBox);
	}
//28FPS for 2K
	for(i=0; i<1000; i++){

	var distanceBox = getBox(1,1,1);
	distanceBox.position.z = -i;
	distanceBox.position.x = 1;
	scene.add(distanceBox);
	}
//Drops to 20FPS if all are within view
	for(i=0; i<1000; i++){

	var distanceBox = getBox(1,1,1);
	distanceBox.position.z = -i;
	distanceBox.position.x = 2;
	scene.add(distanceBox);
	}
*/

/*this is lvl3.90 of creating air. already maxed at 25 block size
890 objects generated with the 25(counts box and plane from init)
48fps-52fps
*/
	//innerWorldLoad3_0(25, objects, scene);
	//console.log(objects);

	//add objects to the scene
	scene.add(box);
	pointLight.add(sphere);
	scene.add(pointLight);
	scene.add(plane);
	objects.push(box);
	objects.push(plane);
	camera.add(arm);

	//positions of objects
	camera.position.x=1;
	camera.position.y=2;
	camera.position.z=5;
	camera.lookAt(new THREE.Vector3(0,0,0));
	pointLight.position.y = 1.25;
	plane.rotation.x = Math.PI/2;
	box.position.y = box.geometry.parameters.height/2;

	//document.addEventListener('mousedown', playSound, false);

/*
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
*/
//CONTROLS END

	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor('rgb(120,120,120)');

	//rendering onto the screen
	document.getElementById('webgl').appendChild(renderer.domElement);

	stats = new Stats();
	container.appendChild( stats.dom )

	update(renderer, scene, camera, controls, stats, raycaster);

	return scene;
}

function playSound(){
	a1.play();
	console.log("hi");
	console.log(a1);
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


function update(renderer, scene, camera, controls, stats, raycaster){
	renderer.render(
		scene,
		camera
	);
	//var box = scene.getObjectByName('box-1');

	//box.rotation.y += 0.001;
	//box.rotation.z += 0.001;

	//controls.update();

//CONTROLS
	if ( controls.isLocked === true ) {
		raycaster.ray.origin.copy( controls.getObject().position );
		raycaster.ray.origin.y -= 10;

		var intersections = raycaster.intersectObjects( objects );

		var onObject = intersections.length > 0;

		var time = performance.now();
		var delta = ( time - prevTime ) / 1000;

		velocity.x -= velocity.x * 10.0 * delta;
		velocity.z -= velocity.z * 10.0 * delta;

		velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

		direction.z = Number( moveForward ) - Number( moveBackward );
		direction.x = Number( moveLeft ) - Number( moveRight );
		direction.normalize(); // this ensures consistent movements in all directions

		if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
		if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;

		if ( onObject === true ) {

			velocity.y = Math.max( 0, velocity.y );
			canJump = true;

		}

		controls.getObject().translateX( velocity.x * delta );
		controls.getObject().translateY( velocity.y * delta );
		controls.getObject().translateZ( velocity.z * delta );

		if ( controls.getObject().position.y < 10 ) {

			velocity.y = 0;
			controls.getObject().position.y = 10;

			canJump = true;

		}

		prevTime = time;
		//reposition here
		//controls.getObject().position.y = 10;
		console.log(controls.getObject().position.y);

	}
//CONTROLS END
	requestAnimationFrame(function(){
		update(renderer, scene, camera, controls, stats, raycaster);
	})

	stats.update();
}

//12/23/18 Start Date

function innerWorldLoad3_0(size, objects, scene){

	var matrixI ={};
	var box, boxKey;
	var ranNum

	for ( x = 0; x < size; x++){
		for ( y = 0; y < size; y++){
			for ( z = 0; z < size; z++){
				
				//generate the ground floor
				if (y == 0) {																	// if you are at the bottom make it all land	//BOTTOM
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
				else if (1<y<20){																//SEA
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
							//objects.push(box);
							//scene.add(box);
						}

					}
					else {
						box = waterBox(1,1,1);
						box.position.y = y;
						box.position.z = z;
						box.position.x = x;

						boxKey = [x,y,z];
						matrixI[String(boxKey)] = 'Water';
						//objects.push(box);
						//scene.add(box);
					}
					
					//if it is water, have chance to place fish or animals
					

				}
				else if (20<y<50){											//LAND
					//if this is the first time coming in set the transparent water plane
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

//Global Needs
//Changing the search terms
//Controllers

var term = 'ladygaga';
var objects=[];
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = false;

var prevTime = performance.now();
var velocity = new THREE.Vector3();
var direction = new THREE.Vector3();
var vertex = new THREE.Vector3();
var color = new THREE.Color();

var onKeyDown = function ( event ) {

	switch ( event.keyCode ) {

		case 38: // up
		case 87: // w
			moveForward = true;
			break;

		case 37: // left
		case 65: // a
			moveLeft = true;
			break;

		case 40: // down
		case 83: // s
			moveBackward = true;
			break;

		case 39: // right
		case 68: // d
			moveRight = true;
			break;

		case 32: // space
			if ( canJump === true ) velocity.y += 350;
			canJump = false;
			break;

	}
};

var onKeyUp = function ( event ) {

	switch ( event.keyCode ) {

		case 38: // up
		case 87: // w
			moveForward = false;
			break;

		case 37: // left
		case 65: // a
			moveLeft = false;
			break;

		case 40: // down
		case 83: // s
			moveBackward = false;
			break;

		case 39: // right
		case 68: // d
			moveRight = false;
			break;

	}

};

document.addEventListener( 'keydown', onKeyDown, false );
document.addEventListener( 'keyup', onKeyUp, false );

var scene = init();