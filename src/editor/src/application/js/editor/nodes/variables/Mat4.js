export function configureFlumeMat4Node(config){
  config.addNodeType({
    type: "mat4Node",
    label: "4x4 Matrix",
    description: "A matrix with 4 rows and 4 columns.",
    initialWidth: 150,
    inputs: ports => [
      ports.vec4({name: 'row1', label: 'Row 1 4-Vector'}),
      ports.vec4({name: 'row2', label: 'Row 2 4-Vector'}),
      ports.vec4({name: 'row3', label: 'Row 3 4-Vector'}),
      ports.vec4({name: 'row4', label: 'Row 4 4-Vector'})
    ],
    outputs: ports => [
      ports.mat4({name: 'mat4', label: '4x4 Matrix'})
    ],
  });
};
