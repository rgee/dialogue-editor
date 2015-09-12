const React = require('react/addons');
const ClickStateToggle = require('./ClickStateToggle');
const CardEditor = require('./CardEditor')

const EditorPane = React.createClass({
  propTypes: {
    dialogue: React.PropTypes.object
  },

  updateLine() {

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
          dialogue.decks.map((deck, i) => {
            return (
              <li className="deck" key={'deck-' + i}>
                <h3>{deck.speaker}</h3>
                <ul className="cards">
                  {
                    deck.cards.map((card, j) => {
                      return <li key={'deck-' + i + 'card-' + j} className="card">
                        {
                          <ClickStateToggle onComplete={this.updateLine}>
                            <span className="line-display">{card.lines.join(' ')}</span>
                            <CardEditor lines={card.lines} />
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
