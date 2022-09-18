//A false for any of the top, right, bottom or left values
//means we're transitioning to a lower value.
AWorld.TerrainTile = function(size, numTiles, top, right, bottom, left){
  const totalNumberOfTiles = numTiles * numTiles;
  const numberOfInnerTiles = Math.max(numTiles - 2, 0) * (numTiles - 2);
  const numberOfEdgeTiles = totalNumberOfTiles - numberOfInnerTiles;
  const scaler = size / (numTiles * 2.0);
  const tilesOnAnEdge = Math.max((numberOfEdgeTiles - 4), 0) / 4;
  const totalNumberOfTriangles = 8 * numberOfInnerTiles + 28 * tilesOnAnEdge + (tilesOnAnEdge + Math.min(4, numberOfEdgeTiles)) * (4 + top + right + bottom + left);
  const numberOfVertices = totalNumberOfTriangles * 3;
  const vertexCoordinates = new Float32Array(numberOfVertices * 3);
  const numTilesMinusOne = numTiles - 1;
  let vindex = 0;
  for(let x = 0; x < numTiles; ++x){
    const rightTriSkip = x === numTilesMinusOne && !right;
    const leftTriSkip = x === 0 && !left;
    for(let y = 0; y < numTiles; ++y){
      const topTriSkip = y === numTilesMinusOne && !top;
      const bottomTriSkip = y === 0 && !bottom;

      //Iterate through each potential triangle in the inner tile
      for(let tri = 0; tri < 8; ++tri){
        const segmentIndex = Math.floor(tri / 2);
        const flipXY = segmentIndex % 2;
        const xSign = (((tri + 7) % 8) < 4) * 2 - 1;
        const ySign = (((tri + 9) % 8) < 4) * 2 - 1;
        const segment = tri % 2;
        const downgradeTriangle = (topTriSkip && segmentIndex === 0) || (rightTriSkip && segmentIndex === 1) || (bottomTriSkip && segmentIndex === 2) || (leftTriSkip && segmentIndex === 3);
        const endIndex = (downgradeTriangle && segment) * 2 - 1;
        const startIndex = 2 - (downgradeTriangle && !segment);
        for(let v = startIndex; v > endIndex; --v){
          const triV = v + segment * 3;
          vertexCoordinates[vindex + 2 * flipXY] = scaler * (1.0 + 2 * (flipXY ? y : x) + (flipXY ? ySign : xSign) * ((triV === 0) || (triV === 5)));
          //vertexCoordinates[vindex] = 0.0 - Y is zero
          vertexCoordinates[vindex + 2 * (!flipXY)] = scaler * (1.0 + 2 * (flipXY ? x : y) + (flipXY ? xSign : ySign) * ((triV + (!segment)) % 2));
          vindex += 3;
        }
      }
    }
  }

  console.log(totalNumberOfTriangles);
  this.vertexCoordinates = vertexCoordinates;
  this.geometry = new THREE.BufferGeometry();
  this.geometry.setAttribute( 'position', new THREE.BufferAttribute( this.vertexCoordinates, 3 ) );
}
