import React, {Component} from 'react';
import '../../../node_modules/normalize.css/normalize.css';
import { Popover, Position, Button, Tab, Tabs, Navbar, Alignment } from "@blueprintjs/core";
import FileMenu from './FileMenu.js'
import EditMenu from './EditMenu.js'
import '../../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css';
import '../../../node_modules/@blueprintjs/core/lib/css/blueprint.css';

export default class Toolstrip extends Component {
  constructor(props){
    super(props);
    this.onChangeView = this.onChangeView.bind(this);
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
              <Button className="bp4-button bp4-minimal">File</Button>
          </Popover>
          <Popover content={<EditMenu selectedTabId={activeView}/>} position={Position.BOTTOM_LEFT}>
              <Button className="bp4-button bp4-minimal">Edit</Button>
          </Popover>
          <Navbar.Divider />
          <Tabs id="viewport-selector-tabs" onChange={this.onChangeView} selectedTabId={activeView}>
            <Tab id="assets-view-tab" title="Assets" />
            <Tab id="shader-view-tab" title="Materials" />
            <Tab id="editing-view-tab" title="World Editor" />
          </Tabs>
        </Navbar.Group>
      </Navbar>
    );
  }
}
