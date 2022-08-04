import React, { useEffect} from 'react';
import * as THREE from 'three';

export const Scale = ({mesh}) => {

    useEffect(() => {

        
        const xslider = document.getElementById("xs-slider"); 
        const inputXS = document.getElementById("xs"); 

        const yslider = document.getElementById("ys-slider"); 
        const inputYS = document.getElementById("ys"); 

        const zslider = document.getElementById("zs-slider"); 
        const inputZS = document.getElementById("zs"); 

        xslider.value = mesh.scale.x;
        inputXS.value = mesh.scale.x;
        
        yslider.value = mesh.scale.y;
        inputYS.value = mesh.scale.y;

        zslider.value = mesh.scale.z;
        inputZS.value = mesh.scale.z;


    }, [])

    return (
        <div className='w-[190px] h-[150px] bg-red-100 items-center'>
            <div className='pt-3 pb-2 font-bold'>
                <h3>Scale</h3>
            </div>
            <div className='flex flex-col'>
                <div className='flex flex-row mt-2 mb-2'>
                    <input type="range" id="xs-slider" min="1" max="100" 
                        className='w-30 bg-gray-100 h-5 outline-1 ml-2'
                        onInput={(e) => {

                            const slider = document.getElementById("xs-slider");
                            const input = document.getElementById("xs");

                            input.value = slider.value;
                            const s = parseInt(input.value, 10);
                            mesh.scale.x = s;

                            console.log(mesh.position.x, mesh.position.z);

                        }}
                    />
                    <input id="xs" className='w-10' placeholder='0'
                        onChange={(e) => {
                            const slider = document.getElementById("xs-slider");
                            const inputR = document.getElementById("xs");

                            slider.value = inputR.value;
                            const s = parseInt(inputR.value, 10);
                            mesh.scale.x = s;

                            console.log(mesh.position.x, mesh.position.z);

                        }}
                    />
                </div>
                <div className='flex flex-row mb-2'>
                    <input type="range" id="ys-slider" min="1" max="100" 
                        className='w-30 bg-gray-100 h-5 outline-1 ml-2'
                        onInput={(e) => {
                            const slider = document.getElementById("ys-slider");
                            const input = document.getElementById("ys");

                            input.value = slider.value;
                            const s = parseInt(input.value, 10);
                            mesh.scale.y = s;

                            console.log(mesh.position.x, mesh.position.z);

                        }}
                    />
                    <input id="ys" className='w-10' placeholder='0'
                        onChange={(e) => {
                            const slider = document.getElementById("ys-slider");
                            const input = document.getElementById("ys");

                            slider.value = input.value;
                            const s = parseInt(input.value, 10);
                            mesh.scale.y = s;

                            console.log(mesh.position.x, mesh.position.z);

                        }}
                    />
                </div>

                <div className='flex flex-row mb-2'>
                    <input type="range" id="zs-slider" min="1" max="100" 
                        className='w-30 bg-gray-100 h-5 outline-1 ml-2'
                        onInput={(e) => {
                            const slider = document.getElementById("zs-slider");
                            const input = document.getElementById("zs");

                            input.value = slider.value;
                            const s = parseInt(input.value, 10);
                            mesh.scale.z = s;

                        }}
                    />
                    <input id="zs" className='w-10' placeholder='0'
                        onChange={(e) => {
                            const slider = document.getElementById("zs-slider");
                            const inputR = document.getElementById("zs");

                            slider.value = inputR.value;
                            const s = parseInt(inputR.value, 10);
                            mesh.scale.z = s;

                        }}
                    />
                </div>

            </div>
            
            
        </div>
    );
}