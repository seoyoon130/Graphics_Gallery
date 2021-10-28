function getRadian(degree)
{
    return degree / 180.0 * 3.14;
}


window.onload = function init()
{
	const canvas = document.getElementById( "gl-canvas" );
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	const renderer = new THREE.WebGLRenderer({canvas});
	renderer.setSize(canvas.width,canvas.height);

	const scene = new THREE.Scene();
	scene.background = new THREE.Color("rgb(186, 182, 182)");

    // 카메라 위치 
	camera = new THREE.PerspectiveCamera(75,canvas.width / canvas.height,0.1, 1000);
	camera.rotation.z = 180/180*Math.PI;
	camera.position.x = 0;
	camera.position.y = 8;
	camera.position.z = -50;

	const controls = new THREE.OrbitControls(camera, renderer.domElement);

	// hlight = new THREE.AmbientLight (0x404040,50);
	// scene.add(hlight);
    // 광원 ( 네가지 방향에서 전시장을 비춤 )
	light = new THREE.PointLight(0xc4c4c4,1);
	light.position.set(-1000000,1000000,1000000);
	scene.add(light);

	light2 = new THREE.PointLight(0xc4c4c4,1);
	light2.position.set(1000000,1000000,1000000);
	scene.add(light2);

	light3 = new THREE.PointLight(0xc4bdb1,0.4);
	light3.position.set(-1000000,-1000000,1000000);
	scene.add(light3);

	light4 = new THREE.PointLight(0xc4bdb1,0.8);
	light4.position.set(1000000,-1000000,-1000000);
	scene.add(light4);

    // 모델 로드 
	var model;

    // 전시장 로드 
	const loader = new THREE.GLTFLoader();
	loader.load('./jannotta_gallery/scene.gltf', function(gltf){
        exhibition = gltf.scene.children[0];
        exhibition.scale.set(1.5,1.5,1.5);
	  model = gltf.scene;
	  
	  scene.add(model);

	  animate();
	}, undefined, function (error) {
		console.error(error);
	});

    // 작품 1 - 별이 빛나는 밤
    loader.load('./painting/scene.gltf', function(gltf){
        paint_1 = gltf.scene.children[0];
        paint_1.position.set(0, 0, 0);
        paint_1.rotation.z = getRadian(270);
        paint_1.position.set(9, 7, -39);
        paint_1.scale.set(8,7,7);
        
	  model = gltf.scene;
	  
	  scene.add(model);

	  animate();
	}, undefined, function (error) {
		console.error(error);
	});

    // 작품 2 - 별이 빛나는 밤 (위치 변경)
    loader.load('./painting/scene.gltf', function(gltf){
        paint_2 = gltf.scene.children[0];
        paint_2.position.set(1, 7, -58);
        paint_2.scale.set(12,11,7);
        
	  model = gltf.scene;
	  
	  scene.add(model);

	  animate();
	}, undefined, function (error) {
		console.error(error);
	});


	function animate() {

	   renderer.render(scene,camera);
	   requestAnimationFrame(animate);
	   
	}

}


