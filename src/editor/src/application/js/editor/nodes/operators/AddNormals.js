export function configureAddNormals(config){
  config.addNodeType({
    type: "addNormals",
    label: "Add Normals",
    description: "Combines two normal map vectors in world space.",
    initialWidth: 150,
    inputs: ports => [
      ports.vec3({name: 'normalVector1', label: 'Normal 1'}),
      ports.float({name: 'normalStrength1', label: 'Normal 1 Strength', defaultValue: 1.0}),
      ports.vec3({name: 'normalVector2', label: 'Normal 2'}),
      ports.float({name: 'normalStrength2', label: 'Normal 2 Strength', defaultValue: 1.0})
    ],
    outputs: ports => [
      ports.vec3({name: 'vec3', label: 'Combined Normal'})
    ]
  });
};
