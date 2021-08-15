export function configureFlumeRF32MaterialNode(config){
  config.addRootNodeType({
      type: "rgba8Material.js",
      label: "RGBA 8-Bit Material",
      description: "A standard texture with a red, green, blue and alpha channel.",
      deletable: false,
      inputs: ports => [
        ports.vec4({name: 'textureOut', label: 'Texture Out'})
      ]
  });
};
