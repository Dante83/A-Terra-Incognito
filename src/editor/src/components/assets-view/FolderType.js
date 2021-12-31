import React from 'react';
import '@blueprintjs/core/lib/css/blueprint.css';
import { useDispatch } from 'react-redux';
import { openFolder } from '../../application/js/features/directoryTreeSlice.js';
import { ContextMenu, Menu, MenuItem, Icon } from "@blueprintjs/core";
import './FolderType.css'

export default function FolderType(props){
  const dispatch = useDispatch();
  const key = 'folder-' + props.stringifiedDirectory;

  function renderFolderContextMenu(e){
    e.preventDefault();
    e.stopPropagation();
    const stringifiedDirectory = e.currentTarget.attributes.data.value;
    // let targetURL;
    // const deleteURL;
    // const renameURL;

    // render a Menu without JSX...
    const menu = React.createElement(
        Menu,
        {}, // empty props
        React.createElement(MenuItem, { onClick: ()=>{console.log('rename')}, text: "Rename" }),
        React.createElement(MenuItem, { onClick: ()=>{console.log('delete')}, text: "Delete" }),
        React.createElement(MenuItem, { onClick: ()=>{dispatch(openFolder(stringifiedDirectory))}, text: "Open" })
    );

    // mouse position is available on event
    ContextMenu.show(menu, { left: e.clientX, top: e.clientY }, () => {}, true);
  }

  return(
    <div key={key}
    data={props.stringifiedDirectory}
    onDoubleClick={(e)=>dispatch(openFolder(e.currentTarget.attributes.data.value))}
    onContextMenu={(e)=>renderFolderContextMenu(e)}
    className="file-or-folder-type">
      <div className="file-or-folder-icon">
        <Icon icon="folder-close" size={80} intent="none" />
      </div>
      <div className="file-label">{props.label}</div>
    </div>
  );
}
