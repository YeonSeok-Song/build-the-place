import React, {useState, useEffect} from "react";

export const ObjectList = ({ objects, loader }) => {

    const [uploadFile, setUpLoadFile] = useState(['box', 'circle', 'wall']);

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
    
    return (
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
    )
}
