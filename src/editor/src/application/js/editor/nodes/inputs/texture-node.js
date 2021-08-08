import MaterialNode from '../material-node.js'

export default class TextureNode : MaterialNode{
  constructor(renderer, name, parentMaterial, textureLoader){
    super(renderer, name, parentMaterial);
    this.textureLoader = textureLoader;
  }

  update(value){
    if(value !== this.value){
      this.markAsDirty();
      this.textureLoader.load(value, (texture) => {
        this.updateOutputValues(texture);
      }, undefined, (err) => {
        console.error(`The following error occurred while loading the texture into the texture node, ${this.name}, ${err}`);
      });
    }
  }
}
