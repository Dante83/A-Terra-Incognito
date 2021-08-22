export function configureFlumeVec3Node(config){
  config.addNodeType({
    type: "vec3Node",
    label: "3-Vector",
    description: "A vector with three elements.",
    initialWidth: 150,
    inputs: ports => [
      ports.float({name: 'x', label: 'x'}),
      ports.float({name: 'y', label: 'y'}),
      ports.float({name: 'z', label: 'z'})
    ],
    outputs: ports => [
      ports.vec3({name: 'vec3', label: '3-Vector'})
    ],
  });
};
