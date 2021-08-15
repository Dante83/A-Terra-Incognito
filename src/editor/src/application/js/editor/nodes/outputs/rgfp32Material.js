export function configureFlumeRF32MaterialNode(config){
  config.addRootNodeType({
      type: "rgfp32Material",
      label: "RG-Channel 32-Bit Float Material",
      description: "A floating point output with all data on the RG channels.",
      deletable: false,
      inputs: ports => [
        ports.vec2({name: 'textureOut', label: 'Texture Out'})
      ]
  });
};
