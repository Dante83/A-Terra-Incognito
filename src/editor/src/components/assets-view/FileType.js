import React from 'react';
import '@blueprintjs/core/lib/css/blueprint.css';
import { useSelector, useDispatch } from 'react-redux';
import { openFolder, clearSelectedItems, addFolderToSelection, removeFileFromSelection,
setDeleteFoldersAndFilesAlertVisibility, selectSelectedFolders } from '../../application/js/features/directoryTreeSlice.js';
import { ContextMenu, Menu, MenuItem, Icon } from "@blueprintjs/core";
import './FileOrFolderType.css';
import './FileType.css';

export default function FileType(props){
  const dispatch = useDispatch();
  const selectedFiles = useSelector(selectSelectedFolders).map(x=>JSON.stringify(x.path));
  const key = 'file-' + props.stringifiedDirectory + props.label;

  function deleteFolderClicked(stringifiedDirectory){
    dispatch(clearSelectedItems());
    dispatch(addFolderToSelection(stringifiedDirectory));
    dispatch(setDeleteFoldersAndFilesAlertVisibility(true));
  }

  function addOrRemoveFileFromSelection(stringifiedDirectory, shiftKeyIsDown, ctrlKeyIsDown){
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

  function renderFileContextMenu(e){
    e.preventDefault();
    e.stopPropagation();
    const stringifiedDirectory = e.currentTarget.attributes.data.value;

    // render a Menu without JSX...
    const menu = React.createElement(
        Menu,
        {}, // empty props
        React.createElement(MenuItem, { onClick: ()=>{console.log('rename')}, text: "Rename" }),
        React.createElement(MenuItem, { onClick: ()=>{deleteFolderClicked(stringifiedDirectory.stringifiedDirectory, dispatch)}, text: "Delete" }),
        React.createElement(MenuItem, { onClick: ()=>{dispatch(previewFile(stringifiedDirectory.stringifiedDirectory, stringifiedDirectory.fileType))}, text: "Preview" })
    );

    // mouse position is available on event
    ContextMenu.show(menu, { left: e.clientX, top: e.clientY }, () => {}, true);
  }

  function previewFile(e){
    console.log(e.currentTarget.attributes);
  }

  const classValues = "file-or-folder-type";
  if(props.stringifiedDirectory in selectedFiles){
    classValues = "selected-file-or-folder-type"
  }

  let iconType = 'document';
  if(props.type.startsWith('image')){
    iconType = 'media';
  }
  else if(props.type.startsWith('audio')){
    iconType = 'music';
  }
  else if(props.type.startsWith('video')){
    iconType = 'video';
  }
  else if(props.label.endsWith('.obj') || props.label.endsWith('.glb') || props.label.endsWith('.gltf') ||
  props.label.endsWith('.fbx') || props.label.endsWith('.dae') || props.label.endsWith('.ply') || props.label.endsWith('.x3d')){
    iconType = 'cube';
  }

  const data = {
    fileDirectory: props.stringifiedDirectory,
    fileLabel: props.label,
    fileType: props.type
  }
  return(
    <div key={key}
    data={data}
    fileType={props.type}
    onClick={(e)=>addOrRemoveFileFromSelection(e.currentTarget.attributes.data.value, e.shiftKey, e.ctrlKey || e.metaKey)}
    onDoubleClick={(e)=>dispatch(previewFile(e))}
    onContextMenu={(e)=>renderFileContextMenu(e)}
    className={classValues}>
      <div className="file-or-folder-icon">
        <Icon icon={iconType} size={80} intent="none" />
      </div>
      <div className="file-label">{props.label}</div>
    </div>
  );
}
