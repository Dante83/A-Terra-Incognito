export function configureRotationNode(config){
  config.addNodeType({
    type: "rotation",
    label: "Rotation",
    description: "Rotate a 2D or 3D vector.",
    initialWidth: 150,
    inputs: ports => (inputData, connections, context) => {
        let outputPorts = [ports.vec2OrVec3({name: 'operand1', label: '2-Vector/3-Vector'})];
        if(connections?.inputs?.operand1 && connections.inputs.operand1.length > 0 && connections.inputs.operand1[0]?.portName){
          const inputVector = connections.inputs.operand1[0].portName;
          const inputVectorSize = parseInt(inputVector.match(/\d+/)[0]);

          if(inputVectorSize === 2){
            outputPorts.push(ports.vec2RotationOrderSelector({name: 'rotationOrder', label: 'Rotation Order'}));

            if(inputData.hasOwnProperty('rotationOrder') &&
            inputData.rotationOrder.hasOwnProperty('rotationOrder')){
              const axisOrder = inputData.vec2RotationOrderSelector.vec2RotationOrderSelector.toUpperCase();
              const axis1 = axisOrder.charAt(0);
              const axis2 = axisOrder.charAt(1);
              outputPorts.push(ports.float({name: 'float', label: `Rotation Around ${axis1}`}));
              outputPorts.push(ports.float({name: 'float', label: `Rotation Around ${axis2}`}));
            }
          }
          else if(inputVectorSize === 3){
            outputPorts.push(ports.vec3RotationOrderSelector({name: 'rotationOrder', label: 'Rotation Order'}));

            if(inputData.hasOwnProperty('rotationOrder') &&
            inputData.rotationOrder.hasOwnProperty('rotationOrder')){
              const axisOrder = inputData.vec3RotationOrderSelector.vec3RotationOrderSelector.toUpperCase();
              const axis1 = axisOrder.charAt(0);
              const axis2 = axisOrder.charAt(1);
              const axis3 = axisOrder.charAt(2);
              outputPorts.push(ports.float({name: 'float', label: `Rotation ${axis1}`}));
              outputPorts.push(ports.float({name: 'float', label: `Rotation ${axis2}`}));
              outputPorts.push(ports.float({name: 'float', label: `Rotation ${axis3}`}));
            }
          }
        }

        return outputPorts;
    },
    outputs: ports => (data, connections) => {
      const ipts = connections.inputs;
      if(ipts.hasOwnProperty('operand1')){
        const op1Type = ipts.operand1[0].portName;
        const operand1Size = parseInt(op1Type.match(/\d+/)[0]);
        return [ports[op1Type]({name: op1Type, label: `${operand1Size}-Vector`})];
      }
      return [];
    }
  });
};
