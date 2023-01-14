import React, { Suspense } from 'react';
import '@blueprintjs/core/lib/css/blueprint.css';
import { Canvas, useFrame } from '@react-three/fiber';
import { useSelector, useDispatch } from 'react-redux';
import './EditorPane.css'

function addObjects(){
  //Go over the object graph of the scene and see which objects are
  //within the draw distance and draw them if they are visible

  //If the object happens to be selected for modification, draw the modifier values
  //for movement or scaling
}

function setupCanvas(shadowsEnabled){
  if(shadowsEnabled){
    return(
      <Canvas shadowsEnabled id="editor-canvas">
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      </Canvas>
    );
  }
  else{
    return(
      <Canvas id="editor-canvas">
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      </Canvas>
    );
  }
}

export default function EditorPane(){
  const dispatch = useDispatch();
  const shadowsEnabled = true;

  return(
    <div id="editor-canvas-holder">
      <Suspense fallback={null}>
        {setupCanvas(shadowsEnabled)}
      </Suspense>
    </div>
  );
}
