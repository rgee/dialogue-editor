const React = require('react/addons');
const ClickStateToggle = require('./ClickStateToggle');
const CardEditor = require('./CardEditor')
const Operations = require('../utils/Operations');
const DialogueActions = require('../actions/DialogueActions');

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
        <h2>Decks</h2>
        <button
          type="button"
          onClick={this.addDeck}
          className="btn btn-xs btn-default">
          Add
        </button>
        <ul className="decks">
        {
          dialogue.decks.map((deck, deckIdx) => {
            return (
              <li className="deck" key={'deck-' + deckIdx}>
                <select value={deck.speaker} onChange={(e) => this.changeSpeaker(deckIdx, e.target.value)}>
                  {
                    dialogue.actors.map((actor) => {
                      return <option value={actor}>{actor}</option>;
                    })
                  }
                </select>
                <ul className="cards">
                  {
                    deck.cards.map((card, cardIdx) => {
                      return <li key={'deck-' + deckIdx + 'card-' + cardIdx} className="card">
                        {
                          <ClickStateToggle onComplete={(lines) => this.updateLine(deckIdx, cardIdx, lines)}>
                            <span className="line-display">{card.lines.join(' ')}</span>
                            <CardEditor lines={card.lines}  />
                          </ClickStateToggle>
                        }
                      </li>;
                    })
                  }
                </ul>
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
