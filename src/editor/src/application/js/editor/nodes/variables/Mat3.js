export function configureFlumeMat3Node(config){
  config.addNodeType({
    type: "mat3Node",
    label: "3x3 Matrix",
    description: "A matrix with 3 rows and 3 columns.",
    initialWidth: 150,
    inputs: ports => [
      ports.vec3({name: 'row1', label: 'Row 1 3-Vector'}),
      ports.vec3({name: 'row2', label: 'Row 2 3-Vector'}),
      ports.vec3({name: 'row3', label: 'Row 3 3-Vector'})
    ],
    outputs: ports => [
      ports.mat3({name: 'mat3', label: '3x3 Matrix'})
    ],
  });
};
