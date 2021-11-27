import React, { Component, useState } from 'react';
import { store } from './application/js/Store.js';
import { useSelector, useDispatch } from 'react-redux';
import { deleteMaterial } from './application/js/features/resourcePaneSlice.js';
import { Alert, Button, Intent } from "@blueprintjs/core";
import '../node_modules/normalize.css/normalize.css';
import '../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css';
import '../node_modules/@blueprintjs/core/lib/css/blueprint.css';

export default DeleteShaderVerification(){
  return(
    <Alert
      cancelButtonText="Cancel"
      canEscapeKeyCancel={true}
      confirmButtonText="Delete"
      intent={Intent.DANGER}

      icon="trash"
      isOpen={true} >
        <p>
          Are you sure you want to delete the material <b>{}</b>? You cannot undo this action.
        </p>
    </Alert>
  );
}
