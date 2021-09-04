export function configureMaterialMapNode(config){
  config.addRootNodeType({
      type: "materialMap",
      label: "Output Material",
      description: "The material which is used to color the land.",
      deletable: false,
      initialWidth: 150,
      inputs: ports => [
        ports.vec3({name: 'colorMap', label: 'Color Map'}),
        ports.float({name: 'aoMap', label: 'AO Map'}),
        ports.float({name: 'aoMapIntensity', label: 'AO Map Intensity'}),
        ports.float({name: 'metalness', label: 'Metalness'}),
        ports.float({name: 'roughness', label: 'Roughness'}),
        ports.vec3({name: 'normalMap', label: 'Normal Map'}),
        ports.vec2({name: 'normalScale', label: 'Normal Scale'}),
        ports.vec3({name: 'emissiveColor', label: 'Emissive Color'}),
        ports.float({name: 'emissiveMap', label: 'Emissive Map'}),
        ports.booleanConst({name: 'flatShading', label: 'Flat Shading'}),
        ports.vec3({name: 'lightMap', label: 'Light Map'}),
        ports.float({name: 'lightMapIntensity', label: 'Light Map Intensity'})
      ]
  });
};
