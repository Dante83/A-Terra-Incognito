import { createSlice } from '@reduxjs/toolkit';

const blankState = {
  folderName: {
    value: 'Textures/',
    errors: []
  },
  isFormValid: false,
  isUpdate: false,
  isVisible: false
};

export const newFolderModalSlice = createSlice({
  name: 'newFolderModal',
  initialState: {...blankState},
  reducers: {
    closeNewFolderModal: (state, action) => {
      state.isVisible = false;
    },
    create: (state, action) => {
      //Reset our state to the default values
      state.folderName = {
        value: '',
        errors: []
      };
      state.isUpdate = false;
      state.isFormValid = false;
      state.isVisible = true;
    },
    update: (state, action) => {
      //Reset our state to the value presented
      const formValues = action.payload;
      state.folderName.value = formValues.folderName;
      state.isFormValid = true;
      state.isUpdate = true;
      state.isVisible = true;
    },
    displayErrors: (state, action) => {
      const payload = action.payload;
      state.folderName.errors = [...payload.folderName.errors];
      state.folderName.value = payload.folderName.value;
    }
  }
});

export const { closeNewFolderModal, create, update, displayErrors } = newFolderModalSlice.actions;
export const selectIsEditFolderModalVisible = function(state){
  return state.newFolderModal.isVisible
};
export const selectModalFormState = function(state){
  return {...state.newFolderModal};
}
export const newFolderModalReducer = newFolderModalSlice.reducer;
