function init() {	
	var scene = new THREE.Scene();
	var scene2 = new THREE.Scene();
	var gui = new dat.GUI();

	//generate objects
	var objects =[];
	var box = getBox(1,1,1);
	box.name = 'box-1';
	//box.hitpts = 4;
	//box.addEventListener('mousedown', blowup);
	var pointLight = getPointLight(1);
	var sphere = getSphere(0.05);
	var plane = getPlane(5,5)
	//var boxWest = getBox(1,1,1);
	//boxWest.hitpts = 4;

	objects.push(box);
	//objects.push(plane);
	//objects.push(boxWest);

	var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight,1,1000);
	var renderer = new THREE.WebGLRenderer();
	var renderer2 = new THREE.CSS3DRenderer();
	//var controls = new THREE.OrbitControls(camera, renderer.domElement);
	//var controls2 = new THREE.OrbitControls(camera, renderer2.domElement);

	//add objects to the scene
	scene.add(box);
	pointLight.add(sphere);
	scene.add(pointLight);
	scene.add(plane);
	//scene.add(boxWest);

	//positions of objects
	camera.position.y=10;
	camera.position.z=5;
	camera.lookAt(new THREE.Vector3(0,0,0));

	pointLight.position.y = 1.25;

	plane.rotation.x = 10;
	plane.position.y = -1;

	//boxWest.position.x = -5;

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

	//rendering onto the screen
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor('rgb(120,120,120)');
	document.getElementById('webgl').appendChild(renderer.domElement);

	renderer2.setSize( window.innerWidth, window.innerHeight );
	renderer2.domElement.style.position = 'absolute';
	renderer2.domElement.style.top = 0;
	document.getElementById('webgl').appendChild(renderer2.domElement);

	update(renderer,scene, camera, renderer2, scene2);


	return scene;
};


function displayYoutube(scene2){
	console.log("helloThere");
	var Element = function ( id, x, y, z, ry ) {

				var div = document.createElement( 'div' );
				div.style.width = '480px';
				div.style.height = '360px';
				div.style.backgroundColor = '#000';

				var iframe = document.createElement( 'iframe' );
				iframe.style.width = '480px';
				iframe.style.height = '360px';
				iframe.style.border = '0px';
				iframe.src = [ 'https://www.youtube.com/embed/', id, '?rel=0' ].join( '' );
				div.appendChild( iframe );

				var object = new THREE.CSS3DObject( div );
				object.position.set( x, y, z );
				object.rotation.y = ry;

				return object;

			};
	var group = new THREE.Group(); 
	group.add (new Element( 'SJOz3qjfQXU', 0, 0, 240, 0 ));
	group.add( new Element( 'Y2-xZ-1HE-Q', 240, 0, 0, Math.PI / 2 ) );
	group.add( new Element( 'IrydklNpcFI', 0, 0, - 240, Math.PI ) );
	group.add( new Element( '9ubytEsCaS0', - 240, 0, 0, - Math.PI / 2 ) );
	group.position.y = -1000; 
	group.position.z = -1000;
	group.name = 'vid-1';
	scene2.add(group);
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
	mesh.hitpts = 4;
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
		color: 0x00ff00
	});
	var mesh = new THREE.Mesh(
		geometry,
		material
		);
	return mesh;
}


function update(renderer, scene, camera, renderer2, scene2){

	var box = scene.getObjectByName('box-1');
	var vid = scene2.getObjectByName('vid-1');
	if (box == null)
		;
	else{
	box.rotation.y += 0.001;
	box.rotation.z += 0.001;
	}
	if (vid == null)
		;
	else{
	vid.rotation.y += 0.001;
	vid.rotation.z += 0.001;
	}

	//controls.update();
	//controls2.update();

	requestAnimationFrame(function(){
		update(renderer,scene, camera, renderer2, scene2);
	})

		renderer2.render(
		scene2,
		camera
	);

	renderer.render(
		scene,
		camera
	);

}

var scene = init();