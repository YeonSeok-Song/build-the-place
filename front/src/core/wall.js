import * as THREE from "three";
import { v4 as uuidv4 } from 'uuid';

export class Wall {

    constructor() {
        this.name = `${uuidv4()}`;
        this.mesh = new THREE.Mesh(
            new THREE.PlaneGeometry(1, 1),
            new THREE.MeshBasicMaterial({
                color: 'green',
                side: THREE.DoubleSide,
            })
        )
        this.mesh.name = `wall#${this.name}`;
        this.mesh.position.y = 0.5;
        this.rotatePos = null;

        this.setRotatePos();
        this.updatePosToRotate();
    }

    setColor(color) {

    }
    
    setRotatePos() {
        this.rotatePos = {
            0: {
                x : this.mesh.position.x ,
                z : this.mesh.position.z - 0.5
            },
            360: {
                x : this.mesh.position.x ,
                z : this.mesh.position.z - 0.5
            },
            90: {
                x : this.mesh.position.x - 0.5,
                z : this.mesh.position.z
            },
            180: {
                x : this.mesh.position.x,
                z : this.mesh.position.z + 0.5
            },
            270: {
                x : this.mesh.position.x + 0.5,
                z : this.mesh.position.z
            },
        }
    }

    updatePosToRotate() {

        const deg = Math.abs(THREE.MathUtils.radToDeg(this.mesh.rotation.y));

        if (this.rotatePos) {
            console.log(this.mesh.position);
            this.mesh.position.x = this.rotatePos[deg].x;
            this.mesh.position.z = this.rotatePos[deg].z;
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