import React from 'react';
import '@blueprintjs/core/lib/css/blueprint.css';
import { useSelector, useDispatch } from 'react-redux';
import { openFolder, clearSelectedItems, addFolderToSelection, removeFileFromSelection,
setDeleteFoldersAndFilesAlertVisibility, selectSelectedFolders } from '../../application/js/features/directoryTreeSlice.js';
import { ContextMenu, Menu, MenuItem, Icon } from "@blueprintjs/core";
import './FolderType.css'

export default function FolderType(props){
  const dispatch = useDispatch();
  const selectedFolders = useSelector(selectSelectedFolders).map(x=>JSON.stringify(x.path));
  const key = 'folder-' + props.stringifiedDirectory;

  function deleteFolderClicked(stringifiedDirectory){
    dispatch(clearSelectedItems());
    dispatch(addFolderToSelection(stringifiedDirectory));
    dispatch(setDeleteFoldersAndFilesAlertVisibility(true));
  }

  function addOrRemoveFolderFromSelection(stringifiedDirectory, shiftKeyIsDown, ctrlKeyIsDown){
    if(!shiftKeyIsDown && !ctrlKeyIsDown){
      dispatch(clearSelectedItems());
      dispatch(addFolderToSelection(stringifiedDirectory));
    }
    else if(shiftKeyIsDown && !ctrlKeyIsDown){
      dispatch(addFolderToSelection(stringifiedDirectory));
    }
    else if(!shiftKeyIsDown && ctrlKeyIsDown){
      dispatch(removeFileFromSelection(stringifiedDirectory));
    }
  }

  function renderFolderContextMenu(e){
    e.preventDefault();
    e.stopPropagation();
    const stringifiedDirectory = e.currentTarget.attributes.data.value;

    // render a Menu without JSX...
    const menu = React.createElement(
        Menu,
        {}, // empty props
        React.createElement(MenuItem, { onClick: ()=>{console.log('rename')}, text: "Rename" }),
        React.createElement(MenuItem, { onClick: ()=>{deleteFolderClicked(stringifiedDirectory, dispatch)}, text: "Delete" }),
        React.createElement(MenuItem, { onClick: ()=>{dispatch(openFolder(stringifiedDirectory))}, text: "Open" })
    );

    // mouse position is available on event
    ContextMenu.show(menu, { left: e.clientX, top: e.clientY }, () => {}, true);
  }

  const classValues = "file-or-folder-type";
  if(props.stringifiedDirectory in  selectedFolders){
    classValues = "selected-file-or-folder-type"
  }

  return(
    <div key={key}
    data={props.stringifiedDirectory}
    onClick={(e)=>addOrRemoveFolderFromSelection(e.currentTarget.attributes.data.value, e.shiftKey, e.ctrlKey || e.metaKey)}
    onDoubleClick={(e)=>dispatch(openFolder(e.currentTarget.attributes.data.value))}
    onContextMenu={(e)=>renderFolderContextMenu(e)}
    className={classValues}>
      <div className="file-or-folder-icon">
        <Icon icon="folder-close" size={80} intent="none" />
      </div>
      <div className="file-label">{props.label}</div>
    </div>
  );
}
