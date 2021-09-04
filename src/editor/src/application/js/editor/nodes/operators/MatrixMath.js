export function configureMatrixMathNode(config){
  config.addNodeType({
    type: "matrixMath",
    label: "Matrix Math",
    description: "Common matrix math operations.",
    initialWidth: 150,
    inputs: ports => [
        ports.matrixMathFunctionSelector({name: 'matrixMathFunctionSelector', label: 'Operation'}),
        ports.anyRank2({name: 'operand1', label: 'Any Matrix'})
    ],
    outputs: ports => (data, connections) => {
      const selectedOperation = data.matrixMathFunctionSelector.matrixMathFunctionSelector;
      const ipts = connections.inputs;
      if(ipts.hasOwnProperty('operand1')){
        const op1Type = ipts.operand1[0].portName;
        const operand1Size = parseInt(op1Type.match(/\d+/)[0]);

        if(selectedOperation === 'transpose' || selectedOperation === 'inv'){
          return [ports['mat' + (operand1Size)]({name: 'mat' + operand1Size, label: `${operand1Size}x${operand1Size} Matrix`})];
        }
        else if(selectedOperation === 'trace'){
          return [ports.float({name: 'float', label: 'Float'})];
        }
        else if(selectedOperation === 'reduce_size'){
          const reducedMatrixSize = operand1Size - 1;
          if(reducedMatrixSize > 1){
            return [ports['mat' + (reducedMatrixSize)]({name: 'mat' + reducedMatrixSize, label: `${reducedMatrixSize}x${reducedMatrixSize} Matrix`})];
          }
          else if(reducedMatrixSize === 1){
            return [ports.float({name: 'float', label: 'Float'})];
          }
          return [];
        }
        else if(selectedOperation === 'expand_size'){
          const expandedMatrixSize = operand1Size + 1;
          if(expandedMatrixSize < 5){
            return [ports['mat' + (expandedMatrixSize)]({name: 'mat' + expandedMatrixSize, label: `${expandedMatrixSize}x${expandedMatrixSize} Matrix`})];
          }
          return [];
        }
        else{
          return [];
        }
      }

      return [];
    }
  });
};
