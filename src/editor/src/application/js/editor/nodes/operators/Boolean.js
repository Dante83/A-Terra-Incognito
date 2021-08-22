export function configureFlumeBooleanOperatorsNode(config){
  config.addNodeType({
    type: "booleanOperator",
    label: "Boolean Operator",
    description: "Boolean Logic Operations",
    initialWidth: 150,
    inputs: ports => [
      ports.booleanOperatorSelector({name: 'booleanOperatorSelector', label: 'Boolean Operator'}),
      ports.boolean({name: 'operand1', label: 'Boolean'}),
      ports.boolean({name: 'operand2', label: 'Boolean'})
    ],
    outputs: ports => [
      ports.boolean({name: 'boolean', label: 'Boolean'})
    ],
  });
};
