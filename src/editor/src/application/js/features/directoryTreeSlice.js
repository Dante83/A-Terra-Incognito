import { createSlice } from '@reduxjs/toolkit';

export const directoryTreeSlice = createSlice({
  name: 'directoryTree',
  initialState: {
    activePath: ['root'],
    treeStructure: 'test'
  },
  reducers: {
    addFolder: (state, action) => {
      //Fire a request to our API method to create a new folder inside our project directory
      //Once complete, dispatch a new method to request the creation of this folder here.
    },
    addFolderComplete: (state, action) => {
      //Once the API method above creates the folder in the project directory, show the new folder
      //as selectable in the tree structure
    },
    removeFolder: (state, action) => {
      //Fire a request to our API method to delete the folder inside our project directory
      //Once complete, dispatch a new method to request the deletion of the folder here.
    },
    removeFolderComplete: (state, action) => {
      //Once the API method above deletes the folder in the project directory, delete the folder from
      //the tree view here.
    },
    moveFolder: (state, action) => {
      //Fire a request to our API to move the folder to the new directory location
    },
    moveFolderComplete: (state, action) => {
      //Once the folder has been moved notify the user that this has changed and update the tree
    },
    renameFolder: (state, action) => {
      //Fire a request to our API method to rename the folder in our project directory
      //Once complete, dispatch a new method to request that this folder name be changed here.
    },
    renameFolderCoplete: (state, action) => {
      //Once the folder has been renamed, change the file name here.
    },
    selectFolder: (state, action) => {
      //Upon clicking a folder, open it up and show all the files inside
      //also set this as the active path so that new files are uploaded to this
      //location upon being dropped into the drop-zone.
    }
  }
});

export const { addFolder, addFolderComplete, removeFolder, removeFolderComplete, moveFolder, moveFolderComplete, renameFolder, renameFolderComplete, selectFolder } = directoryTreeSlice.actions;
export const selectDirectoryTreeState = (state) => state.directoryTree.treeStructure;
export const selectActiveDirectoryPath = (state) => state.directoryTree.activePath;
export const directoryTreeReducer = directoryTreeSlice.reducer;
