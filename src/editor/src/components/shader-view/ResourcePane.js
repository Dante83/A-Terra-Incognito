import React, {Component} from 'react';
import './ResourcePane.css';

export default function ResourcePane(){
  return(
    <div id="material-selector-panel">
      <section id="material-selector-flex-container">
        <header id="material-selector-header">
          <h5 class="bp3-heading">Material Shaders</h5>
        </header>
        <div id="material-selector-list-container">
          <div id="material-selector-list-flex-box">
            <div class="bp3-button-group bp3-fill bp3-vertical">
              <a class="bp3-button">Terrain Heightmap</a>
            </div>
            <div class="bp3-button-group bp3-fill bp3-vertical">
              <a class="bp3-button">Terrain Material Map</a>
            </div>
            <div div="material-selector-list-filler"></div>
          </div>
        </div>
        <footer id="material-selector-footer">
          <div class="bp3-button-group" id="add-delete-shader-buttons">
            <button class="bp3-button bp3-intent-primary" id="add-shader-button">
              <span class="bp3-icon bp3-icon-add" icon="add"></span>
            </button>
            <button class="bp3-button bp3-intent-danger" id="request-prompt-to-remove-shader-button">
              <span class="bp3-icon bp3-icon-remove" icon="remove"></span>
            </button>
          </div>
        </footer>
      </section>
    </div>
  );
}
