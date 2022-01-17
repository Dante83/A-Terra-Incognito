import React from 'react';
import '@blueprintjs/core/lib/css/blueprint.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectDirectoryTreeState, selectActiveDirectoryPath, selectActiveDirectoryPathString, selectUploadURL, addFileCallback } from '../../application/js/features/directoryTreeSlice.js';
import { create } from '../../application/js/features/newFolderModalSlice.js'
import { toaster } from '../alerts/Toaster.js';
import { ContextMenu, Menu, MenuItem, Icon } from "@blueprintjs/core";
import FolderType from './FolderType.js';
import FileType from './FileType.js'
import './AssetsBrowserPane.css'

export default function AssetsBrowserPane(){
  const treeState = useSelector(selectDirectoryTreeState);
  const activeDirectory = useSelector(selectActiveDirectoryPath);
  const activeDirectoryString = useSelector(selectActiveDirectoryPathString);
  const uploadURL = useSelector(selectUploadURL);
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
    folders.push(<FolderType key={folderKey} label={folder.label} stringifiedDirectory={stringifiedDirectory}></FolderType>);
  }

  let files = [];
  for(let i = 0; i < currentDirectory.files.length; ++i){
    const file = currentDirectory.files[i];
    const stringifiedDirectory = JSON.stringify([...activeDirectory]);
    const fileLabel = file.label;
    const fileKey = 'asset-browser-file-' + stringifiedDirectory + fileLabel;
    folders.push(<FileType key={fileKey} label={fileLabel} stringifiedDirectory={stringifiedDirectory} type={file.type}></FileType>);
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

  function uploadNextFile(fileArray, dispatch, url, targetDirectory, targetDirectoryString, i){
    const file = fileArray.pop();
    let formData = new FormData();
    formData.append('file', file);
    fetch(url, {
      method: 'POST',
      body: formData
    })
    .then((response) => {
      const resolvedResponse = response.json().then(
        (result) => {
          if(result.success){
            //Add the file to the directory in react
            //dispatch(addFileCallback({}));

            //Any more files to upload?
            if(fileArray.length > 0){
              //Request the addition of a new file if any yet remain
              uploadNextFile(fileArray, dispatch, url, targetDirectory, targetDirectoryString, i + 1);
            }
            else{
              //Otherwise tell the user that the file was created
              toaster.show({
                message: `${i} File Uploaded to ${targetDirectoryString}`,
                intent: 'success',
                icon: 'tick-circle'
              });
            }
          }
          else{
            toaster.show({
              message: ("Error: " + result.msg),
              intent: 'danger',
              icon: 'error'
            });
          }
        }
      ).catch((error) => {
        toaster.show({
          message: ("Error: " + error),
          intent: 'danger',
          icon: 'error'
        });
      });
    })
    .catch((error) => {
      toaster.show({
        message: ("Error: " + error),
        intent: 'danger',
        icon: 'error'
      });
    });
  }

  async function uploadFiles(e, dispatch, uploadURL, targetDirectory, targetDirectoryString){
    e.preventDefault();
    e.stopPropagation();
    const url = uploadURL + 'files/upload?directory=example_project_1%2fassets%2f' + encodeURIComponent(targetDirectoryString);
    const files = e?.dataTransfer?.files;
    if(files && files.length > 0){
      const fileArray = [...files];
      const file = fileArray.pop();
      let formData = new FormData();
      formData.append('file', file);
      fetch(url, {
        method: 'POST',
        body: formData
      })
      .then((response) => {
        const resolvedResponse = response.json().then(
          (result) => {
            if(result.success){
              //Add the file to the directory in react
              dispatch(addFileCallback({
                path: targetDirectory,
                newFileName: file.name,
                newFileType: file.type,
                lastModifiedDate: file.lastModifiedDate
              }));

              //Any more files to upload?
              if(fileArray.length > 0){
                //Request the addition of a new file if any yet remain
                uploadNextFile(fileArray, dispatch, url, targetDirectory, targetDirectoryString, 2);
              }
              else{
                //Otherwise tell the user that the file was created
                toaster.show({
                  message: `1 File Uploaded to ${targetDirectoryString}`,
                  intent: 'success',
                  icon: 'tick-circle'
                });
              }
            }
            else{
              toaster.show({
                message: ("Error: " + result.msg),
                intent: 'danger',
                icon: 'error'
              });
            }
          }
        ).catch((error) => {
          toaster.show({
            message: ("Error: " + error),
            intent: 'danger',
            icon: 'error'
          });
        });
      })
      .catch((error) => {
        toaster.show({
          message: ("Error: " + error),
          intent: 'danger',
          icon: 'error'
        });
      });
    }
  }

  return(
    <div id="assets-browser-panel">
      <section
        onContextMenu={(e)=>renderAssetBrowserContextMenu(e)}
        onDrop={(e)=>uploadFiles(e, dispatch, uploadURL, activeDirectory, activeDirectoryString)}
        onDragOver={(e)=>e.preventDefault()}
        onDragEnter={(e)=>e.preventDefault()}
        onDragExit={(e)=>e.preventDefault()}
        id="assets-browser-panel-container">
        <div id="assets-browser">
          {folders}
          {files}
        </div>
      </section>
    </div>
  );
}
