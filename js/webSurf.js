function init() {	
	var scene = new THREE.Scene();
	var gui = new dat.GUI();

	//generate objects
	var box = getBox(1,1,1);
	box.name = 'box-1';
	var pointLight = getPointLight(1);
	var sphere = getSphere(0.05);
	var plane = getPlane(5,5)
	var boxWest = getBox(1,1,1);

	var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight,1,1000);
	var renderer = new THREE.WebGLRenderer();
	var controls = new THREE.OrbitControls(camera, renderer.domElement)

	//add objects to the scene
	scene.add(box);
	pointLight.add(sphere);
	scene.add(pointLight);
	scene.add(plane);
	scene.add(boxWest);

	//positions of objects
	camera.position.y=10;
	camera.position.z=5;
	camera.lookAt(new THREE.Vector3(0,0,0));

	pointLight.position.y = 1.25;

	plane.rotation.x = 10;
	plane.position.y = -1;

	boxWest.position.x = -5;
	
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor('rgb(120,120,120)');

	//rendering onto the screen
	document.getElementById('webgl').appendChild(renderer.domElement);
	
	update(renderer,scene, camera, controls);

	return scene;
};

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


function update(renderer, scene, camera, controls){
	renderer.render(
		scene,
		camera
	);

	var box = scene.getObjectByName('box-1');
	box.rotation.y += 0.001;
	box.rotation.z += 0.001;

	controls.update();

	requestAnimationFrame(function(){
		update(renderer,scene, camera, controls);
	})
}

var scene = init();