import * as THREE from "three";

export class Floor {

    constructor(renderer, group) {

        this.group      = group;
        this.blocks     = [];
        this.lines      = [];
        this.renderer   = renderer;
        this.x          = 0;
        this.y          = 0;

        this.makeBlock(0, 0);
    }

    makeBlock(x, y) {
        const planeGeometry = new THREE.PlaneGeometry(1, 1);
        const planeMesh = new THREE.MeshStandardMaterial({
            color: 'white'
        });

        const floorMesh = new THREE.Mesh( planeGeometry, planeMesh );
        const edges = new THREE.EdgesGeometry( planeGeometry );
        const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );

        line.name = `${x}-${y}`;
        line.rotation.x = -Math.PI/2;
        line.position.x = x;
        line.position.z = y;

        floorMesh.name = `${x}-${y}`;
        floorMesh.rotation.x = -Math.PI/2;
        floorMesh.receiveShadow = true;
        floorMesh.position.x = x;
        floorMesh.position.z = y;

        this.lines[line.name] = line;
        this.blocks[floorMesh.name] = floorMesh;

        this.group.add(this.blocks[floorMesh.name]);
        this.group.add(this.lines[line.name]);
    }

    deleteBlock(x, y) {
      
        this.blocks[`${x}-${y}`].geometry.dispose();
        this.blocks[`${x}-${y}`].material.dispose();

        this.lines[`${x}-${y}`].geometry.dispose();
        this.lines[`${x}-${y}`].material.dispose();
        
        // this.scene.remove(this.blocks[`${x}-${y}`]);
        // this.scene.remove(this.lines[`${x}-${y}`]);

        this.group.remove(this.blocks[`${x}-${y}`]);
        this.group.remove(this.lines[`${x}-${y}`]);

        this.renderer.renderLists.dispose();
    }

    sizeUpX() {
        if (this.x < 999) {
            this.x += 1;

            for (let i = 0; i < this.y+1; i++) {
                this.makeBlock(this.x, i);
            }
        }
    }

    sizeUpY() {
        if (this.y < 999) {
            this.y += 1;

            for (let i = 0; i < this.x+1; i++) {
                this.makeBlock(i, this.y);
            }
        }
    }

    sizeDownX() {
        console.log(this.x);
        if (this.x > 0) {
            for (let i = 0; i < this.y+1; i++) {
                this.deleteBlock(this.x, i);
            }
            this.x -= 1;
            console.log(this.x);
        }
    }

    sizeDownY() {
        if (this.y > 0) {
            for (let i = 0; i < this.x+1; i++) {
                this.deleteBlock(i, this.y);
            }
            this.y -= 1;
        }
    }

    sizeUpArangeX(x) {
        for (let i = 0; i < x; i++) {
            this.sizeUpX()
        }
    }

    sizeUpArangeY(y) {
        for (let i = 0; i < y; i++) {
            this.sizeUpY()
        }
    }

    sizeDownArangeX(x) {
        for (let i = 0; i < x; i++) {
            this.sizeDownX()
        }
    }

    sizeDownArangeY(y) {
        for (let i = 0; i < y; i++) {
            this.sizeDownY()
        }
    }

    sizeChangeX(changeX) {

        console.log("sizeChange");

        if (this.x > changeX) {
            const temp = this.x - changeX;
            this.sizeDownArangeX(temp);

        }
        else if (this.x < changeX) {
            const temp = changeX - this.x;
            this.sizeUpArangeX(temp);

        }
        this.x = changeX;
    }

    sizeChangeY(changeY) {

        console.log("sizeChange");

        if (this.y > changeY) {
            const temp = this.y - changeY;
            this.sizeDownArangeY(temp);

        }
        else if (this.y < changeY) {
            const temp = changeY - this.y;
            this.sizeUpArangeY(temp);

        }
        this.y = changeY;
    }

    getCenterPos() {

        const xPos = Math.ceil(this.x / 2);
        const yPos = Math.ceil(this.y / 2);

        return new THREE.Vector3(xPos, 0, yPos);

    }

    getSize() {
        return new THREE.Vector2(this.x+1, this.y+1);
    }
}