import { useEffect } from 'react'
import * as THREE from 'three'
import SceneInit from './lib/SceneInit';
import {GUI} from "dat.gui";

function App() {

  useEffect(() => {
    const project = new SceneInit('myThreeJsCanvas');
    project.initialize();
    project.animate();



    if(!project.scene) {
      return
    }

    const gui = new GUI()

    for (let i = 0; i < 3; i++) {
      const boxGeometry = new THREE.BoxGeometry(24, 24, 24);
      const boxMaterial = new THREE.MeshPhongMaterial({color: 0xff0000 * Math.random()});
      const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
      boxMesh.position.x = 24 * i * 2;

      project.scene.add(boxMesh);

      const boxFolder = gui.addFolder(`Mesh Box ${i}`)

      const geometryFolder = boxFolder.addFolder(`Mesh Geometry`);
      geometryFolder.open()

      const rotationFolder = geometryFolder.addFolder('Rotation')

      rotationFolder.add(boxMesh.rotation, 'x', 0, Math.PI).name('Rotate X Axis');
      rotationFolder.add(boxMesh.rotation, 'y', 0, Math.PI).name('Rotate Y Axis');
      rotationFolder.add(boxMesh.rotation, 'z', 0, Math.PI).name('Rotate Z Axis');

      const scaleFolder = geometryFolder.addFolder('Scale')

      scaleFolder.add(boxMesh.scale, 'x', 0, 2).name('Scale X Axis');
      scaleFolder.add(boxMesh.scale, 'y', 0, 2).name('Scale Y Axis');
      scaleFolder.add(boxMesh.scale, 'z', 0, 2).name('Scale Z Axis');
      scaleFolder.open();

      const materialFolder = boxFolder.addFolder(`Mesh Material`);

      const materialParams = {
        boxMeshColor: boxMesh.material.color.getHex(),
      }

      materialFolder.add(boxMesh.material, 'wireframe');

      materialFolder
        .addColor(materialParams, 'boxMeshColor')
        .onChange((value) => boxMesh.material.color.set(value))
    }
  }, [])

  return (
      <canvas id="myThreeJsCanvas"/>
  )
}

export default App
