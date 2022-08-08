import * as THREE from "three";
import { Cube } from "./cube";
import { Wall } from "./wall";
import { CustomObj } from "./customObj";

export class Objects {
constructor(group) {
        this.objectArray = [];
        this.meshArray = [];
        this.group = group;
        this.meshCount = 0;
    }

    createCircle() {
    }

    createBox() {
        const obj = new Cube();
        this.objectArray[obj.name] = obj;
        this.meshArray[obj.name] = obj.mesh;
        this.group.add(obj.mesh);
    }

    createWall() {
        const obj = new Wall();
        obj.updatePosToRotate();
        this.objectArray[obj.name] = obj;
        this.meshArray[obj.name] = obj.mesh;
        this.group.add(obj.mesh);
    }

    createObject(name, loader) {
        const loadData = loader.getData(name);

        if (!loadData) return;
        console.log(name);
        console.log(loadData);
        const obj = new CustomObj(name, loadData);
        console.log(obj);
        this.objectArray[obj.name] = obj;
        this.meshArray[obj.name] = obj.mesh;
        this.group.add(obj.mesh);

    }

}