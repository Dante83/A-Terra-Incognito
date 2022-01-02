import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFolderCallback, removeFileCallback, clearSelectedItems, setDeleteFoldersAndFilesAlertVisibility,
 selectUploadURL, selectSelectedFiles, selectSelectedFolders, selectActiveDirectoryPath, selectDeleteFoldersAndFilesAlertVisible } from '../../application/js/features/directoryTreeSlice.js';
import { Alert } from "@blueprintjs/core";
import { toaster } from '../alerts/Toaster.js';
import '../../../node_modules/normalize.css/normalize.css';
import '../../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css';
import '../../../node_modules/@blueprintjs/core/lib/css/blueprint.css';

const THEMES = ['mosaic-blueprint-theme', 'bp3-dark'];

function deleteFile(targetURL, filePath, fileName, filePathStringPlusName, dispatch){
  fetch(targetURL + 'files/delete?deletion_path=' + encodeURIComponent(filePathStringPlusName))
  .then((response) => {
    const resolvedResponse = response.json().then(
      (result) => {
        if(result.success){
          dispatch(removeFileCallback({path: filePath, fileName: fileName}));
          toaster.show({
            message: 'Files/Folders Deleted',
            intent: 'success',
            icon: 'tick-circle'
          });
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

function deleteFolder(targetURL, folderPath, folderName, folderPathStringPlusName, dispatch){
  fetch(targetURL + 'folders/delete?deletion_path=' + encodeURIComponent(folderPathStringPlusName))
  .then((response) => {
    const resolvedResponse = response.json().then(
      (result) => {
        if(result.success){
          dispatch(removeFolderCallback({path: folderPath, folderName: folderName}));
          toaster.show({
            message: 'Files/Folders Deleted',
            intent: 'success',
            icon: 'tick-circle'
          });
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

async function deleteFilesAndFolders(dispatch, selectedFolders, selectedFiles, uploadURLString, activeDirectoryPath){
  //TODO: This is just an example URL, killing CORS is probably a bad idea
  //Filter our results so that we only have unique values
  const folders = [...(new Set(selectedFiles.map(x=>JSON.stringify(x))))].map(x=>JSON.parse(x));
  const files = [...(new Set(selectedFolders.map(x=>JSON.stringify(x))))].map(x=>JSON.parse(x));
  for(let i = 0; i < folders.length; ++i){
    const folder = folders[i];
    const folderPath = folder.path;
    const folderName = folder.name;
    const folderPathStringPlusName = folder.stringDirectory;
    deleteFolder(uploadURLString, folderPath, folderName, folderPathStringPlusName, dispatch);
  }

  for(let i = 0; i < files.length; ++i){
    const file = files[i];
    const filePath = file.path;
    const fileName = file.name;
    const filePathStringPlusName = file.stringDirectory;
    deleteFile(uploadURLString, filePath, fileName, filePathStringPlusName, dispatch);
  }

  dispatch(setDeleteFoldersAndFilesAlertVisibility(false));
  dispatch(clearSelectedItems());
}

export default function DeleteFoldersAndFilesAlert(){
  const alertIsVisible = useSelector(selectDeleteFoldersAndFilesAlertVisible);
  const selectedFolders = useSelector(selectSelectedFolders);
  const selectedFiles = useSelector(selectSelectedFiles);
  const activeDirectoryPath = useSelector(selectActiveDirectoryPath);
  const uploadURLString = useSelector(selectUploadURL);
  const dispatch = useDispatch();

  return(
    <Alert isOpen={alertIsVisible}
      intent="danger"
      confirmButtonText="Delete"
      cancelButtonText="Cancel"
      canOutsideClickCancel={true}
      canEscapeKeyCancel={true}
      className={THEMES}
      onConfirm={()=>deleteFilesAndFolders(dispatch, selectedFolders, selectedFiles, uploadURLString, activeDirectoryPath)}
      onCancel={()=>dispatch(setDeleteFoldersAndFilesAlertVisibility(false))}>
        Are you sure wish to delete all selected files/folders?<br/>
        <b>This cannot be undone.</b>
    </Alert>
  );
}
