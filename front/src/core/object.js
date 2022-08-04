import * as THREE from "three";

export class Objects {
    constructor(group) {
        this.meshes = [];
        this.group = group;
    }

    createCircle() {

    }

    createBox() {
        const boxMesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({
                color: 'blue'
            })
        )
        boxMesh.name = 'box';
        boxMesh.position.y = 0.5;
        this.meshes["box"] = boxMesh;
        this.group.add(this.meshes["box"]);
    }

    createWall() {

    }

    createObject(name, loader) {
        
        const loadData = loader.getData(name);

        if (!loadData) {
            return;
        }

        // 씬이 있는지 체크
        if (loadData.isGroup === true && loadData.isObject3D === true) {

            this.meshes[name] = loadData;
            this.meshes[name].position.y = 0.5;
            this.meshes[name].scale.set(1, 1, 1);
            this.meshes[name].name = name
            this.group.add(this.meshes[name]);
            console.log(this.meshes[name]);
            return;
        }

        // 씬이 없으면 촤일드 체크
        if(loadData.hasOwnProperty('scene')) {
            
            this.meshes[name] = loadData.scene;
            this.meshes[name].position.y = 0.5;
            this.meshes[name].scale.set(1, 1, 1);
            this.meshes[name].name = name
            this.group.add(this.meshes[name]);
            console.log(this.meshes[name]);
            return;
        }
        // 그래도 없으면 에러 처리
    }

}