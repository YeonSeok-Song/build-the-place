import React, { useState } from 'react';
import styled from 'styled-components';
import { Rotate } from './Rotate';
import { Scale } from './Scale';

const OptionBlock = styled.div`
    position: absolute;
    top: ${props => props.top+2}px;
    left: ${props => props.left+2}px;
    border-radius: 5px;
    text-align: center;
    display: flex;
    flex-direction: row;
`

export const Option = ({top, left, mesh, }) => {

    const [type, setType] = useState(true);

    function rotateHandler() {
        setType(true);
    }

    function scaleHandler() {
        setType(false);
    }
    return (
        <OptionBlock id="option" top={top} left={left}>
            {
                <div className='flex flex-row bg-white w-[100px]'>
                    <div className='p-2'>
                        <div className='flex flex-col'>
                            <div className='mt-2'>
                                {mesh.name}
                            </div>
                            <div>
                                <button className='rounded outline outline-offset-2 outline-2 mt-3 mb-3 w-20' onClick={rotateHandler}>Rotate</button>
                            </div>
                            <div>
                                <button className='rounded outline outline-offset-2 outline-2 mb-3 w-20' onClick={scaleHandler}>Scale</button>
                            </div> 
                        </div>
                    </div>
                    
                    <div id="detail">
                        {
                            type ? <Rotate mesh={mesh}></Rotate> : <Scale mesh={mesh}></Scale>
                        }
                    </div>
                </div>                
            }
            
            
        </OptionBlock>
    );
}