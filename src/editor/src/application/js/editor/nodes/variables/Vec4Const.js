export function configureFlumeVec4ConstNode(config){
  config.addNodeType({
    type: "vec4ConstNode",
    label: "4-Vector Constant",
    description: "A const vector with four elements.",
    initialWidth: 150,
    inputs: ports => [
      ports.floatConst({name: 'x', label: 'x'}),
      ports.floatConst({name: 'y', label: 'y'}),
      ports.floatConst({name: 'z', label: 'z'}),
      ports.floatConst({name: 'w', label: 'w'})
    ],
    outputs: ports => [
      ports.vec4({name: 'vec4', label: '4-Vector'})
    ],
  });
};
