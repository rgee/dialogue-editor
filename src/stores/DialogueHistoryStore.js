const DialogueHistory = require('../utils/DialogueHistory');
const DialogueActions = require('../actions/DialogueActions');
const Immutable = require('immutable');
const alt = require('../alt');

class DialogueHistoryStore {
  constructor() {
    this.history = new DialogueHistory(Immutable.fromJS({
      decks: [
        {
          name: 'Liat'
        },
        {
          name: 'M. Soldier'
        }
      ]
    }));
    this.bindActions(DialogueActions);
  }

  onLoad(dialogue) {
    this.history = new DialogueHistory(dialogue);
  }
}

module.exports = alt.createStore(DialogueHistoryStore, 'HistoryStore');
