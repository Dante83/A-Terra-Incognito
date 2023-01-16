import React from 'react';
import { Mosaic, MosaicWindow } from 'react-mosaic-component';
import './EditingView.css';
import EditorPane from './EditorPane.js';
import ToolPane from './ToolPane.js';
import '../../../node_modules/react-mosaic-component/react-mosaic-component.css';
import '../../../node_modules/normalize.css/normalize.css';
import classNames from 'classnames';
import { Classes } from "@blueprintjs/core";
import '../../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css';
import '../../../node_modules/@blueprintjs/core/lib/css/blueprint.css';

const THEMES = classNames('mosaic-blueprint-theme', Classes.DARK, 'bp4-dark');

const ELEMENT_MAP: { [viewId: string]: JSX.Element } = {
  a: <EditorPane></EditorPane>,
  b: <ToolPane></ToolPane>,
};

export default function EditingView(){
  return (
    <div id="view-container">
      <div id="view-space">
        <Mosaic
          id="view-pane-container"
          renderTile={(id, path) => (
            <MosaicWindow
              path={path}
              createNode={() => 'new'}
              title={ELEMENT_MAP[id]}>
              <h1>{ELEMENT_MAP[id]}</h1>
            </MosaicWindow>
          )}
          initialValue={{
            direction: 'row',
            first: 'a',
            second: 'b',
            splitPercentage: 95,
          }}
          className={THEMES}
          blueprintNamespace="bp4"
        />
      </div>
    </div>
  );
}
