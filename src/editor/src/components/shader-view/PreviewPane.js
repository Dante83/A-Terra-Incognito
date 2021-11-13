import React, { useRef, Component } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {HTMLSelect} from "@blueprintjs/core";
import './PreviewPane.css';

function Box(props) {
  // This reference will give us direct access to the THREE.Mesh object
  const mesh = useRef();

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (mesh.current.rotation.y += 0.01));

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={5.0}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'orange'} />
    </mesh>
  )
}

const previewObjectOptions = ['Cube', 'Sphere', 'Plane', 'Image'];

export default class PreviewPane extends Component {
  render(){return(
    <div id="shader-preview-panel">
      <section id="shader-preview-flex-container">
        <header id="shader-preview-header">
          <h5 class="bp3-heading">Material Preview</h5>
        </header>
        <Canvas id="shader-preview">
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Box position={[0, 0, -3]} />
        </Canvas>
        <footer id="shader-preview-footer">
          <div id="footer-flexbox-container">
            <div id="preview-object-select-box" class="bp3-html-select">
              <select>
                <option value="cube" selected>Cube</option>
                <option value="sphere">Sphere</option>
                <option value="plane">Plane</option>
                <option value="image">Image</option>
              </select>
              <span class="bp3-icon bp3-icon-double-caret-vertical"></span>
            </div>
            <div id="preview-play-pause-buttons">
              <button class="bp3-button bp3-intent-warning" id="pause-preview-button">
                <span class="bp3-icon bp3-icon-pause" icon="pause"></span>
              </button>
              <button class="bp3-button bp3-intent-primary" id="pause-preview-button">
                <span class="bp3-icon bp3-icon-play" icon="play"></span>
              </button>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );}
}
