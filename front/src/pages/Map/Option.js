import React, { useState, useEffect } from 'react';
import { Rotate } from './Rotate';
import { Scale } from './Scale';

export const Option = ({mesh}) => {

    const [select, setSelect] = useState(null);
    useEffect(() => {
        setSelect(mesh);
        console.log(mesh);
    }, [mesh])

    function deleteHandler() {

        //todo: object delete 기능 추가
        mesh.delete();
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
                            <button className='rounded outline outline-offset-2 outline-2 mb-3 w-20 mt-4' onClick={deleteHandler}>delete</button>
                            </div>
                        </div>
                    </div>
                :
                    null
            }
        </div>                
    );
}