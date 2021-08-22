export function configureFlumeBoolNode(config){
  config.addNodeType({
    type: "booleanConst",
    label: "Boolean Constant",
    description: "A value that can be true or false.",
    hideInput: true,
    initialWidth: 150,
    inputs: ports => [
      ports.booleanConst()
    ],
    outputs: ports => [
      ports.boolean({name: 'bool', label: 'Boolean'})
    ]
  });
};
