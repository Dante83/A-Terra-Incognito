import { createSlice, current } from '@reduxjs/toolkit';

const blankState = {
  materialName: {
    value: '',
    errors: []
  },
  outputTextureWidth: {
    value: 512,
    errors: []
  },
  outputTextureHeight: {
    value: 512,
    errors: []
  },
  outputMaterialType: {
    value: 'RGB 8 Bit',
    errors: []
  },
  wrapS: {
    value: 'Repeat',
    errors: []
  },
  wrapW: {
    value: 'Repeat',
    errors: []
  },
  isFormValid: false,
  isUpdate: false,
  isVisible: false
};

export const newMaterialModalSlice = createSlice({
  name: 'newMaterialModal',
  initialState: {...blankState},
  reducers: {
    closeNewMaterialModal: (state, action) => {
      state.isVisible = false;
    },
    create: (state, action) => {
      //Reset our state to the default values
      state.materialName = {
        value: '',
        errors: []
      };
      state.outputTextureWidth = {
        value: 512,
        errors: []
      };
      state.outputTextureHeight = {
        value: 512,
        errors: []
      };
      state.outputMaterialType = {
        value: 'RGB 8 Bit',
        errors: []
      };
      state.wrapS = {
        value: 'repeat',
        errors: []
      };
      state.wrapW = {
        value: 'repeat',
        errors: []
      };
      state.isUpdate = false;
      state.isFormValid = false;
      state.isVisible = true;
    },
    update: (state, action) => {
      //Reset our state to the value presented
      const formValues = action.payload;
      state.materialName.value = formValues.materialName;
      state.outputTextureWidth.value = formValues.outputTextureWidth;
      state.outputTextureHeight.value = formValues.outputTextureHeight;
      state.outputMaterialType.value = formValues.outputMaterialType;
      state.wrapS.value = formValues.wrapS;
      state.wrapW.value = formValues.wrapW;
      state.isFormValid = true;
      state.isUpdate = true;
      state.isVisible = true;
    },
    displayErrors: (state, action) => {
      const payload = action.payload;
      state.materialName.errors = [...payload.materialName.errors];
      state.materialName.value = payload.materialName.value;
      state.outputTextureWidth.errors = [...payload.outputTextureWidth.errors];
      state.outputTextureWidth.value = payload.outputTextureWidth.value;
      state.outputTextureHeight.errors = [...payload.outputTextureHeight.errors];
      state.outputTextureHeight.value = payload.outputTextureHeight.value;
      state.outputMaterialType.errors = [...payload.outputMaterialType.errors];
      state.outputMaterialType.value = payload.outputMaterialType.value;
      state.wrapS.errors = [...payload.wrapS.errors];
      state.wrapS.value = payload.wrapS.value;
      state.wrapW.errors = [...payload.wrapW.errors];
      state.wrapW.value = payload.wrapW.value;
    }
  }
});

export const { closeNewMaterialModal, create, update, displayErrors } = newMaterialModalSlice.actions;
export const selectIsEditMaterialModalVisible = function(state){
  return state.newMaterialModal.isVisible
};
export const selectModalFormState = function(state){
  return {...state.newMaterialModal};
}
export const newMaterialModalReducer = newMaterialModalSlice.reducer;
