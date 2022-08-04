import React, { useEffect } from 'react';
import * as THREE from 'three';

export const Rotate = ({mesh}) => {

    useEffect(() => {

        mesh.rotation.reorder('YXZ');

        const xslider = document.getElementById("xr-slider"); 
        const inputXR = document.getElementById("xr"); 

        const yslider = document.getElementById("yr-slider"); 
        const inputYR = document.getElementById("yr"); 

        const zslider = document.getElementById("zr-slider"); 
        const inputZR = document.getElementById("zr"); 

        // todo: 쿼터니언으로 할 것.
        xslider.value = THREE.MathUtils.degToRad(mesh.rotation.x);
        inputXR.value = THREE.MathUtils.degToRad(mesh.rotation.x);
        
        yslider.value = THREE.MathUtils.degToRad(mesh.rotation.y);
        inputYR.value = THREE.MathUtils.degToRad(mesh.rotation.y);

        zslider.value = THREE.MathUtils.degToRad(mesh.rotation.z);
        inputZR.value = THREE.MathUtils.degToRad(mesh.rotation.z);

    }, [])

    return (
        <div className='w-[190px] h-[150px] bg-red-100 items-center'>
            <div className='pt-3 pb-2 font-bold'>
                <h3>Rotate</h3>
            </div>
            <div className='flex flex-col'>
                <div className='flex flex-row mt-2 mb-2'>
                    <input type="range" id="xr-slider" min="0" max="359" 
                        className='w-30 bg-gray-100 h-5 outline-1 ml-2'
                        onInput={(e) => {

                            const slider = document.getElementById("xr-slider");
                            const input = document.getElementById("xr");

                            input.value = slider.value;
                            const r = parseInt(input.value, 10);
                            mesh.rotation.x = THREE.MathUtils.degToRad(r);

                        }}
                    />
                    <input id="xr" className='w-10' placeholder='0'
                        onChange={(e) => {
                            const slider = document.getElementById("xr-slider");
                            const inputR = document.getElementById("xr");

                            slider.value = inputR.value;
                            const r = parseInt(inputR.value, 10);
                            mesh.rotation.x = THREE.MathUtils.degToRad(r);

                        }}
                    />
                </div>

                <div className='flex flex-row mb-2'>
                    <input type="range" id="yr-slider" min="0" max="359" 
                        className='w-30 bg-gray-100 h-5 outline-1 ml-2'
                        onInput={(e) => {
                            const slider = document.getElementById("yr-slider");
                            const input = document.getElementById("yr");

                            input.value = slider.value;
                            const r = parseInt(input.value, 10);
                            mesh.rotation.y = THREE.MathUtils.degToRad(r);

                        }}
                    />
                    <input id="yr" className='w-10' placeholder='0'
                        onChange={(e) => {
                            const slider = document.getElementById("yr-slider");
                            const input = document.getElementById("yr");

                            slider.value = input.value;
                            const r = parseInt(input.value, 10);
                            mesh.rotation.y = THREE.MathUtils.degToRad(r);

                        }}
                    />
                </div>

                <div className='flex flex-row mb-2'>
                    <input type="range" id="zr-slider" min="0" max="359" 
                        className='w-30 bg-gray-100 h-5 outline-1 ml-2'
                        onInput={(e) => {
                            const slider = document.getElementById("zr-slider");
                            const input = document.getElementById("zr");

                            input.value = slider.value;
                            const r = parseInt(input.value, 10);
                            mesh.rotation.z = THREE.MathUtils.degToRad(r);

                        }}
                    />
                    <input id="zr" className='w-10' placeholder='0'
                        onChange={(e) => {
                            const slider = document.getElementById("zr-slider");
                            const inputR = document.getElementById("zr");

                            slider.value = inputR.value;
                            const r = parseInt(inputR.value, 10);
                            mesh.rotation.z = THREE.MathUtils.degToRad(r);

                        }}
                    />
                </div>

            </div>
            
            
        </div>
    );
}