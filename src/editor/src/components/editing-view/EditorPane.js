import React, { Suspense, useRef, useMemo, useEffect } from 'react';
import {SingleSide, MeshBasicMaterial, Vector3, Object3D} from 'three';
import '@blueprintjs/core/lib/css/blueprint.css';
import { Canvas, useFrame } from '@react-three/fiber';
import { useSelector, useDispatch } from 'react-redux';
import { Sky, OrbitControls } from "@react-three/drei";
import { terrainChunk } from './terrainChunk.js'
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

const wireframeMaterial = new MeshBasicMaterial({
  color: 0x000000,
  wireframe: true
});
const tempObject = new Object3D();
function TerrainMesh(){
  const landPatchRef = useRef();
  const cameraPosition = new Vector3(0.0, 0.0, 0.0);
  const lastUpdatePosition = new Vector3(0.0, 0.0, 0.0);
  const drawDistance = 1000.0;
  const patchSize = 100;

  //Duplicated from a-water (presently ultra cool stuff in devoplment - but I'm
  //just having too much fun trying to get land to LIFT OFF ~~~~~=> *WOOSH!*)
  //Create a set of tiles based on the draw distance if and only if those tiles
  //do not already exist or the draw distance is different.
  //Get all land patch offsets
  const maxHalfPatchesPerSide = Math.ceil((drawDistance + patchSize) / patchSize);
  const drawDistanceSquared = drawDistance * drawDistance;
  const minDistanceForUpdatedLOD = patchSize;
  let patchLODByBucketID = {};
  let landPatches = [];
  const numberOfLODs = 7;
  for(let x = -maxHalfPatchesPerSide; x < maxHalfPatchesPerSide; ++x){
    const xForID = x + maxHalfPatchesPerSide;
    for(let y = -maxHalfPatchesPerSide; y < maxHalfPatchesPerSide; ++y){
      const yForID = y + maxHalfPatchesPerSide;
      const xCoord = (x - 0.5) * patchSize;
      const yCoord = (y - 0.5) * patchSize;
      const xyDistToPlaneSquared = xCoord * xCoord + yCoord * yCoord;
      if(xyDistToPlaneSquared <= drawDistanceSquared){
        //Bit mask these into the same number to make a unique 32 bit integer id
        const bucketID = xForID | (4294901760 & (yForID * 65536));
        const distanceToPlane = Math.sqrt(xyDistToPlaneSquared);
        //Not sure why this works best when draw distance is at a 1/4. Maybe it's just the angle? But not sure...
        const tesselationFactor = Math.min(Math.max(Math.round(numberOfLODs * (1.0 - ( distanceToPlane / (patchSize * numberOfLODs) ) )), 1), numberOfLODs);
        patchLODByBucketID[bucketID] = 2 ** tesselationFactor;
      }
    }
  }

  //Get the instance count for each tile type with all down grades to enable instanced meshes
  let instanceCount = {};
  for(let x = -maxHalfPatchesPerSide; x < maxHalfPatchesPerSide; ++x){
    const xForID = x + maxHalfPatchesPerSide;
    for(let y = -maxHalfPatchesPerSide; y < maxHalfPatchesPerSide; ++y){
      const yForID = y + maxHalfPatchesPerSide;
      const xCoord = (x - 0.5) * patchSize;
      const yCoord = (y - 0.5) * patchSize;
      const xyDistToPlaneSquared = xCoord * xCoord + yCoord * yCoord;
      if(xyDistToPlaneSquared <= drawDistanceSquared){
        //Bit mask these into the same number to make a unique 32 bit integer id
        const LODID = xForID | (4294901760 & (yForID * 65536));
        const LOD = patchLODByBucketID[LODID];
        const LODTopID = xForID | (4294901760 & ((yForID + 1) * 65536));
        const LODTop = LODTopID in patchLODByBucketID ? patchLODByBucketID[LODTopID] >= LOD : true;
        const LODRightID = (xForID + 1) | (4294901760 & (yForID * 65536));
        const LODRight = LODRightID in patchLODByBucketID ? patchLODByBucketID[LODRightID] >= LOD : true;
        const LODBottomID = xForID | (4294901760 & ((yForID - 1) * 65536));
        const LODBottom = LODBottomID in patchLODByBucketID ? patchLODByBucketID[LODBottomID] >= LOD : true;
        const LODLeftID = (xForID - 1) | (4294901760 & (yForID * 65536));
        const LODLeft = LODLeftID in patchLODByBucketID ? patchLODByBucketID[LODLeftID] >= LOD : true;

        //I'm just going to presume our LODs will never be beyond 128
        //Which would have so many triangles, it would be silly.
        //We then just go down by one or stay the same, so we can add on
        //a couple of binary flags like so.
        let instanceCountID = Math.round(Math.log(LOD) / Math.log(2));
        instanceCountID += LODTop * 256;
        instanceCountID += LODRight * 512;
        instanceCountID += LODBottom * 1024;
        instanceCountID += LODLeft * 2048;
        if(!instanceCount.hasOwnProperty(instanceCountID)){
          instanceCount[instanceCountID] = 1;
        }
        else{
          instanceCount[instanceCountID]++;
        }
      }
    }
  }

  let landPatchGeometryInstances = {};
  let instanceIterations = {};
  let instanceInitPositions = {};
  let landGridInstanceKeys = [];
  let i = 0;
  for(let x = -maxHalfPatchesPerSide; x < maxHalfPatchesPerSide; ++x){
    const xForID = x + maxHalfPatchesPerSide;
    for(let y = -maxHalfPatchesPerSide; y < maxHalfPatchesPerSide; ++y){
      const yForID = y + maxHalfPatchesPerSide;
      const xCoord = (x - 0.5) * patchSize;
      const yCoord = (y - 0.5) * patchSize;
      const xyDistToPlaneSquared = xCoord * xCoord + yCoord * yCoord;
      if(xyDistToPlaneSquared <= drawDistanceSquared){
        //Bit mask these into the same number to make a unique 32 bit integer id
        const LOD = patchLODByBucketID[xForID | (4294901760 & (yForID * 65536))];
        const LODTopID = xForID | (4294901760 & ((yForID + 1) * 65536));
        const LODTop = LODTopID in patchLODByBucketID ? patchLODByBucketID[LODTopID] >= LOD : true;
        const LODRightID = (xForID + 1) | (4294901760 & (yForID * 65536));
        const LODRight = LODRightID in patchLODByBucketID ? patchLODByBucketID[LODRightID] >= LOD : true;
        const LODBottomID = xForID | (4294901760 & ((yForID - 1) * 65536));
        const LODBottom = LODBottomID in patchLODByBucketID ? patchLODByBucketID[LODBottomID] >= LOD : true;
        const LODLeftID = (xForID - 1) | (4294901760 & (yForID * 65536));
        const LODLeft = LODLeftID in patchLODByBucketID ? patchLODByBucketID[LODLeftID] >= LOD : true;

        let instanceCountID = Math.round(Math.log(LOD) / Math.log(2));
        instanceCountID += LODTop * 256;
        instanceCountID += LODRight * 512;
        instanceCountID += LODBottom * 1024;
        instanceCountID += LODLeft * 2048;
        if(!instanceIterations.hasOwnProperty(instanceCountID)){
          landGridInstanceKeys.push(instanceCountID);
          const geometry = terrainChunk(patchSize, LOD, LODTop, LODRight, LODBottom, LODLeft);
          const instanceMeshKey = "instance-terrain-element-" + instanceCountID;
          landPatches.push(
            <instancedMesh
            key={instanceMeshKey}
            args={[geometry, wireframeMaterial.clone(), instanceCount[instanceCountID]]}
            userData={{
              instanceCount: instanceCount[instanceCountID],
              lodID: instanceCountID
            }}
            ></instancedMesh>
          );
          instanceIterations[instanceCountID] = true;
          instanceInitPositions[instanceCountID] = [];
        }
        instanceInitPositions[instanceCountID].push([xCoord, 0.0, yCoord]);
      }
    }
  }

  useFrame((state, delta, xrFrame) => {
    //Get the current active camera positiontempObject
    const cameraPosition = state.camera.position;
    if (!landPatchRef || !landPatchRef.current){
      return false;
    }
    const landPatches = landPatchRef.current.children;

    //Set the positions for these tiles based on our position switching between tile
    //center and tile edge as we move so that we can't sit on an edge that flips back
    //and forth. Instead, as we hit an edge, the bounderies for the transition swap over
    //by half a tile so that nothing updates until we hit that next shifted boundery
    //minimizing the number of position changes.
    for(const landPatch of landPatches){
      const count = landPatch.userData.instanceCount;
      const meshID = landPatch.userData.lodID;
      const initPositions = instanceInitPositions[meshID];
      const xPos = initPositions[0];
      const yPos = initPositions[1];
      const zPos = initPositions[2];
      for (let i = 0; i < count; i++) {
        const position = initPositions[i];
        //position
        tempObject.position.set(
          position[0],
          position[1],
          position[2]
        );
        tempObject.updateMatrix();
        landPatch.setMatrixAt(i, tempObject.matrix);
      }
    }
  });

  return (<group ref={landPatchRef}>
    {landPatches}
  </group>);
}

function setupCanvas(shadowsEnabled, props, cameraControlsRef){
  if(shadowsEnabled){
    return(
      <Canvas shadowsEnabled id="editor-canvas" concurrent>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <OrbitControls enablePan={true} enableRotate={true} far={100000} />
        {updateEnvironment(props)}
        <TerrainMesh />
      </Canvas>
    );
  }
  else{
    return(
      <Canvas id="editor-canvas">
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <OrbitControls enablePan={true} enableRotate={true} far={100000} />
        {updateEnvironment(props)}
        <TerrainMesh />
      </Canvas>
    );
  }
}

export default function EditorPane(){
  const dispatch = useDispatch();
  const shadowsEnabled = true;
  const waterEnabled = true;
  const skyEnabled = true;
  const cameraControlsRef = useRef();

  const props = {
    waterEnabled: waterEnabled,
    skyEnabled: skyEnabled
  };

  return(
    <div id="editor-canvas-holder">
      <Suspense fallback={null}>
        {setupCanvas(shadowsEnabled, props, cameraControlsRef)}
      </Suspense>
    </div>
  );
}
