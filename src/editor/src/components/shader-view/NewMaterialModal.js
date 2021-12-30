import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectMaterialList, createOrUpdateMaterial } from '../../application/js/features/materialListPaneSlice.js';
import { selectModalFormState, selectIsEditMaterialModalVisible, closeNewMaterialModal, displayErrors } from '../../application/js/features/newMaterialModalSlice.js';
import { Dialog, InputGroup, FormGroup, Button } from "@blueprintjs/core";
import '../../../node_modules/normalize.css/normalize.css';
import '../../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css';
import '../../../node_modules/@blueprintjs/core/lib/css/blueprint.css';
import './NewMaterialModal.css';

const THEMES = ['mosaic-blueprint-theme', 'bp3-dark'];

function validateTextureSize(textureInputValue){
  const noBlankFormFieldsError = 'This form field cannot be left blank.';
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

function submitFormAction(formValues, isUpdate, createOrUpdateMaterialReducer, displayErrorsReducer, closeModalReducer, dispatch, materialName){
  const noBlankFormFieldsError = 'This form field cannot be left blank.';
  let state = {
    materialName: {
      value: formValues.materialName,
      errors: []
    },
    outputTextureWidth: {
      value: formValues.outputTextureWidth,
      errors: []
    },
    outputTextureHeight: {
      value: formValues.outputTextureHeight,
      errors: []
    },
    outputMaterialType: {
      value: formValues.outputMaterialType,
      errors: []
    },
    wrapS: {
      value: formValues.wrapS,
      errors: []
    },
    wrapW: {
      value: formValues.wrapW,
      errors: []
    },
    isUpdate: isUpdate,
  };
  let isValid = true;
  const currentMaterialNames = formValues.currentMaterialNames;

  //Material Name
  if(!isUpdate){
    const materialName = formValues.materialName;
    state.materialName.errors = [];
    if(materialName === null || materialName === ''){//Name must not be null
      state.materialName.errors = [noBlankFormFieldsError];
    }
    else if(materialName.length > 64){//Name must be under 64 characters in length
      state.materialName.errors = ['The material name must not be over 64 characters in length.'];
    }
    else if(!(/^[ A-Za-z0-9_@.~/#&+-\s!?%^$*()-[]\\]*$/i).test(materialName)){
      //Name must contain only alphanumeric characters
      state.materialName.errors = ['The material must only contain alphanumeric characters, spaces, and some special characters.'];
    }
    else if(currentMaterialNames.includes(materialName)){//Name must be unique
      state.materialName.errors = ['The material name must be unique. No other material may share the same name as this material.'];
    }
    if(state.materialName.errors.length > 0){
      isValid = false;
    }
  }

  //Validation for output texture output texture width and height
  let errors = validateTextureSize(formValues.outputTextureWidth);
  state.outputTextureWidth.errors = [];
  if(errors.length > 0){
    state.outputTextureWidth.errors = [...errors];
    isValid = false;
  }

  errors = validateTextureSize(formValues.outputTextureHeight);
  state.outputTextureHeight.errors = [];
  if(errors.length > 0){
    state.outputTextureHeight.errors = [...errors];
    isValid = false;
  }

  //Validation for the texture type
  state.outputMaterialType.errors = [];
  if(!['material', 'rgba8', 'rgb8', 'rgba32', 'rgb32', 'rg32', 'rfp32'].includes(formValues.outputMaterialType)){
    state.outputMaterialType.errors = ['The selected Material Texture Type is not a valid option.'];
    isValid = false;
  }

  //Validation for the Wrap S and Wrap W
  state.wrapS.errors = [];
  const validTextureWrapOptions = ['repeat', 'mirrored_repeat', 'clamp_to_edge'];
  if(!validTextureWrapOptions.includes(formValues.wrapS)){
    state.wrapS.errors = ['The selected Wrap S value is not a valid option.'];
    isValid = false;
  }

  state.wrapW.errors = [];
  if(!validTextureWrapOptions.includes(formValues.wrapW)){
    state.wrapW.errors = ['The selected Wrap W value is not a valid option.'];
    isValid = false;
  }

  if(isValid){
    dispatch(createOrUpdateMaterialReducer(state));
    dispatch(closeModalReducer());
  }
  else{
    dispatch(displayErrorsReducer(state));
  }
}

export default function NewMaterialModal(){
  const currentMaterials = useSelector(selectMaterialList);
  const currentMaterialNames = Object.keys(currentMaterials);
  const newMaterialModalVisible = useSelector(selectIsEditMaterialModalVisible);
  const currentModalData = useSelector(selectModalFormState);
  const dispatch = useDispatch();
  const createOrUpdateText = currentModalData.isUpdate ? 'Update' : 'Create';
  const formSubmit = function(e){
    e.preventDefault();
    const target = e.target;
    const formData = {
      currentMaterialNames: currentMaterialNames,
      materialName: target[0].value,
      outputTextureWidth: target[1].value,
      outputTextureHeight: target[2].value,
      outputMaterialType: target[3].value,
      wrapS: target[4].value,
      wrapW: target[5].value,
    };
    submitFormAction(formData, currentModalData.isUpdate, createOrUpdateMaterial, displayErrors, closeNewMaterialModal, dispatch);
  }

  return(
    <Dialog
      title="New Material"
      usePortal={true}
      isOpen={newMaterialModalVisible}
      className={THEMES}
      onClose={(e)=>dispatch(closeNewMaterialModal())}>
        <form id="new-material-form-modal" onSubmit={formSubmit}>
          <FormGroup
              label="Material Name"
              labelFor="material-name-input"
              labelInfo="(required)"
              intent={currentModalData.materialName.errors.length > 0 ? 'danger' : 'primary'}
              helperText={currentModalData.materialName.errors.join('<br/>')}
          >
              <InputGroup id="material-name-input" placeholder="Material Name" />
          </FormGroup>

          <FormGroup
              label="Output Texture Width"
              labelFor="texture-width-input"
              labelInfo="(required)"
              intent={currentModalData.outputTextureWidth.errors.length > 0 ? 'danger' : 'primary'}
              helperText={currentModalData.outputTextureWidth.errors.join('<br/>')}
          >
            <InputGroup id="texture-width-input" defaultValue={256} placeholder="Output Texture Width" />
          </FormGroup>

          <FormGroup
              label="Output Texture Height"
              labelFor="texture-height-input"
              labelInfo="(required)"
              intent={currentModalData.outputTextureHeight.errors.length > 0 ? 'danger' : 'primary'}
              helperText={currentModalData.outputTextureHeight.errors.join('<br/>')}
          >
            <InputGroup id="texture-height-input" defaultValue={256} placeholder="Output Texture Height" />
          </FormGroup>

          <FormGroup
              label="Output Material Type"
              labelFor="texture-type-selector"
              labelInfo="(required)"
              intent={currentModalData.outputMaterialType.errors.length > 0 ? 'danger' : 'primary'}
              helperText={currentModalData.outputMaterialType.errors.join('<br/>')}
          >
            <div id="texture-type-selector" className="bp3-html-select .modifier bp3-fill">
              <select defaultValue={'material'}>
                <option value="material">Material</option>
                <option value="rgba8">RGBA 8-Bit</option>
                <option value="rgb8">RGB 8-Bit</option>
                <option value="rgba32">RGBA Channel Floating Point</option>
                <option value="rgb32">RGB Channel Floating Point</option>
                <option value="rg32">RG Channel Floating Point</option>
                <option value="rfp32">R Channel Floating Point</option>
              </select>
              <span className="bp3-icon bp3-icon-double-caret-vertical"></span>
            </div>
          </FormGroup>

          <FormGroup
              label="Wrap S"
              labelFor="texture-wrap-s-selector"
              labelInfo="(required)"
              intent={currentModalData.wrapS.errors.length > 0 ? 'danger' : 'primary'}
              helperText={currentModalData.wrapS.errors.join('<br/>')}
          >
            <div id="texture-wrap-s-selector" className="bp3-html-select .modifier bp3-fill">
              <select defaultValue={'repeat'}>
                <option value="repeat">Repeat</option>
                <option value="mirrored_repeat">Mirrored Repeat</option>
                <option value="clamp_to_edge">Clamp To Edge</option>
              </select>
              <span className="bp3-icon bp3-icon-double-caret-vertical"></span>
            </div>
          </FormGroup>

          <FormGroup
              label="Wrap W"
              labelFor="texture-wrap-s-selector"
              labelInfo="(required)"
              intent={currentModalData.wrapW.errors.length > 0 ? 'danger' : 'primary'}
              helperText={currentModalData.wrapW.errors.join('<br/>')}
          >
            <div id="texture-wrap-W-selector" className="bp3-html-select .modifier bp3-fill">
              <select defaultValue={'repeate'}>
                <option value="repeat">Repeat</option>
                <option value="mirrored_repeat">Mirrored Repeat</option>
                <option value="clamp_to_edge">Clamp To Edge</option>
              </select>
              <span className="bp3-icon bp3-icon-double-caret-vertical"></span>
            </div>
          </FormGroup>

          <div id="new-material-button-group">
            <Button type="submit" id="create-material-button" intent="success" align="right">
              {createOrUpdateText}
            </Button>
            &nbsp;
            <Button id="cancel-material-creation-button" align="right" onClick={(e)=>dispatch(closeNewMaterialModal())}>
              Cancel
            </Button>
          </div>
        </form>
    </Dialog>
  );
}
