import React, { useState, useEffect } from 'react';
import { Rotate } from './Rotate';
import { Scale } from './Scale';

export const Option = ({mesh}) => {

    // todo: 위치 고정시키자. (왼쪽에 붙여)
    // todo: 선택하면 그 속성이 띄워지게 하자.
    const [select, setSelect] = useState(null);
    useEffect(() => {
        setSelect(mesh);
        console.log(mesh);
    }, [mesh])

    const [type, setType] = useState(true);

    function rotateHandler() {
        setType(true);
    }

    function scaleHandler() {
        setType(false);
    }

    function deleteHandler() {
    }
    
    return (
        <div className='flex flex-row bg-white h-[500px]'>
            {
                select ? 
                    <div className='p-2'>
                        <div className='flex flex-col'>
                            <div className='mt-2'>
                                {select.mesh.name.split('#')[0]}
                            </div>
                            <Rotate obj={select}></Rotate>
                            <Scale obj={select}></Scale>
                            <div>
                            <button className='rounded outline outline-offset-2 outline-2 mb-3 w-20' onClick={deleteHandler}>delete</button>
                            </div>
                        </div>
                    </div>
                :
                    null
            }
        </div>                
    );
}