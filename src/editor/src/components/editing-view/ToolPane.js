import React from 'react';
import { Menu, MenuItem } from "@blueprintjs/core";
import { useSelector, useDispatch } from 'react-redux';
import { selectActiveTool, setActiveTool } from '../../application/js/features/landEditorSlice.js';
import { faArrowsUpDownLeftRight, faObjectGroup, faWandMagicSparkles, faPaintbrush,
faFillDrip, faHandPointUp, faTrowel } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ToolPane.css';

export default function ResourcePane(){
  const activeToolName = useSelector(selectActiveTool);
  const dispatch = useDispatch();

  const toolNameList = ['move', 'select', 'magicwand', 'paintbrush', 'paintbucket', 'blend', 'level'];
  const iconList = [faArrowsUpDownLeftRight, faObjectGroup, faWandMagicSparkles, faPaintbrush,
  faFillDrip, faHandPointUp, faTrowel];
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
            <FontAwesomeIcon id={faIconId} icon={icon} />
          </span>
        </div>
      );
    }
    else{
      tools.push(
        <div key={key} className="edit-view-tool-button">
          <span id={key} className="bp4-button" id="selected-tool-button">
            <FontAwesomeIcon icon={icon} />
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
            { tools }
            <div div="tool-selector-list-filler"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
