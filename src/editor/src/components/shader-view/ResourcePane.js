import React from 'react';
import { ContextMenu2 } from "@blueprintjs/popover2";
import { Menu, MenuItem } from "@blueprintjs/core";
import { useSelector, useDispatch } from 'react-redux';
import { viewMaterialGraph, showRemoveMaterialAlert, selectActiveMaterial, selectMaterialList } from '../../application/js/features/materialListPaneSlice.js';
import { create, update } from '../../application/js/features/newMaterialModalSlice.js';
import './ResourcePane.css';

export default function ResourcePane(){
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
    let menuOptions = () => <Menu><MenuItem text="Open" onClick={(e)=>dispatch(viewMaterialGraph(e.target.innerText))} /></Menu>;
    if(materialName !== 'Terrain Heightmap' &&  materialName !== 'Terrain Material Map'){
      let menuOptions = () => <Menu>
        <MenuItem text="Open" onClick={(e)=>dispatch(viewMaterialGraph(e.target.innerText))} />
        <MenuItem text="Edit Properties" onClick={(e)=>dispatch(update(e.target.innerText))} />
        <MenuItem text="Delete" onClick={(e)=>dispatch(showRemoveMaterialAlert(e.target.innerText))} />
      </Menu>;
    }
    if(materialName !== activeMaterialName){
      materialSelectionList.push(
          <ContextMenu2 content={menuOptions()}>
            <div key={materialName} className="bp3-button-group bp3-fill bp3-vertical">
              <span className="bp3-button" onClick={(e)=>dispatch(viewMaterialGraph(e.target.innerText))}>{materialName}</span>
            </div>
          </ContextMenu2>
      );
    }
    else{
      materialSelectionList.push(
          <ContextMenu2 content={menuOptions()}>
            <div key={materialName} className="bp3-button-group bp3-fill bp3-vertical">
              <span className="bp3-button" id="selected-material-button" onClick={(e)=>dispatch(viewMaterialGraph(e.target.innerText))}>{materialName}</span>
            </div>
          </ContextMenu2>
      );
    }
  }

  return(
    <div id="material-selector-panel">
      <section id="material-selector-flex-container">
        <header id="material-selector-header">
          <h5 className="bp3-heading">Material Shaders</h5>
        </header>
        <div id="material-selector-list-container">
          <div id="material-selector-list-flex-box">
            { materialSelectionList }
            <div div="material-selector-list-filler"></div>
          </div>
        </div>
        <footer id="material-selector-footer">
          <div className="bp3-button-group" id="add-delete-shader-buttons">
            <button className="bp3-button bp3-intent-primary" id="add-shader-button" onClick={(e)=>dispatch(create(true))} >
              <span className="bp3-icon bp3-icon-add" icon="add"></span>
            </button>
            <button className={deleteButtonClasses} id="request-prompt-to-remove-shader-button">
              <span className="bp3-icon bp3-icon-remove" icon="remove"></span>
            </button>
          </div>
        </footer>
      </section>
    </div>
  );
}
