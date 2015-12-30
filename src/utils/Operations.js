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
  CHANGE_EMOTION,
  CHANGE_EMOTIONAL_RESPONSE
} = require('./OperationTypes');

const Immutable = require('immutable');


const createNewEmotionalResponses = (dialogue) => {
  const actors = dialogue.get('actors');

  const emotions = {};
  actors.forEach((actor, idx) => {
    emotions[actor] = {
      position: idx,
      facing: 'left',
      emotion: 'default'
    }
  });

  return emotions;
};

const updateDeck = (opType, deckIdx, updateFn) => {
  return new Operation(opType, (dialogue) => {
    return dialogue.updateIn(['decks'], (decks) => {
      return decks.update(deckIdx, (deck) => {
        return updateFn(deck, dialogue);
      });
    });
  });
};

const updateCard = (opType, deckIdx, cardIdx, updateFn) => {
  return updateDeck(opType, deckIdx, (deck, dialogue) => {
    return deck.updateIn(['cards'], (cards) => {
      return cards.update(cardIdx, (card) => {
        return updateFn(card, dialogue);
      });
    });
  });
};

module.exports = {
  addActor: (name) => {
    return new Operation(ADD_SPEAKER, (dialogue) => {
      return dialogue
        .updateIn(['actors'], actor => actor.push(name))
        .updateIn(['decks'], (decks) => {
          return decks.map((deck) => {
            return deck.updateIn(['cards'], (cards) => {
              return cards.map((card) => {
                return card.updateIn(['emotionalResponses'], (responses) => {
                  const takenSlots = responses.map((response) => response.position);
                  let firstOpenSlot;
                  for (let i = 0; i < 4; i++) {
                    if (takenSlots.indexOf(i) < 0) {
                      firstOpenSlot = i;
                      break;
                    }
                  }

                  if (!firstOpenSlot) {
                    throw new Error("agh, no open slots for new actor");
                  }

                  return responses.set('name', {
                    position: firstOpenSlot,
                    facing: 'left',
                    emotion: 'default'
                  });
                })
              })
            })
          })
        })
    });
  },

  addDeck: (speaker) => {
    return new Operation(ADD_DECK, (state) => {
      const newDeck = Immutable.fromJS({
        speaker,
        cards: [{
          lines: [],
          emotionalResponses: createNewEmotionalResponses(state)
        }]
      });

      return state.updateIn(['decks'], val => val.push(newDeck));
    });
  },

  addCard: (deckIdx) => {
    return updateDeck(ADD_CARD, deckIdx, (deck, dialogue) => {
      const newCard = Immutable.fromJS({
        lines: [],
        emotionalResponses: createNewEmotionalResponses(dialogue)
      });

      return deck.updateIn(['cards'], cards => cards.push(newCard));
    });
  },

  addDeckAfter: (deckIdx, speaker) => {
    return new Operation(ADD_DECK, (dialogue) => {
      const newDeck = Immutable.fromJS({
        speaker,
        cards: [{
          lines: [],
          emotionalResponses: createNewEmotionalResponses(dialogue)
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

  changeEmotionalResponse: (deckIdx, cardIdx, actor, response) => {
    return updateCard(CHANGE_EMOTIONAL_RESPONSE, deckIdx, cardIdx, (card) => {
      return card.setIn(['emotionalResponses', actor], response);
    });
  },

  changeEmotion: (deckIdx, cardIdx, newEmotion) => {
    return updateCard(CHANGE_EMOTION, deckIdx, cardIdx, (card) => {
      return card.set('emotion', newEmotion);
    });
  }
}
