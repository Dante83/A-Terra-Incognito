AWorld.TerrainDirector = function(data, renderer, scene, camera){
  // const gltfDataFetcher = new Worker('../workers/GLTFDataFetcher.js');
  // const heightmapDataFetcher_1 = new Worker('../workers/HeightmapDataFetcher.js');
  // const heightmapDataFetcher_2 = new Worker('../workers/HeightmapDataFetcher.js');
  // const soundDataFetcher = new Worker('../workers/SoundDataFetcher.js');
  // const cameraWorldPosition_Vec3 = new THREE.Vector3();
  // const cameraWorldPosition = [0,0,0];

  //Let's just play a bit and try and create a few geometries in the scene.
  const testGeometry = new AWorld.TerrainTile(6.0, 16, false, false, true, true);
  const testGeometry2 = new AWorld.TerrainTile(6.0, 8, false, true, true, true);
  const testGeometry2p5 = new AWorld.TerrainTile(6.0, 8, true, false, true, true);
  const testGeometry3 = new AWorld.TerrainTile(6.0, 4, true, true, true, true);
  const testGeometry4 = new AWorld.TerrainTile(6.0, 32, false, false, true, true);
  const testGeometry5 = new AWorld.TerrainTile(6.0, 32, false, false, true, true);
  const testGeometry6 = new AWorld.TerrainTile(6.0, 64, false, false, true, true);
  const geometry = testGeometry.geometry;
  const geometry2 = testGeometry2.geometry;
  const geometry2p5 = testGeometry2p5.geometry;
  const geometry3 = testGeometry3.geometry;
  const geometry4 = testGeometry4.geometry;
  const geometry5 = testGeometry5.geometry;
  const geometry6 = testGeometry6.geometry;
  const wireframe = new THREE.WireframeGeometry(geometry);
  const wireframe2 = new THREE.WireframeGeometry(geometry2);
  const wireframe2p5 = new THREE.WireframeGeometry(geometry2p5);
  const wireframe3 = new THREE.WireframeGeometry(geometry3);
  const wireframe4 = new THREE.WireframeGeometry(geometry4);
  const wireframe5 = new THREE.WireframeGeometry(geometry5);
  const wireframe6 = new THREE.WireframeGeometry(geometry6);
  const material = new THREE.LineBasicMaterial({color: 0x000000, linewidth: 16});
  const mesh = new THREE.LineSegments(wireframe, material);
  scene.add(mesh);
  const mesh2 = new THREE.LineSegments(wireframe3, material);
  mesh2.position.x += 6.0;
  mesh2.position.z += 6.0;
  scene.add(mesh2);
  const mesh3 = new THREE.LineSegments(wireframe2, material);
  mesh3.position.x += 6.0;
  scene.add(mesh3);
  const mesh4 = new THREE.LineSegments(wireframe2p5, material);
  mesh4.position.z += 6.0;
  scene.add(mesh4);

  const mesh6 = new THREE.LineSegments(wireframe6, material);
  mesh6.position.x -= 6.0;
  mesh6.position.z -= 6.0;
  scene.add(mesh6);
  const mesh7 = new THREE.LineSegments(wireframe4, material);
  mesh7.position.x -= 6.0;
  scene.add(mesh7);
  const mesh5 = new THREE.LineSegments(wireframe5, material);
  mesh5.position.z -= 6.0;
  scene.add(mesh5);


  // parentComponent.initialized = true;
  // parentComponent.tick = () => self.firstTick();
  // this.firstTick = function(time, timeDelta){
  //   if(parentComponent.initialized){
  //     parentComponent.tick = () => self.tick();
  //     self.firstTick = null;
  //   }
  // }

  this.tick = function(time, timeDelta){
    // //Update our camera position which is used to update all LODs and decide which assets to request
    // cameraWorldPosition.setFromMatrixPosition(camera.matrixWorld);
    // cameraWorldPosition[0] = Math.floor(cameraWorldPosition.x);
    // cameraWorldPosition[1] = Math.floor(cameraWorldPosition.y);
    // cameraWorldPosition[2] = Math.floor(cameraWorldPosition.z);
    //
    // //Check to see if any new objects have come into the draw range or changed LOD values
    //
    // //Check to see if any new sounds have come into the listen range
    //
    // //Run sounds in an audio worklet to reduce the amount of weight on the page
    //
    // //Update any terrain LOD values so that terrains are in the right locations

  }
}
