import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changePreviewObject, toggleIsRotating, selectCurrentPreviewPaneObject, selectIsPreviewPaneObjectRotating } from '../../application/js/features/previewPaneSlice.js';
import { Canvas } from '@react-three/fiber';
import Cube from './preview-objects/PreviewCube.js';
import Sphere from './preview-objects/PreviewSphere.js';
import Plane from './preview-objects/PreviewPlane.js';
import PreviewImage from './preview-objects/PreviewImage.js';
import './PreviewPane.css';

function previewObject(activePreviewObject, isRotating){
  switch(activePreviewObject){
    case 'cube':
      return <Cube position={[0, 0, -3]} isRotating={isRotating} />;
    case 'sphere':
      return <Sphere position={[0, 0, -3]} isRotating={isRotating} />;
    case 'plane':
      return <Plane position={[0, 0, -3]} isRotating={isRotating} />;
    case 'image':
      return <PreviewImage position={[0, 0, -3]} />;
    default :
      //Default to nothing, better to have an empty space if we
      //can't show anything at all
      return null;
  }
}

export default function PreviewPane(){
  const isRotating = useSelector(selectIsPreviewPaneObjectRotating);
  const activePreviewObject = useSelector(selectCurrentPreviewPaneObject);
  const dispatch = useDispatch();
  let pausePreviewButtonClasses;
  let playPreviewButtonClasses;
  if(activePreviewObject === "image"){
    playPreviewButtonClasses = "bp3-button bp3-intent-primary hidden";
    pausePreviewButtonClasses = "bp3-button bp3-intent-warning hidden";
  }
  else if(isRotating){
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
          <h5 className="bp3-heading">Material Preview</h5>
        </header>
        <Canvas id="shader-preview">
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          {previewObject(activePreviewObject, isRotating)}
        </Canvas>
        <footer id="shader-preview-footer">
          <div id="footer-flexbox-container">
            <div id="preview-object-select-box" className="bp3-html-select .modifier">
              <select defaultValue={activePreviewObject} onChange={(e)=>dispatch(changePreviewObject(e.target.value))}>
                <option value="cube">Cube</option>
                <option value="sphere">Sphere</option>
                <option value="plane">Plane</option>
                <option value="image">Image</option>
              </select>
              <span className="bp3-icon bp3-icon-double-caret-vertical"></span>
            </div>
            <div id="preview-play-pause-buttons">
              <button className={pausePreviewButtonClasses} id="pause-preview-button" onClick={(e)=>dispatch(toggleIsRotating(false))}>
                  <span className="bp3-icon bp3-icon-pause" icon="pause"></span>
              </button>
              <button className={playPreviewButtonClasses} id="pause-preview-button" onClick={(e)=>dispatch(toggleIsRotating(true))}>
                <span className="bp3-icon bp3-icon-play" icon="play"></span>
              </button>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
}
