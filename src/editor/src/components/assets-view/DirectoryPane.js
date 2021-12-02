import React from 'react';
import '@blueprintjs/core/lib/css/blueprint.css';
import { Tree, Classes } from "@blueprintjs/core";

export default function DirectoryPane(){
  const sampleData = [
      {
        id: 0,
        hasCaret: true,
        icon: "folder-close",
        label: "Textures"
      },
      {
        id: 1,
        hasCaret: true,
        icon: "folder-close",
        label: "Brushes"
      },
      {
        id: 2,
        hasCaret: true,
        icon: "folder-close",
        label: "3D Modals"
      },
    ];

  return(
    <div id="directory-panel">
      <section id="directory-panel-flex-container">
        <div id="directories">
            <Tree
              contents={sampleData}
              className={Classes.ELEVATION_0}
            />
        </div>
      </section>
    </div>
  );
}
