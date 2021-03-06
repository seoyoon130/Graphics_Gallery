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
	var r = 180/180*Math.PI;
	camera.rotation.z = 180/180*Math.PI;
	//camera.position.x = 0;
	//camera.position.y = 8;
	//camera.position.z = -50;

	

	var a=30,b=40,c=850;
	var at=50;



	camera.position.set(a,b,c);
	camera.lookAt(new THREE.Vector3(at,60,100));
	
	scene.add(camera);

	//키보드

		document.addEventListener('keydown', e =>{
			const keyCode = e.keyCode;
			console.log('pushed key'+e.key);

			if(keyCode==65){

		
				camera.position.set(a,b,c);

				at-=100;
				camera.lookAt(new THREE.Vector3(at,60,100));

				controls.update;
				
					
			}//왼쪽(a)

			if(keyCode==83){
				
					c+=10;
					camera.position.set(a,b,c);
					camera.lookAt(new THREE.Vector3(at,60,100));
				

			}//뒤로(s)

			if(keyCode==68){
				
					at+=100;
				camera.position.set(a,b,c);
				camera.lookAt(new THREE.Vector3(at,60,100));
			
				
			}//오른쪽(d)

			if(keyCode==87){
				
					c-=10;
					camera.position.set(a,b,c);
					camera.lookAt(new THREE.Vector3(at,60,100));
					
				
			}//앞으로(w)

			if(keyCode==32){
				a=30,b=40,c=850;
				camera.position.set(a,b,c);
				camera.lookAt(new THREE.Vector3(50,60,100));
				controls.update();
			}//처음위치로 리셋
		})

	
	

	const controls = new THREE.OrbitControls(camera, renderer.domElement);

	// hlight = new THREE.AmbientLight (0x404040,50);
	// scene.add(hlight);
    // 광원 ( 네가지 방향에서 전시장을 비춤 )
	light = new THREE.PointLight(0xc4c4c4,0.4);
	light.position.set(-1000000,1000000,1000000);
	scene.add(light);

	light2 = new THREE.PointLight(0xc4c4c4,0.4);
	light2.position.set(1000000,1000000,1000000);
	scene.add(light2);

	light3 = new THREE.PointLight(0xc4bdb1,0.4);
	light3.position.set(-1000000,-1000000,1000000);
	scene.add(light3);

	light4 = new THREE.PointLight(0xc4bdb1,0.4);
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

	// 별이 빛나는 밤 스포트라이트
	spotLight_1 = new THREE.SpotLight( 0xfcf7cf, 0.3); // 파라미터 : (조명 색, 조명 세기)
	spotLight_1.position.set(8, 65, 60 ); // 광원의 위치
	spotLight_1.angle = Math.PI/4; // 비추는 범위 크기(원형태)
	spotLight_1.castShadow = true; // 그림자 생성
	spotLight_1.target.position.set(8, 53, 13); // 비출 대상의 위치 (= 빛의 방향)
	spotLight_1.target.updateMatrixWorld(); // 정보 업데이트
	scene.add( spotLight_1 ); // 빛 정보 추가

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

	// 올리브 트리 스포트라이트
	spotLight_2 = new THREE.SpotLight( 0xfcf7cf, 0.3); // 파라미터 : (조명 색, 조명 세기)
	spotLight_2.position.set(1, 70, 153 ); // 광원의 위치
	spotLight_2.angle = Math.PI/9; // 비추는 범위 크기(원형태)
	spotLight_2.castShadow = true; // 그림자 생성
	spotLight_2.target.position.set(19, 65, 153); // 비출 대상의 위치 (= 빛의 방향)
	spotLight_2.target.updateMatrixWorld(); // 정보 업데이트
	scene.add( spotLight_2 ); // 빛 정보 추가

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

	// 모나리자 스포트라이트
	spotLight_3 = new THREE.SpotLight( 0xfcf7cf, 0.3); // 파라미터 : (조명 색, 조명 세기)
	spotLight_3.position.set(1, 70, 230 ); // 광원의 위치
	spotLight_3.angle = Math.PI/10; // 비추는 범위 크기(원형태)
	spotLight_3.castShadow = true; // 그림자 생성
	spotLight_3.target.position.set(58, 55, 230); // 비출 대상의 위치 (= 빛의 방향)
	spotLight_3.target.updateMatrixWorld(); // 정보 업데이트
	scene.add( spotLight_3 ); // 빛 정보 추가

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

	// 라파이 스포트라이트
	spotLight_4 = new THREE.SpotLight( 0xfcf7cf, 0.2); // 파라미터 : (조명 색, 조명 세기)
	spotLight_4.position.set(1, 70, 320 ); // 광원의 위치
	spotLight_4.angle = Math.PI/7; // 비추는 범위 크기(원형태)
	spotLight_4.castShadow = true; // 그림자 생성
	spotLight_4.target.position.set(58, 55, 320); // 비출 대상의 위치 (= 빛의 방향)
	spotLight_4.target.updateMatrixWorld(); // 정보 업데이트
	scene.add( spotLight_4 ); // 빛 정보 추가

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
	spotLight = new THREE.SpotLight( 0xfcf7cf, 1.5); // 파라미터 : (조명 색, 조명 세기)
	spotLight.position.set( 50, 75, 433 ); // 광원의 위치
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

	//수련 스포트라이트
	spotLight_5 = new THREE.SpotLight( 0xfcf7cf, 0.3); // 파라미터 : (조명 색, 조명 세기)
	spotLight_5.position.set(20, 35, 550); // 광원의 위치
	spotLight_5.angle = Math.PI/6; // 비추는 범위 크기(원형태)
	spotLight_5.castShadow = true; // 그림자 생성
	spotLight_5.target.position.set(59, 46, 550); // 비출 대상의 위치 (= 빛의 방향)
	spotLight_5.target.updateMatrixWorld(); // 정보 업데이트
	scene.add( spotLight_5 ); // 빛 정보 추가
	//작품 5 - 모네 (수련)
    loader.load('./painting/water_lilies/scene.gltf', function(gltf){
        paint_5 = gltf.scene.children[0];
		paint_5.position.set(0, 0, 0);
        paint_5.rotation.z = getRadian(-90);
        paint_5.position.set(59, 52, 550 );
        paint_5.scale.set(4, 4, 4);
        
	  model = gltf.scene;
	  
	  scene.add(model);

	  animate();
	}, undefined, function (error) {
		console.error(error);
	});
	
	//모네 스포트라이트
	spotLight_6 = new THREE.SpotLight( 0xfcf7cf, 0.3); // 파라미터 : (조명 색, 조명 세기)
	spotLight_6.position.set(20, 50, 650); // 광원의 위치
	spotLight_6.angle = Math.PI/6; // 비추는 범위 크기(원형태)
	spotLight_6.castShadow = true; // 그림자 생성
	spotLight_6.target.position.set(68, 55
		, 650); // 비출 대상의 위치 (= 빛의 방향)
	spotLight_6.target.updateMatrixWorld(); // 정보 업데이트
	scene.add( spotLight_6 ); // 빛 정보 추가

	//작품 6 - 모네 (양산을 든 여인)
    loader.load('./painting/woman/scene.gltf', function(gltf){
        paint_6 = gltf.scene.children[0];
		paint_6.position.set(0, 0, 0);
        paint_6.rotation.z = getRadian(-90);
        paint_6.position.set(60, 38, 650 );
        paint_6.scale.set(30, 70, 30);
        
	  model = gltf.scene;
	  
	  scene.add(model);

	  animate();
	}, undefined, function (error) {
		console.error(error);
	});

	//드가 스포트라이트
	spotLight_7 = new THREE.SpotLight( 0xfcf7cf, 0.3); // 파라미터 : (조명 색, 조명 세기)
	spotLight_7.position.set(20, 35, 720); // 광원의 위치
	spotLight_7.angle = Math.PI/7; // 비추는 범위 크기(원형태)
	spotLight_7.castShadow = true; // 그림자 생성
	spotLight_7.target.position.set(60, 50, 720); // 비출 대상의 위치 (= 빛의 방향)
	spotLight_7.target.updateMatrixWorld(); // 정보 업데이트
	scene.add( spotLight_7 ); // 빛 정보 추가

	//작품 7 - 드가 (발레수업)
    loader.load('./painting/edgar_degas/scene.gltf', function(gltf){
        paint_7 = gltf.scene.children[0];
		paint_7.position.set(0, 0, 0);
        paint_7.rotation.z = getRadian(-90);
        paint_7.position.set(60, 52, 720);
        paint_7.scale.set(30, 60, 30);
        
	  model = gltf.scene;
	  
	  scene.add(model);

	  animate();
	}, undefined, function (error) {
		console.error(error);
	});

	// 밀로의 비너스 스포트라이트
	spotLight_01 = new THREE.SpotLight( 0xfcf7cf, 0.4); // 파라미터 : (조명 색, 조명 세기)
	spotLight_01.position.set(15, 90, 170); // 광원의 위치
	spotLight_01.angle = Math.PI/10; // 비추는 범위 크기(원형태)
	spotLight_01.castShadow = true; // 그림자 생성
	spotLight_01.target.position.set(-40, 50, 170); // 비출 대상의 위치 (= 빛의 방향)
	spotLight_01.target.updateMatrixWorld(); // 정보 업데이트
	scene.add( spotLight_01 ); // 빛 정보 추가
	
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

	// 원반 던지는 사람 스포트라이트
	spotLight_02 = new THREE.SpotLight( 0xfcf7cf, 0.4); // 파라미터 : (조명 색, 조명 세기)
	spotLight_02.position.set(15, 85, 263 ); // 광원의 위치
	spotLight_02.angle = Math.PI/12; // 비추는 범위 크기(원형태)
	spotLight_02.castShadow = true; // 그림자 생성
	spotLight_02.target.position.set(-75, 10, 263); // 비출 대상의 위치 (= 빛의 방향)
	spotLight_02.target.updateMatrixWorld(); // 정보 업데이트
	scene.add( spotLight_02 ); // 빛 정보 추가

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

	// 다비드 스포트라이트
	spotLight_03 = new THREE.SpotLight( 0xfcf7cf, 0.4); // 파라미터 : (조명 색, 조명 세기)
	spotLight_03.position.set(15, 95, 410 ); // 광원의 위치
	spotLight_03.angle = Math.PI/10; // 비추는 범위 크기(원형태)
	spotLight_03.castShadow = true; // 그림자 생성
	spotLight_03.target.position.set(-35, 50, 410); // 비출 대상의 위치 (= 빛의 방향)
	spotLight_03.target.updateMatrixWorld(); // 정보 업데이트
	scene.add( spotLight_03 ); // 빛 정보 추가

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

	//로댕 스포트라이트
	spotLight_04 = new THREE.SpotLight( 0xfcf7cf, 0.5); // 파라미터 : (조명 색, 조명 세기)
	spotLight_04.position.set(15, 95, 500 ); // 광원의 위치
	spotLight_04.angle = Math.PI/10; // 비추는 범위 크기(원형태)
	spotLight_04.castShadow = true; // 그림자 생성
	spotLight_04.target.position.set(-35, 50, 500); // 비출 대상의 위치 (= 빛의 방향)
	spotLight_04.target.updateMatrixWorld(); // 정보 업데이트
	scene.add( spotLight_04 ); // 빛 정보 추가
	// 동상 4 - 로댕(생각하는 사람)
	loader.load('./statue/the_thinker/scene.gltf', function(gltf){
        statue_4 = gltf.scene.children[0];
		statue_4.rotation.z = getRadian(80);
        statue_4.position.set(-35,-5,500);
        statue_4.scale.set(25, 30, 30);
        
	  model = gltf.scene;
	  
	  scene.add(model);

	  animate();
	}, undefined, function (error) {
		console.error(error);
	}); 

	//피에타 스포트라이트
	spotLight_05 = new THREE.SpotLight( 0xfcf7cf, 0.5); // 파라미터 : (조명 색, 조명 세기)
	spotLight_05.position.set(15, 95, 650 ); // 광원의 위치
	spotLight_05.angle = Math.PI/10; // 비추는 범위 크기(원형태)
	spotLight_05.castShadow = true; // 그림자 생성
	spotLight_05.target.position.set(-35, 50, 650); // 비출 대상의 위치 (= 빛의 방향)
	spotLight_05.target.updateMatrixWorld(); // 정보 업데이트
	scene.add( spotLight_05 ); // 빛 정보 추가

	 // 동상 5 - 피에타
	loader.load('./statue/pieta/scene.gltf', function(gltf){
     	statue_5 = gltf.scene.children[0];
		statue_5.rotation.z = getRadian(80);

    	statue_5.position.set(-30, -20, 650);
    	statue_5.scale.set(20, 25, 20);
		model = gltf.scene;
		scene.add(model);

		animate();
	}, undefined, function (error) {
		console.error(error);
	}); 

	//Grabfigur 스포트라이트
	spotLight_06 = new THREE.SpotLight( 0xfcf7cf, 0.5); // 파라미터 : (조명 색, 조명 세기)
	spotLight_06.position.set(15, 95, 740 ); // 광원의 위치
	spotLight_06.angle = Math.PI/10; // 비추는 범위 크기(원형태)
	spotLight_06.castShadow = true; // 그림자 생성
	spotLight_06.target.position.set(-35, 50, 740); // 비출 대상의 위치 (= 빛의 방향)
	spotLight_06.target.updateMatrixWorld(); // 정보 업데이트
	scene.add( spotLight_06 ); // 빛 정보 추가
	// 동상 6 - Grabfigur
	loader.load('./statue/Grabfigur/scene.gltf', function(gltf){
    	statue_6 = gltf.scene.children[0];
		statue_6.rotation.z = getRadian(270);
    	statue_6.position.set(-30,-10,740);
    	statue_6.scale.set(2, 4, 4);
		
		model = gltf.scene;
	  
		scene.add(model);

		animate();
	}, undefined, function (error) {
		console.error(error);
	}); 

   document.getElementById("TheStarryNight").onclick = function (event) {
		
		camera.position.z = -180;
		camera.position.set(5,40,125);
		controls.target.set(8,19,45);
		controls.update();

		document.getElementById("modal1").style.display="block";
	   
	   };

	   document.getElementById("modal_close_btn1").onclick = function() {
		        document.getElementById("modal1").style.display="none";
		    }

	   
   document.getElementById("OliveTree").onclick = function (event) {
   	 
	    camera.rotation.z = 90;
		camera.position.set(20, 45, 160);
		controls.target.set(80,45,160);
		a=50,b=45,c=160;
		controls.update();

		document.getElementById("modal2").style.display="block";

	   };

	   document.getElementById("modal_close_btn2").onclick = function() {
		        document.getElementById("modal2").style.display="none";
		    }   
	   
	   
   document.getElementById("MonaLisa").onclick = function (event) {
   
	    camera.rotation.z = 90;
		camera.position.set(23,45,230);
		controls.target.set(80,45,230);
		a=53,b=45,c=230;
		controls.update();

		document.getElementById("modal3").style.display="block";

	   };

	   document.getElementById("modal_close_btn3").onclick = function() {
		        document.getElementById("modal3").style.display="none";
		    }  
	   
   document.getElementById("Lapie").onclick = function (event) {
	  
		camera.rotation.z = 90;
		camera.position.set(13,45,320);
		controls.target.set(80,45,320);
		a=43,b=45,c=320;
		controls.update();

		document.getElementById("modal4").style.display="block";

	   };

	   document.getElementById("modal_close_btn4").onclick = function() {
		        document.getElementById("modal4").style.display="none";
		    }  
	   
   document.getElementById("Guernica").onclick = function (event) {
	   
	    camera.rotation.z = 90;
		camera.position.set(-25,55,433);
		controls.target.set(80,45,433);
		a=15,b=55,c=433;
		controls.update();

		document.getElementById("modal5").style.display="block";
   
	   };

	   document.getElementById("modal_close_btn5").onclick = function() {
		        document.getElementById("modal5").style.display="none";
		    }  
	   
   document.getElementById("WaterLilies").onclick = function (event) {
	   
		camera.rotation.z = 90;
		camera.position.set(13,45,550);
		controls.target.set(80,45,550);
		a=43,b=45,c=550;
		controls.update();

		document.getElementById("modal6").style.display="block";

	   };

	   document.getElementById("modal_close_btn6").onclick = function() {
		        document.getElementById("modal6").style.display="none";
		    }  
	   
   document.getElementById("WomanWithAParasol").onclick = function (event) {
   
		camera.rotation.z = 90;
		camera.position.set(20,45,650);
		controls.target.set(80,45,650);
		a=50,b=45,c=650;
		controls.update();

		document.getElementById("modal7").style.display="block";

	   };

	   document.getElementById("modal_close_btn7").onclick = function() {
		        document.getElementById("modal7").style.display="none";
		    }  
	   
   document.getElementById("TheDanceClass").onclick = function (event) {   

		camera.rotation.z = 90;
		camera.position.set(20,45,720);
		controls.target.set(80,45,720);
		a=50,b=45,c=720;
		controls.update();

		document.getElementById("modal8").style.display="block";
   
	   };

	   document.getElementById("modal_close_btn8").onclick = function() {
		        document.getElementById("modal8").style.display="none";
		    }  
   
   document.getElementById("VenusDeMilo").onclick = function (event) {
	   
		camera.rotation.z = -90;
		camera.position.set(55,50,170);
		controls.target.set(-80,0,170);
		a=25,b=50,c=170;
		controls.update();

		document.getElementById("modal9").style.display="block";
   
	   };

	   document.getElementById("modal_close_btn9").onclick = function() {
		        document.getElementById("modal9").style.display="none";
		    }  
	   
   document.getElementById("Discobolus").onclick = function (event) {
	      
		camera.rotation.z = -90;
		camera.position.set(42,10,263);
		controls.target.set(-75,37,263);
		a=12,b=10,c=263;
		controls.update();

		document.getElementById("modal10").style.display="block";
   
	   };

	   document.getElementById("modal_close_btn10").onclick = function() {
		        document.getElementById("modal10").style.display="none";
		    }  
	   
   document.getElementById("David").onclick = function (event) {
	   
		camera.rotation.z = -90;
		camera.position.set(58,41,410);
		controls.target.set(-80,0,410);
		a=28,b=41,c=410;
		controls.update();

		document.getElementById("modal11").style.display="block";
   
	   };

	   document.getElementById("modal_close_btn11").onclick = function() {
		        document.getElementById("modal11").style.display="none";
		    }  

   document.getElementById("TheThinker").onclick = function (event) {
	   
		camera.rotation.z = -90;
		camera.position.set(40,25,500);
		controls.target.set(-80,-5,500);
		a=10,b=25,c=500;
		controls.update();

		document.getElementById("modal12").style.display="block";
   
	   };

	   document.getElementById("modal_close_btn12").onclick = function() {
		        document.getElementById("modal12").style.display="none";
		    }  
	   
   document.getElementById("Pieta").onclick = function (event) {
	   
		camera.rotation.z = -90;
		camera.position.set(58,55,650);
		controls.target.set(-80,-20,650);
		a=28,b=55,c=650;
		controls.update();

		document.getElementById("modal13").style.display="block";
   
	   };

	   document.getElementById("modal_close_btn13").onclick = function() {
		        document.getElementById("modal13").style.display="none";
		    }  
	   
   document.getElementById("Grabfigur").onclick = function (event) {

		camera.rotation.z = -90;
		camera.position.set(50,25,740);
		controls.target.set(-80,25,740);
		a=20,b=25,c=740;
		controls.update();

		document.getElementById("modal14").style.display="block";

	   };

	   document.getElementById("modal_close_btn14").onclick = function() {
		        document.getElementById("modal14").style.display="none";
		    }  
	   
	function animate() {

	   renderer.render(scene,camera);
	   requestAnimationFrame(animate);
	   
	}

}


