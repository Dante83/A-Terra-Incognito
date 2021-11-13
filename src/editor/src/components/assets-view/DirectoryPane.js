import React, { useRef, Component } from 'react';
import { Classes, Icon, Intent, Tree} from "@blueprintjs/core";

const texturesDirectory = {test: 'text1'};
const gltfsDirectory = {};
const soundsDirectory = {};

export default class DirectoryPane extends Component {
  render(){return(
    <div id="directory-panel">
      <section id="directory-panel-flex-container">
        <div id="directories">
          <Tree id="textures-directory" contents={texturesDirectory}></Tree>
          <Tree id="gltfs-directory" contents={gltfsDirectory}></Tree>
          <Tree id="sounds-directory" contentst={soundsDirectory}></Tree>
        </div>
      </section>
    </div>
  );}
}
