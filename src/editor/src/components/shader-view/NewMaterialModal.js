import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectMaterialList, selectActiveMaterial, createOrUpdateMaterial } from '../../application/js/features/materialListPaneSlice.js';
import { selectModalFormState, selectIsEditMaterialModalVisible, closeNewMaterialModal, validateMaterial } from '../../application/js/features/newMaterialModalSlice.js';
import { Dialog, Label, InputGroup, FormGroup, Button, Intent, Position, Toaster } from "@blueprintjs/core";
import '../../../node_modules/normalize.css/normalize.css';
import '../../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css';
import '../../../node_modules/@blueprintjs/core/lib/css/blueprint.css';
import './NewMaterialModal.css';

const THEMES = ['mosaic-blueprint-theme', 'bp3-dark'];

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
    }
    dispatch(validateMaterial(formData));
  }
  if(currentModalData.isFormValid){
    dispatch(createOrUpdateMaterial({
      materialName: currentModalData.materialName.value,
      outputTextureWidth: currentModalData.outputTextureWidth.value,
      outputTextureHeight: currentModalData.outputTextureHeight.value,
      outputMaterialType: currentModalData.outputMaterialType.value,
      wrapS: currentModalData.wrapS.value,
      wrapW: currentModalData.wrapW.value,
    }));
    dispatch(closeNewMaterialModal());
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
              <select  defaultValue={'repeat'}>
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
              <select  defaultValue={'repeate'}>
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
