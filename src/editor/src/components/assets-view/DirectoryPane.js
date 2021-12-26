import React from 'react';
import '@blueprintjs/core/lib/css/blueprint.css';
import { useSelector, useDispatch } from 'react-redux';
import { addFolder, removeFolder, moveFolder, renameFolder, selectFolder, selectDirectoryTreeState } from '../../application/js/features/directoryTreeSlice.js';
import { Tree, Classes } from "@blueprintjs/core";
import './DirectoryPane.css'

export default function DirectoryPane(){
  const nodeEditor = React.useRef();
  const treeState = useSelector(selectDirectoryTreeState);
  const dispatch = useDispatch();
  const defaultNodes={};

  return(
    <div id="directory-panel">
      <section id="directory-panel-flex-container">
        <div id="directories">
            <Tree
              contents={treeState}
              className={Classes.ELEVATION_0}
            />
        </div>
      </section>
    </div>
  );
}
