export function configureFlumeRF32MaterialNode(config){
  config.addRootNodeType({
      type: "rfp32Material",
      label: "R-Channel 32-Bit Float Material",
      description: "A floating point output with all data on the red channel.",
      deletable: false,
      inputs: ports => [
        ports.float({name: 'textureOut', label: 'Texture Out'})
      ]
  });
};
