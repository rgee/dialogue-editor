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
} = require('./Operations');

const Immutable = require('immutable');

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
    return new Operation(CHANGE_LINES, (dialogue) => {
      return dialogue.updateIn(['decks'], (decks) => {
        return decks.update(deckIdx, (deck) => {
          return deck.updateIn(['cards'], (cards) => {
            return cards.update(cardIdx, (card) => {
              return card.set('lines',  Immutable.List(newLines));
            });
          });
        });
      });
    });
  }
}
