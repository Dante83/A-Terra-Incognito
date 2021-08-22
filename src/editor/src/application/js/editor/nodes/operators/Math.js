export function configureMathNode(config){
  config.addNodeType({
    type: "math",
    label: "Math",
    description: "Common math operations.",
    initialWidth: 150,
    inputs: ports => (inputData, connections, context) => {
      if(inputData.hasOwnProperty('mathOperatorSelector') &&
      inputData.mathOperatorSelector.hasOwnProperty('mathOperatorSelector')){
        const selectedOperation = inputData.mathOperatorSelector.mathOperatorSelector;
        if(['+', '-', '*', '/', '%'].includes(selectedOperation)){
          return [
            ports.mathOperatorSelector({name: 'mathOperatorSelector', label: 'Operation'}),
            ports.any({name: 'operand1', label: 'Left Side'}),
            ports.any({name: 'operand2', label: 'Right Side'})
          ];
        }
        else if(selectedOperation === 'pow'){
          return [
            ports.mathOperatorSelector({name: 'mathOperatorSelector', label: 'Operation'}),
            ports.any({name: 'operand1', label: 'Base'}),
            ports.any({name: 'operand2', label: 'Exponent'})
          ];
        }
        else if(selectedOperation === 'logN'){
          return [
            ports.mathOperatorSelector({name: 'mathOperatorSelector', label: 'Operation'}),
            ports.any({name: 'operand1', label: 'Log Base'}),
            ports.any({name: 'operand2', label: 'Input Value'})
          ];
        }
        else if(['square', 'exp', 'sqrt', 'ln'].includes(selectedOperation)){
          return [
            ports.mathOperatorSelector({name: 'mathOperatorSelector', label: 'Operation'}),
            ports.any({name: 'operand1', label: 'Input Value'})
          ];
        }
      }
      return[ports.mathOperatorSelector({name: 'mathOperatorSelector', label: 'Operation'})];
    },
    outputs: ports => (data, connections) => {
      const selectedOperation = data.mathOperatorSelector.mathOperatorSelector;
      const ipts = connections.inputs;
      const hasOneInput = ['square', 'exp', 'sqrt', 'ln'].includes(selectedOperation);
      console.log(ipts);
      if(ipts.hasOwnProperty('operand1') && ipts.hasOwnProperty('operand2') && !hasOneInput){
        const op1Type = ipts.operand1[0].portName;
        const op2Type = ipts.operand2[0].portName;
        let operand1Size = 0;
        if(op1Type !== 'float'){
          operand1Size = parseInt(op1Type.match(/\d+/)[0]);
        }
        let operand2Size = 0;
        if(op2Type !== 'float'){
          operand2Size = parseInt(op2Type.match(/\d+/)[0]);
        }
        const invalidOperator = Symbol('Invalid Rank');
        const operand1Rank = op1Type.includes('float') ? 0 : (op1Type.includes('vec') ? 1 : (op1Type.includes('mat') ? 2 : invalidOperator));
        const operand2Rank = op2Type.includes('float') ? 0 : (op2Type.includes('vec') ? 1 : (op2Type.includes('mat') ? 2 : invalidOperator));
        if(operand1Rank === 0 || operand2Rank === 0){
          //Apply operand to all elements of higher order tensor
          //and return that tensor.
          if(operand1Rank > operand2Rank){
            const portName = ipts.operand1[0].portName;
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
          else{
            const portName = ipts.operand2[0].portName;
            if(operand2Rank === 0){
              return [ports[portName]({name: portName, label: 'Float'})];
            }
            else if(operand2Rank === 1){
              return [ports[portName]({name: portName, label: `${operand2Size}-Vector`})];
            }
            else if(operand2Rank === 2){
              return [ports[portName]({name: portName, label: `${operand2Size}x${operand2Size} Matrix`})];
            }
            else{
              return [];
            }
          }
        }
        else if(operand1Rank === 1 && operand2Rank === 1){
          if(operand1Size !== operand2Size){
            return [];
          }

          //Two vectors (rank 1 tensors)
          if(selectedOperation === '*'){
            //Multiplication of two rank 1 tensors results in a rank 2 tensor
            return [ports['mat' + operand1Size]({name: ('mat' + operand1Size), label: `${operand1Size}x${operand1Size} Matrix`})];
          }
          else{
            //Otherwise just do bitwise operations on everything.
            const portName = ipts.operand1[0].portName;
            return [ports[portName]({name: portName, label: `${operand1Size}-Vector`})];
          }
        }
        else if(operand1Rank === 1 && operand2Rank === 2){
          //No vector matrix multiplication
          return [];
        }
        else if(operand1Rank === 2 && operand2Rank === 1){
          if(operand1Size !== operand2Size){
            return [];
          }

          //A matrix can only multiply a vector.
          //The matrix and the vector must both be the same size.
          if(selectedOperation === '*'){
            const portName = ipts.operand2[0].portName;
            return [ports[portName]({name: portName, label: `${operand1Size}-Vector`})];
          }
          else{
            return [];
          }
        }
        else if(operand1Rank === 2 && operand2Rank === 2){
          if(operand1Size !== operand2Size){
            return [];
          }

          //These are two matrices and they can only multiply or
          //or divide each other, with division being interpered as
          //multiplication with the inverse of the second argument.
          //The two matrices must be the same size.
          //
          //Everything else is considered a componentwise operation
          const portName = ipts.operand2[0].portName;
          return [ports[portName]({name: portName, label: `${operand1Size}x${operand1Size} Matrix`})];
        }
        else{
          return [];
        }
      }
      else if(ipts.hasOwnProperty('operand1') && !ipts.hasOwnProperty('operand2') && hasOneInput){
        const op1Type = ipts.operand1[0].portName;
        let operand1Size = 0;
        if(op1Type !== 'float'){
          operand1Size = parseInt(op1Type.match(/\d+/)[0]);
        }
        const invalidOperator = Symbol('Invalid Rank');
        const operand1Rank = op1Type.includes('float') ? 0 : (op1Type.includes('vec') ? 1 : (op1Type.includes('mat') ? 2 : invalidOperator));
        const portName = ipts.operand1[0].portName;

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
