import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideRemoveMaterialAlert, removeMaterial, selectActiveMaterial, selectDeleteMaterialAlertVisible } from '../../application/js/features/materialListPaneSlice.js';
import { Alert, Intent } from "@blueprintjs/core";
import '../../../node_modules/normalize.css/normalize.css';
import '../../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css';
import '../../../node_modules/@blueprintjs/core/lib/css/blueprint.css';

const THEMES = ['mosaic-blueprint-theme', 'bp3-dark'];

export default function FileDeletionAlert(){
  const alertIsVisible = useSelector(selectDeleteMaterialAlertVisible);
  const activeMaterial = useSelector(selectActiveMaterial);
  const dispatch = useDispatch();

  return(
    <Alert isOpen={alertIsVisible}
      intent="danger"
      confirmButtonText="Delete"
      cancelButtonText="Cancel"
      canOutsideClickCancel={true}
      canEscapeKeyCancel={true}
      onConfirm={()=>dispatch(removeMaterial(activeMaterial))}
      onCancel={()=>dispatch(hideRemoveMaterialAlert())}>
        Do you wish to remove the material, <b>{activeMaterial}</b>? <br/>
        <b>This cannot be undone.</b>
    </Alert>
  );
}
