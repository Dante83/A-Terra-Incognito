import React, { Suspense } from 'react';
import '@blueprintjs/core/lib/css/blueprint.css';
import { Canvas, useFrame } from '@react-three/fiber';
import { useSelector, useDispatch } from 'react-redux';
import { Sky } from "@react-three/drei";
import './EditorPane.css'

function addObjects(){
  //Go over the object graph of the scene and see which objects are
  //within the draw distance and draw them if they are visible

  //If the object happens to be selected for modification, draw the modifier values
  //for movement or scaling
}

function setupEnvironment(props){
  if(props.skyEnabled){
    return <Sky
             distance={450000}
             sunPosition={[5, 1, 8]}
             inclination={0}
             azimuth={0.25}
             {...props}
         />;
  }
}

function setupCanvas(shadowsEnabled, props){
  if(shadowsEnabled){
    return(
      <Canvas shadowsEnabled id="editor-canvas">
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        {setupEnvironment(props)}
      </Canvas>
    );
  }
  else{
    return(
      <Canvas id="editor-canvas">
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        {setupEnvironment(props)}
      </Canvas>
    );
  }
}

export default function EditorPane(){
  const dispatch = useDispatch();
  const shadowsEnabled = true;
  const waterEnabled = true;
  const skyEnabled = true;
  const props = {
    waterEnabled: waterEnabled,
    skyEnabled: skyEnabled
  }

  return(
    <div id="editor-canvas-holder">
      <Suspense fallback={null}>
        {setupCanvas(shadowsEnabled, props)}
      </Suspense>
    </div>
  );
}
