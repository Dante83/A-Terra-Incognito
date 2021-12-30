import React from 'react';
import '@blueprintjs/core/lib/css/blueprint.css';
import { useSelector } from 'react-redux';
import { selectDirectoryTreeState, selectActiveDirectoryPath } from '../../application/js/features/directoryTreeSlice.js';
import FolderyType from './FolderType.js';
import './DirectoryPane.css'

export default function AssetsBrowserPane(){
  const treeState = useSelector(selectDirectoryTreeState);
  const activeDirectory = useSelector(selectActiveDirectoryPath);

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

  return(
    <div id="assets-browser-panel">
      <section id="assets-browser-panel-flex-container">
        <div id="assets-browser">
          {folders}

        </div>
      </section>
    </div>
  );
}
