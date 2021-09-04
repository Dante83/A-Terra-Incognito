export function configureVectorMathNode(config){
  config.addNodeType({
    type: "vectorMath",
    label: "Vector Math",
    description: "Common vector math operations.",
    initialWidth: 150,
    inputs: ports => (inputData, connections, context) => {
      let outPorts = [ports.vectorFunctionSelector({name: 'vectorFunctionSelector', label: 'Operation'}), ports.anyVector({name: 'operand1', label: 'anyVector'})];
      if(inputData.hasOwnProperty('vectorFunctionSelector') &&
      inputData.vectorFunctionSelector.hasOwnProperty('vectorFunctionSelector')){
        const selectedOperation = inputData.vectorFunctionSelector.vectorFunctionSelector;
        if(['dot', 'cross', 'dist', 'distSq', 'manhattan'].includes(selectedOperation)){
          outPorts.push(ports.anyVector({name: 'operand2', label: 'anyVector'}));
        }
      }

      return outPorts;
    },
    outputs: ports => (data, connections) => {
      const selectedOperation = data.vectorFunctionSelector.vectorFunctionSelector;
      const ipts = connections.inputs;
      console.log(selectedOperation);
      if(ipts.hasOwnProperty('operand1')){
        const op1Type = ipts.operand1[0].portName;
        const operand1Size = parseInt(op1Type.match(/\d+/)[0]);
        if(ipts.hasOwnProperty('operand2') && ['dot', 'cross', 'dist', 'distSq', 'manhattan'].includes(selectedOperation)){
          const op2Type = ipts.operand2[0].portName;
          const operand2Size = parseInt(op2Type.match(/\d+/)[0]);
          if(operand1Size !== operand2Size){
            return [];
          }
          return [ports.float({name: 'float', label: 'Float'})];
        }
        else if(selectedOperation === 'length'){
          return [ports.float({name: 'float', label: 'Float'})];
        }
        else if(selectedOperation === 'norm'){
          console.log("norm out");
          return [ports[`vec${operand1Size}`]({name: `vec${operand1Size}`, label: `${operand1Size}-Vector`})];
        }
        else if(selectedOperation === 'expand_size'){
          const upgradedVectorSize = operand1Size + 1;
          if(upgradedVectorSize < 4){
            return [ports[`vec${upgradedVectorSize}`]({name: `vec${upgradedVectorSize}`, label: `${upgradedVectorSize}-Vector`})];
          }
          return [];
        }
        else if(selectedOperation === 'reduce_size'){
          const downgradedVectorSize = operand1Size - 1;
          if(downgradedVectorSize > 1){
            return [ports[`vec${downgradedVectorSize}`]({name: `vec${downgradedVectorSize}`, label: `${downgradedVectorSize}-Vector`})];
          }
          else if(downgradedVectorSize === 1){
            return [ports.float({name: 'float', label: 'Float'})];
          }
          return [];
        }
      }

      return [];
    }
  });
};
