import React, { useRef, Component } from 'react';
import { store } from '../../application/js/Store.js';
import { useSelector, useDispatch } from 'react-redux';
import { changePreviewObject, toggleIsRotating, selectCurrentPreviewPaneObject, selectIsPreviewPaneObjectRotating } from '../../application/js/features/previewPaneSlice.js';
import { Canvas } from '@react-three/fiber';
import {HTMLSelect} from "@blueprintjs/core";
import Cube from './preview-objects/PreviewCube.js';
import Sphere from './preview-objects/PreviewSphere.js';
import Plane from './preview-objects/PreviewPlane.js';
import Image from './preview-objects/PreviewImage.js';
import './PreviewPane.css';

const previewObjectOptions = ['Cube', 'Sphere', 'Plane', 'Image'];

function previewObject(activePreviewObject, isRotating){
  switch(activePreviewObject){
    case 'cube':
      return <Cube position={[0, 0, -3]} isRotating={isRotating} />;
    case 'sphere':
      return <Sphere position={[0, 0, -3]} isRotating={isRotating} />;
    case 'plane':
      return <Plane position={[0, 0, -3]} isRotating={isRotating} />;
    case 'Image':
      return <Image position={[0, 0, -3]} isRotating={isRotating} />;
    default :
      //Default to nothing, better to have an empty space if we
      //can't show anything at all
      return null;
  }
}

export default function PreviewPane(){
  const state = store.getState();
  const isRotating = useSelector(selectIsPreviewPaneObjectRotating);
  const activePreviewObject = useSelector(selectCurrentPreviewPaneObject);
  const dispatch = useDispatch();
  let pausePreviewButtonClasses;
  let playPreviewButtonClasses;
  if(isRotating){
    playPreviewButtonClasses = "bp3-button bp3-intent-primary hidden";
    pausePreviewButtonClasses = "bp3-button bp3-intent-warning";
  }
  else{
    playPreviewButtonClasses = "bp3-button bp3-intent-primary";
    pausePreviewButtonClasses = "bp3-button bp3-intent-warning hidden";
  }

  return(
    <div id="shader-preview-panel">
      <section id="shader-preview-flex-container">
        <header id="shader-preview-header">
          <h5 class="bp3-heading">Material Preview</h5>
        </header>
        <Canvas id="shader-preview">
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          {previewObject(activePreviewObject, isRotating)}
        </Canvas>
        <footer id="shader-preview-footer">
          <div id="footer-flexbox-container">
            <div id="preview-object-select-box" class="bp3-html-select">
              <select value={activePreviewObject} onChange={(e)=>dispatch(changePreviewObject(e.target.value))}>
                <option value="cube">Cube</option>
                <option value="sphere">Sphere</option>
                <option value="plane">Plane</option>
                <option value="image">Image</option>
              </select>
              <span class="bp3-icon bp3-icon-double-caret-vertical"></span>
            </div>
            <div id="preview-play-pause-buttons">
              <button className={pausePreviewButtonClasses} id="pause-preview-button" onClick={(e)=>dispatch(toggleIsRotating(false))}>
                  <span class="bp3-icon bp3-icon-pause" icon="pause"></span>
              </button>
              <button className={playPreviewButtonClasses} id="pause-preview-button" onClick={(e)=>dispatch(toggleIsRotating(true))}>
                <span class="bp3-icon bp3-icon-play" icon="play"></span>
              </button>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
}
