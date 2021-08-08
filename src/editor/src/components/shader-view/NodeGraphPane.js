import React, {Component} from 'react';

import './NodeGraphPane.css'
import '../../../node_modules/normalize.css/normalize.css';
import { Popover, Position, Menu, Button, Alignment } from "@blueprintjs/core";
import '../../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css';
import '../../../node_modules/@blueprintjs/core/lib/css/blueprint.css';

export default class NodeGraphPane extends Component {
  constructor(props){
    super(props);
  }

  onChangeView(e){
    //this.setState({activeView: e});
    this.props.onActiveViewChange(e);
  }

  render(){
    const activeView = this.props.activeView;

    return(
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Popover content={<FileMenu/>} position={Position.BOTTOM_LEFT}>
              <Button className="bp3-button bp3-minimal">File</Button>
          </Popover>
          <Popover content={<EditMenu selectedTabId={activeView}/>} position={Position.BOTTOM_LEFT}>
              <Button className="bp3-button bp3-minimal">Edit</Button>
          </Popover>
          <Popover content={<Menu>...</Menu>} position={Position.BOTTOM_LEFT}>
              <Button className="bp3-button bp3-minimal">Render</Button>
          </Popover>
          <Divider />
          <Tabs id="viewport-selector-tabs" onChange={this.onChangeView} selectedTabId={activeView}>
            <Tab id="assets-view-tab" title="Assets" />
            <Tab id="shader-view-tab" title="Shaders" />
            <Tab id="editing-view-tab" title="Editing" />
          </Tabs>
        </Navbar.Group>
      </Navbar>
    );
  }
}
