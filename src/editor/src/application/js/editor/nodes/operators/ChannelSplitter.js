export function configureChannelSplitterNode(config){
  config.addNodeType({
    type: "channelSplitter",
    label: "Channel Splitter",
    description: "Split vector into component numbers, or matrix into component vectors.",
    initialWidth: 150,
    inputs: ports => [
      ports.anyVecOrMatrix({name: 'anyVecOrMatrix', label: 'Vector/Matrix'})
    ],
    outputs: ports => (data, connections) => {
      const ipts = connections.inputs;
      if(!ipts.anyVecOrMatrix){
        return [];
      }
      else{
        const portType = ipts.anyVecOrMatrix[0].portName;
        switch(portType){
          case 'vec2':
            return [
              ports.float({name: 'float', label: 'x'}),
              ports.float({name: 'float', label: 'y'})
            ];
          case 'vec3':
            return [
              ports.float({name: 'float', label: 'x'}),
              ports.float({name: 'float', label: 'y'}),
              ports.float({name: 'float', label: 'z'})
            ];
          case 'vec4':
            return [
              ports.float({name: 'float', label: 'x'}),
              ports.float({name: 'float', label: 'y'}),
              ports.float({name: 'float', label: 'z'}),
              ports.float({name: 'float', label: 'w'})
            ];
          case 'mat2':
            return [
              ports.vec2({name: 'vec2', label: 'Row 1'}),
              ports.vec2({name: 'vec2', label: 'Row 2'})
            ];
          case 'mat3':
            return [
              ports.vec3({name: 'vec3', label: 'Row 1'}),
              ports.vec3({name: 'vec3', label: 'Row 2'}),
              ports.vec3({name: 'vec3', label: 'Row 3'})
            ];
          case 'mat4':
            return [
              ports.vec4({name: 'vec4', label: 'Row 1'}),
              ports.vec4({name: 'vec4', label: 'Row 2'}),
              ports.vec4({name: 'vec4', label: 'Row 3'}),
              ports.vec4({name: 'vec4', label: 'Row 4'})
            ];
          default:
            return [];
        };
      }
    }
  });
};
