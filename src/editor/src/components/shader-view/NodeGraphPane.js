import React, {Component} from 'react';
import { NodeEditor } from "flume";
import flumeConfig from "./nodes/FlumeConfig.js";
import './NodeGraphPane.css'
import '../../../node_modules/normalize.css/normalize.css';
import '../../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css';
import '../../../node_modules/@blueprintjs/core/lib/css/blueprint.css';

export default class NodeGraphPane extends Component {
  render(){
    return(
      <div id="node-drawing-pane">
        <NodeEditor
          portTypes={flumeConfig.portTypes}
          nodeTypes={flumeConfig.nodeTypes}
          defaultNodes={[
          {
            type: "standardMaterial",
            x: 190,
            y: -150
          }
        ]}
        />
      </div>
    );
  }
}
