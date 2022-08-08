import * as THREE from "three";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";

export class Controller {

    constructor(camera, elem, canvas, group, floor, cb) {

        this.camera             = camera;
        this.floor              = floor;
        this.clock              = new THREE.Clock();
        this.controls           = new PointerLockControls(camera, elem);
        this.mouse              = new THREE.Vector2();
        this.raycaster          = new THREE.Raycaster();
        this.canvas             = canvas;
        this.selectMesh         = null;
        this.clickPoint         = new THREE.Vector2();
        this.group              = group;
        this.keys               = [];
        this.editMode           = true;
        this.isPressed          = false;
        this.positionOption     = false;
        this.isRightButton      = false;
        this.cb                 = cb;

        this.controls.domElement.addEventListener('click', () => {
            if (!this.editMode) {
                this.controls.lock();
            }
        })
        this.controls.addEventListener('lock', () => {
            console.log('lock');
        })
        this.controls.addEventListener('unlock', () => {
            console.log('unlock');
        })

        window.addEventListener('keydown', e => {
            this.keys[e.code] = true;
        })
        window.addEventListener('keyup', e => {
            delete this.keys[e.code];
        })

        this.canvas.addEventListener('contextmenu', e => {
            e.preventDefault();
        });

        this.canvas.addEventListener('mousedown', e => {
            if (this.editMode) {
                e = e || window.event;

                if ("which" in e) {
                    // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
                    this.isRightButton = e.which === 3; 
                }    
                else if ("button" in e){
                    // IE, Opera 
                    this.isRightButton = e.button === 2; 
                }
                this.isPressed = true;
                this.calculateMousePosition(e);
                this.clickPoint.x = e.clientX;
                this.clickPoint.y = e.clientY;

            }

            if (this.selectMesh) {
                this.selectMesh = null;
            }

        });
        this.canvas.addEventListener('mouseup', () => {
            console.log("mouseup");
            if (this.editMode) {
                this.isPressed = false;
                if (!this.isRightButton && this.selectMesh) {
                    this.endMovePosition(this.selectMesh.mesh);
                }
            }

            
        });
        this.canvas.addEventListener('mousemove', e => {
            if (this.editMode) {
                this.calculateMousePosition(e);
                if (this.isPressed && !this.isRightButton && this.selectMesh) {
                    this.movePosition(this.selectMesh.mesh);
                }
            }
        });

        this.canvas.addEventListener("wheel", e => {
            if (e.deltaY > 0) {
                console.log("unzoom");
                this.unZoom();
            } else {
                console.log("zoom");
                this.zoom();
            }
        });        
    }

    setColorRed(x, y) {
        const check = this.group.getObjectByName(`${x}-${y}`);
        if (check) {
            check.material.color.set('red');
        }
    }

    setColorBlue(x, y) {
        const check = this.group.getObjectByName(`${x}-${y}`)
        if (check) {
            check.material.color.set("blue");
        }
    }

    setColorWhite(x, y) {
        const check = this.group.getObjectByName(`${x}-${y}`);
        if (check) {
            check.material.color.set("white");
        }
    }

    changeFloorColor(mesh) {

        // console.log(mesh.position.x, mesh.position.y);

        const x = mesh.scale.x;
        const y = mesh.scale.z;

        let posX = mesh.position.x;
        let posY = mesh.position.z;

        if (Number.isInteger(posX)) {
            // 홀수
            for (let i = 0; i < y; i++) {

                this.setColorBlue(posX, posY + i - ((y/2) - 0.5));

                for(let j = 0; j < x / 2; j++) {
                    this.setColorBlue(posX + j, posY + i - ((y/2) - 0.5));
                    this.setColorBlue(posX - j, posY + i - ((y/2) - 0.5));
                }
            }
        }
        else {
            // 짝수
            for (let i = 0; i < y; i++) {

                for(let j = 0; j < x / 2; j++) {
                    this.setColorBlue((posX + j + 0.5), posY + i - ((y/2) - 0.5));
                    this.setColorBlue((posX - j - 0.5), posY + i - ((y/2) - 0.5));
                }
            }
        }
    }

    revertFloorColor(mesh) {

        const x = mesh.scale.x;
        const y = mesh.scale.z;

        let posX = mesh.position.x;
        let posY = mesh.position.z;

        if (Number.isInteger(posX)) {

            for (let i = 0; i < y; i++) {

                this.setColorWhite(posX, posY + i);

                for(let j = 0; j < x / 2; j++) {

                    this.setColorWhite(posX + j, posY + i - ((y/2) - 0.5));
                    this.setColorWhite(posX - j, posY + i - ((y/2) - 0.5));
                }
            }
        }
        else {

            for (let i = 0; i < y; i++) {

                for(let j = 0; j < x / 2; j++) {
                    this.setColorWhite((posX + j + 0.5), posY + i - ((y/2) - 0.5));
                    this.setColorWhite((posX - j - 0.5), posY + i - ((y/2) - 0.5));
                }
            }
        }
    }

    dropToPosPossible() {

    }

    movePosition(mesh) {
        console.log(mesh);
        this.selectMesh.mesh.position.y = 2;

        // todo: 다시 구현 움직임이 너무 어색함.

        this.revertFloorColor(mesh);

        if (mesh.scale.x % 2 === 0) {

            const dir = Math.round(this.raycaster.ray.origin.x) + 0.5

            if (this.movePossibleX(dir)) {
                mesh.position.x = dir;
            }
        }
        else {
            const dir = Math.round(this.raycaster.ray.origin.x);

            if (this.movePossibleX(dir)) {
                mesh.position.x = dir;
            }
        }

        if (mesh.scale.z % 2 === 0) {
            const dir = Math.round(this.raycaster.ray.origin.z) + 0.5

            if (this.movePossibleY(dir)) {
                mesh.position.z = dir;
            }
            
        }
        else {
            const dir = Math.round(this.raycaster.ray.origin.z);
            
            if (this.movePossibleY(dir)) {
                mesh.position.z = dir;
            }
        }

        this.changeFloorColor(mesh);
    }

    movePossibleX(x) {
        const floorSize = this.floor.getSize();

        if (x >= floorSize.x || x < 0) {
            return false;
        }
        return true;
    }

    movePossibleY(y) {
        const floorSize = this.floor.getSize();

        if (y >= floorSize.y || y < 0) {
            return false;
        }
        return true;
    }

    endMovePosition(mesh) {
        mesh.position.y = 0.5;
        this.revertFloorColor(mesh);
        if (this.selectMesh.mesh.name.split('#')[0] === "wall") {
            this.selectMesh.setRotatePos();
            this.selectMesh.updatePosToRotate();
        }
    }

    zoom() {
        this.camera.zoom += 0.01;
        this.camera.updateProjectionMatrix();
    }

    unZoom() {
        this.camera.zoom -= 0.01;
        this.camera.updateProjectionMatrix();
    }

    calculateMousePosition(e) {
        this.mouse.x = e.clientX / this.canvas.clientWidth * 2 - 1;
        this.mouse.y = -(e.clientY / this.canvas.clientHeight * 2 - 1);
    }

    rayCasting(meshes) {
        
        this.raycaster.setFromCamera(this.mouse, this.camera);
	    this.checkIntersects(meshes);
        
    }

    checkIntersects(meshes) {

        let array = [];

        for (const item in meshes) {
            array.push(meshes[item].mesh);
        }
        const intersects = this.raycaster.intersectObjects(array);

        if (this.selectMesh) {
            return;
        }

        if (intersects.length > 0) {
            for (const item of intersects) {
                let obj = item.object;
                while(true) {
                    if (obj.parent.name !== "renderGroup") {
                        obj = obj.parent;
                    }
                    else {
                        break;
                    }
                }
                
                this.selectMesh = meshes[obj.name.split('#')[1]];
                this.cb(this.selectMesh);
                break;
            }
        }
    }

    rotateCamera(delta) {
        this.camera.rotation.y += delta;
    }

    setModeToggle() {
        this.editMode = !this.editMode;
    }

    updateController(meshes) {

        const delta = this.clock.getDelta();

        if (this.isPressed) {
            this.rayCasting(meshes);
        }

        if (this.keys['KeyW']) {
            console.log("press w");
            this.controls.moveForward(0.1);
        }
        if(this.keys['KeyA']) {
            console.log("press a");
            this.controls.moveRight(-0.1);

        }
        if(this.keys['KeyS']) {
            console.log("press s");
            this.controls.moveForward(-0.1);
        }
        if(this.keys['KeyD']) {
            console.log("press d");
            this.controls.moveRight(0.1);
        }

        if (this.keys['KeyQ']) {
            this.rotateCamera(delta);
            
        }

        if (this.keys['KeyE']) {
            this.rotateCamera(-delta);
        }

    }

}