export function configureFlumeVec4Node(config){
  config.addNodeType({
    type: "vec4Node",
    label: "4-Vector",
    description: "A vector with four elements.",
    initialWidth: 150,
    inputs: ports => [
      ports.float({name: 'x', label: 'x'}),
      ports.float({name: 'y', label: 'y'}),
      ports.float({name: 'z', label: 'z'}),
      ports.float({name: 'w', label: 'w'})
    ],
    outputs: ports => [
      ports.vec4({name: 'vec4', label: '4-Vector'})
    ],
  });
};
