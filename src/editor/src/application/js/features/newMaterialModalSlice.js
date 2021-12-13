import { createSlice, current } from '@reduxjs/toolkit';

const noBlankFormFieldsError = 'This form field cannot be left blank.';

function validateTextureSize(textureInputValue){
  if(textureInputValue === null || textureInputValue === ''){
    return [noBlankFormFieldsError];
  }
  else if((/^[1-9]\d*$/).test(textureInputValue)){
    const parsedValue = parseInt(textureInputValue);
    if(parsedValue < 2){
      return ['This texture dimension is too small. Please make your texture bigger. Optimally between 64-256 pixels.'];
    }
    else if(parsedValue > 8192){
      return ['This texture dimension is too large. Please make your texture smaller. Optimally between 64-256 pixels.'];
    }
    return [];
  }
  return ['This is not a valid number, please enter a natural number.'];
}

const validTextureWrapOptions = ['repeat', 'mirrored_repeat', 'clamp_to_edge'];

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
    validateMaterial: (state, action) => {
      const formValues = action.payload;
      const currentMaterialNames = formValues.currentMaterialNames;
      const presentState = current(state);
      state.isFormValid = true;
      const isUpdate = presentState.isUpdate;

      //Material Name
      if(!presentState.isUpdate){
        const materialName = formValues.materialName;
        state.materialName.errors = [];
        if(materialName === null || materialName === ''){//Name must not be null
          state.materialName.errors = [noBlankFormFieldsError];
        }
        else if(materialName.length > 64){//Name must be under 64 characters in length
          state.materialName.errors = ['The material name must not be over 64 characters in length.'];
        }
        else if(!(/^[ A-Za-z0-9_@.~/#&+-\s!?%^$*()-\[\]\\]*$/i).test(materialName)){
          //Name must contain only alphanumeric characters
          state.materialName.errors = ['The material must only contain alphanumeric characters, spaces, and some special characters.'];
        }
        else if(currentMaterialNames.hasOwnProperty(materialName)){//Name must be unique
          state.materialName.errors = ['The material name must be unique. No other material may share the same name as this material.'];
        }
        if(state.materialName.errors.length > 0){
          state.isFormValid = false;
        }
      }

      //Validation for output texture output texture width and height
      let errors = validateTextureSize(formValues.outputTextureWidth);
      state.outputTextureWidth.errors = [];
      if(errors.length > 0){
        state.outputTextureWidth.errors = [...errors];
        state.isFormValid = false;
      }

      errors = validateTextureSize(formValues.outputTextureHeight);
      state.outputTextureHeight.errors = [];
      if(errors.length > 0){
        state.outputTextureHeight.errors = [...errors];
        state.isFormValid = false;
      }

      //Validation for the texture type
      state.outputMaterialType.errors = [];
      if(!['material', 'rgba8', 'rgb8', 'rgba32', 'rgb32', 'rg32', 'rfp32'].includes(formValues.outputMaterialType)){
        state.outputMaterialType.errors = ['The selected Material Texture Type is not a valid option.'];
        state.isFormValid = false;
      }

      //Validation for the Wrap S and Wrap W
      state.wrapS.errors = [];
      if(!validTextureWrapOptions.includes(formValues.wrapS)){
        state.wrapS.errors = ['The selected Wrap S value is not a valid option.'];
        state.isFormValid = false;
      }

      state.wrapW.errors = [];
      if(!validTextureWrapOptions.includes(formValues.wrapW)){
        state.wrapW.errors = ['The selected Wrap W value is not a valid option.'];
        state.isFormValid = false;
      }
    }
  }
});

export const { closeNewMaterialModal, create, update, validateMaterial } = newMaterialModalSlice.actions;
export const selectIsEditMaterialModalVisible = function(state){
  return state.newMaterialModal.isVisible
};
export const selectModalFormState = function(state){
  return {...state.newMaterialModal};
}
export const newMaterialModalReducer = newMaterialModalSlice.reducer;
