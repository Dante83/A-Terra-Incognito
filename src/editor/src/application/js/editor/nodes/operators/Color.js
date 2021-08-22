export function configureFlumeColorOperatorsNode(config){
  config.addNodeType({
    type: "colorOperator",
    label: "Color Transformation",
    description: "Swap between different color descriptions.",
    initialWidth: 200,
    inputs: ports => [
      ports.colorOperatorSelector({name: 'colorOperatorSelector', label: 'Color Operation'}),
      ports.vec3({name: 'vec3', label: 'Color Input (3-Vector)'}),
    ],
    outputs: ports => [
      ports.vec3({name: 'vec3', label: 'Color Output (3-Vector)'}),
    ],
  });
};
