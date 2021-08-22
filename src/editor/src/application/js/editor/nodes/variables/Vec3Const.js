export function configureFlumeVec3ConstNode(config){
  config.addNodeType({
    type: "vec3ConstNode",
    label: "3-Vector Constant",
    description: "A const vector with three elements.",
    initialWidth: 150,
    inputs: ports => [
      ports.floatConst({name: 'x', label: 'x'}),
      ports.floatConst({name: 'y', label: 'y'}),
      ports.floatConst({name: 'z', label: 'z'})
    ],
    outputs: ports => [
      ports.vec3({name: 'vec3', label: '3-Vector'})
    ],
  });
};
