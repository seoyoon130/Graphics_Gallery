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
		exhibition.position.set(0, 0, 400);
        exhibition.scale.set(10,10,10);
	  model = gltf.scene;
	  
	  scene.add(model);

	  animate();
	}, undefined, function (error) {
		console.error(error);
	});

    // 작품 1 - 별이 빛나는 밤
    loader.load('./painting/starry_night/scene.gltf', function(gltf){
        paint_1 = gltf.scene.children[0];
        paint_1.position.set(8, 45, 13);
        paint_1.scale.set(80,50,60);
        
	  model = gltf.scene;
	  
	  scene.add(model);

	  animate();
	}, undefined, function (error) {
		console.error(error);
	});

	// 작품 2 - 올리브 트리
    loader.load('./painting/olivetree/scene.gltf', function(gltf){
        paint_2 = gltf.scene.children[0];
		paint_2.position.set(0, 0, 0);
        paint_2.rotation.z = getRadian(-90);
        paint_2.position.set(19, 45, 160);
        paint_2.scale.set(4,4,4);
        
	  model = gltf.scene;
	  
	  scene.add(model);

	  animate();
	}, undefined, function (error) {
		console.error(error);
	});

	// 작품 3 - 모나리자
    loader.load('./painting/monalisa/scene.gltf', function(gltf){
        paint_3 = gltf.scene.children[0];
		paint_3.position.set(0, 0, 0);
        paint_3.rotation.z = getRadian(-90);
        paint_3.position.set(58, 52, 230);
        paint_3.scale.set(4,4,4);
        
	  model = gltf.scene;
	  
	  scene.add(model);

	  animate();
	}, undefined, function (error) {
		console.error(error);
	});

	// 작품 4 - 라파이
    loader.load('./painting/lapie/scene.gltf', function(gltf){
        paint_4 = gltf.scene.children[0];
		paint_4.position.set(0, 0, 0);
        paint_4.rotation.z = getRadian(-90);
        paint_4.position.set(59, 52, 320);
        paint_4.scale.set(48,8,48);
        
	  model = gltf.scene;
	  
	  scene.add(model);

	  animate();
	}, undefined, function (error) {
		console.error(error);
	});

	// 게르니카 스포트라이트
	spotLight = new THREE.SpotLight( 0xffffff, 0.8); // 파라미터 : (조명 색, 조명 세기)
	spotLight.position.set( 50, 70, 433 ); // 광원의 위치
	spotLight.angle = Math.PI/4; // 비추는 범위 크기(원형태)
	spotLight.castShadow = true; // 그림자 생성
	// spotLight.shadow.mapSize.width = 1;
	// spotLight.shadow.mapSize.height = 1;

	// spotLight.shadow.camera.near = 1;
	// spotLight.shadow.camera.far = 1;
	// spotLight.shadow.camera.fov = 1;
	spotLight.target.position.set(110, 25, 433); // 비출 대상의 위치 (= 빛의 방향)
	spotLight.target.updateMatrixWorld(); // 정보 업데이트
	scene.add( spotLight ); // 빛 정보 추가

	// 2D -> 3D 작품 - 게르니카
    loader.load('./painting/guernica/scene.gltf', function(gltf){
        paint_b = gltf.scene.children[0];
		paint_b.position.set(0, 0, 0);
        paint_b.rotation.z = getRadian(90);
        paint_b.position.set(110, -1, 433);
        paint_b.scale.set(10,10,21);
        
	  model = gltf.scene;
	  
	  scene.add(model);

	  animate();
	}, undefined, function (error) {
		console.error(error);
	});

	


	// 동상 1 -밀로의 비너스 
	   loader.load('./statue/venus_milo/scene.gltf', function(gltf){
        statue_1 = gltf.scene.children[0];
		statue_1.rotation.z = getRadian(80);
        statue_1.position.set(-40,0,170);
        statue_1.scale.set(0.035,0.035,0.035);
        
	  model = gltf.scene;
	  
	  scene.add(model);

	  animate();
	}, undefined, function (error) {
		console.error(error);
	});

	// 동상 2 - 미론 - 원반 던지는 사람
	loader.load('./statue/discobolus/scene.gltf', function(gltf){
        statue_2 = gltf.scene.children[0];
		statue_2.rotation.z = getRadian(80);
        statue_2.position.set(-75,37,260);
        statue_2.scale.set(5,5,5);
        
	  model = gltf.scene;
	  
	  scene.add(model);

	  animate();
	}, undefined, function (error) {
		console.error(error);
	});

	// 동상 3 - 미켈란젤로 - 다비드
	loader.load('./statue/david/scene.gltf', function(gltf){
        statue_3 = gltf.scene.children[0];
		statue_3.rotation.z = getRadian(80);
        statue_3.position.set(-35,0,410);
        statue_3.scale.set(0.3,0.3,0.3);
        
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


