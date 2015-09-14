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

  onUndo() {
    this.history.undo();
  }

  onSave() {
    this.history.save();
  }

  onRedo() {
    this.history.redo();
  }

  onLoad(data) {
    this.history = new DialogueHistory(data.path, data.dialogue);
  }
}

module.exports = alt.createStore(DialogueHistoryStore, 'HistoryStore');
