import React from 'react';
import '@blueprintjs/core/lib/css/blueprint.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectDirectoryTreeState, selectActiveDirectoryPath } from '../../application/js/features/directoryTreeSlice.js';
import { create } from '../../application/js/features/newFolderModalSlice.js'
import { ContextMenu, Menu, MenuItem, Icon } from "@blueprintjs/core";
import FolderyType from './FolderType.js';
import './AssetsBrowserPane.css'

export default function AssetsBrowserPane(){
  const treeState = useSelector(selectDirectoryTreeState);
  const activeDirectory = useSelector(selectActiveDirectoryPath);
  const dispatch = useDispatch();

  let currentDirectory = treeState[activeDirectory[0]];
  if(currentDirectory.childNodes && !!currentDirectory.childNodes.length){
    for(let i = 1; i < activeDirectory.length; ++i){
      const subDirectory = activeDirectory[i];
      currentDirectory = currentDirectory.childNodes[subDirectory];
    }
  }

  let folders = [];
  for(let i = 0; i < currentDirectory.childNodes.length; ++i){
    const folder = currentDirectory.childNodes[i];
    const stringifiedDirectory = JSON.stringify([...activeDirectory, i]);
    const folderKey = 'asset-browser-folder-' + stringifiedDirectory;
    folders.push(<FolderyType key={folderKey} label={folder.label} stringifiedDirectory={stringifiedDirectory}></FolderyType>);
  }

  function renderAssetBrowserContextMenu(e){
    e.preventDefault();
    e.stopPropagation();

    // render a Menu without JSX...
    const menu = React.createElement(
        Menu,
        {}, // empty props
        React.createElement(MenuItem, { onClick: ()=>{dispatch(create())}, text: "New Folder" }),
    );

    // mouse position is available on event
    ContextMenu.show(menu, { left: e.clientX, top: e.clientY }, () => {}, true);
  }

  return(
    <div id="assets-browser-panel">
      <section onContextMenu={(e)=>renderAssetBrowserContextMenu(e)} id="assets-browser-panel-container">
        <div id="assets-browser">
          {folders}
        </div>
      </section>
    </div>
  );
}
