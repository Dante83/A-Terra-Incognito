import MaterialNode from '../material-node.js'

export default class ChannelSplitterNode : MaterialNode{
  constructor(renderer, name, parentMaterial, outputCount){
    super(renderer, name, parentMaterial);

    //Input
    this.inputs = {
      texture: null,
    }

    //Outputs
    this.outputs = {
      r: null,
      g: null,
      b: null,
      a: null
    }
    this.outputsTargets = {
      r: [],
      g: [],
      b: [],
      a: []
    }

    //Materials
    this.shaders = {
      r: null,
      g: null,
      b: null,
      a: null
    };
    for(let channel of ['r', 'g', 'b', 'a']){
      this.shaders[channel] = new THREE.RawShaderMaterial({
        uniforms: JSON.parse(JSON.stringify(channelSplitterShader.getUniforms())),
        vertexShader: vertexCommonMethods.getPassThroughVertexShader(),
        fragmentShader: channelSplitterShader.getShaderMethod(channel)
      });
    }
  }

  update(){
    if(this.isDirty){
      for(let channel of ['r', 'g', 'b', 'a']){
        this.shaders[channel].material.uniforms.texture.value = this.inputs.texture;
        this.outputs[channel] = this.renderer.render(this.shaders[channel]);
      }

      //Update all of our child nodes
      updateOutputValues(outputClass);
    }
  }
}
