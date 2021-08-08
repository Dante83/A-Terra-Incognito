export default class ProjectFileBuilder(){
  constructor({jsonAPIUrl, textureAPIUrl, gltfAPIUrl}){
    this.createNewFile = this.createNewFile.bind(this);
    this.projectFile = this.createNewFile('New Project');
    this.openFile = this.openFile.bind(this);
    this.saveFile = this.saveFile.bind(this);
    this.saveAsFile = this.saveAsFile.bind(this);
  }

  createNewFile(fileName){
    this.projectFile = {
      fileName: fileName,
      aTerraIncognitoVersion: '0.1.0',
      materials: {},
      textures: {},
      gltfs: {},
      regionMaps: {},
      objects: [],
      surfaceDecorations: {}
    };
  }

  openFile(){
    //TODO: Grab file from web api
    this.projectFile = JSON.parse();
  }

  saveFile(){
    const jsonData = JSON.stringify(this.projectFile);
    //Save file to web api
  }

  saveAsFile(fileName){
    this.projectFile.name = fileName;
    this.saveFile();
  }
}
