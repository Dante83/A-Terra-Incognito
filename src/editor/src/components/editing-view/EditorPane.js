import React, { Suspense, useRef, useMemo, useEffect } from 'react';
import '@blueprintjs/core/lib/css/blueprint.css';
import { Canvas } from '@react-three/fiber';
import { TerrainMesh } from './TerrainMesh.js';
import { useSelector, useDispatch } from 'react-redux';
import { Sky, OrbitControls } from "@react-three/drei";
import { selectActiveTool } from '../../application/js/features/landEditorSlice.js';
import './EditorPane.css'

function addObjects(){
  //Go over the object graph of the scene and see which objects are
  //within the draw distance and draw them if they are visible

  //If the object happens to be selected for modification, draw the modifier values
  //for movement or scaling
}

function updateEnvironment(props){
  if(props.skyEnabled){
    return <Sky
             distance={5000}
             sunPosition={[5, 1, 8]}
             inclination={0}
             azimuth={0.25}
         />;
  }
}

function setupCanvas(shadowsEnabled, props){
  if(shadowsEnabled){
    return(
      <Canvas shadowsEnabled id="editor-canvas" concurrent>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <OrbitControls enablePan={props.orbitControlsEnabled} enableRotate={props.orbitControlsEnabled} />
        {updateEnvironment(props)}
        <TerrainMesh activeTool={props.activeTool} />
      </Canvas>
    );
  }
  else{
    return(
      <Canvas id="editor-canvas" concurrent>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <OrbitControls enablePan={props.orbitControlsEnabled} enableRotate={props.orbitControlsEnabled} />
        {updateEnvironment(props)}
        <TerrainMesh activeTool={props.activeTool} />
      </Canvas>
    );
  }
}

export default function EditorPane(){
  const dispatch = useDispatch();
  const activeToolName = useSelector(selectActiveTool);
  const shadowsEnabled = true;
  const waterEnabled = true;
  const skyEnabled = true;
  const orbitControlsEnabled = activeToolName === 'move';

  const props = {
    waterEnabled: waterEnabled,
    skyEnabled: skyEnabled,
    orbitControlsEnabled: orbitControlsEnabled,
    activeTool: activeToolName
  };

  return(
    <div id="editor-canvas-holder">
      <Suspense fallback={null}>
        {setupCanvas(shadowsEnabled, props)}
      </Suspense>
    </div>
  );
}
