import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NodeEditor } from "flume";
import flumeConfig from "./nodes/FlumeConfig.js";
import { selectActiveMaterial, selectActiveNodes, selectActiveComments,
updateMaterialNodes, updateMaterialComments } from '../../application/js/features/materialListPaneSlice.js';
import './NodeGraphPane.css'
import '../../../node_modules/normalize.css/normalize.css';
import '../../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css';
import '../../../node_modules/@blueprintjs/core/lib/css/blueprint.css';

export default function NodeGraphPane() {
  const nodeEditor = React.useRef();
  const activeMaterial = useSelector(selectActiveMaterial).toLowerCase() + '-node-graph-stage';
  const dispatch = useDispatch();
  const nodes = useSelector(selectActiveNodes);
  const comments = useSelector(selectActiveComments);

  function recordCurrentNodeChanges(currentNodes){
    dispatch(updateMaterialNodes(currentNodes));
  }

  function recordCurrentCommentChanges(currentComments){
    dispatch(updateMaterialComments(currentComments));
  }

  return(
    <div id="node-drawing-pane">
      <NodeEditor
        key={activeMaterial}
        nodeTypes={flumeConfig.nodeTypes}
        portTypes={flumeConfig.portTypes}
        onChange={recordCurrentNodeChanges}
        onCommentsChange={recordCurrentCommentChanges}
        comments={comments}
        nodes={nodes}
      />
    </div>
  );
}
