import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { Controller } from '../../core/controller';
import { Floor } from '../../core/Floor';
import { Loader } from '../../core/Loader';
import { Objects } from '../../core/object';
import { Option } from '../../pages/Map/Option';
import { FloorEdit } from '../../pages/Map/Floor';
import { ObjectList } from '../../pages/Map/Objects';

let canvas      = null;
let renderer    = null;
let scene       = null;
let camera      = null;
let control     = null;
let objects     = null;
let group       = null;
let loader      = null;
let floor       = null;

const Editer = () => {

    // 입장, 만들기
    const [isLoading, setIsLoading] = useState(false);
    const [selectMesh, setSelectMesh] = useState(null);
    

    window.addEventListener('resize', setSize);

    function update() {
        control.updateController(objects.objectArray);
        renderer.render(scene, camera);
        renderer.setAnimationLoop(update);
    }

    function setSize() {
        if (camera && renderer && scene) {
            camera.left = -(window.innerWidth / window.innerHeight);
            camera.right = window.innerWidth / window.innerHeight;
            camera.top = 1;
            camera.bottom = -1;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.render(scene, camera);
        }
    }

    function init() {

        canvas = document.getElementById("WorldMap");
        
        renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        loader = new Loader();

        group = new THREE.Group();
        group.name = "renderGroup";

        scene = new THREE.Scene();

        camera = new THREE.OrthographicCamera(
            -(window.innerWidth / window.innerHeight), // left
            window.innerWidth / window.innerHeight, // right,
            1, // top
            -1, // bottom
            -1000,
            1000
        );

        floor = new Floor(renderer, group);

        const cameraInitPos = floor.getCenterPos();

        camera.position.set(cameraInitPos.x, 5, cameraInitPos.z);
        camera.rotation.reorder('YXZ');
        camera.rotation.x = THREE.MathUtils.degToRad(-45);
        camera.rotation.y = THREE.MathUtils.degToRad(-45);

        camera.zoom = 0.1;
        camera.updateProjectionMatrix();
        scene.add(camera);
        
        const ambientLight = new THREE.AmbientLight('white', 0.8);
        console.log(ambientLight);
        scene.add(ambientLight);

        control = new Controller(camera, renderer.domElement, canvas, group, floor, setSelectMesh);
        
        objects = new Objects(group, camera, canvas, floor);

        scene.add(group);
        update();

        setIsLoading(true);
    }

    useEffect(() => {
        if (!isLoading) {
            init();
        }
    }, [])

    return (
        <>
            {
                isLoading ? 
                <>
                    <div className="relative flex flex-row">
                        <div className='absolute left-0 top-0'>
                            <FloorEdit floor={floor}></FloorEdit>
                            <Option mesh={control?.selectMesh}></Option>
                        </div>
                        <div className='absolute top-0 right-0'>
                            <ObjectList objects={objects} loader={loader}></ObjectList>
                        </div>
                    </div>
                </>
                :
                null
            }
            <canvas id="WorldMap" />
        </>
        
    );
}

export default Editer;