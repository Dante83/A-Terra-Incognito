import React from 'react';
import { Mosaic, MosaicWindow } from 'react-mosaic-component';
import NodeGraphPane from './NodeGraphPane.js';
import PreviewPane from './PreviewPane.js';
import ResourcePane from './ResourcePane.js';
import NewMaterialModal from './NewMaterialModal.js'
import DeleteMaterialAlert from '../alerts/DeleteMaterialAlert.js'
import './ShaderView.css';
import '../../../node_modules/react-mosaic-component/react-mosaic-component.css';
import '../../../node_modules/normalize.css/normalize.css';
import '../../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css';
import '../../../node_modules/@blueprintjs/core/lib/css/blueprint.css';
import classNames from 'classnames';
import { Classes } from "@blueprintjs/core";

const THEMES = classNames('mosaic-blueprint-theme', Classes.DARK, 'bp4-dark');

const ELEMENT_MAP: { [viewId: string]: JSX.Element } = {
  'node-graph-pane': <NodeGraphPane/>,
  'preview-pane': <PreviewPane/>,
  'resource-pane': <ResourcePane/>,
};

export default function ShaderView(){
  return (
    <div id="view-container">
      <div id="view-space">
        <NewMaterialModal></NewMaterialModal>
        <DeleteMaterialAlert></DeleteMaterialAlert>
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
            first: 'node-graph-pane',
            second: {
              direction: 'column',
              first: 'preview-pane',
              second: 'resource-pane',
              splitPercentage: 40
            },
            splitPercentage: 80,
          }}
          className={THEMES}
          blueprintNamespace="bp3"
        />
      </div>
    </div>
  );
}
