AWorld.TerrainDirector = function(data, renderer, scene, camera){
  // const gltfDataFetcher = new Worker('../workers/GLTFDataFetcher.js');
  // const heightmapDataFetcher_1 = new Worker('../workers/HeightmapDataFetcher.js');
  // const heightmapDataFetcher_2 = new Worker('../workers/HeightmapDataFetcher.js');
  // const soundDataFetcher = new Worker('../workers/SoundDataFetcher.js');
  const pos = new THREE.Vector3();
  const transferrablePos = [0.0,0.0,0.0];

  //The below setup gives us 8 LODs for global heights, even though there are 12 total
  //the additional 4 LODs are just for adding more triangles for our height offsets on
  //our texture maps.
  //
  //TODO: Additional Buffer values may be provided for texturing
  //
  let heightValuesWBuffers = new Float16Array(2359296 * 8); //1536x1536 (1536=512x3)
  let currentRegionIndex = new UInt16Array(12);
  let regionUpdateAtLevel = 11;

  // parentComponent.initialized = true;
  // parentComponent.tick = () => self.firstTick();
  // this.firstTick = function(time, timeDelta){
  //   if(parentComponent.initialized){
  //     parentComponent.tick = () => self.tick();
  //     self.firstTick = null;
  //   }
  // }

  let tickTracker = 0;
  this.tick = function(time, timeDelta){
    //Update our camera position which is used to update all LODs and decide which assets to request
    pos.setFromMatrixPosition(camera.matrixWorld);
    const camX = pos.x;
    const camY = pos.y;
    const randomOp = (i + Math.floor(4.0 * Math.random())) % 20

    if(randomOp === 0){//Check to see that our terrain requests are even back before we update this
      if(heightValuesWBuffers !== null){
        //Convert the current position into an hash for each level
        let noRegionUpdateRequested = true;
        for(let i = 11; i >= 0; ++i){
          const sizeOfRegion = 2.5 * (1 << i);
          const xSlot = Math.min(Math.max((128 + Math.trunc(camX / sizeOfRegion)), 0), 255);
          const ySlot = Math.min(Math.max((128 + Math.trunc(camY / sizeOfRegion)), 255);
          const index = xSlot + 255 * ySlot;
          if(index !== currentRegionIndex[i]){
            currentRegionIndex[i] = index;
            if(regionUpdateRequested){
              regionUpdateAtLevel = i + 1; //Update this and the parent region
            }
            noRegionUpdateRequested = false;
          }
        }

        //If anyone requested a region update send the requested data sets up
        //to the worker thread to gather any new region heightmaps and populate
        //the data array. Once we get it back, we can then populate our texture
        //array with the results.
        if(!noRegionUpdateRequested){
          const EVENT_UPDATE_DATA = 0;
          self.terrainDataFetcherWorker.postMessage({
            eventType: EVENT_UPDATE_DATA,
            regionUpdateAtLevel: regionUpdateAtLevel,
            heightValuesWBuffers: heightValuesWBuffers,
            currentRegionIndex: currentRegionIndex
          }, [heightValuesWBuffers, currentRegionIndex]);
        }
      }

      //But don't accidently run this twice in a row
      ++i;
    }
    else if(i === 5){//Check to see if any new objects have come into the draw range or changed LOD values
      //DO NOTHING AT THE MOMENT
    }
    else if(i === 10){//Check to see if any new sounds have come into the listen range

      //Run sounds in an audio worklet to reduce the amount of weight on the page

      //DO NOTHING AT THE MOMENT
    }
    else if(i === 15){
      //Update all terrain tile LODs if we can

      //DO NOTHING AT THE MOMENT
    }
  }
}
