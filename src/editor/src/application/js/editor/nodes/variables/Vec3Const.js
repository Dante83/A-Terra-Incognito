export function configureFlumeVec3ConstNode(config){
  config.addNodeType({
    type: "vec3ConstNode",
    label: "3-Vector Constant",
    description: "A const vector with three elements.",
    initialWidth: 150,
    inputs: ports => [
      ports.floatConst({name: 'element1', label: 'Element 1'}),
      ports.floatConst({name: 'element2', label: 'Element 2'}),
      ports.floatConst({name: 'element3', label: 'Element 3'})
    ],
    outputs: ports => [
      ports.vec3()
    ],
  });
};
