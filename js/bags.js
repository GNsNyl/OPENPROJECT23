var camera, scene, renderer, mesh,torus;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var colors = ["#00ffd0","#000000","#ffffff","#00ffd0","#000000"];

function init() {
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = -100;
    camera.position.y = -100;
    //
    // var objLoader= new THREE.OBJLoader();
    // objLoader.load('../img/zhong.obj', function(object){
    //     object.position.y= 2;
    //     scene.add(object)
    //
    // });

    // var imgs = textToTexture("Hola");
    // var imgs = new THREE.TextureLoader().load( "img/texture.jpg" );

    // var texture = new THREE.CubeTextureLoader().setPath( 'img/texture/' )
    //     .load( [
    //         'texture.png',
    //     ] );
        // .setPath( './img/cubeMaps/' )
        // .load("texture.png");
    // texture.mapping = THREE.CubeRefractionMapping;
    const loader = new THREE.TextureLoader();
    scene = new THREE.Scene();
    //scene.background = texture;

    var ambient = new THREE.AmbientLight(0xffffff);
    scene.add(ambient);
    // var geometry = new THREE.IcosahedronGeometry(20,1);

    var geometry = new THREE.CubeGeometry(40,45,1);
    // var material = new THREE.MeshPhongMaterial({
    //     // color: 0xffffff,
    //     envMap: texture,
    //     refractionRatio: 0.95
    // });
    // const textureList=['texture','texture1','texture2']
    const n=100;
    // for(let i =0; i<6;i++){
        var texture=loader.load('img/texture/t1.png')
        const material = new THREE.MeshStandardMaterial( {
            // color:'#c9daae',
            map : texture,
            refractionRatio: 0.95,
            transparent:true,
            opacity:0.9

        } );
        mesh = new THREE.Mesh(geometry, material);
        // mesh.position.z=(Math.random()-0.5)*n/3;
        // mesh.position.x=(Math.random()-0.5)*3*n;
        // mesh.position.y=(Math.random()-0.5)*n;
        // mesh.rotation.x=(Math.random()-0.5)*1.7;
        // mesh.rotation.y=(Math.random()-0.5)*1.7;
        // mesh.rotation.z=(Math.random()-0.5)*3.7;

        scene.add(mesh);
    // }

    // console.log(texture)



    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.zIndex=500;
    renderer.domElement.style.position='fixed';
    renderer.domElement.style.pointerEvents='none';


    document.body.appendChild(renderer.domElement);

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('touchmove', onDocumentMouseMove, false);
    // window["text-input"].addEventListener('keyup', onTextChange, false);
    window.addEventListener('resize', onWindowResize, false);
}

// function onTextChange() {
//     var str = window["text-input"].value || "Hola Mundo";
//     var imgs = textToTexture(str);
//     var texture = new THREE.CubeTextureLoader().load(imgs);
//     texture.mapping = THREE.CubeRefractionMapping;
//     mesh.material.envMap = texture;
// }

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
    if (event.touches) event = event.touches[0];
    mouseX = (event.clientX - windowHalfX) / 4;
    mouseY = (event.clientY - windowHalfY) / 4;
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(mesh.position);
    renderer.render(scene, camera);
}
//
// function textToTexture(text) {
//     var canvas = document.getElementById('bag-canvas');
//     var tile_size = 1024;
//     var fontSize = 50;
//     //
//     canvas.width = tile_size * 4;
//     canvas.height = tile_size;
//     //
//     var ctx = canvas.getContext('2d');
//     ctx.font = fontSize + "px Rubik Mono One,Helvetica ";
//     // var fillColor = colors[Math.floor(Math.random()*colors.length)];
//     var fillColor='#ffffff'
//     // document.body.style.backgroundColor = fillColor;
//     ctx.fillStyle = fillColor;
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
//     var text_width = ctx.measureText(text).width;
//     var text_height = fontSize * 0.8;
//     // var repetitions_x = Math.ceil(canvas.width / text_width);
//     // var repetitions_y =  Math.ceil(canvas.height / text_height);
//     var index = 0;
//     for (var y = 0; y < canvas.height; y += text_height) {
//         for (var x = 0; x < canvas.width; x += text_width) {
//             ctx.fillStyle = colors[Math.floor(Math.random()*colors.length)];
//             var _x = index % 2 == 0 ? x : x - (text_width/2);
//             ctx.fillText(text, _x, y);
//         }
//         index += 1;
//     }
//     var tileFromCanvas = function(index) {
//         var img_canvas = document.getElementById('bag-canvas');
//         img_canvas.width = tile_size;
//         img_canvas.height = tile_size;
//         var context = img_canvas.getContext("2d");
//         context.drawImage(canvas, -tile_size * index, 0);
//         return img_canvas.toDataURL();
//     }
//     var imgs = [];
//     imgs.push(tileFromCanvas(0));
//     imgs.push(tileFromCanvas(1));
//     imgs.push(tileFromCanvas(4)); // blank_space
//     imgs.push(tileFromCanvas(4)); // blank_space
//     imgs.push(tileFromCanvas(2));
//     imgs.push(tileFromCanvas(3));
//     return imgs;
// }

init();
animate();
