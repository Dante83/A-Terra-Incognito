export function configureSmoothstepNode(config){
  config.addNodeType({
    type: "smoothstep",
    label: "Smoothstep",
    description: "Smoothstep Operator",
    initialWidth: 150,
    inputs: ports => [
      ports.anyUp2Rank1({name: 'lowerBound', label: 'LowerBound'}),
      ports.anyUp2Rank1({name: 'upperBound', label: 'UpperBound'}),
      ports.anyUp2Rank1({name: 'interpolant', label: 'X'})
    ],
    outputs: ports => (data, connections) => {
      const ipts = connections.inputs;
      if(ipts.lowerBound && ipts.lowerBound[0].portName &&
        ipts.upperBound && ipts.upperBound[0].portName &&
        ipts.interpolant && ipts.interpolant[0].portName &&
        ipts.lowerBound[0].portName === ipts.upperBound[0].portName
      ){
        const lowerBound = ipts.lowerBound[0].portName;
        let operand1Size = 1;
        if(lowerBound !== 'float'){
          operand1Size = parseInt(lowerBound.match(/\d+/)[0]);
        }
        const upperBound = ipts.upperBound[0].portName;
        let operand2Size = 1;
        if(upperBound !== 'float'){
          operand2Size = parseInt(upperBound.match(/\d+/)[0]);
        }
        const interpolant = ipts.interpolant[0].portName;
        let operand3Size = 1;
        if(interpolant !== 'float'){
          operand3Size = parseInt(interpolant.match(/\d+/)[0]);
        }

        const invalidOperator = Symbol('Invalid Rank');
        const lowerBoundRank = lowerBound.includes('float') ? 0 : (lowerBound.includes('vec') ? 1 : invalidOperator);
        const upperBoundRank = upperBound.includes('float') ? 0 : (upperBound.includes('vec') ? 1 : invalidOperator);
        const mixValueRank = interpolant.includes('float') ? 0 : (interpolant.includes('vec') ? 1 : invalidOperator);

        if((operand1Size === operand2Size && (operand3Size === 1 || operand3Size === operand2Size)) &&
        (lowerBoundRank !== invalidOperator && lowerBoundRank === upperBoundRank && (mixValueRank === 0 || mixValueRank === upperBoundRank))){
          if(lowerBoundRank === 0){
            return [ports[lowerBound]({name: lowerBound, label: 'Float'})];
          }
          else if(lowerBoundRank === 1){
            return [ports[lowerBound]({name: lowerBound, label: `${operand1Size}-Vector`})];
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
