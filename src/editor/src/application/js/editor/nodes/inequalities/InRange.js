export function configureFlumeInRangeNode(config){
  config.addNodeType({
    type: "inRange",
    label: "In Range",
    description: "Check if between two numbers.",
    initialWidth: 150,
    inputs: ports => [
      ports.float({name: 'upperBound', label: 'Upper Bound', defaultValue: 1.0}),
      ports.float({name: 'lowerBound', label: 'Lower Bound', defaultValue: 0.0}),
      ports.float({name: 'value', label: 'Value'}),
      ports.any({name: 'valIfTrue', label: 'Value if True'}),
      ports.any({name: 'valIfFalse', label: 'Value if False'})
    ],
    outputs: ports => (data, connections) => {
      const ipts = connections.inputs;
      if(!ipts.upperBound || !ipts.lowerBound || !ipts.value){
        return [];
      }
      else if((!ipts.valIfTrue || !ipts.valIfFalse) || (ipts.valIfTrue[0].portName !== ipts.valIfFalse[0].portName)){
        return [];
      }
      else{
        if(!ipts.valIfTrue){
          return [ports.boolean({name: 'booleanValue', label: 'True/False'})];
        }
        else{
          return [ports[ipts.valIfTrue[0].portName]({name: 'booleanValue', label: 'Output'})];
        }
      }
    }
  });
};
