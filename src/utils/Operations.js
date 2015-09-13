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
  CHANGE_LINES
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
  addDeck: () => {
    return new Operation(ADD_DECK, (state) => {
      const newDeck = Immutable.fromJS({
        speaker: null,
        cards: [{
          lines: []
        }]
      });

      return state.updateIn(['decks'], val => val.push(newDeck));
    })
  },

  changeLines: (deckIdx, cardIdx, newLines) => {
    return updateCard(CHANGE_LINES, deckIdx, cardIdx, (card) => {
      return card.set('lines',  Immutable.List(newLines));
    });
  },

  changeSpeaker: (deckIdx, newSpeaker) => {
    return updateDeck(CHANGE_SPEAKER, deckIdx, (deck) => {
      deck.set('speaker', newSpeaker);
    });
  }
}
