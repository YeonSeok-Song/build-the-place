import * as THREE from "three";
import { v4 as uuidv4 } from 'uuid';

export class Cube {

    constructor() {
        this.name = `${uuidv4()}`;
        this.mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({
                color: 'blue'
            })
        )
        this.mesh.name = `cube#${this.name}`;
        this.mesh.position.y = 0.5;
    }

    setColor(color) {

    }

    scale(x, y, z) {
        this.mesh.scale.set(x, y, z);
    }

    rotate(x, y, z) {
        this.mesh.rotation.set(x, y, z);
    }

    move(x, z) {
        this.mesh.position.set(x, 0.5, z);
    }

}