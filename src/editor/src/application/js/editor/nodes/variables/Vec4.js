export function configureFlumeVec4Node(config){
  config.addNodeType({
    type: "vec4Node",
    label: "Four-Vector",
    description: "A vector with four elements.",
    initialWidth: 150,
    inputs: ports => [
      ports.float(),
      ports.float(),
      ports.float(),
      ports.float()
    ],
    outputs: ports => [
      ports.vec4()
    ],
  });
};
