export function configureTrigFunctionsNode(config){
  config.addNodeType({
    type: "trigFunctions",
    label: "Trigonometric Functions",
    description: "Common trigonometric functions.",
    initialWidth: 150,
    inputs: ports => (inputData, connections, context) => {
        let portOutputs = [ports.trigFunctionSelector({name: 'trigFunctionSelector', label: 'Operation'}), ports.any({name: 'operand1', label: 'Any'})];
        if(inputData.hasOwnProperty('trigFunctionSelector') &&
        inputData.trigFunctionSelector.hasOwnProperty('trigFunctionSelector')){
          const selectedOperation = inputData.trigFunctionSelector.trigFunctionSelector;
          if(selectedOperation === 'atan'){
            portOutputs.push(ports.any({name: 'operand2', label: 'Any'}));
          }
        }
        return portOutputs;
    },
    outputs: ports => (data, connections) => {
      const selectedOperation = data.trigFunctionSelector.trigFunctionSelector;
      const ipts = connections.inputs;
      if(ipts.hasOwnProperty('operand1')){
        const op1Type = ipts.operand1[0].portName;

        let operand1Size = 0;
        if(op1Type !== 'float'){
          operand1Size = parseInt(op1Type.match(/\d+/)[0]);
        }
        const invalidOperator = Symbol('Invalid Rank');
        const operand1Rank = op1Type.includes('float') ? 0 : (op1Type.includes('vec') ? 1 : (op1Type.includes('mat') ? 2 : invalidOperator));
        if(ipts.hasOwnProperty('operand2')){
          const op2Type = ipts.operand2[0].portName;
          const operand2Rank = op2Type.includes('float') ? 0 : (op2Type.includes('vec') ? 1 : (op2Type.includes('mat') ? 2 : invalidOperator));
          let operand2Size = 0;
          if(op2Type !== 'float'){
            operand2Size = parseInt(op2Type.match(/\d+/)[0]);
          }

          if(op1Type !== op2Type || operand1Size !== operand2Size){
            return [];
          }
        }
        else if(!ipts.hasOwnProperty('operand2') && selectedOperation === 'atan'){
          return [];
        }

        if(operand1Rank === 0){
          return [ports[op1Type]({name: op1Type, label: 'Float'})];
        }
        else if(operand1Rank === 1){
          return [ports[op1Type]({name: op1Type, label: `${operand1Size}-Vector`})];
        }
        else if(operand1Rank === 2){
          return [ports[op1Type]({name: op1Type, label: `${operand1Size}x${operand1Size} Matrix`})];
        }
      }
      return [];
    }
  });
};
