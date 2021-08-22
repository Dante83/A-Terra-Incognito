export function configureClampOperatorNode(config){
  config.addNodeType({
    type: "mixOperator",
    label: "Mix",
    description: "Linear interpolation between two values.",
    initialWidth: 150,
    inputs: ports => [
      ports.anyUp2Rank1({name: 'startValue', label: 'Start'}),
      ports.anyUp2Rank1({name: 'endValue', label: 'End'}),
      ports.anyUp2Rank1({name: 'interpolant', label: 'Percent'})
    ],
    outputs: ports => (data, connections) => {
      const ipts = connections.inputs;
      if(ipts.startValue && ipts.startValue[0].portName &&
        ipts.endValue && ipts.endValue[0].portName &&
        ipts.interpolant && ipts.interpolant[0].portName &&
        ipts.startValue[0].portName === ipts.endValue[0].portName
      ){
        const op1Type = ipts.startValue[0].portName;
        let operand1Size = 0;
        if(op1Type !== 'float'){
          operand1Size = parseInt(op1Type.match(/\d+/)[0]);
        }
        const op2Type = ipts.endValue[0].portName;
        let operand2Size = 0;
        if(op2Type !== 'float'){
          operand2Size = parseInt(op2Type.match(/\d+/)[0]);
        }
        const op3Type = ipts.interpolant[0].portName;
        let operand3Size = 0;
        if(op3Type !== 'float'){
          operand3Size = parseInt(op3Type.match(/\d+/)[0]);
        }

        if(operand1Size === operand2Size && (operand3Size === 1 || operand3Size === operand2Size)){
          const portName = ipts.inputValue[0].portName;

          if(operand1Rank === 0){
            return [ports[portName]({name: portName, label: 'Float'})];
          }
          else if(operand1Rank === 1){
            return [ports[portName]({name: portName, label: `${operand1Size}-Vector`})];
          }
          else{
            return [];
          }
        }
      }
      return [];
    }
  });
};
