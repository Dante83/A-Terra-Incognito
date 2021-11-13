import { createSlice } from '@redux/toolkit';

export const editorSlice = createSlice({
  name: 'editor',
  initialState: {
    activeMaterial: 'Surface Material Map',
    activeMaterialData:,
    materialsList: ['Height Map', 'Surface Material Map'],
    materialStates: {},
    activePreview: 'cube',
    previewPlaying: true,
    newMaterialPaneVisible: false
  },
  reducers: {
    swapMaterialsInEditor: function(state = initialState, action){
      return Object.assign({}, state, {
        articles: state.articles.concat(action.payload)
      });
    },
    changeActivePreview: function(state = initialState, action){

      return state;
    },
    changeMaterial: function(state = initialState, action){

      return state;
    },
    createNewMaterial: function(state = initialState, action){

    },
    removeMaterial: function(state = initialState, action){

    }
  }
});
