export function configureFlumeVec2ConstNode(config){
  config.addNodeType({
    type: "vec2ConstNode",
    label: "2-Vector Constant",
    description: "A const vector with two elements.",
    initialWidth: 150,
    inputs: ports => [
      ports.floatConst({name: 'x', label: 'x'}),
      ports.floatConst({name: 'y', label: 'y'})
    ],
    outputs: ports => [
      ports.vec2({name: 'vec2', label: '2-Vector'})
    ],
  });
};
