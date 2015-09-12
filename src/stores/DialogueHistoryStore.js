const DialogueHistory = require('../utils/DialogueHistory');
const DialogueActions = require('../actions/DialogueActions');
const Immutable = require('immutable');
const alt = require('../alt');

class DialogueHistoryStore {
  constructor() {
    this.bindActions(DialogueActions);
    this.history = null;
  }

  onPerformOperation(op) {
    this.history.performOperation(op);
  }

  onLoad(dialogue) {
    this.history = new DialogueHistory(dialogue);
  }
}

module.exports = alt.createStore(DialogueHistoryStore, 'HistoryStore');
