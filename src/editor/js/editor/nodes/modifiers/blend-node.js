import MaterialNode from '../material-node.js'

export default class BlendNode : MaterialNode{
  constructor(renderer, name, parentMaterial){
    super(renderer, name, parentMaterial);

    //Input
    this.inputs = {
      texture1: null,
      texture2: null,
    }
    this.value = 1.0;

    //Blend Shader
    this.blendShader = new THREE.RawShaderMaterial({
      uniforms: JSON.parse(JSON.stringify(blendShader.getUniforms())),
      vertexShader: vertexCommonMethods.getPassThroughVertexShader(),
      fragmentShader: blendShader.getShaderMethod()
    });
  }

  update(value){
    if(value !== this.value || this.dirty){
      this.value = value;
      this.blendShader.material.uniforms.texture1.value = this.inputs.texture1;
      this.blendShader.material.uniforms.texture1.value = this.inputs.texture2;
      this.blendShader.material.uniforms.value.value = value;
      this.outputTexture = this.renderer.render(this.blendShader);

      //Update all of our child nodes
      updateOutputValues(outputClass);
    }
  }
}
