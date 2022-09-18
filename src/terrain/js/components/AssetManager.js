AWorld.AssetManager = function(terrainDirector){
  let regionFiles = [];
  let heightmaps = [];
  let regionTextures = [];
  let gltfFiles = [];
  let sounds = [];
  let assetCollectionMaps = [];
  let cameraPos;
  let regionDataLoaded = false;
  let nextUpdateTime = 0;
  const timeBetweenUpdates = 1000.0; //Once a second

  //Grab all the base region data.
  async function fetchAsyncRegionFile(url){
    const data = await(await fetch(url)).json();
    return data;
  }
  const originalRegionFile = await(fetchAsyncRegionFile(terrainDirector.data.region_file_url)).then(() =>
  {
    regionDataLoaded = true;
  });

  this.tick = function(time){
    if(regionDataLoaded && lastUpdateTime <= timeBetweenUpdates){
      //Have we excited the current region? Check for adjacent regions
      //and get all the data from their files.

      //Turn this off until our next requested update
      nextUpdateTime = time + timeBetweenUpdates;
    }
  }
}
