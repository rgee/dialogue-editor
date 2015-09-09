const alt = require('../alt');
const DialoguePathActions = require('../actions/DialoguePathActions');

class DialoguePathStore {
  constructor() {
    this.bindActions(DialoguePathActions);
    this.paths = [];
  }

  onLoadDialoguePaths(paths) {
    this.paths = paths;
  }
}

module.exports = alt.createStore(DialoguePathStore, 'PathStore');
