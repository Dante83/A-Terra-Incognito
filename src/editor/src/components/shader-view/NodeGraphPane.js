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
  const activeMaterial = useSelector(selectActiveMaterial);
  const dispatch = useDispatch();
  const nodes = useSelector(selectActiveNodes);
  const comments = useSelector(selectActiveComments);

  function recordCurrentNodeChanges(){
    if(nodeEditor && nodeEditor.current){
      const currentNodes = nodeEditor.current.getNodes();
      dispatch(updateMaterialNodes(currentNodes));
    }
  }

  function recordCurrentCommentChanges(){
    if(nodeEditor && nodeEditor.current){
      const currentComments = nodeEditor.current.getComments();
      dispatch(updateMaterialComments(currentComments));
    }
  }

  return(
    <div id="node-drawing-pane">
      <NodeEditor
        key={activeMaterial}
        nodeTypes={flumeConfig.nodeTypes}
        portTypes={flumeConfig.portTypes}
        comments={comments}
        nodes={nodes}
        onChange={()=>recordCurrentNodeChanges()}
        onCommentsChange={()=>recordCurrentCommentChanges()}
        ref={nodeEditor}
      />
    </div>
  );
}
