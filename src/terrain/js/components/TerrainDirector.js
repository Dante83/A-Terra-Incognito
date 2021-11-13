ATerrain.TerrainDirector = function(data, renderer, scene, camera){
  const gltfDataFetcher = new Worker('../workers/GLTFDataFetcher.js');
  const heightmapDataFetcher_1 = new Worker('../workers/HeightmapDataFetcher.js');
  const heightmapDataFetcher_2 = new Worker('../workers/HeightmapDataFetcher.js');
  const soundDataFetcher = new Worker('../workers/SoundDataFetcher.js');
  const cameraWorldPosition_Vec3 = new THREE.Vector3();
  const cameraWorldPosition = [0,0,0];

  parentComponent.initialized = true;
  parentComponent.tick = () => self.firstTick();
  this.firstTick = function(time, timeDelta){
    if(parentComponent.initialized){
      parentComponent.tick = () => self.tick();
      self.firstTick = null;
    }
  }

  this.tick = function(time, timeDelta){
    //Update our camera position which is used to update all LODs and decide which assets to request
    cameraWorldPosition.setFromMatrixPosition(camera.matrixWorld);
    cameraWorldPosition[0] = Math.floor(cameraWorldPosition.x);
    cameraWorldPosition[1] = Math.floor(cameraWorldPosition.y);
    cameraWorldPosition[2] = Math.floor(cameraWorldPosition.z);

    //Check to see if any new objects have come into the draw range or changed LOD values

    //Check to see if any new sounds have come into the listen range

    //Run sounds in an audio worklet to reduce the amount of weight on the page

    //Update any terrain LOD values so that terrains are in the right locations

  }
}
