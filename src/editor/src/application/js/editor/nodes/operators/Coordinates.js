export function configureFlumeCoordinatesTransformationNode(config){
  config.addNodeType({
    type: "coordinatesTransformation",
    label: "Coordinates Transformation",
    description: "Swap between different geometric coordinates.",
    initialWidth: 200,
    inputs: ports => (inputData, connections, context) => {
      let inputPorts = [];
      if(connections.inputs.hasOwnProperty('vec2OrVec3')){
        const op1Type = connections.inputs.vec2OrVec3[0].portName;
        if(op1Type.includes('vec')){
          const operand1Size = parseInt(op1Type.match(/\d+/)[0]);
          if(operand1Size === 2){
            inputPorts.push(ports.twoDimensionalCoordinateTransformation({name: 'twoDimensionalCoordinateTransformationSelector', label: 'Coordinate System Transformation'}));
          }
          else if(operand1Size === 3){
            inputPorts.push(ports.threeDimensionalCoordinateTransformation({name: 'threeDimensionalCoordinateTransformation', label: 'Coordinate System Transformation'}));
          }
        }
      }
      inputPorts.push(ports.vec2OrVec3({name: 'vec2OrVec3', label: '2-Vector/3-Vector'}));
      return inputPorts;
    },
    outputs: ports => (data, connections) => {
      if(connections.inputs.hasOwnProperty('vec2OrVec3')){
        const portName = connections.inputs.vec2OrVec3[0].portName;
        const operand1Size = parseInt(portName.match(/\d+/)[0]);
        return [ports[portName]({name: portName, label: `${operand1Size}-Vector`})];
      }
      return [];
    },
  });
};
