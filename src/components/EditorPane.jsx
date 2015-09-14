const React = require('react/addons');
const ClickStateToggle = require('./ClickStateToggle');
const CardEditor = require('./CardEditor')
const Operations = require('../utils/Operations');
const DialogueActions = require('../actions/DialogueActions');
const EmotionSelector = require('./EmotionSelector');

const EditorPane = React.createClass({
  propTypes: {
    dialogue: React.PropTypes.object
  },

  updateLine(deckIdx, cardIdx, lines) {
    const op = Operations.changeLines(deckIdx, cardIdx, lines);
    DialogueActions.performOperation(op);
  },

  changeSpeaker(deckIdx, newSpeaker) {
    const op = Operations.changeSpeaker(deckIdx, newSpeaker);
    DialogueActions.performOperation(op);
  },

  addDeck() {
    DialogueActions.performOperation(Operations.addDeck());
  },

  removeDeck(deckIdx) {
    DialogueActions.performOperation(Operations.removeDeck(deckIdx));
  },

  changeEmotion(deckIdx, cardIdx, newEmotion) {
    const op = Operations.changeEmotion(deckIdx, cardIdx, newEmotion);
    DialogueActions.performOperation(op);
  },

  render() {
    const { dialogue } = this.props;
    if (!dialogue) {
      return <div className="no-dialogue-message">No Dialogue Selected</div>;
    }

    return (
      <div className="editor-pane">
        <h2>Actors</h2>
        <ul className="actors">
          {
            dialogue.actors.map((actor) => {
              return <li key={actor}>{actor}</li>
            })
          }
        </ul>
        <h2>
          <span className="decks-title">Decks</span>
          <button
            type="button"
            onClick={this.addDeck}
            className="btn btn-xs btn-default">
            Add
          </button>
        </h2>
        <ul className="decks list-unstyled">
        {
          dialogue.decks.map((deck, deckIdx) => {
            return (
              <li className="deck" key={'deck-' + deckIdx}>
                <div className="panel panel-default">
                  <div className="panel-heading">
                    <select className="actor-selector" value={deck.speaker} onChange={(e) => this.changeSpeaker(deckIdx, e.target.value)}>
                      {
                        dialogue.actors.map((actor) => {
                          return <option value={actor}>{actor}</option>;
                        })
                      }
                    </select>
                    <button
                      type="button"
                      onClick={() => this.removeDeck(deckIdx)}
                      className="btn btn-xs btn-danger">
                      Remove
                    </button>
                  </div>
                  <div className="panel-body">
                    <ul className="cards list-unstyled">
                      {
                        deck.cards.map((card, cardIdx) => {
                          return <li key={'deck-' + deckIdx + 'card-' + cardIdx} className="card">
                            <div className="well">
                              <EmotionSelector value={card.emotion} onChange={(e) => this.changeEmotion(deckIdx, cardIdx, e.target.value)} />
                              <ClickStateToggle onComplete={(lines) => this.updateLine(deckIdx, cardIdx, lines)}>
                                <span className="line-display">{card.lines.join(' ')}</span>
                                <CardEditor lines={card.lines}  />
                              </ClickStateToggle>
                            </div>
                          </li>;
                        })
                      }
                    </ul>
                  </div>
                </div>
              </li>
            )
          })
        }
        </ul>
      </div>
    );
  }
});

module.exports = EditorPane;
