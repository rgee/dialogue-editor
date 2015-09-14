const alt = require('../alt');
const remote = require('remote');
const jetpack = remote.require('fs-jetpack');
const path = remote.require('path');

const filterForJSON = (paths) => {
  return paths.filter((p) => {
    return path.parse(p).ext === '.json';
  });
};

class DialoguePathActions {
  constructor() {
    this.generateActions('loadStart', 'loadFailed');
  }

  writeNewDialogue(path) {
    return (dispatch) => {
      jetpack
        .writeAsync(path, { actors: [], decks: [] })
        .then(() => dispatch(path));
    };
  }

  loadDialoguePaths(directory) {
    this.actions.loadStart();
    return (dispatch) => {
      jetpack
        .listAsync(directory)
        .then(filterForJSON)
        .then(dispatch)
        .catch(this.actions.loadFailed);
    };
  }
}

module.exports = alt.createActions(DialoguePathActions);
