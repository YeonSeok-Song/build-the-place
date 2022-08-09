import { v4 as uuidv4 } from 'uuid';

export class CustomObj {
    constructor(name, loadData) {
        this.name = `${uuidv4()}`;
        if (loadData.isGroup === true && loadData.isObject3D === true) {
            this.mesh = loadData;
            this.mesh.position.y = 0.5;
            this.mesh.scale.set(1, 1, 1);
            this.mesh.name = `${name}#${this.name}`;
            return;
        }
        if(loadData.hasOwnProperty('scene')) {
            this.mesh = loadData.scene;
            this.mesh.position.y = 0.5;
            this.mesh.scale.set(1, 1, 1);
            this.mesh.name = `${name}#${this.name}`;
            return;
        }
    }

    rotate(y) {
        this.mesh.rotation.y = y;
    }

    move(x, z) {
        this.mesh.position.set(x, 0.5, z);
    }

    scale(x, y) {
        this.mesh.scale.set(x, y);
    }
}