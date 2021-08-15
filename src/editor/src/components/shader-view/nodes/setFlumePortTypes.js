import { Colors, Controls } from 'flume';

export default function setFlumePortTypes(config){
  config.addPortType({
    type: 'floatConst',
    name: 'floatConst',
    label: 'Float',
    color: Colors.blue,
    hidePort: true,
    controls: [
      Controls.number({
        name: 'float',
        label: 'Float',
        step: 'float',
        defaultValue: 1.0
      })
    ]
  });

  config.addPortType({
    type: 'float',
    name: 'float',
    label: 'Float',
    color: Colors.blue,
    noControls: true
  });

  config.addPortType({
    type: 'booleanConst',
    name: 'booleanConst',
    label: 'Boolean',
    color: Colors.grey,
    hidePort: true,
    controls: [
      Controls.checkbox({
        name: "booleanConst",
        label: "True/False"
      })
    ]
  });

  config.addPortType({
    type: 'boolean',
    name: 'boolean',
    label: 'Boolean',
    color: Colors.grey,
    noControls: true
  });

  config.addPortType({
    type: 'comparisonSelector',
    name: 'comparisonSelector',
    label: 'Comparison Operator',
    color: Colors.grey,
    hidePort: true,
    controls: [
      Controls.select({
        name: "comparisonSelector",
        label: "Comparison Operator",
        options: [
          {value: "==", label: "="},
          {value: "<", label: "<"},
          {value: "<=", label: "<="},
          {value: ">", label: ">"},
          {value: ">=", label: ">="},
        ]
      })
    ]
  })

  config.addPortType({
    type: 'any',
    name: 'any',
    label: 'Any Type',
    color: Colors.grey,
    noControls: true,
    acceptTypes: ['float', 'vec2', 'vec3', 'vec4', 'Mat2', 'Mat3', 'Mat4']
  });

  config.addPortType({
    type: 'vec2Const',
    name: 'vec2Const',
    label: '2-Vector',
    color: Colors.green,
    controls: [
      Controls.number({
        name: 'float',
        label: 'Float',
        step: 'float',
        defaultValue: 1.0
      }),
      Controls.number({
        name: 'float',
        label: 'Float',
        step: 'float',
        defaultValue: 1.0
      })
    ]
  });

  config.addPortType({
    type: 'vec2',
    name: 'vec2',
    label: '2-Vector',
    color: Colors.green,
    noControls: true
  });

  config.addPortType({
    type: 'vec3Const',
    name: 'vec3Const',
    label: '3-Vector',
    color: Colors.green,
    controls: [
      Controls.number({
        name: 'float',
        label: 'Float',
        step: 'float',
        defaultValue: 0.0
      }),
      Controls.number({
        name: 'float',
        label: 'Float',
        step: 'float',
        defaultValue: 1.0
      }),
      Controls.number({
        name: 'float',
        label: 'Float',
        step: 'float',
        defaultValue: 0.0
      })
    ]
  });

  config.addPortType({
    type: 'vec3',
    name: 'vec3',
    label: '3-Vector',
    color: Colors.green,
    noControls: true
  });

  config.addPortType({
    type: 'vec4Const',
    name: 'vec4Const',
    label: '4-Vector',
    color: Colors.green,
    controls: [
      Controls.number({
        name: 'float',
        label: 'Float',
        step: 'float',
        defaultValue: 0.0
      }),
      Controls.number({
        name: 'float',
        label: 'Float',
        step: 'float',
        defaultValue: 1.0
      }),
      Controls.number({
        name: 'float',
        label: 'Float',
        step: 'float',
        defaultValue: 0.0
      }),
      Controls.number({
        name: 'float',
        label: 'Float',
        step: 'float',
        defaultValue: 0.0
      })
    ]
  });

  config.addPortType({
    type: 'vec4',
    name: 'vec4',
    label: '4-Vector',
    color: Colors.green,
    noControls: true
  });

  config.addPortType({
    type: 'mat2',
    name: 'mat2',
    label: '2x2 Matrix',
    color: Colors.red,
    noControls: true
  });

  config.addPortType({
    type: 'mat3',
    name: 'mat3',
    label: '3x3 Matrix',
    color: Colors.red,
    noControls: true
  });

  config.addPortType({
    type: 'mat4',
    name: 'mat4',
    label: '4x4 Matrix',
    color: Colors.red,
    noControls: true
  });
}
