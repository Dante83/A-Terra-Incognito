export function configureFlumeVec4ConstNode(config){
  config.addNodeType({
    type: "vec4ConstNode",
    label: "4-Vector Constant",
    description: "A const vector with four elements.",
    initialWidth: 150,
    inputs: ports => [
      ports.floatConst({name: 'element1', label: 'Element 1'}),
      ports.floatConst({name: 'element2', label: 'Element 2'}),
      ports.floatConst({name: 'element3', label: 'Element 3'}),
      ports.floatConst({name: 'element4', label: 'Element 4'})
    ],
    outputs: ports => [
      ports.vec4()
    ],
  });
};
