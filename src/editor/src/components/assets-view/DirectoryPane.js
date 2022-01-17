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
      const childListClass = ['bp3-tree-node-list', 'bp3-elevation-' + childDepth];
      let listItemClasses = ['bp3-tree-node', 'bp3-tree-node-expanded'];
      listItemClasses = listItemClasses.join(' ');
      const stringifiedDirectory = JSON.stringify(directory);
      let nodeContentClasses = ['bp3-tree-node-content']
      if(JSON.stringify(activeDirectory).startsWith(stringifiedDirectory)){
        nodeContentClasses.push('selected-tree-folder');
      }
      nodeContentClasses = nodeContentClasses.join(' ');

      return(<li key={key} className={listItemClasses}>
        <div className={nodeContentClasses}>
          <span data={stringifiedDirectory} onClick={(e)=>dispatch(setFolderExpanded({expanded: false, directory: e.target.attributes.data.value}))}
            className="bp3-tree-node-caret bp3-tree-node-caret-open bp3-icon-standard"></span>
          <span className="bp3-tree-node-icon bp3-icon-standard bp3-icon-folder-open"></span>
          <span data={stringifiedDirectory} onClick={(e)=>dispatch(openFolder(e.target.attributes.data.value))}
          className="bp3-tree-node-label">{folder.label}</span>
        </div>
        <ul className={childListClass}>
          {childNodeHTML}
        </ul>
      </li>);
    }
    else{
      let listItemClasses = ['bp3-tree-node'];
      let folderIconClasses = ['bp3-tree-node-icon', 'bp3-icon-standard'];
      listItemClasses = listItemClasses.join(' ');
      const stringifiedDirectory = JSON.stringify(directory);
      let nodeContentClasses = ['bp3-tree-node-content']
      const activeDirectoryString = JSON.stringify(activeDirectory);
      if(activeDirectoryString.startsWith(stringifiedDirectory.slice(0, -1))){
        if(activeDirectoryString === stringifiedDirectory){
          nodeContentClasses.push('selected-tree-folder');
          folderIconClasses.push('bp3-icon-folder-open');
        }
        else{
          folderIconClasses.push('bp3-icon-folder-open');
        }
      }
      else{
        folderIconClasses.push('bp3-icon-folder-close');
      }
      folderIconClasses = folderIconClasses.join(' ');
      nodeContentClasses = nodeContentClasses.join(' ');

      function dummyFunction(e){
        e.preventDefault();
        console.log(e);
      }

      return(<li key={key} className={listItemClasses}>
        <div className={nodeContentClasses}>
        <span data={stringifiedDirectory} onClick={(e)=>dispatch(setFolderExpanded({expanded: true, directory: e.target.attributes.data.value}))}
          className="bp3-tree-node-caret bp3-tree-node-caret-closed bp3-icon-standard"></span>
          <span className={folderIconClasses}></span>
          <span
          data={stringifiedDirectory}
          onDoubleClick={(e)=>dispatch(openFolder(e.target.attributes.data.value))}
          onDrop={(e)=>dummyFunction(e)}
          onDragOver={(e)=>e.preventDefault()}
          onDragEnter={(e)=>e.preventDefault()}
          onDragExit={(e)=>e.preventDefault()}
          className="bp3-tree-node-label">{folder.label}</span>
        </div>
      </li>);
    }
  }

  return(
    <div id="directory-panel">
      <section id="directory-panel-flex-container">
        <div id="directories">
          <div className="bp3-tree bp3-elevation-0">
            <ul className="bp3-tree-node-list bp3-tree-root">
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
