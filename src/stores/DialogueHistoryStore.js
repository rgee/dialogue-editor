const DialogueHistory = require('../utils/DialogueHistory');
const Immutable = require('immutable');
const alt = require('../alt');

class DialogueHistoryStore {
  constructor() {
    this.history = new DialogueHistory(Immutable.fromJS({
      decks: [
        {
          name: 'Liat'
        }
      ]
    }))
  }
}

module.exports = alt.createStore(DialogueHistoryStore, 'HistoryStore');
