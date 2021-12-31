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
    activePath: [0],
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
      //Once the API method above creates the folder in the project directory, show the new folder
      //as selectable in the tree structure
    },
    removeFileCallback: (state, action) => {
      //Once the API method above deletes the folder in the project directory, delete the folder from
      //the tree view here.
    },
    moveFileCallback: (state, action) => {
      //Once the folder has been moved notify the user that this has changed and update the tree
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
    }
  }
});

export const { addFileCallback, removeFileCallback, moveFileCallback, addFolderCallback,
removeFolderCallback, moveFolderCallback, openFolder, setFolderExpanded } = directoryTreeSlice.actions;
export const selectUploadURL = (state) => state.directoryTree.uploadURL;
export const selectDownloadURL = (state) => state.directoryTree.downloadURL;
export const selectDirectoryTreeState = (state) => state.directoryTree.treeStructure;
export const selectActiveDirectoryPath = (state) => state.directoryTree.activePath;
export const directoryTreeReducer = directoryTreeSlice.reducer;
