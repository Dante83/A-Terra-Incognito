import {SingleSide, Vector3, Vector2, WebGLRenderTarget,
NearestFilter, FloatType, RedFormat, OrthographicCamera, Scene,
PlaneGeometry, Mesh} from 'three';
import {PaintPointMaterial} from './shaders/paint-point-material.js';
import {PaintLineMaterial} from './shaders/paint-line-material.js';
import {PaintCurveMaterial} from './shaders/paint-curve-material.js';

const webGLFloatRenderTargetOptions = {
  type: FloatType,
  minificationFilter: NearestFilter,
  magnificationFilter: NearestFilter,
  depthBuffer: false,
  format: RedFormat
};
const heightMapHistory = new WebGLRenderTarget(4096, 4096, webGLFloatRenderTargetOptions);
const heightMap1 = new WebGLRenderTarget(4096, 4096, webGLFloatRenderTargetOptions);
const heightMap2 = new WebGLRenderTarget(4096, 4096, webGLFloatRenderTargetOptions);
let activeHeightMap = heightMap1;
let heightMapHistory = new Array(256);
let rendererRef;
let rendererIsSet = false;
const renderTargetScene = new Scene();
const camera = new OrthographicCamera(-1.0, 1.0, 1.0, -1.0, 0.1, 5.0);
renderTargetScene.add(camera);

const paintPointMaterial = new ShaderMaterial({
  point: Vector2(),
  pressure: 1.0,
  previousHeightMap: null
}, standardVertexShader, paintPointShaderFragment);

const paintLineMaterial = new ShaderMaterial({
  a: 0.0,
  b: 0.0,
  pressure0: 0.0,
  pressureF: 0.0,
  previousHeightMap: null
}, standardVertexShader, paintLineShaderFragment);

const paintCurveMaterial = new ShaderMaterial({
  a: [],
  b: [],
  c: [],
  pressureA: [],
  pressureB: [],
  pressureC: [],
  previousHeightMap: null
}, standardVertexShader, paintCurveShaderFragment);

//Set up the render target scene
const targetGeometry = new PlaneGeometry(1, 1);
const paintPointMesh = new Mesh(targetGeometry, paintPointMaterial);
const paintLineMesh = new Mesh(targetGeometry, paintLineMaterial);
const paintCurveMesh = new Mesh(targetGeometry, paintCurveMaterial);
const meshes = [paintPointMesh, paintLineMesh, paintCurveMesh];

function paintCurve(points, options){
  const targetHeightMap = activeHeightMap === heightMap1 ? heightMap2 : heightMap1;
  const originalRenderTarget = rendererRef.getRenderTarget();
  for(mesh of meshes){
    mesh.visible = false;
  }
  paintCurveMesh.visible = true;

  //Update the values


  //Do the render and add this new bit to our map
  rendererRef.render();
  rendererRef.setRenderer(originalRenderTarget);
  activeHeightMap = targetHeightMap;
};

function paintLine(points, options){
  const targetHeightMap = activeHeightMap === heightMap1 ? heightMap2 : heightMap1;
  const originalRenderTarget = rendererRef.getRenderTarget();
  for(mesh of meshes){
    mesh.visible = false;
  }
  paintLine.visible = true;

  //Update the values


  //Do the render and add this new bit to our map
  rendererRef.render();
  rendererRef.setRenderer(originalRenderTarget);
  activeHeightMap = targetHeightMap;
}

function paintPoint(point, options){
  const targetHeightMap = activeHeightMap === heightMap1 ? heightMap2 : heightMap1;
  const originalRenderTarget = rendererRef.getRenderTarget();
  for(mesh of meshes){
    mesh.visible = false;
  }
  paintPoint.visible = true;

  //Update the values


  //Do the render and add this new bit to our map
  rendererRef.render();
  rendererRef.setRenderer(originalRenderTarget);
  activeHeightMap = targetHeightMap;
}

function getHeightMap(){
  return activeHeightMap;
}

function setRenderer(renderer){
  rendererRef = renderer;
  rendererIsSet = true;
}

function getIsRendererSet(){
  return rendererIsSet;
}

export getHeightMap, setRenderer, getIsRendererSet, paintPoint, paintLine, paintCurve;
