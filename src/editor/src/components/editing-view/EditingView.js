import React from 'react';
import { Mosaic, MosaicWindow } from 'react-mosaic-component';
import './EditingView.css';
import EditorPane from './EditorPane.js';
import '../../../node_modules/react-mosaic-component/react-mosaic-component.css';
import '../../../node_modules/normalize.css/normalize.css';
import classNames from 'classnames';
import { Classes } from "@blueprintjs/core";
import '../../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css';
import '../../../node_modules/@blueprintjs/core/lib/css/blueprint.css';

//We don't USE Blueprint 4, but frick, Mosaic just assumes it and creates classes
//with this name to throw a wrench into our lives - even though it has this namespace thing
//it apparently ignores?
const THEMES = classNames('mosaic-blueprint-theme', Classes.DARK, 'bp4-dark');

const ELEMENT_MAP: { [viewId: string]: JSX.Element } = {
  a: <EditorPane></EditorPane>,
  b: <div id="right-shader-view-window"></div>,
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
          blueprintNamespace="bp3"
        />
      </div>
    </div>
  );
}
