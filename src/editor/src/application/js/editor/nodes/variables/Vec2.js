export function configureFlumeVec2Node(config){
  config.addNodeType({
    type: "vec2Node",
    label: "2-Vector",
    description: "A vector with two elements.",
    initialWidth: 150,
    inputs: ports => [
      ports.float({name: 'x', label: 'x'}),
      ports.float({name: 'y', label: 'y'})
    ],
    outputs: ports => [
      ports.vec2({name: 'vec2', label: '2-Vector'})
    ],
  });
};
