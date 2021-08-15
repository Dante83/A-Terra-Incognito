export function configureFlumeVec2ConstNode(config){
  config.addNodeType({
    type: "vec2ConstNode",
    label: "2-Vector Constant",
    description: "A const vector with two elements.",
    initialWidth: 150,
    inputs: ports => [
      ports.floatConst({name: 'element1', label: 'Element 1'}),
      ports.floatConst({name: 'element2', label: 'Element 2'})
    ],
    outputs: ports => [
      ports.vec2()
    ],
  });
};
