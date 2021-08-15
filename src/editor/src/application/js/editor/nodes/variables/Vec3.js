export function configureFlumeVec3Node(config){
  config.addNodeType({
    type: "vec3Node",
    label: "Three-Vector",
    description: "A vector with three elements.",
    initialWidth: 150,
    inputs: ports => [
      ports.float(),
      ports.float(),
      ports.float()
    ],
    outputs: ports => [
      ports.vec3()
    ],
  });
};
