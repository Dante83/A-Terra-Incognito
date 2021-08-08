import React, { Component } from 'react';
import Toolstrip from './components/toolstrip/Toolstrip.js'
import ShaderView from './components/shader-view/ShaderView.js'
import EditingView from './components/editing-view/EditingView.js'
import AssetsView from './components/assets-view/AssetsView.js'
import { FocusStyleManager } from "@blueprintjs/core";
import '../node_modules/normalize.css/normalize.css';
import '../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css';
import '../node_modules/@blueprintjs/core/lib/css/blueprint.css';

export default class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      activeView: 'assets-view-tab'
    }

    this.handleActiveViewChange = this.handleActiveViewChange.bind(this);
    this.getActiveViewJSX = this.getActiveViewJSX.bind(this);
  }

  handleActiveViewChange(e){
    this.setState({activeView: e});
  }

  getActiveViewJSX(){
    const activeView = this.state.activeView;
    if(activeView === 'editing-view-tab'){
      console.log('editing-view');
      return <EditingView />;
    }
    else if(activeView === 'assets-view-tab'){
      console.log('assets-view');
      return <AssetsView />;
    }
    else if(activeView === 'shader-view-tab'){
      console.log('shader-view');
      return <ShaderView />;
    }
    else{
      console.error(`The an unexpected error occurred while rendering the page. The user requested ${activeView}, which is not a valid view name.`);
      return(<div>Error</div>);
    }
  }

  render(){
    FocusStyleManager.onlyShowFocusOnTabs();

    return(
      <div className="bp3-dark">
        <Toolstrip onActiveViewChange={this.handleActiveViewChange} />
        <div>
          {this.getActiveViewJSX()}
        </div>
      </div>
    );
  }
}
