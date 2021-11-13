AFRAME.registerComponent('terrainwrapper', {
  defaultValues: ATerrain.DefaultData,
  terrainDirector: null,
  initialized: false,
  schema: {
    'draw_distance': {type: 'number', default: 256.0},
    'draw_terrain_distance': {type: 'number', default: 8192.0},
    'sound_distance': {type: 'number', default: 256.0},
    'tau_value': {type: 'number', default: 1.0}
  },
  init: function(){
    const renderer = this.el.sceneEl.renderer;
    const scene = this.el.sceneEl.object3D;
    const camera = this.el.sceneEl.camera.el.object3D;
    const data = this.data;

    //Update the position of the objects
    scene.updateMatrixWorld();

    this.terrainDirector = new Terrain.TerrainDirector(this.el.getAttribute('web-worker-base-uri'), data, renderer, scene, camera);
  },
  tick: function(time, timeDelta){
    /*Do Nothing*/
  }
});
