import MaterialNode from '../material-node.js'

export default class StandardMaterialNode : MaterialNode{
  constructor(renderer, name, parentMaterial, textureLoader){
    super(renderer, name, parentMaterial);
    this.standardMaterial = new THREE.MeshStandardMaterial();
  }

  update(aoMapIntensity, bumpScale, color, emissiveTexture){

  }
}
