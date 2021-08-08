import MaterialNode from '../material-node.js'

export default class ChannelCombinerNode : MaterialNode{
  constructor(renderer, name, parentMaterial){
    super(renderer, name, parentMaterial);

    //Input
    this.inputs = {
      r: null,
      g: null,
      b: null,
      a: null,
    }

    //Blend Shader
    this.channelCombinerShader = new THREE.RawShaderMaterial({
      uniforms: JSON.parse(JSON.stringify(channelCombinerShader.getUniforms())),
      vertexShader: vertexCommonMethods.getPassThroughVertexShader(),
      fragmentShader: channelCombinerShader.getFragmentShader()
    });
  }

  update(){
    if(this.dirty){
      this.blendShader.material.uniforms.rTexture.value = this.inputs.r;
      this.blendShader.material.uniforms.gTexture.value = this.inputs.g;
      this.blendShader.material.uniforms.bTexture.value = this.inputs.b;
      this.blendShader.material.uniforms.aTexture.value = this.inputs.a;
      this.outputTexture = this.renderer.render(this.blendShader);

      //Update all of our child nodes
      updateOutputValues(outputClass);
    }
  }
}
