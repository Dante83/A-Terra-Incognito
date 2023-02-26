import React, { Suspense, useRef, useMemo, useEffect } from 'react';
import {SingleSide, MeshBasicMaterial, Vector3, Vector2, Raycaster,
Object3D, WebGLRenderTarget, NearestFilter, FloatType} from 'three';
import { getHeightMap, setRenderer, getIsRendererSet, paintPoint,
paintLine, paintCurve  } from '../js/editor/height-map-renderer.js';
import { useFrame } from '@react-three/fiber';
import { terrainChunk } from './terrainChunk.js'
import { useSelector, useDispatch } from 'react-redux';
import { selectActiveTool } from '../../application/js/features/landEditorSlice.js';

const wireframeMaterial = new MeshBasicMaterial({
  color: 0x000000,
  wireframe: true
});
// const paintHeightMapPointMaterial;
// const paintHeightMapPathMaterial;
const webGLFloatRenderTargetOptions = {
  minificationFilter: NearestFilter,
  magnificationFilter: NearestFilter,
  depthBuffer: false
};
const webGLRenderTargetOptions = {
  type: FloatType,
  ...webGLFloatRenderTargetOptions
};
let textureIDMap1 = new WebGLRenderTarget(4096, 4096, webGLRenderTargetOptions);
let textureIDMap2 = new WebGLRenderTarget(4096, 4096, webGLRenderTargetOptions);
let texturePercentMap1 = new WebGLRenderTarget(4096, 4096, webGLRenderTargetOptions);
let texturePercentMap2 = new WebGLRenderTarget(4096, 4096, webGLRenderTargetOptions);

let activeToolName;
let paintPressureFallOff = 1.0;
const tempObject = new Object3D();
const patchSize = 50;
const cameraViewVector = new Vector3();
let cameraOffsetXOld = 0.0;
let cameraOffsetZOld = 0.0;
const centralViewVector = new Vector2();
const cameraRaycaster = new Raycaster();
const mouseVector = new Vector2();
const mouseRaycaster = new Raycaster();
const paintPoints = new Float32Array(7 * 3);
let paintPointsPtr = 0;
const maskMap = new Uint8Array(4 * 4096 * 4096);
const heightMap = new Float32Array(4 * 4096 * 4096);
let canvasRef = false;
let mouseDown;
let lastMouseState = false;
let couldBeLine;
let mouseDownTime;
let mouseUpTime;
let firstMousePosition;
let lastMousePosition;
let mousePosition = new Vector2();
let textureMaps = [];
for(let i = 0; i < 64; ++i){
  textureMaps.push(new Uint8Array(4 * 4096 * 4096));
}
export function TerrainMesh(props){
  const landPatchRef = useRef();
  const drawDistance = 5000.0;
  activeToolName = props.activeTool;

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

  useEffect(() => {
    document.getElementById('editor-canvas').addEventListener('mousedown', (event) => {
      if(event.which === 1){
        if(canvasRef === false){
          canvasRef = document.getElementById('editor-canvas');
        }
        mousePosition.x = (event.offsetX / canvasRef.clientWidth) * 2 - 1;
        mousePosition.y = -(event.offsetY / canvasRef.clientHeight) * 2 + 1;
        mouseDown = true;
        mouseDownTime = Date.now();
      }
    });

    document.getElementById('editor-canvas').addEventListener('mouseup', (event) => {
      if(event.which === 1){
        if(canvasRef === false){
          canvasRef = document.getElementById('editor-canvas');
        }
        mousePosition.x = (event.offsetX / canvasRef.clientWidth) * 2 - 1;
        mousePosition.y = -(event.offsetY / canvasRef.clientHeight) * 2 + 1;
        mouseDown = false;
        mouseUpTime = Date.now();
      }
    });

    document.getElementById('editor-canvas').addEventListener('mousemove', (event) => {
      if(event.which === 1){
        if(canvasRef === false){
          canvasRef = document.getElementById('editor-canvas');
        }
        mousePosition.x = (event.offsetX / canvasRef.clientWidth) * 2 - 1;
        mousePosition.y = -(event.offsetY / canvasRef.clientHeight) * 2 + 1;
      }
    });
  }, []);

  function updateTerrainUniforms(landPatches, uniforms){
    //
    //Iterate over each of our mesh components and
    //update the heightmap reference to the latest
    //heightmap to be used as user feedback.
    //
    for(const landPatch of landPatches){
      if(uniforms.hasOwnProperty('heightMap')){
        landPatch.material.uniforms.height = uniforms.height;
      }
      if(uniforms.hasOwnProperty('textureIDMap')){
        landPatch.material.uniforms.textureIDMap = uniforms.textureIDMap;
      }
      if(uniforms.hasOwnProperty('texturePercentMap')){
        landPatch.material.uniforms.texturePercentMap = uniforms.texturePercentMap;
      }
      if(uniforms.hasOwnProperty('xyOffset')){
        landPatch.material.uniforms.xyOffset = uniforms.xyOffset;
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

    //Check if we are using a tool that let's us draw
    if(activeToolName !== 'move'){
      let isClickEvnt = false;
      let isMouseDrag = false;
      let isMouseUp = false;
      if(lastMouseState && !mouseDown){
        //true to false transition occurred.
        if((mouseUpTime - mouseDownTime) < 150.0){
          isClickEvnt = true;
        }
        else{
          isMouseUp = true;
        }
      }
      else if(mouseDown){
        isMouseDrag = true;
        lastMouseState = true;
      }
      else if(lastMouseState){
        lastMouseState = false;
      }

      if(isClickEvnt){
        //Check if the mouse is clicked, this overrides all click drg events and
        //only the first raycast event point is used and everything else is reset.
        const clickCoordinatesX = paintPoints[0];
        const clickCoordinatesY = paintPoints[1];
        const clickStrength = paintPoints[2];
        paintPoint(clickCoordinatesX, clickCoordinatesY, clickStrength, paintPressureFallOff);

        paintPointsPtr = 0;
        isClickEvnt = false;
        lastMouseState = false;
      }
      else if(isMouseDrag){
        //Check if mouse is held down (only useful for paintbrush, smudge, or leveling tool)
        //raycast to the point and add the xy global coordinates to the list of points
        //currently being tracked.
        mouseRaycaster.setFromCamera(mousePosition, state.camera);
        let closestMouseX;
        let closestMouseY;
        let closestMouseZ;
        let oldDistSq = -1;
        const cameraPosition = state.camera.position;
        for(const landPatch of landPatches){
          const intersections = mouseRaycaster.intersectObject(landPatch);
          if(intersections.length > 0){
            for(const intersection of intersections){
              const mouseX = intersection.point.x;
              const mouseY = intersection.point.y;
              const mouseZ = intersection.point.z;
              if(oldDistSq === - 1 || intersection.distance < oldDistSq){
                oldDistSq = intersection.distance;
                closestMouseX = mouseX;
                closestMouseZ = mouseZ;
              }
            }
          }
        }

        paintPoints[paintPointsPtr] = closestMouseX;
        paintPoints[paintPointsPtr + 1] = closestMouseZ;
        paintPoints[paintPointsPtr + 2] = 1.0;
        paintPointsPtr += 3;

        //Check to see if the paint pointer is going to overflow on the next iteration.
        if(paintPointsPtr >= paintPoints.length){
          //Draw out the results to this point.
          paintCurve(paintPoints, paintPointsPtr, paintPressureFallOff);

          couldBeLine = false;
          paintPointsPtr = 0;
        }
      }
      else if(isMouseUp){
        //If the user's mouse has gone up, or we exceed the max number of stored points
        //then smoothly interpolate these points and throw out noise creating a cubic spline
        //of the data and send the spline equation up to the global heightmap shader with instructions
        //on which tool to apply, or the global mask shader with similiar instructions, or the
        //global texture maps with their own instructions.
        //
        //Single click events that modify these textures are handled above in the mose click
        //section. The previous frame of data should also be compressed and stored for undo/redo
        //history.
        if(couldBeLine && paintPointsPtr = 2){
          //This is a line, draw a line
          paintLine(paintPoints[0], paintPoints[1], 1.0, 1.0, paintPressureFallOff);
        }
        else if(paintPointsPtr > 3){
          //This is a curve, draw a curve
          paintCurve(paintPoints, paintPointsPtr, paintPressureFallOff);
        }
        const currentRenderTarget = getHeightMap();

        //Reset the state for the next iteration
        couldBeLine = true;
        paintPointsPtr = 0;
        isMouseDrag = false;
        isMouseUp = false;
        lastMouseState = false;
      }
    }

    //given c0 + cv * t we need the t where y = 0
    state.camera.getWorldDirection(cameraViewVector);
    const t = -cameraPosition.y / cameraViewVector.y;
    let intersectionX = cameraPosition.x + cameraViewVector.x * t;
    let intersectionZ = cameraPosition.z + cameraViewVector.z * t;
    cameraRaycaster.setFromCamera(centralViewVector, state.camera);
    for(const landPatch of landPatches){
      const intersection = cameraRaycaster.intersectObject(landPatch);
      if(intersection.length > 0){
        intersectionX = intersection[0].point.x;
        intersectionZ = intersection[0].point.z;
        break;
      }
    }
    if((intersectionX - cameraPosition.x) > (5.0 * patchSize) ||
    (intersectionZ - cameraPosition.x) > (5.0 * patchSize)){
      intersectionX = cameraPosition.x;
      intersectionZ = cameraPosition.z;
    }

    if(Math.abs(cameraOffsetXOld - intersectionX) > (0.5 * patchSize) ||
    (Math.abs(cameraOffsetZOld - intersectionZ) > (0.5 * patchSize))){
      cameraOffsetXOld = intersectionX;
      cameraOffsetZOld = intersectionZ;
    }
    const cameraOffsetX = patchSize * Math.round(cameraOffsetXOld / patchSize);
    const cameraOffsetZ = patchSize * Math.round(cameraOffsetZOld / patchSize);

    //Set the positions for these tiles based on our position switching between tile
    //center and tile edge as we move so that we can't sit on an edge that flips back
    //and forth. Instead, as we hit an edge, the bounderies for the transition swap over
    //by half a tile so that nothing updates until we hit that next shifted boundery
    //minimizing the number of position changes.
    for(const landPatch of landPatches){
      const count = landPatch.userData.instanceCount;
      const meshID = landPatch.userData.lodID;
      const initPositions = instanceInitPositions[meshID];

      for (let i = 0; i < count; i++) {
        const position = initPositions[i];
        //position
        tempObject.position.set(
          (position[0] + cameraOffsetX - patchSize * 0.5),
          position[1],
          (position[2] + cameraOffsetZ - patchSize * 0.5)
        );
        tempObject.updateMatrix();
        landPatch.setMatrixAt(i, tempObject.matrix);
      }
      landPatch.instanceMatrix.needsUpdate = true;
    }
  });

  return (<group ref={landPatchRef}>
    {landPatches}
  </group>);
}
