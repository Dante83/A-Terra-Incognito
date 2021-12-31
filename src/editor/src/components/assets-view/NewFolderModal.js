import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectModalFormState, selectIsEditFolderModalVisible, closeNewFolderModal, displayErrors } from '../../application/js/features/newFolderModalSlice.js';
import { addFolderCallback, selectDirectoryTreeState, selectActiveDirectoryPath, selectUploadURL } from '../../application/js/features/directoryTreeSlice.js';
import { Dialog, InputGroup, FormGroup, Button } from "@blueprintjs/core";
import { toaster } from '../alerts/Toaster.js';
import '../../../node_modules/normalize.css/normalize.css';
import '../../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css';
import '../../../node_modules/@blueprintjs/core/lib/css/blueprint.css';
import './NewFolderModal.css';

const THEMES = ['mosaic-blueprint-theme', 'bp3-dark'];

async function makeCreateFolderRequest(dispatch, targetURL, targetDirectory, folderLabel, currentDirectory){
  //TODO: This is just an example URL, killing CORS is probably a bad idea
  fetch(targetURL + '?directory=example_project_1%2fassets%2f' + encodeURIComponent(targetDirectory) + '&folder_name=' + encodeURIComponent(folderLabel),
  {
    mode: 'no-cors' // 'cors' by default
  })
  .then((response) => {
    //Presume success because that is the best we can do with CORS
    //if(response.success){
    if(true){
      dispatch(addFolderCallback({path: currentDirectory, newFolderName: folderLabel}));
      toaster.show({
        message: 'Folder Created',
        intent: 'success',
        icon: 'tick-circle'
      });
    }
    else{
      toaster.show({
        message: ("Error: " + response.msg),
        intent: 'danger',
        icon: 'error'
      });
    }
  })
  .catch((error) => {
    toaster.show({
      message: ("Error: " + error),
      intent: 'danger',
      icon: 'error'
    });
  });
}

function submitFormAction(formValues, isUpdate, displayErrorsReducer, closeModalReducer, dispatch, materialName){
  const noBlankFormFieldsError = 'This form field cannot be left blank.';
  let state = {
    folderName: {
      value: formValues.folderName,
      errors: []
    },
    isUpdate: isUpdate,
  };
  let isValid = true;
  const currentFolderNames = formValues.currentFolderNames;

  //Folder Name
  if(!isUpdate){
    const folderName = formValues.folderName;
    state.folderName.errors = [];
    if(folderName === null || folderName === ''){//Name must not be null
      state.folderName.errors = [noBlankFormFieldsError];
    }
    else if(folderName.length > 256){//Name must be under 64 characters in length
      state.folderName.errors = ['The folder name must not be over 256 characters in length.'];
    }
    else if(!(/^[^\\/?%*:|"<>.]+$/i).test(folderName)){
      //Name must contain only alphanumeric characters
      state.folderName.errors = ['The folder name must only contain alphanumeric characters, spaces, and some special characters.'];
    }
    else if(currentFolderNames.includes(folderName)){//Name must be unique
      state.folderName.errors = ['The name name must be unique. No other folder may share the same name as this folder.'];
    }
    if(state.folderName.errors.length > 0){
      isValid = false;
    }
  }

  if(isValid){
    //If this folder name is valid, call for the creation of this folder through an async thunk
    makeCreateFolderRequest(dispatch, formValues.targetURL, formValues.directoryPathString, formValues.folderName, formValues.currentDirectory);
    dispatch(closeModalReducer());
  }
  else{
    dispatch(displayErrorsReducer(state));
  }
}

export default function NewFolderModal(){
  const newFolderModalVisible = useSelector(selectIsEditFolderModalVisible);
  const currentModalData = useSelector(selectModalFormState);
  const currentDirectory = useSelector(selectActiveDirectoryPath);
  const directoryTree = useSelector(selectDirectoryTreeState);
  const uploadURLString = useSelector(selectUploadURL);
  const targetURL = uploadURLString + 'folders/create';
  let directoryData = directoryTree[currentDirectory[0]];
  let directoryPathString = directoryData.label;
  for(let i = 1; i < currentDirectory.length; ++i){
    const subdirectory = currentDirectory[i];
    directoryData = directoryData.childNodes[subdirectory];
    directoryPathString += '/' + directoryData.label;
  }
  const otherFolderNames = directoryData.childNodes.map((x) => x.label);

  const dispatch = useDispatch();
  let title;
  let createOrUpdateText;
  let createOrUpdateInfoText;
  if(currentModalData.isUpdate){
    title = "Rename Folder";
    createOrUpdateText = 'Update';
    createOrUpdateInfoText = 'Enter the new folder name';
  }
  else{
    title = "New Folder";
    createOrUpdateText = 'Create';
    createOrUpdateInfoText = 'Enter the folder name';
  }
  const formSubmit = function(e){
    e.preventDefault();
    const target = e.target;
    const formData = {
      currentDirectory: [...currentDirectory],
      targetURL: targetURL,
      directoryPathString: directoryPathString,
      currentFolderNames: otherFolderNames,
      folderName: target[0].value,
    };
    submitFormAction(formData, currentModalData.isUpdate, displayErrors, closeNewFolderModal, dispatch);
  }

  return(
    <Dialog
      title={title}
      usePortal={true}
      isOpen={newFolderModalVisible}
      className={THEMES}
      onClose={(e)=>dispatch(closeNewFolderModal())}>
        <form id="new-folder-form-modal" onSubmit={formSubmit}>
          <p>{createOrUpdateInfoText}</p>

          <FormGroup
              label="Folder Name"
              labelFor="folder-name-input"
              labelInfo="(required)"
              intent={currentModalData.folderName.errors.length > 0 ? 'danger' : 'primary'}
              helperText={currentModalData.folderName.errors.join('<br/>')}
          >
              <InputGroup id="folder-name-input" placeholder="Folder Name" />
          </FormGroup>

          <div id="new-folder-button-group">
            <Button type="submit" id="create-folder-button" intent="success" align="right">
              {createOrUpdateText}
            </Button>
            &nbsp;
            <Button id="cancel-folder-creation-button" align="right" onClick={(e)=>dispatch(closeNewFolderModal())}>
              Cancel
            </Button>
          </div>
        </form>
    </Dialog>
  );
}
