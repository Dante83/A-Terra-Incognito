export function configureFlumeRF32MaterialNode(config){
  config.addRootNodeType({
      type: "rgbfp32Material",
      label: "RGB-Channel 32-Bit Float Material",
      description: "A floating point output with all data on the RGB channels.",
      deletable: false,
      inputs: ports => [
        ports.vec3({name: 'textureOut', label: 'Texture Out'})
      ]
  });
};
