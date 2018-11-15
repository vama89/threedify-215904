function init() {	
	var scene = new THREE.Scene();
	var gui = new dat.GUI();

	//generate objects
	var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight,1,1000);
	var renderer = new THREE.WebGLRenderer();

	//positions of objects
	camera.lookAt(new THREE.Vector3(0,0,0));
	
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor('rgb(120,120,120)');

	//rendering onto the screen
	document.getElementById('webgl').appendChild(renderer.domElement);
	
	update(renderer,scene, camera);

	return scene;
};

function update(renderer, scene, camera){
	renderer.render(
		scene,
		camera
	);

	requestAnimationFrame(function(){
		update(renderer,scene, camera);
	})
}

var scene = init();