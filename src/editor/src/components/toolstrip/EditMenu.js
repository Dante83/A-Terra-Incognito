import React, {Component} from 'react';
import '../../../node_modules/normalize.css/normalize.css';
import { Menu, MenuItem, MenuDivider } from "@blueprintjs/core";
import '../../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css';
import '../../../node_modules/@blueprintjs/core/lib/css/blueprint.css';

export default class EditMenu extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Menu>
        <MenuItem text="Undo" />
        <MenuItem text="Redo" />
      </Menu>
    );
  }
}
