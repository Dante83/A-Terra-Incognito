export function configureFlumeVec2Node(config){
  config.addNodeType({
    type: "vec2Node",
    label: "2-Vector",
    description: "A vector with two elements.",
    initialWidth: 150,
    inputs: ports => [
      ports.float(),
      ports.float()
    ],
    outputs: ports => [
      ports.vec2()
    ],
  });
};
