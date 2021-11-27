import React, { useRef, Component } from 'react';
import { DoubleSide } from 'three';
import { useFrame } from '@react-three/fiber';

export default function Plane(props) {
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
      <planeGeometry args={[1.25, 1.25, 256, 256]} />
      <meshStandardMaterial color={'orange'} side={DoubleSide} />
    </mesh>
  )
}
