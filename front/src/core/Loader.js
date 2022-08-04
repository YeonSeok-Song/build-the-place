import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

//todo: 로더 추가 예정

export class Loader {
    constructor() {
        this.objectData = [];
    }

    loadFile(file) {

        const [fileName, type] = file.name.split('.');
        
        const objectURL = URL.createObjectURL(file);
        console.log(objectURL);

        switch(type) {
            case 'glb' : 
                this.gltfLoader(fileName, objectURL);
                break;

            case 'fbx' :
                this.fbxLoader(fileName, objectURL);
                break;

            default: 
                break;
        }
    }

    gltfLoader(fileName, path) {
        const loader = new GLTFLoader();
        loader.load(path, gltf => {
            this.objectData[fileName] = gltf;
        })
        console.log(this.objectData);
    }

    fbxLoader(fileName, path) {
        const loader = new FBXLoader();
        loader.load(path, fbx => {
            this.objectData[fileName] = fbx;
        })
        console.log(this.objectData);
    }

    getData(name) {
        if (this.objectData[name]) {
            return this.objectData[name];
        }
        return null;
    }

    checkFileName(name) {
        if (this.objectData[name]) {
            return false;
        }
        return true;
    }

}