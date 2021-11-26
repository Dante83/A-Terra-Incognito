import React, { useRef, Component } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Plane(props) {
  // This reference will give us direct access to the THREE.Mesh object
  const mesh = useRef();

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={5.0}>
      <planeGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'orange'} />
    </mesh>
  )
}
