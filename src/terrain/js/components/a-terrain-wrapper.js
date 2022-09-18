AFRAME.registerComponent('world_wrapper', {
  defaultValues: AWorld.DefaultData,
  terrainDirector: null,
  initialized: false,
  schema: {
    'draw_distance': {type: 'number', default: 5000.0},
    'draw_terrain_distance': {type: 'number', default: 5000.0},
    'region_file_url': {type: 'string', default: 'assets/region.json'}
  },
  init: function(){
    const sceneEl = this.el.sceneEl;
    const scene = sceneEl.object3D;
    const renderer = sceneEl.renderer;
    const camera = sceneEl.camera;
    const data = this.el.data;

    this.terrainDirector = new AWorld.TerrainDirector(data, renderer, scene, camera);
  },
  tick: function(time, timeDelta){
    /*Do Nothing*/
  }
});
