const EVENT_TYPE_GET_TILING = 0;
const EVENT_TYPE_INITIALIZE = 1;
var drawDistance;
var patchSize;
var patchCollectionSize;
var numberOfPatches;
var patchEdgeAreaData;
var heightmap;

onmessage = function(e){
  let postObject = e.data;
  if(postObject.eventType === EVENT_TYPE_GET_TILING){
    //Populate the patch data from the heightmap data
    const camX = postObject.cameraX;
    const camY = postObject.cameraY;
    const camZ = postObject.cameraZ;
    for(let x = 0; x < patchCollectionSize; ++x){
      const patchXIndexOffset = x * patchCollectionSize;
      for(let y = 0; y < patchCollectionSize; ++y){
        //Get the ray distance from the camera to each of the corners
        //for each tile around us forward and back and set this data
        //and save the minimum distance for the basic heightmap
        const relP1 = [];
        const relP2 = [];
        const relP3 = [];
        const relP4 = [];

        //Get the total area covered by the tile relative to the camera
        patchEdgeAreaData[patchXIndexOffset + y] = ;
      }
    }

    //Sort our positions by distance


    //Apply wave function collapse to fill in regions with values until we
    //have tiled the entire region.

  }
  else if(postObject.eventType === EVENT_TYPE_INITIALIZE){
    drawDistance = postObject.drawDistance;
    patchSize = postObject.patchSize;
    patchCollectionSize = Math.ceil(drawDistance / patchSize);
    numberOfPatches = patchCollectionSize * patchCollectionSize;
    patchEdgeAreaData = new Float16Array(numberOfPatches * 4);
    patchAreaOrder = new Uint8Array(numberOfPatches);
  }
}
