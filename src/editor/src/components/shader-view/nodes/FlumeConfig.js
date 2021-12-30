import { FlumeConfig } from 'flume';
import setFlumePortTypes from './setFlumePortTypes.js';

//Inputs
import {configureFlumeFloatNode} from '../../../application/js/editor/nodes/variables/Float.js';
import {configureFlumeBoolNode} from '../../../application/js/editor/nodes/variables/Bool.js';

import {configureFlumeMat2Node} from '../../../application/js/editor/nodes/variables/Mat2.js';
import {configureFlumeMat3Node} from '../../../application/js/editor/nodes/variables/Mat3.js';
import {configureFlumeMat4Node} from '../../../application/js/editor/nodes/variables/Mat4.js';

import {configureFlumeVec2Node} from '../../../application/js/editor/nodes/variables/Vec2.js';
import {configureFlumeVec3Node} from '../../../application/js/editor/nodes/variables/Vec3.js';
import {configureFlumeVec4Node} from '../../../application/js/editor/nodes/variables/Vec4.js';

import {configureFlumeVec2ConstNode} from '../../../application/js/editor/nodes/variables/Vec2Const.js';
import {configureFlumeVec3ConstNode} from '../../../application/js/editor/nodes/variables/Vec3Const.js';
import {configureFlumeVec4ConstNode} from '../../../application/js/editor/nodes/variables/Vec4Const.js';

//Inequality Nodes
import {configureFlumeInequalityNode} from '../../../application/js/editor/nodes/inequalities/Inequality.js';
import {configureFlumeInRangeNode} from '../../../application/js/editor/nodes/inequalities/InRange.js';

//Operators
import {configureFlumeBooleanOperatorsNode} from '../../../application/js/editor/nodes/operators/Boolean.js';
import {configureChannelSplitterNode} from '../../../application/js/editor/nodes/operators/ChannelSplitter.js';
import {configureClampOperatorNode} from '../../../application/js/editor/nodes/operators/Clamp.js';
import {configureFlumeColorOperatorsNode} from '../../../application/js/editor/nodes/operators/Color.js';
import {configureAddNormals} from '../../../application/js/editor/nodes/operators/AddNormals.js'
import {configureMathNode} from '../../../application/js/editor/nodes/operators/Math.js';
import {configureMatrixMathNode} from '../../../application/js/editor/nodes/operators/MatrixMath.js';
import {configureMixOperatorNode} from '../../../application/js/editor/nodes/operators/Mix.js'
import {configureRotationNode} from '../../../application/js/editor/nodes/operators/Rotation.js'
import {configureSmoothstepNode} from '../../../application/js/editor/nodes/operators/Smoothstep.js'
import {configureTrigFunctionsNode} from '../../../application/js/editor/nodes/operators/TrigFunctions.js'
import {configureVectorMathNode} from '../../../application/js/editor/nodes/operators/VectorMath.js'

//Outputs
import {configureStandardMaterialNode} from '../../../application/js/editor/nodes/outputs/StandardMaterial.js';
// import {configureFlumeRF32MaterialNode} from '../../../application/js/editor/nodes/outputs/rfp32Material.js';
// import {configureFlumeRGF32MaterialNode} from '../../../application/js/editor/nodes/outputs/rgfp32Material.js';
// import {configureFlumeRGBF32MaterialNode} from '../../../application/js/editor/nodes/outputs/rgbfp32Material.js';
// import {configureFlumeRGBA8MaterialNode} from '../../../application/js/editor/nodes/outputs/rgba8Material.js';

//Set up a new material node
const flumeConfig = new FlumeConfig();
setFlumePortTypes(flumeConfig);

//Base Types
configureFlumeFloatNode(flumeConfig);
configureFlumeBoolNode(flumeConfig);

configureFlumeMat2Node(flumeConfig);
configureFlumeMat3Node(flumeConfig);
configureFlumeMat4Node(flumeConfig);

configureFlumeVec2Node(flumeConfig);
configureFlumeVec3Node(flumeConfig);
configureFlumeVec4Node(flumeConfig);

configureFlumeVec2ConstNode(flumeConfig);
configureFlumeVec3ConstNode(flumeConfig);
configureFlumeVec4ConstNode(flumeConfig);

//Inequalities
configureFlumeInequalityNode(flumeConfig);
configureFlumeInRangeNode(flumeConfig);

//Operators
configureAddNormals(flumeConfig);
configureFlumeBooleanOperatorsNode(flumeConfig);
configureChannelSplitterNode(flumeConfig);
configureClampOperatorNode(flumeConfig);
configureFlumeColorOperatorsNode(flumeConfig);
configureMathNode(flumeConfig);
configureMatrixMathNode(flumeConfig);
configureMixOperatorNode(flumeConfig);
configureRotationNode(flumeConfig);
configureSmoothstepNode(flumeConfig);
configureTrigFunctionsNode(flumeConfig);
configureVectorMathNode(flumeConfig);

//Set up the output
configureStandardMaterialNode(flumeConfig);

export default flumeConfig;
