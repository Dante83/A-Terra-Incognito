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
    color: Colors.pink,
    hidePort: true,
    controls: [
      Controls.checkbox({
        name: "booleanConst",
        label: "Boolean"
      })
    ]
  });

  config.addPortType({
    type: 'boolean',
    name: 'boolean',
    label: 'Boolean',
    color: Colors.pink,
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
          {value: "==", label: "EQUALS"},
          {value: "<", label: "LESS THAN"},
          {value: "<=", label: "LESS THAN OR EQUAL"},
          {value: ">", label: "GREATER THAN"},
          {value: ">=", label: "GREATER THAN OR EQUAL"},
        ]
      })
    ]
  });

  config.addPortType({
    type: 'booleanOperatorSelector',
    name: 'booleanOperatorSelector',
    label: 'Boolean Operator',
    color: Colors.grey,
    hidePort: true,
    controls: [
      Controls.select({
        name: "booleanOperatorSelector",
        label: "Boolean Operator",
        defaultValue: "&&",
        options: [
          {value: "&&", label: "AND"},
          {value: "||", label: "OR"},
          {value: "!", label: "NOT"},
          {value: "^", label: "XOR"}
        ]
      })
    ]
  });

  config.addPortType({
    type: 'mathOperatorSelector',
    name: 'mathOperatorSelector',
    label: 'Math Operator',
    color: Colors.grey,
    hidePort: true,
    controls: [
      Controls.select({
        name: "mathOperatorSelector",
        label: "Math Operator",
        defaultValue: "+",
        options: [
          {value: "+", label: "ADD"},
          {value: "-", label: "SUBTRACT"},
          {value: "*", label: "MULTIPLY"},
          {value: "/", label: "DIVIDE"},
          {value: "%", label: "MODULO"},
          {value: "square", label: "SQUARE"},
          {value: "pow", label: "RAISE TO POWER"},
          {value: "exp", label: "NATURAL EXPONENT"},
          {value: "sqrt", label: "SQUARE ROOT"},
          {value: "logN", label: "LOG BASE N"},
          {value: "ln", label: "NATURAL LOG"},
        ]
      })
    ]
  });

  config.addPortType({
    type: 'trigFunctionSelector',
    name: 'trigFunctionSelector',
    label: 'Trig Function',
    color: Colors.grey,
    hidePort: true,
    controls: [
      Controls.select({
        name: "trigFunctionSelector",
        label: "Trig Function",
        defaultValue: "sin",
        options: [
          {value: "sin", label: "SINE"},
          {value: "cos", label: "COSINE"},
          {value: "tan", label: "TANGENT"},
          {value: "cotan", label: "COTANGENT"},
          {value: "sec", label: "SECANT"},
          {value: "cosec", label: "COSECANT"},
          {value: "asin", label: "ARC-SINE"},
          {value: "acos", label: "ARC-COSINE"},
          {value: "atan", label: "ARC-TANGENT"},
          {value: "acotan", label: "ARC-COTANGENT"},
          {value: "asec", label: "ARC-SECANT"},
          {value: "acosec", label: "ARC-COSECANT"},
          {value: "hsin", label: "HYPERBOLIC SINE"},
          {value: "hcos", label: "HYPERBOLIC COSINE"},
          {value: "htan", label: "HYPERBOLIC TANGENT"},
          {value: "hcot", label: "HYPERBOLIC COTANGENT"},
          {value: "hsec", label: "HYPERBOLIC SECANT"},
          {value: "hcos", label: "HYPERBOLIC COSECANT"},
        ]
      })
    ]
  });

  config.addPortType({
    type: 'degOrRadians',
    name: 'degOrRadians',
    label: 'Degrees or Radians',
    color: Colors.grey,
    hidePort: true,
    controls: [
      Controls.select({
        name: "degOrRadians",
        label: "Degrees or Radians",
        defaultValue: "rads",
        options: [
          {value: "rads", label: "RADIANS"},
          {value: "degs", label: "DEGREES"}
        ]
      })
    ]
  });

  config.addPortType({
    type: 'vectorFunctionSelector',
    name: 'vectorFunctionSelector',
    label: 'Vector Functions',
    color: Colors.grey,
    hidePort: true,
    controls: [
      Controls.select({
        name: "vectorFunctionSelector",
        label: "Vector Function",
        defaultValue: "dot",
        options: [
          {value: "dot", label: "DOT PRODUCT"},
          {value: "cross", label: "CROSS PRODUCT"},
          {value: "norm", label: "NORMALIZE"},
          {value: "length", label: "LENGTH"},
          {value: "dist", label: "DISTANCE"},
          {value: "distSq", label: "DISTANCE SQUARED"},
          {value: "manhattan", label: "MANHATTAN DISTANCE"},
          {value: "expand_size", label: "GROW"},
          {value: "reduce_size", label: "SHRINK"}
        ]
      })
    ]
  });

  config.addPortType({
    type: 'matrixMathFunctionSelector',
    name: 'matrixMathFunctionSelector',
    label: 'Matrix Math Functions',
    color: Colors.grey,
    hidePort: true,
    controls: [
      Controls.select({
        name: "matrixMathFunctionSelector",
        label: "Matrix Function",
        defaultValue: "transpose",
        options: [
          {value: "transpose", label: "TRANSPOSE"},
          {value: "inv", label: "INVERSE"},
          {value: "reduce_size", label: "SHRINK"},
          {value: "expand_size", label: "GROW"},
          {value: "trace", label: "TRACE"}
        ]
      })
    ]
  });

  config.addPortType({
    type: 'colorOperatorSelector',
    name: 'colorOperatorSelector',
    label: 'Color Operations',
    color: Colors.grey,
    hidePort: true,
    controls: [
      Controls.select({
        name: "colorOperatorSelector",
        label: "Color Operation",
        defaultValue: "linear2Gamma",
        options: [
          {value: "linear2Gamma", label: "LINEAR TO GAMMA"},
          {value: "Gamma2Linear", label: "GAMMA TO LINEAR"},
          {value: "rgbToHsl", label: "RGB TO HSL"},
          {value: "hslToRgb", label: "HSL TO RGB"},
          {value: "rgbToHsv", label: "RGB TO HSV"},
          {value: "hsvToRgb", label: "HSV TO RGB"},
          {value: "rgbToXyz", label: "RGB TO XYZ"},
          {value: "xyzToRgb", label: "XYZ TO RGB"},
          {value: "greyscale", label: "RGB TO GREYSCALE"}
        ]
      })
    ]
  });

  config.addPortType({
    type: 'vec2RotationOrderSelector',
    name: 'vec2RotationOrderSelector',
    label: 'Rotation Order',
    color: Colors.grey,
    hidePort: true,
    controls: [
      Controls.select({
        name: "vec2RotationOrderSelector",
        label: "Rotation Order",
        defaultValue: "xy",
        options: [
          {value: "xy", label: "XY"},
          {value: "yx", label: "YX"},
        ]
      })
    ]
  });

  config.addPortType({
    type: 'vec3RotationOrderSelector',
    name: 'vec3RotationOrderSelector',
    label: 'Rotation Order',
    color: Colors.grey,
    hidePort: true,
    controls: [
      Controls.select({
        name: "vec3RotationOrderSelector",
        label: "Rotation Order",
        defaultValue: "xyz",
        options: [
          {value: "xyz", label: "XYZ"},
          {value: "yzx", label: "YZX"},
          {value: "zxy", label: "ZXY"},
          {value: "yxz", label: "YXZ"},
          {value: "xzy", label: "XZY"},
          {value: "zyx", label: "ZYX"},
        ]
      })
    ]
  });

  //
  //TODO: We can add these in later when they're needed
  //
  // config.addPortType({
  //   type: 'twoDimensionalCoordinateTransformation',
  //   name: 'twoDimensionalCoordinateTransformation',
  //   label: '2-D Coordinate Transformation',
  //   color: Colors.grey,
  //   hidePort: true,
  //   controls: [
  //     Controls.select({
  //       name: "twoDimensionalCoordinateTransformation",
  //       label: "2-D Coordinate Transformation",
  //       defaultValue: "cartesian2Polar",
  //       options: [
  //         {value: "cartesian2Polar", label: "CARTESIAN TO POLAR"},
  //         {value: "polar2Cartesian", label: "POLAR TO CARTESIAN"},
  //         {value: "cartesian2Barycentric", label: "CARTESIAN TO BARYCENTRIC"},
  //         {value: "barycentric2Cartesian", label: "BARYCENTRIC TO CARTESIAN"}
  //       ]
  //     })
  //   ]
  // });
  //
  // config.addPortType({
  //   type: 'threeDimensionalCoordinateTransformation',
  //   name: 'threeDimensionalCoordinateTransformation',
  //   label: '3-D Coordinate Transformation',
  //   color: Colors.grey,
  //   hidePort: true,
  //   controls: [
  //     Controls.select({
  //       name: "threeDimensionalCoordinateTransformation",
  //       label: "3-D Coordinate Transformation",
  //       defaultValue: "cartesian2Spherical",
  //       options: [
  //         {value: "cartesian2Spherical", label: "CARTESIAN TO SPHERICAL"},
  //         {value: "sperhical2Cartesian", label: "SPHERICAL TO CARTESIAN"},
  //         {value: "cartesian2Cylindrical", label: "CARTESIAN TO CYLINDRICAL"},
  //         {value: "cylindrical2Cartesian", label: "CYLINDRICAL TO CARTESIAN"},
  //         {value: "cartesian2Barycentric", label: "CARTESIAN TO BARYCENTRIC"},
  //         {value: "barycentric2Cartesian", label: "BARYCENTRIC TO CARTESIAN"}
  //       ]
  //     })
  //   ]
  // });

  config.addPortType({
    type: 'any',
    name: 'any',
    label: 'Any Type',
    color: Colors.grey,
    noControls: true,
    acceptTypes: ['float', 'vec2', 'vec3', 'vec4', 'mat2', 'mat3', 'mat4']
  });

  config.addPortType({
    type: 'anyVecOrMatrix',
    name: 'anyVecOrMatrix',
    label: 'Any Vector or Matrix',
    color: Colors.grey,
    noControls: true,
    acceptTypes: ['vec2', 'vec3', 'vec4', 'mat2', 'mat3', 'mat4']
  });

  config.addPortType({
    type: 'anyVector',
    name: 'anyVector',
    label: 'Any Vector',
    color: Colors.green,
    noControls: true,
    acceptTypes: ['vec2', 'vec3', 'vec4']
  });

  config.addPortType({
    type: 'vec2OrVec3',
    name: 'vec2OrVec3',
    label: '2-Vector or 3-Vector',
    color: Colors.green,
    noControls: true,
    acceptTypes: ['vec2', 'vec3']
  });

  config.addPortType({
    type: 'anyUp2Rank1',
    name: 'anyUp2Rank1',
    label: 'Float or Vector',
    color: Colors.grey,
    noControls: true,
    acceptTypes: ['float', 'vec2', 'vec3', 'vec4']
  });

  config.addPortType({
    type: 'anyRank2',
    name: 'anyRank2',
    label: 'Any Matrix',
    color: Colors.red,
    noControls: true,
    acceptTypes: ['mat2', 'mat3', 'mat4']
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
