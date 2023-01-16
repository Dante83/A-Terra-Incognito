import React from 'react';
import '@blueprintjs/core/lib/css/blueprint.css';
import { useSelector, useDispatch } from 'react-redux';
import { openFolder, setFolderExpanded, selectDirectoryTreeState, selectActiveDirectoryPath } from '../../application/js/features/directoryTreeSlice.js';
import './DirectoryPane.css'

export default function DirectoryPane(){
  const treeState = useSelector(selectDirectoryTreeState);
  const activeDirectory = useSelector(selectActiveDirectoryPath);
  const dispatch = useDispatch();

  function drawDirectory(folder, directory, depth){
    const key = 'directory-tree-loc' + directory.join('-');
    const childDepth = depth + 1;
    if(folder.expanded && folder.childNodes && !!folder.childNodes.length){
      let childNodeHTML =  [];
      for(let i = 0; i < folder.childNodes.length; ++i){
        const childNode = folder.childNodes[i];
        const childDirectory = [...directory, i];
        childNodeHTML.push(drawDirectory(childNode, childDirectory, childDepth));
      }
      const childListClass = ['bp4-tree-node-list', 'bp4-elevation-' + childDepth];
      let listItemClasses = ['bp4-tree-node', 'bp4-tree-node-expanded'];
      listItemClasses = listItemClasses.join(' ');
      const stringifiedDirectory = JSON.stringify(directory);
      let nodeContentClasses = ['bp4-tree-node-content']
      if(JSON.stringify(activeDirectory).startsWith(stringifiedDirectory)){
        nodeContentClasses.push('selected-tree-folder');
      }
      nodeContentClasses = nodeContentClasses.join(' ');

      return(<li key={key} className={listItemClasses}>
        <div className={nodeContentClasses}>
          <span data={stringifiedDirectory} onClick={(e)=>dispatch(setFolderExpanded({expanded: false, directory: e.target.attributes.data.value}))}
            className="bp4-tree-node-caret bp4-tree-node-caret-open bp4-icon-standard"></span>
          <span className="bp4-tree-node-icon bp4-icon-standard bp4-icon-folder-open"></span>
          <span data={stringifiedDirectory} onClick={(e)=>dispatch(openFolder(e.target.attributes.data.value))}
          className="bp4-tree-node-label">{folder.label}</span>
        </div>
        <ul className={childListClass}>
          {childNodeHTML}
        </ul>
      </li>);
    }
    else{
      let listItemClasses = ['bp4-tree-node'];
      let folderIconClasses = ['bp4-tree-node-icon', 'bp4-icon-standard'];
      listItemClasses = listItemClasses.join(' ');
      const stringifiedDirectory = JSON.stringify(directory);
      let nodeContentClasses = ['bp4-tree-node-content']
      const activeDirectoryString = JSON.stringify(activeDirectory);
      if(activeDirectoryString.startsWith(stringifiedDirectory.slice(0, -1))){
        if(activeDirectoryString === stringifiedDirectory){
          nodeContentClasses.push('selected-tree-folder');
          folderIconClasses.push('bp4-icon-folder-open');
        }
        else{
          folderIconClasses.push('bp4-icon-folder-open');
        }
      }
      else{
        folderIconClasses.push('bp4-icon-folder-close');
      }
      folderIconClasses = folderIconClasses.join(' ');
      nodeContentClasses = nodeContentClasses.join(' ');

      function dummyFunction(e){
        e.preventDefault();
      }

      return(<li key={key} className={listItemClasses}>
        <div className={nodeContentClasses}>
        <span data={stringifiedDirectory} onClick={(e)=>dispatch(setFolderExpanded({expanded: true, directory: e.target.attributes.data.value}))}
          className="bp4-tree-node-caret bp4-tree-node-caret-closed bp4-icon-standard"></span>
          <span className={folderIconClasses}></span>
          <span
          data={stringifiedDirectory}
          onDoubleClick={(e)=>dispatch(openFolder(e.target.attributes.data.value))}
          onDrop={(e)=>dummyFunction(e)}
          onDragOver={(e)=>e.preventDefault()}
          onDragEnter={(e)=>e.preventDefault()}
          onDragExit={(e)=>e.preventDefault()}
          className="bp4-tree-node-label">{folder.label}</span>
        </div>
      </li>);
    }
  }

  return(
    <div id="directory-panel">
      <section id="directory-panel-flex-container">
        <div id="directories">
          <div className="bp4-tree bp4-elevation-0">
            <ul className="bp4-tree-node-list bp4-tree-root">
              {drawDirectory(treeState[0], [0], 0)}
              {drawDirectory(treeState[1], [1], 0)}
              {drawDirectory(treeState[2], [2], 0)}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
