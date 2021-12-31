import React from 'react';
import '@blueprintjs/core/lib/css/blueprint.css';
import { Canvas } from '@react-three/fiber';
import { useSelector, useDispatch } from 'react-redux';
import './EditorPane.css'

export default function EditorPane(){
  const dispatch = useDispatch();

  return(
    <div id="editor-canvas-holder">
      <Canvas id="editor-canvas">
      </Canvas>
    </div>
  );
}
