export function configureClampOperatorNode(config){
  config.addNodeType({
    type: "clampOperator",
    label: "Clamp",
    description: "Clamp between two float values.",
    initialWidth: 150,
    inputs: ports => [
      ports.float({name: 'upperBound', label: 'Upper Bound', defaultValue: 1.0}),
      ports.any({name: 'inputValue', label: 'Input Value'}),
      ports.float({name: 'lowerBound', label: 'Lower Bound', defaultValue: 0.0})
    ],
    outputs: ports => (data, connections) => {
      const ipts = connections.inputs;
      if(ipts.inputValue && ipts.inputValue[0].portName){
        const op1Type = ipts.inputValue[0].portName;
        let operand1Size = 0;
        if(op1Type !== 'float'){
          operand1Size = parseInt(op1Type.match(/\d+/)[0]);
        }
        const invalidOperator = Symbol('Invalid Rank');
        const operand1Rank = op1Type.includes('float') ? 0 : (op1Type.includes('vec') ? 1 : (op1Type.includes('mat') ? 2 : invalidOperator));
        const portName = ipts.inputValue[0].portName;

        if(operand1Rank === 0){
          return [ports[portName]({name: portName, label: 'Float'})];
        }
        else if(operand1Rank === 1){
          return [ports[portName]({name: portName, label: `${operand1Size}-Vector`})];
        }
        else if(operand1Rank === 2){
          return [ports[portName]({name: portName, label: `${operand1Size}x${operand1Size} Matrix`})];
        }
        else{
          return [];
        }
      }
      return [];
    }
  });
};
