export function configureFlumeInequalityNode(config){
  config.addNodeType({
    type: "inequality",
    label: "Inequality",
    description: "Compare two numbers.",
    initialWidth: 150,
    inputs: ports => [
      ports.comparisonSelector({name: 'comparisonSelector', label: 'Comparison Operator'}),
      ports.float({name: 'leftSide', label: 'Left Side'}),
      ports.float({name: 'rightSide', label: 'Right Side'}),
      ports.any({name: 'valIfTrue', label: 'True Value'}),
      ports.any({name: 'valIfFalse', label: 'False Value'})
    ],
    outputs: ports => (data, connections) => {
      const ipts = connections.inputs;
      if(!ipts.leftSide || !ipts.rightSide){
        return [];
      }
      else if((!ipts.valIfTrue || !ipts.valIfFalse) || (ipts.valIfTrue[0].portName !== ipts.valIfFalse[0].portName)){
        return [];
      }
      else{
        if(!ipts.valIfTrue){
          return [ports.boolean({name: 'boolean', label: 'True/False'})];
        }
        else{
          const portName = ipts.valIfTrue[0].portName;
          return [ports[portName]({name: portName, label: 'Output'})]
        }
      }
    }
  });
};
