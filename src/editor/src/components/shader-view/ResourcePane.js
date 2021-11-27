import React, {Component} from 'react';
import { store } from '../../application/js/Store.js';
import { useSelector, useDispatch } from 'react-redux';
import { viewMaterialGraph, selectActiveMaterial, selectMaterialList } from '../../application/js/features/materialListPaneSlice.js';
import './ResourcePane.css';

export default function ResourcePane(){
  const state = store.getState();
  const activeMaterialName = useSelector(selectActiveMaterial);
  const materialsList = Object.keys(useSelector(selectMaterialList));
  const canDelete = activeMaterialName !== "Terrain Heightmap" && activeMaterialName !== "Terrain Material Map";
  const dispatch = useDispatch();

  let deleteButtonClasses = "bp3-button bp3-intent-danger hidden";
  if(canDelete){
    deleteButtonClasses = "bp3-button bp3-intent-danger";
  }

  const materialSelectionList = [];
  for(let i = 0, numElements = materialsList.length; i < numElements; ++i){
    const materialName = materialsList[i];
    if(materialName !== activeMaterialName){
      materialSelectionList.push(
          <div class="bp3-button-group bp3-fill bp3-vertical">
            <a class="bp3-button" onClick={(e)=>dispatch(viewMaterialGraph(e.target.innerText))}>{materialName}</a>
          </div>
      );
    }
    else{
      materialSelectionList.push(
          <div class="bp3-button-group bp3-fill bp3-vertical">
            <a class="bp3-button" id="selected-material-button" onClick={(e)=>dispatch(viewMaterialGraph(e.target.innerText))}>{materialName}</a>
          </div>
      );
    }
  }

  return(
    <div id="material-selector-panel">
      <section id="material-selector-flex-container">
        <header id="material-selector-header">
          <h5 class="bp3-heading">Material Shaders</h5>
        </header>
        <div id="material-selector-list-container">
          <div id="material-selector-list-flex-box">
            { materialSelectionList }
            <div div="material-selector-list-filler"></div>
          </div>
        </div>
        <footer id="material-selector-footer">
          <div class="bp3-button-group" id="add-delete-shader-buttons">
            <button class="bp3-button bp3-intent-primary" id="add-shader-button">
              <span class="bp3-icon bp3-icon-add" icon="add"></span>
            </button>
            <button className={deleteButtonClasses} id="request-prompt-to-remove-shader-button">
              <span class="bp3-icon bp3-icon-remove" icon="remove"></span>
            </button>
          </div>
        </footer>
      </section>
    </div>
  );
}
