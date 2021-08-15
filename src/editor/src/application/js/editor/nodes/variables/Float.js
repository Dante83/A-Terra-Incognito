export function configureFlumeFloatNode(config){
  config.addNodeType({
    type: "float",
    label: "Float Number",
    description: "A decimal number.",
    hideInput: true,
    initialWidth: 150,
    inputs: ports => [
      ports.floatConst()
    ],
    outputs: ports => [
      ports.float()
    ]
  });
};
