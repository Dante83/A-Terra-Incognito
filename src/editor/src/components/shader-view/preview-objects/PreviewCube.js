import React, { useRef, Component } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Cube(props) {
  // This reference will give us direct access to the THREE.Mesh object
  const mesh = useRef();

  // Subscribe this component to the render-loop, rotate the mesh every frame
  const rotationVelocity = props.isRotating ? 0.01 : 0.0;
  useFrame((state, delta) => (mesh.current.rotation.y += rotationVelocity));

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={5.0}>
      <boxGeometry args={[1, 1, 1, 256, 256, 256]} />
      <meshStandardMaterial color={'orange'} />
    </mesh>
  )
}
