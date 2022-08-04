import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { Controller } from '../../core/controller';
import { Floor } from '../../core/Floor';
import { Loader } from '../../core/Loader';
import { Objects } from '../../core/object';

let canvas      = null;
let renderer    = null;
let scene       = null;
let camera      = null;
let control     = null;
let floor       = null;
let objects     = null;
let group       = null;
let loader      = null;

const Editer = () => {

    // 입장, 만들기
    const [isLoading, setIsLoading] = useState(true);
    const [uploadFile, setUpLoadFile] = useState([]);

    window.addEventListener('resize', setSize);

    function update() {

        control.updateController(objects.meshes);
       
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

        const cameraPosition = new THREE.Vector3(3, 5, 2);
        camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
        camera.rotation.reorder('YXZ');
        camera.rotation.x = THREE.MathUtils.degToRad(-45);
        camera.rotation.y = THREE.MathUtils.degToRad(-45);
        camera.zoom = 0.1;
        camera.updateProjectionMatrix();
        scene.add(camera);
        
        const ambientLight = new THREE.AmbientLight('white', 0.7);
        console.log(ambientLight);
        scene.add(ambientLight);

        floor = new Floor(renderer, group);

        control = new Controller(camera, renderer.domElement, canvas, group, floor);
        
        objects = new Objects(group, loader);
        objects.createBox();

        console.log(objects);

        scene.add(group);
        update();
    }
    
    function createHandler(e) {
        if (e.target.id === 'box') {
            objects.createBox();
        }
        else if (e.target.id === 'circle') {
            objects.createCircle();
        }
        else if (e.target.id === 'wall') {
            objects.createWall();
        }
        else {
            objects.createObject(e.target.id, loader);
        }
    }

    function get3DFile(e) {
        e.preventDefault();
        //todo: 확장자 제한
        const upload = document.getElementById("upload");
        const name = upload.files[0].name.split('.')[0];

        if(loader.checkFileName(name)) {
            loader.loadFile(upload.files[0]);
            setUpLoadFile([name, ...uploadFile]);
        }
    }

    useEffect(() => {
        if (isLoading) {
            init();

            const x = document.getElementById("x");
            const y = document.getElementById("y");

            x.value = floor.x+1;
            y.value = floor.y+1;
            
        }

    }, [])

    return (
        <>
            <div className="relative flex flex-row">
                <div className='absolute left-0 top-0'>
                    <div className="flex flex-col items-center justify-items-center h-14 bg-blue-200 rounded pl-2 pr-3">
                        <h1 className='mb-1 mt-1'>Floor</h1>
                        <div className='flex flex-row'>
                            <div className="mr-5">
                                x
                                <button id="xPlus" className='ml-2 w-5 h-5 bg-green-100 rounded' 
                                    onClick={() => {
                                        floor.sizeUpX();
                                        const x = document.getElementById("x");
                                        x.value = floor.x+1;
                                    }
                                }>+</button>
                                <button id="xMinus" className='ml-2 w-5 h-5 bg-red-100 rounded'
                                    onClick={() => {
                                        floor.sizeDownX();
                                        const x = document.getElementById("x");
                                        x.value = floor.x+1;
                                    }
                                }>-</button>
                                <input id="x" placeholder='x' default=""
                                    className='text-center w-10 bg-gray-100 h-5 rounded outline-1 ml-2'
                                    onChange={(e) => {
                                        
                                        const inputX = document.getElementById("x");
                                        const x = parseInt(inputX.value, 10);
                                        if (x > 0) {
                                            floor.sizeChangeX(x-1);
                                        }
                                    }}
                                />
                            </div>
                            <div>
                                y
                                <button id="yPlus" className='ml-2 w-5 h-5 bg-green-100 rounded'
                                    onClick={() => {
                                        floor.sizeUpY();
                                        const y = document.getElementById("y");
                                        y.value = floor.y+1;
                                    }
                                }>+</button>
                                <button id="yMinus" className='ml-2 w-5 h-5 bg-red-100 rounded'
                                    onClick={() => {
                                        floor.sizeDownY();
                                        const y = document.getElementById("y");
                                        y.value = floor.y+1;
                                    }
                                }>-</button>
                                <input id="y" placeholder='y'
                                    className='text-center w-10 bg-gray-100 h-5 rounded outline-1 ml-2'
                                    onChange={(e) => {
                                        
                                        const inputY = document.getElementById("y");
                                        const y = parseInt(inputY.value, 10);
                                        if (y > 0) {
                                            floor.sizeChangeY(y-1);
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='absolute top-0 right-0'>
                    <div className='flex flex-col w-[150px] pb-5 bg-green-200 items-center pt-5 '>
                        <label className='w-[100px] h-[100px] bg-white rounded-lg text-7xl text-center content-center items-center cursor-pointer pb-3 pt-3'>
                            +
                            <input type="file" id="upload" className='hidden' onChange={get3DFile}/>
                        </label>
                        {
                            uploadFile.map(function (v, i){
                                return <div id={v} className='w-[100px] h-[100px] text-center align-middle bg-white rounded-lg cursor-pointer mb-3 mt-3'
                                    onClick={createHandler}
                                    >
                                        {v}
                                    </div>
                                
                            })
                        }
                    </div>
                </div>
                <div id="Edit">
                </div>
            </div>
            <canvas id="WorldMap" />
        </>
        
    );
}

export default Editer;