import React from 'react';
import { Position, Toaster } from "@blueprintjs/core";
import '../../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css';
import '../../../node_modules/@blueprintjs/core/lib/css/blueprint.css';

const THEMES = ['mosaic-blueprint-theme', 'bp3-dark'];

export const toaster = Toaster.create({
  position: Position.TOP,
  usePortal: true,
  className:THEMES
});
