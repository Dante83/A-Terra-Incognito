export function configureMixOperatorNode(config){
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
        const startValue = ipts.startValue[0].portName;
        let operand1Size = 1;
        if(startValue !== 'float'){
          operand1Size = parseInt(startValue.match(/\d+/)[0]);
        }
        const endValue = ipts.endValue[0].portName;
        let operand2Size = 1;
        if(endValue !== 'float'){
          operand2Size = parseInt(endValue.match(/\d+/)[0]);
        }
        const interpolant = ipts.interpolant[0].portName;
        let operand3Size = 1;
        if(interpolant !== 'float'){
          operand3Size = parseInt(interpolant.match(/\d+/)[0]);
        }

        const invalidOperator = Symbol('Invalid Rank');
        const startValueRank = startValue.includes('float') ? 0 : (startValue.includes('vec') ? 1 : invalidOperator);
        const endValueRank = endValue.includes('float') ? 0 : (endValue.includes('vec') ? 1 : invalidOperator);
        const mixValueRank = interpolant.includes('float') ? 0 : (interpolant.includes('vec') ? 1 : invalidOperator);

        if((operand1Size === operand2Size && (operand3Size === 1 || operand3Size === operand2Size)) &&
        (startValueRank !== invalidOperator && startValueRank === endValueRank && (mixValueRank === 0 || mixValueRank === endValueRank))){
          if(startValueRank === 0){
            return [ports[startValue]({name: startValue, label: 'Float'})];
          }
          else if(startValueRank === 1){
            return [ports[startValue]({name: startValue, label: `${operand1Size}-Vector`})];
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
