export function configureHeightmapNode(config){
  config.addRootNodeType({
      type: "heightmap",
      label: "Heightmap",
      description: "The height data used to calculate the geometry of your world.",
      deletable: false,
      inputs: ports => [
        ports.float({name: 'heightmap', label: 'Heightmap'})
      ]
  });
};
