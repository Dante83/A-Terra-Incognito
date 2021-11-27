import React, { useRef, Component } from 'react';
import { useFrame } from '@react-three/fiber';

export default function PreviewImage(props) {
  // This reference will give us direct access to the THREE.Mesh object
  const mesh = useRef();

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (mesh.current.rotation.y += 0.0));

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={5.0}>
      <planeGeometry args={[2.0, 2.0, 256, 256]} />
      <meshStandardMaterial color={'orange'} />
    </mesh>
  )
}
