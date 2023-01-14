import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeWorkbenchView, selectWorkbenchView } from './application/js/features/workbenchSlice.js';
import Toolstrip from './components/toolstrip/Toolstrip.js';
import ShaderView from './components/shader-view/ShaderView.js';
import EditingView from './components/editing-view/EditingView.js';
import AssetsView from './components/assets-view/AssetsView.js';
import { FocusStyleManager } from "@blueprintjs/core";
import '../node_modules/normalize.css/normalize.css';
import '../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css';
import '../node_modules/@blueprintjs/core/lib/css/blueprint.css';
import './App.css';

const THEMES = ['bp3-dark'];

function getActiveViewJSX(activeView){
  switch(activeView){
    case 'editing-view-tab':
      return <EditingView />;
    case 'assets-view-tab':
      return <AssetsView />;
    case 'shader-view-tab':
      return <ShaderView />;
    default :
      //console.error(`The an unexpected error occurred while rendering the page.
      //The user requested ${activeView}, which is not a valid view name.`);
      return(<div>Error</div>);
  }
}

export default function App(){
  const activeView = useSelector(selectWorkbenchView);
  const dispatch = useDispatch();
  FocusStyleManager.onlyShowFocusOnTabs();

  return(
    <div className={THEMES}
    onDrop={(e)=>{e.preventDefault();}}
    onDragOver={(e)=>e.preventDefault()}
    onDragEnter={(e)=>e.preventDefault()}
    onDragExit={(e)=>e.preventDefault()}>
      <Toolstrip onActiveViewChange={(e)=>dispatch(changeWorkbenchView(e))} />
      <div>
        {getActiveViewJSX(activeView)}
      </div>
    </div>
  );
}
