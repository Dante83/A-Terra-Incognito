import produce from "immer";
import { createSlice, current } from '@reduxjs/toolkit';

function setChildNodesToClosed(subDirectory){
  if(subDirectory.childNodes && !!subDirectory.childNodes.length){
    for(let i = 0; i < subDirectory.childNodes.length; ++i){
      const childNode = subDirectory.childNodes[i];
      childNode.expanded = false;
      setChildNodesToClosed(childNode);
    }
  }
}

function expandFolder(state, action){
  //Upon clicking the carrot next to the folder, choose whether to expand or
  //collapse it.
  const payload = action.payload;
  const expanded = payload.expanded;
  const directory = JSON.parse(payload.directory);
  if(expanded){
    //Open this and all parents up to this add folder
    let subDirectory = state.treeStructure[directory[0]];
    subDirectory.expanded = true;
    for(let i = 1; i < directory.length; ++i){
      subDirectory = subDirectory.childNodes[directory[i]];
      subDirectory.expanded = true;
    }
  }
  else{
    //Close this and all children below this
    let subDirectory = state.treeStructure[directory[0]];;
    for(let i = 0; i < directory.length - 1; ++i){
      subDirectory = subDirectory.childNodes[directory[i]];
    }
    subDirectory.expanded = false;
    setChildNodesToClosed(subDirectory);
  }

  return [state, action];
}

function getPathItem(directory, directoryTree){
  let subdirectory = directoryTree[directory[0]];
  for(let i = 1; i < directory.length; ++i){
    subdirectory = subdirectory.childNodes[directory[i]];
  }
  return subdirectory;
}

export const directoryTreeSlice = createSlice({
  name: 'directoryTree',
  initialState: {
    uploadURL: 'http://localhost:5000/',
    downloadURL: 'http://localhost:3000/example/example_project_1/assets',
    deleteFoldersAndFilesAlertVisible: false,
    replaceExistingFilesAlertVisible: false,
    skipReplaceExistingFilesAlert: false,
    activePath: [0],
    selectedFiles: [],
    selectedFolders: [],
    treeStructure: [
      {
        label: "Textures",
        expanded: false,
        isSelected: true,
        files: [],
        childNodes: []
      },
      {
        label: "3D Models",
        expanded: false,
        isSelected: false,
        files: [],
        childNodes: [],
      },
      {
        label: "Sounds",
        expanded: false,
        isSelected: false,
        childNodes: [],
        files: [],
      }
    ]
  },
  reducers: {
    addFileCallback: (state, action) => {
      //Once the API method above creates the file in the project directory, show the new folder
      //as selectable in the tree structure
      const payload = action.payload;
      const path = payload.path;
      const newFileName = payload.newFileName;
      const newFileType = payload.newFileType;
      const lastModifiedDate = payload.lastModifiedDate;
      const isUpdate = payload.isUpdate;
      let targetDirectory = state.treeStructure[path[0]];
      for(let i = 1; i < path.length; ++i){
        targetDirectory = targetDirectory.childNodes[path[i]];
      }
      if(isUpdate){
        const currentFiles = current(targetDirectory.files);
        for(let i = 0; i < currentFiles.length; ++i){
          const currentFile = currentFiles[i];
          if(currentFile.label === newFileName){
            targetDirectory.files[i] = {
              label: newFileName,
              type: newFileType,
              lastModifiedDate: lastModifiedDate,
            };
          }
        }
      }
      else{
        targetDirectory.files.push({
          label: newFileName,
          type: newFileType,
          lastModifiedDate: lastModifiedDate,
        });
      }
    },
    removeFileCallback: (state, action) => {
      //Once the API method above deletes the file in the project directory, delete the folder from
      //the tree view here.
      const path = action.payload.path;
      const fileName = action.payload.filename;
      const currentState = current(state);
      const filterableFiles = getPathItem(path, state.treeStructure).files;
      const filteredFiles = filterableFiles.filter((item)=>{
        return item.label !== fileName;
      });
      filterableFiles = filteredFiles;
    },
    moveFileCallback: (state, action) => {
      //Once the file has been moved notify the user that this has changed and update the tree
    },
    addFolderCallback: (state, action) => {
      //Once the API method above creates the folder in the project directory, show the new folder
      //as selectable in the tree structure
      const payload = action.payload;
      const path = payload.path;
      const newFolderName = payload.newFolderName;
      let targetDirectory = state.treeStructure[path[0]];
      for(let i = 1; i < path.length; ++i){
        targetDirectory = targetDirectory.childNodes[path[i]];
      }
      targetDirectory.childNodes.push({
        label: newFolderName,
        expanded: false,
        isSelected: false,
        files: [],
        childNodes: [],
      });
    },
    removeFolderCallback: (state, action) => {
      //Once the API method above deletes the folder in the project directory, delete the folder from
      //the tree view here.
      const path = action.payload.path.slice(0,-1);
      const folderName = action.payload.folderName;
      let filterableFolders = getPathItem(path, state.treeStructure);
      let readDirectory = current(filterableFolders);
      produce(state, (draftState) => {
        filterableFolders.childNodes = filterableFolders.childNodes.filter((x) => x.label !== folderName)
      });
    },
    moveFolderCallback: (state, action) => {
      //Once the folder has been moved notify the user that this has changed and update the tree
    },
    openFolder: (state, action) => {
      //Upon clicking a folder, open it up and show all the files inside
      //also set this as the active path so that new files are uploaded to this
      //location upon being dropped into the drop-zone.
      const currentState = current(state);
      const currentlyActiveDirectory = getPathItem(currentState.activePath, state.treeStructure);
      currentlyActiveDirectory.isSelected = false;
      const directory = JSON.parse(action.payload);
      const newActiveDirectory = getPathItem(directory, state.treeStructure);
      newActiveDirectory.isSelected = true;
      state.activePath = [...directory];
      [state, action] = expandFolder(state, {payload: {expanded: true, directory: action.payload}});
    },
    setFolderExpanded: (state, action) => {
      [state, action] = expandFolder(state, action);
    },
    clearSelectedItems: (state, action) => {
      state.selectedFiles = [];
      state.selectedFolders = [];
    },
    addFileToSelection: (state, action) => {
      const fileName = action.payload;
      const currentData = current(state);
      const path = currentData.activePath;
      let targetWriteDirectory = state.treeStructure[path[0]];
      let targetReadDirectory = currentData.treeStructure[path[0]];
      let currentPathString = targetReadDirectory.label;
      for(let i = 1; i < path.length; ++i){
        targetWriteDirectory = targetWriteDirectory.childNodes[path[i]];
        targetReadDirectory = targetReadDirectory.childNodes[path[i]];
        currentPathString = currentPathString + '/' + targetReadDirectory.label;
      }

      //Check this directory exists or not
      let fileIndex = -1;
      for(let i = 0; i < targetReadDirectory.files.length; ++i){
        if(targetReadDirectory.files[i].label === fileName){
          fileIndex = i;
          break;
        }
      }
      if(fileIndex !== -1){
        state.selectedFiles.push({
          path: [...path],
          fileName: fileName,
          stringDirectory: currentPathString + '/' + fileName
        });
      }
      else{
        console.warn(`The file ${currentPathString}/${fileName} does not exist and could not be added to the selection.`);
      }
    },
    removeFileFromSelection: (state, action) => {
      console.log('test');
    },
    addFolderToSelection: (state, action) => {
      const currentState = current(state);
      const directory = JSON.parse(action.payload);
      const fullPath = getPathItem(directory, state.treeStructure);

      if(fullPath){
        //Get the path string
        let currentDirectory = currentState.treeStructure[directory[0]];
        let pathString = currentDirectory.label;
        for(let i = 1; i < directory.length; ++i){
          currentDirectory = currentDirectory.childNodes[directory[i]];
          pathString = pathString + '/' + currentDirectory.label;
        }
        const folderName = currentDirectory.label;

        //Check if this already exists or not
        let alreadyInSelection = false;
        for(let i = 0; i < currentState.selectedFolders.length; ++i){
          const checkFolder = currentState.selectedFolders[i];
          if(checkFolder.pathString === pathString){
            alreadyInSelection = true;
            break;
          }
        }
        if(!alreadyInSelection){
          state.selectedFolders.push({
            path: [...directory],
            folderName: folderName,
            stringDirectory: pathString
          })
        }
      }
    },
    removeFolderFromSelection: (state, action) => {
      console.log('test');
    },
    setDeleteFoldersAndFilesAlertVisibility: (state, action) => {
      const currentState = current(state);
      const numSelectedFiles = currentState.selectedFiles.length;
      const numSelectedFolders = currentState.selectedFolders.length;
      if(action.payload && (numSelectedFiles > 0 || numSelectedFolders > 0)){
        state.deleteFoldersAndFilesAlertVisible = true;
      }
      else{
        state.deleteFoldersAndFilesAlertVisible = false;
      }
    }
  }
});

export const { addFileCallback, removeFileCallback, moveFileCallback, addFolderCallback,
removeFolderCallback, moveFolderCallback, openFolder, setFolderExpanded, setDeleteFoldersAndFilesAlertVisibility,
clearSelectedItems, addFolderToSelection, removeFolderFromSelection, addFileToSelection, removeFileFromSelection } = directoryTreeSlice.actions;
export const selectUploadURL = (state) => state.directoryTree.uploadURL;
export const selectDownloadURL = (state) => state.directoryTree.downloadURL;
export const selectDirectoryTreeState = (state) => state.directoryTree.treeStructure;
export const selectActiveDirectoryPath = (state) => state.directoryTree.activePath;
export const selectActiveDirectoryPathString = (state) => {
  const activePath = [...state.directoryTree.activePath];
  let treeStructure = state.directoryTree.treeStructure[activePath[0]];
  let activePathString = treeStructure.label;
  for(let i = 1; i < activePath.length; ++i){
    treeStructure = treeStructure.childNodes[activePath[i]];
    activePathString += `/${treeStructure.label}`;
  }
  return activePathString;
}
export const selectDeleteFoldersAndFilesAlertVisible = (state) => state.directoryTree.deleteFoldersAndFilesAlertVisible;
export const selectSelectedFiles = (state) => state.directoryTree.selectedFiles;
export const selectSelectedFolders = (state) => state.directoryTree.selectedFolders;
export const directoryTreeReducer = directoryTreeSlice.reducer;
