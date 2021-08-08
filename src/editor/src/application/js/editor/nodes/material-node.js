export default class MaterialNode{
  constructor(renderer, name, parentMaterial){
    this.parentMaterial = parentMaterial;
    this.name = name;
    this.dirty = false;
    this.renderer = renderer;
    this.inputs = {};
    this.uuid;
    this.renderOrder = 0;

    //Default to a single output texture node
    this.outputKeys = ['out'];
    this.outputs = {
      out: null
    }
    this.outputTargets = {
      out: [];
    }

    if (this.constructor == MaterialNode) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  updateInputValue(valueName, value){
    this.inputs['valueName'] = value;
  }

  markAsDirty(){
    this.dirty = true;
    this.parentMaterial.dirty = true;
  }

  updateOutputValues(){
    for(let i = 0, numOutKeyElems = this.outputKeys.length; i < numOutKeyElems; ++i){
      const outKey = this.outputKeys[i];
      const outTargets = this.outputTargets[outKey];
      const outValue = this.outputs[outKey];
      for(let j = 0, numElements = outTargets.length; j < numElements; ++j){
        const outTarget = outTargets[i];
        const targetName = outTarget.name;
        const targetNode = outTarget.node;
        targetNode.updateInputValue(targetName, outValue);
      }
    }
  }

  addOutputNode() {
    throw new Error("Method 'addOutputNode()' must be implemented.");
  }

  removeOutputNode() {
    throw new Error("Method 'removeOutputNode()' must be implemented.");
  }

  update() {
    throw new Error("Method 'update()' must be implemented.");
  }
}
