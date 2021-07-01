const THREE = app.three(["OrbitControls"]);

const $ = app.jquery;

console.log($("#c"));

let cubes = [];
let cubesData = [];

let block = 0;
let materials = [
    "cobblestone", "cobblestone_mossy", "gravel", "planks_oak", "brick", "bedrock",
    "dirt", "diamond_ore", "gold_ore", "iron_ore", "planks_big_oak", "sand", "stonebrick",
    "netherrack", "wool_colored_white", "redstone_ore", "obsidian"
];

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}



function main(){
    //Подключение к канве, инициализация библиотеки
    const canvas = document.querySelector("#c");
    const renderer = new THREE.WebGLRenderer({canvas});
    //Установка параметров камеры и сцены
    const fov = 60;
    const aspect = 2;  // значение для canvas по умолчанию
    const near = 0.01;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.y = 5;
    camera.position.x = 5;
    camera.position.z = 5;
    camera.lookAt(0,0,0);
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xB1E1FF);
    //Освещение
    const color = 0xFFFFFF;
    const skyColor = 0xB1E1FF;  // light blue
    const groundColor = 0xEEEEEE;  // brownish orange
    const intensity = 1;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    light.position.set(0, 2, 4);
    scene.add(light);
    //Текстура сцены
    const planeSize = 40;
    const loader = new THREE.TextureLoader();
    let texture = loader.load("./textures/checker.png");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping
    texture.magFilter = THREE.NearestFilter;
    const repeats = planeSize / 2;
    texture.repeat.set(repeats, repeats);
    camera.position.z = 2;
    const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
    const planeMat = new THREE.MeshPhongMaterial({
        map: texture,
        side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.rotation.x = Math.PI * -.5;
    mesh.position.x = 0.5;
    mesh.position.z = 0.5;
    mesh.position.y = -0.5;
    scene.add(mesh);
    //Куб
    const boxWidth = 1.1;
    const boxHeight = 1.1;
    const boxDepth = 1.1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    texture = loader.load(`./textures/blocks/${materials[block]}.png`);
    texture.magFilter = THREE.NearestFilter;
    const material = new THREE.MeshLambertMaterial({
        map : texture
    });
    const phantom = new THREE.Mesh(geometry, material);
    phantom.material.transparent = true;
    let toggle = false;
    let phantomAnimation = setInterval(function(){
        // if(phantom.material.opacity >= 1){
        //     toggle = false;
        // }
        // if(phantom.material.opacity <= 0){
        //     toggle = true;
        // }
        // if(toggle){
        //     phantom.material.opacity += 0.05;
        // }
        // else{
        //     phantom.material.opacity -= 0.05;
        // }
        if(toggle){
            phantom.material.opacity = 0.2;
            toggle = false;
        }
        else{
            phantom.material.opacity = 1;
            toggle = true;
        }
    }, 500);
    phantom.position.x = 0;
    phantom.position.y = 0;
    phantom.position.z = 0;
    scene.add(phantom);
    //Рендер
    renderer.render(scene, camera);
    //Контроль
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if(needResize){
            renderer.setSize(width, height, false);
        }
        return needResize;
    }
    function render(time) {
        time *= 0.001;  // convert time to seconds
    
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }
    
        renderer.render(scene, camera);
    
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
    $.post("php/save.php?method=get", {id : findGetParameter("id") }, function(data){
        console.log(data);
        if(data){
            data = JSON.parse(data);
            console.log(data);
            for(let i = 0; i < data.length; i++){
                cubesData.push(data[i]);
                let coords = {
                    x : cubesData[i].x,
                    y : cubesData[i].y,
                    z : cubesData[i].z
                }
                let boxWidth = 1;
                let boxHeight = 1;
                let boxDepth = 1;
                let geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
                let texture = loader.load(`./textures/blocks/${cubesData[i].material}.png`);
                texture.magFilter = THREE.NearestFilter;
                let material = new THREE.MeshLambertMaterial({
                    map: texture
                });
                let cube = new THREE.Mesh(geometry, material);
                cube.position.x = coords.x;
                cube.position.y = coords.y;
                cube.position.z = coords.z;
                console.log(cube.position);
                console.log(cube);
                cubes.push(cube);
                scene.add(cube);
                render();
            }
        }
    })
    //События
    // document.addEventListener("mousedown", onDocumentMouseDown, false);
    // document.addEventListener("mousemove", onDocumentMouseMove, false)
    // document.addEventListener("dblclick", onDocumentDoubleClick, false);
    document.addEventListener("keydown", onDocumentKeyUp, false);
    
    function onDocumentDoubleClick(event){
        event.preventDefault();
        let ray = new THREE.Raycaster();
        let mouse = new THREE.Vector2();
        mouse.x = ( event.clientX / renderer.domElement.width ) * 2 - 1;
        mouse.y = - ( event.clientY / renderer.domElement.height ) * 2 + 1;
        ray.setFromCamera( mouse, camera );
        var vec = ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 1, 0)));
        let boxWidth = 1;
        let boxHeight = 1;
        let boxDepth = 1;
        let geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
        let texture = loader.load(`./textures/blocks/${materials[block]}.png`);
        texture.magFilter = THREE.NearestFilter;
        let material = new THREE.MeshLambertMaterial({
            map: texture
        })
        let cube = new THREE.Mesh(geometry, material);
        let coords = getIntervalToCube(vec.x, vec.y, vec.z);
        cube.position.x = coords.x;
        cube.position.y = coords.y;
        cube.position.z = coords.z;
        console.log(cube.position);
        console.log(vec);
        cubes.push(cube);
        scene.add(cube);

    }
    function removeEntity(object) {
        let selectedObject = scene.getObjectByName(object.name);
        scene.remove( selectedObject );
        renderer.render(scene, camera);
    }
    function onDocumentMouseMove(event){
        removeEntity("Phantom");
        event.preventDefault();
        event.preventDefault();
        let ray = new THREE.Raycaster();
        let mouse = new THREE.Vector2();
        mouse.x = ( event.clientX / renderer.domElement.width ) * 2 - 1;
        mouse.y = - ( event.clientY / renderer.domElement.height ) * 2 + 1;
        ray.setFromCamera( mouse, camera );
        var vec = ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 1, 0)));
        let boxWidth = 1;
        let boxHeight = 1;
        let boxDepth = 1;
        let geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
        let material = new THREE.MeshPhongMaterial({color: 0x44aa88});
        let cube = new THREE.Mesh(geometry, material);
        cube.name = "Phantom";
        let coords = getIntervalToCube(vec.x, vec.y, vec.z);
        cube.position.x = coords.x;
        cube.position.y = coords.y;
        cube.position.z = coords.z;
        console.log(cube.position);
        console.log(vec);
        scene.add(cube);
    }

    function onDocumentKeyUp(event){
        console.log(event.keyCode);
        switch(event.keyCode){
            case 87:
                changeCubePosition("up");
                break;
            case 83:
                changeCubePosition("down");
                break;
            case 65:
                changeCubePosition("left");
                break;
            case 68:
                changeCubePosition("right");
                break;
            case 88:
                changeCubePosition("lower");
                break;
            case 90:
                changeCubePosition("higher");
                break;
            case 69:
                putCube();
                break;
            case 81:
                for(let i = 0; i < cubes.length; i++){
                    if(phantom.position.x === cubes[i].position.x
                        && phantom.position.y === cubes[i].position.y
                        && phantom.position.z === cubes[i].position.z){
                            let index = i;
                            deleteCube(index);
                            console.log("Delete!");
                    }
                }
                break;
            case 70:
                changeMaterial(true);
                break;
            case 71:
                changeMaterial(false);
                break;
        }
    }

    function changeCubePosition(direction){
        switch(direction){
            case "up":
                phantom.position.x--;
                render();
                break;
            case "down":
                phantom.position.x++;
                render();
                break;
            case "left":
                phantom.position.z++;
                render();
                break;
            case "right":
                phantom.position.z--;
                render();
                break;
            case "lower":
                phantom.position.y--;
                render();
                break;
            case "higher":
                phantom.position.y++;
                render();
                break;
        }
    }

    function putCube(){
        let coords = {
            x : phantom.position.x,
            y : phantom.position.y,
            z : phantom.position.z
        }
        let boxWidth = 1;
        let boxHeight = 1;
        let boxDepth = 1;
        let geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
        let texture = loader.load(`./textures/blocks/${materials[block]}.png`);
        texture.magFilter = THREE.NearestFilter;
        let material = new THREE.MeshLambertMaterial({
            map: texture
        });
        let cube = new THREE.Mesh(geometry, material);
        cube.position.x = coords.x;
        cube.position.y = coords.y;
        cube.position.z = coords.z;
        console.log(cube.position);
        cubesData.push({
            material : materials[block],
            x : coords.x,
            y : coords.y,
            z : coords.z
        });
        cubes.push(cube);
        scene.add(cube);
        $.post("php/save.php?method=update", {map : JSON.stringify(cubesData), id: findGetParameter("id")}, function(data){
            console.log(data);
        })
    }

    function deleteCube(index){
        scene.remove(cubes[index]);
        cubes.remove(cubes[index]);
        cubesData.remove(cubes[index]);
        render();
    }

    function changeMaterial(isUp){
        if(isUp){
            if(block === materials.length - 1){
                block = 0;
            }
            else{
                block++;
            }
        }
        else{
            if(block === 0){
                block = materials.length - 1;
            }
            else{
                block--;
            }
        }
        let texture = loader.load(`./textures/blocks/${materials[block]}.png`);
        texture.magFilter = THREE.NearestFilter;
        phantom.material = new THREE.MeshLambertMaterial({
            map: texture
        });
        phantom.material.transparent = true;
        phantom.material.opacity = 0.5;
        
        render();
        console.log(JSON.stringify(cubesData));
    }
    renderCubes();
}

function renderCubes(){
    for(let j = 0; j < cubesData.length; j++){
        console.log(j);
        
            }
        }
        


function getIntervalToCube(x, y, z){
    x = Math.round(x);
    z = Math.round(z);
    for(let i = 0; i < cubes.length; i++){
        if(x === cubes[i].position.x && z === cubes[i].position.z){
            y++;
        }
        // if(y === cubes[i].position.y && z >= cubes[i].position.z){
        //     z = cubes[i].position.z - 1;
        // }
        // if(y === cubes[i].position.y &&  x >= cubes[i].position.x){
        //     x = cubes[i].position.z - 1;
        // }
    }
    return {x : x, y : y, z : z};
}

function onDocumentMouseDown(event){

    event.preventDefault();

}


main();