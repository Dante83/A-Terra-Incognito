import React from 'react';
import { Menu, MenuItem } from "@blueprintjs/core";
import { useSelector, useDispatch } from 'react-redux';
import { selectActiveTool, setActiveTool } from '../../application/js/features/landEditorSlice.js';
import './ToolPane.css';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/solid.min.css';

export default function ResourcePane(){
  const activeToolName = useSelector(selectActiveTool);
  const dispatch = useDispatch();

  const toolNameList = ['move', 'select', 'magicwand', 'paintbrush', 'paintbucket', 'blend', 'level'];
  const iconList = ['fa-arrows', 'fa-object-group', 'fa-wand-magic-sparkles', 'fa-paint-brush',
  'fa-fill-drip', 'fa-hand-pointer-o', 'fa-trowel'];
  let tools = [];
  for(let i = 0, numElements = toolNameList.length; i < numElements; ++i){
    const toolName = toolNameList[i];
    const icon = iconList[i];
    const key = `${toolName}-btn`;
    const faIconId = `${toolName}-icn`; //Different id but we can just use a different ending to contain the key
    if(toolName !== activeToolName){
      tools.push(
        <div key={key} className="edit-view-tool-button">
          <span id={key} className="bp4-button bp4-active" onClick={(e)=>dispatch(setActiveTool(e.target.id))}>
            <i id={faIconId} className={`fa-solid ${icon}`} onClick={(e)=>dispatch(setActiveTool(e.target.id))}></i>
          </span>
        </div>
      );
    }
    else{
      tools.push(
        <div key={key} className="edit-view-tool-button">
          <span id={key} className="bp4-button" id="selected-tool-button">
            <i className={`fa-solid ${icon}`}></i>
          </span>
        </div>
      );
    }
  }

  return(
    <div id="tool-selector-panel">
      <section id="tool-selector-flex-container">
        <div id="tool-selector-list-container">
          <div id="tool-selector-list-flex-box">
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossOrigin="anonymous"/>
            { tools }
            <div div="tool-selector-list-filler"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
