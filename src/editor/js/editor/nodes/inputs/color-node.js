import MaterialNode from '../material-node.js'

export default class TextureNode : MaterialNode{
  constructor(renderer, name, parentMaterial){
    super(renderer, name, parentMaterial);

    this.blendShader = new THREE.RawShaderMaterial({
      uniforms: JSON.parse(JSON.stringify(colorShader.getUniforms())),
      vertexShader: vertexCommonMethods.getPassThroughVertexShader(),
      fragmentShader: colorShader.getShaderMethod()
    });
  }

  update(red, green, blue, alpha){
    if(value !== this.value){
      this.markAsDirty();
    }
  }
}
