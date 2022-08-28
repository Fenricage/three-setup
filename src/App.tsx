import { useEffect } from 'react'
import * as THREE from 'three'
import SceneInit from './lib/SceneInit';

function App() {

  useEffect(() => {
    const project = new SceneInit('myThreeJsCanvas');
    project.initialize();
    project.animate();



    if(!project.scene) {
      return
    }

    const boxGeometry = new THREE.BoxGeometry(1, 1, 1, 1, 16);
    const boxMaterial = new THREE.MeshNormalMaterial({wireframe: true});
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    boxMesh.position.x = -1;
    project.scene.add(boxMesh);

    const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 6, 16);
    const cylinderMaterial = new THREE.MeshNormalMaterial({wireframe: true})
    const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinderMesh.position.x = 1;
    project.scene.add(cylinderMesh);
  }, [])

  return (
      <canvas id="myThreeJsCanvas"/>
  )
}

export default App
