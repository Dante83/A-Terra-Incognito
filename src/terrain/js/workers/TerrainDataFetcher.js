const EVENT_UPDATE_DATA = 0;
const EVENT_TYPE_INITIALIZE = 1;
var heightmapFrameSize; //Heightmaps are grabbed in same 'size'
var heightData;
var lodOffsets;
var numberOfLods;
var lodStartIndices;
var targetURL;

onmessage = function(e){
  let postObject = e.data;
  if(postObject.eventType === EVENT_UPDATE_DATA){
    //Our data request is strided into array triples, x index, y index, lod index.
    const dataRequest;

    //For every request in our strided array grab the data from the URL
    for(let i = 0, numDataRequests = dataRequest.length; i += 3){
      const xPos = dataRequest[i];
      const yPos = dataRequest[i + 1];
      const lod = dataRequest[i + 2];
      // await fetch(`https://${targetURL}/heightmaps/${xPos}_${yPos}_${lod}.json`)
      // .then((response) => response.json())
      // .then((data) => console.log(data));
      const response = {heightmapData: []};
      for(let i = 0; i < 1024; ++i){
        response.heightmapData.push(Math.random());
      }

      //Add this data to our return object
    }

    //Post the return object to parent object so that we can shift existing
    //data and populate the 3D Texture Array for our heightmap data.
  }
  else if(postObject.eventType === EVENT_TYPE_INITIALIZE){
    drawDistance = postObject.drawDistance;
    patchSize = postObject.patchSize;
  }
}
