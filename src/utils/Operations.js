const Operation = require('./Operation');
const {
  ADD_DECK,
  REMOVE_DECK,
  ADD_CARD,
  REMOVE_CARD,
  CHANGE_SPEAKER,
  CHANGE_DELAY,
  ADD_SPEAKER,
  REMOVE_SPEAKER,
  CHANGE_LINES,
  CHANGE_EMOTION
} = require('./OperationTypes');

const Immutable = require('immutable');

const updateDeck = (opType, deckIdx, updateFn) => {
  return new Operation(opType, (dialogue) => {
    return dialogue.updateIn(['decks'], (decks) => {
      return decks.update(deckIdx, updateFn);
    });
  });
};

const updateCard = (opType, deckIdx, cardIdx, updateFn) => {
  return updateDeck(opType, deckIdx, (deck) => {
    return deck.updateIn(['cards'], (cards) => {
      return cards.update(cardIdx, updateFn);
    });
  });
};

module.exports = {
  addActor: (name) => {
    return new Operation(ADD_SPEAKER, (dialogue) => {
      return dialogue.updateIn(['actors'], actor => actor.push(name));
    });
  },

  addDeck: (speaker) => {
    return new Operation(ADD_DECK, (state) => {
      const newDeck = Immutable.fromJS({
        speaker,
        cards: [{
          lines: []
        }]
      });

      return state.updateIn(['decks'], val => val.push(newDeck));
    });
  },

  addCard: (deckIdx) => {
    return updateDeck(ADD_CARD, deckIdx, (deck) => {
      const newCard = {
        lines: []
      };

      return deck.updateIn(['cards'], cards => cards.push(newCard));
    });
  },

  addDeckAfter: (deckIdx, speaker) => {
    return new Operation(ADD_DECK, (dialogue) => {
      const newDeck = Immutable.fromJS({
        speaker,
        cards: [{
          lines: []
        }]
      });

      return dialogue.updateIn(['decks'], decks => decks.splice(deckIdx + 1, 0, newDeck));
    });
  },

  removeDeck: (deckIdx) => {
    return new Operation(REMOVE_DECK, (dialogue) => {
      return dialogue.updateIn(['decks'], decks => decks.delete(deckIdx));
    });
  },

  removeCard: (deckIdx, cardIdx) => {
    return updateDeck(REMOVE_CARD, deckIdx, (deck) => {
      return deck.updateIn(['cards'], cards => cards.delete(cardIdx));
    });
  },

  changeLines: (deckIdx, cardIdx, newLines) => {
    return updateCard(CHANGE_LINES, deckIdx, cardIdx, (card) => {
      return card.set('lines',  Immutable.List(newLines));
    });
  },

  changeSpeaker: (deckIdx, newSpeaker) => {
    return updateDeck(CHANGE_SPEAKER, deckIdx, (deck) => {
      return deck.set('speaker', newSpeaker);
    });
  },

  changeEmotion: (deckIdx, cardIdx, newEmotion) => {
    return updateCard(CHANGE_EMOTION, deckIdx, cardIdx, (card) => {
      return card.set('emotion', newEmotion);
    });
  }
}
