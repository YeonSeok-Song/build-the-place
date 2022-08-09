import * as THREE from "three";
import { Cube } from "./cube";
import { Wall } from "./wall";
import { CustomObj } from "./customObj";

export class Objects {
constructor(group, camera, canvas, floor) {
        this.objectArray    = [];
        this.meshArray      = [];
        this.group          = group;
        this.camera         = camera;
        this.floor          = floor;
        this.meshCount      = 0;
        this.canvas         = canvas;
        this.cameraCenterRay = new THREE.Raycaster();
    }

    raycastingSet() {
        this.cameraCenterRay.setFromCamera(
            new THREE.Vector2(0, 0),
            this.camera            
        );
    }

    centerRayCasting() {
        this.raycastingSet();
        const intersects = this.cameraCenterRay.intersectObjects(this.floor.blockGroup.children);
        let centerBlock = null;
        if (intersects.length > 0) {
            for (const item of intersects) {
                centerBlock = item.object;
                break;
            }
        }
        
        if (!centerBlock) {
            return new THREE.Vector2(0, 0);
        }
        const [x, y] = centerBlock.name.split("-");
        return new THREE.Vector2(x, y);
    }

    createCircle() {
    }

    createBox() {
        const pos = this.centerRayCasting();
        console.log(pos);
        const obj = new Cube();
        obj.move(pos.x, pos.y);
        this.objectArray[obj.name] = obj;
        this.meshArray[obj.name] = obj.mesh;
        this.group.add(obj.mesh);
    }

    createWall() {
        const pos = this.centerRayCasting();
        const obj = new Wall(pos.x, pos.y);
        obj.updatePosToRotate();
        this.objectArray[obj.name] = obj;
        this.meshArray[obj.name] = obj.mesh;
        this.group.add(obj.mesh);
    }

    createObject(name, loader) {
        const loadData = loader.getData(name);

        if (!loadData) return;
        const obj = new CustomObj(name, loadData);
        const pos = this.centerRayCasting();
        obj.move(pos.x, pos.y);
        this.objectArray[obj.name] = obj;
        this.meshArray[obj.name] = obj.mesh;
        this.group.add(obj.mesh);

    }

}