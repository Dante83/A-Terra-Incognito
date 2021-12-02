import React, {Component} from 'react';
import '../../../node_modules/normalize.css/normalize.css';
import { Menu, MenuItem, MenuDivider } from "@blueprintjs/core";
import '../../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css';
import '../../../node_modules/@blueprintjs/core/lib/css/blueprint.css';

export default class FileMenu extends Component {
  render(){
    return(
      <Menu>
        <MenuItem text="New Project" />
        <MenuItem text="Open" />
        <MenuItem text="Open Recent" />
        <MenuDivider/>
        <MenuItem text="Save" />
        <MenuItem text="Save As..." />
        <MenuDivider/>
        <MenuItem text="Properties" />
      </Menu>
    );
  }
}
