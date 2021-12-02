import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeAddMaterialModalVisibility, addMaterial, selectNewMaterialModalVisible } from '../../application/js/features/materialListPaneSlice.js';
import { Dialog, Label, InputGroup, FormGroup, Button, Intent } from "@blueprintjs/core";
import '../../../node_modules/normalize.css/normalize.css';
import '../../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css';
import '../../../node_modules/@blueprintjs/core/lib/css/blueprint.css';

const THEMES = ['mosaic-blueprint-theme', 'bp3-dark'];

export default function NewMaterialModal(){
  const newMaterialModalVisible = useSelector(selectNewMaterialModalVisible);
  const dispatch = useDispatch();

  return(
    <Dialog
      title="New Material"
      usePortal={true}
      isOpen={newMaterialModalVisible}
      className={THEMES}
      onClose={(e)=>dispatch(changeAddMaterialModalVisibility(false))}>
        <FormGroup
            label="Material Name"
            labelFor="material-name-input"
            labelInfo="(required)"
        >
            <InputGroup id="material-name-input" placeholder="Material Name" />
        </FormGroup>

        <FormGroup
            label="Output Texture Size"
            labelFor="texture-size-selector"
            labelInfo="(required)"
        >
          <div id="texture-size-selector" class="bp3-html-select .modifier bp3-fill">
            <select>
              <option selected>Choose A Size...</option>
              <option value="32">32x32</option>
              <option value="64">64x64</option>
              <option value="128">128x128</option>
              <option value="256">256x256</option>
              <option value="512">512x512</option>
              <option value="1024">1024x1024</option>
              <option value="2048">2048x2048</option>
              </select>
            <span class="bp3-icon bp3-icon-double-caret-vertical"></span>
          </div>
        </FormGroup>

        <FormGroup
            label="Output Material Type"
            labelFor="texture-type-selector"
            labelInfo="(required)"
        >
          <div id="texture-type-selector" class="bp3-html-select .modifier bp3-fill">
            <select>
              <option selected>Choose A Texture Type...</option>
              <option value="material">Material</option>
              <option value="rgba8">RGBA 8-Bit</option>
              <option value="rgb8">RGB 8-Bit</option>
              <option value="rgba32">RGBA Channel Floating Point</option>
              <option value="rgb32">RGB Channel Floating Point</option>
              <option value="rg32">RG Channel Floating Point</option>
              <option value="rfp32">R Channel Floating Point</option>
            </select>
            <span class="bp3-icon bp3-icon-double-caret-vertical"></span>
          </div>
        </FormGroup>

        <div id="new-material-button-group">
          <Button id="cancel-material-creation-button" align="right" onClick={(e)=>dispatch(changeAddMaterialModalVisibility(false))}>
            Cancel
          </Button>
          &nbsp;
          <Button id="create-material-button" intent="success" align="right" onClick={(e)=>dispatch(addMaterial(false))}>
            Create
          </Button>
        </div>
    </Dialog>
  );
}
