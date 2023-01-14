import React from 'react';
import { Mosaic, MosaicWindow } from 'react-mosaic-component';
import NewFolderModal from './NewFolderModal.js';
import DeleteFoldersAndFilesAlert  from '../alerts/DeleteFoldersAndFilesAlert.js'
import './AssetsView.css';
import '../../../node_modules/react-mosaic-component/react-mosaic-component.css';
import '../../../node_modules/normalize.css/normalize.css';
import '../../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css';
import '../../../node_modules/@blueprintjs/core/lib/css/blueprint.css';
import DirectoryPane from './DirectoryPane.js';
import AssetsBrowserPane from './AssetsBrowserPane.js';
import classNames from 'classnames';
import { Classes } from "@blueprintjs/core";

//We don't USE Blueprint 4, but frick, Mosaic just assumes it and creates classes
//with this name to throw a wrench into our lives - even though it has this namespace thing
//it apparently ignores?
const THEMES = classNames('mosaic-blueprint-theme', Classes.DARK, 'bp4-dark');

const ELEMENT_MAP: { [viewId: string]: JSX.Element } = {
  'directory-pane': <DirectoryPane></DirectoryPane>,
  'assets-browser-pane': <AssetsBrowserPane></AssetsBrowserPane>
};

export default function AssetsView(){
  return (
    <div id="view-container">
      <div id="view-space">
        <DeleteFoldersAndFilesAlert></DeleteFoldersAndFilesAlert>
        <NewFolderModal></NewFolderModal>
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
            first: 'directory-pane',
            second: 'assets-browser-pane',
            splitPercentage: 20
          }}
          className={THEMES}
          blueprintNamespace="bp3"
        />
      </div>
    </div>
  );
}
