export function configureFlumeMat2Node(config){
  config.addNodeType({
    type: "mat2Node",
    label: "2x2 Matrix",
    description: "A matrix with 2 rows and 2 columns.",
    initialWidth: 150,
    inputs: ports => [
      ports.vec2({name: 'row1', label: 'Row 1 2-Vector'}),
      ports.vec2({name: 'row2', label: 'Row 2 2-Vector'})
    ],
    outputs: ports => [
      ports.mat2({name: 'mat2', label: '2x2 Matrix'})
    ],
  });
};
