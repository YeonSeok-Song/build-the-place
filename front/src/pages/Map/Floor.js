import React, { useState, useEffect } from "react";

export const FloorEdit = ({ floor }) => {

    useEffect(() => {
        const x = document.getElementById("x");
        const y = document.getElementById("y");

        x.value = floor.x+1;
        y.value = floor.y+1;
    }, [])

    return (
        <div className="flex flex-col items-center justify-items-center h-14 bg-blue-200 rounded pl-2 w-[300px] pr-3">
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


    )
}