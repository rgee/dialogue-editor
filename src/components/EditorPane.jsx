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
        <ul className="decks">
        {
          dialogue.decks.map((deck, deckIdx) => {
            return (
              <li className="deck" key={'deck-' + deckIdx}>
                <h3>{deck.speaker}</h3>
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
