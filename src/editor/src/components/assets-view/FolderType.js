import React from 'react';
import '@blueprintjs/core/lib/css/blueprint.css';
import { useDispatch } from 'react-redux';
import { openFolder } from '../../application/js/features/directoryTreeSlice.js';
import { Icon } from "@blueprintjs/core";
import './FolderType.css'

export default function FolderType(props){
  const dispatch = useDispatch();

  return(
    <div className="file-or-folder-type">
      <div className="file-or-folder-icon" data={props.stringifiedDirectory} onDoubleClick={(e)=>dispatch(openFolder(e.currentTarget.attributes.data.value))}>
        <Icon icon="folder-close" size={80} intent="none" />
      </div>
      <div className="file-label">{props.label}</div>
    </div>
  );
}
