const React = require('react/addons');
const ClickStateToggle = require('./ClickStateToggle');
const CardEditor = require('./CardEditor')
const Operations = require('../utils/Operations');
const DialogueActions = require('../actions/DialogueActions');
const EmotionalResponseEditor = require('./EmotionalResponseEditor');

const EditorPane = React.createClass({
  propTypes: {
    dialogue: React.PropTypes.object
  },

  getInitialState() {
    return {};
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
    const { dialogue } = this.props;
    const firstActor = dialogue.actors[0];
    DialogueActions.performOperation(Operations.addDeck(firstActor));
  },

  removeDeck(deckIdx) {
    DialogueActions.performOperation(Operations.removeDeck(deckIdx));
  },

  changeEmotion(deckIdx, cardIdx, newEmotion) {
    const op = Operations.changeEmotion(deckIdx, cardIdx, newEmotion);
    DialogueActions.performOperation(op);
  },

  addDeckAfter(deckIdx) {
    const { dialogue } = this.props;
    const firstActor = dialogue.actors[0];
    const op = Operations.addDeckAfter(deckIdx, firstActor);
    DialogueActions.performOperation(op);
  },

  addCard(deckIdx) {
    const { dialogue } = this.props;
    const op = Operations.addCard(deckIdx);
    DialogueActions.performOperation(op);
  },

  removeCard(deckIdx, cardIdx) {
    const { dialogue } = this.props;
    const op = Operations.removeCard(deckIdx, cardIdx);
    DialogueActions.performOperation(op);
  },

  addActor() {
    this.setState({ addingActor: true });
  },

  onPendingActorKeyDown(e) {
    if (e.keyCode === 13) {
      const op = Operations.addActor(this.state.pendingActor);
      DialogueActions.performOperation(op);
      this.setState({
        addingActor: false,
        pendingActor: null
      });
    }
  },

  updatePendingActor(e) {
    this.setState({ pendingActor: e.target.value });
  },

  render() {
    const { dialogue } = this.props;
    if (!dialogue) {
      return <div className="no-dialogue-message">No Dialogue Selected</div>;
    }

    return (
      <div className="editor-pane">
        <h2>
          <span className="actors-title">Actors</span>
          <button
            type="button"
            onClick={this.addActor}
            className="btn btn-xs btn-default">
            Add
          </button>
        </h2>
        <ul className="actors">
          {
            dialogue.actors.map((actor) => {
              return <li key={actor}>{actor}</li>
            })
          }
        </ul>
        { this.state.addingActor ?
          <div className="new-actor">
            <input
              onChange={this.updatePendingActor}
              value={this.state.pendingActor}
              onKeyDown={this.onPendingActorKeyDown}
              />
          </div>
        : null }
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
                    <button
                      type="button"
                      onClick={() => this.addDeckAfter(deckIdx)}
                      className="btn btn-xs btn-default add-deck-after">
                      Add
                    </button>
                  </div>
                  <div className="panel-body">
                    <button
                      type="button"
                      onClick={() => this.addCard(deckIdx)}
                      className="btn btn-xs btn-default">
                      Add Card
                    </button>
                    <ul className="cards list-unstyled">
                      {
                        deck.cards.map((card, cardIdx) => {
                          return <li key={'deck-' + deckIdx + 'card-' + cardIdx} className="card">
                            <div className="well">
                              <div>
                                {dialogue.actors.map((actor) => {
                                  const value = {
                                    actorName: actor
                                  };
                                  return (<EmotionalResponseEditor
                                    onChange={(e) => {

                                    }}
                                    value={value}
                                  />);
                                })}
                              </div>
                              <button
                                type="button"
                                onClick={() => this.removeCard(deckIdx, cardIdx)}
                                className="btn btn-xs btn-danger">
                                Remove
                              </button>
                              <ClickStateToggle onComplete={(lines) => this.updateLine(deckIdx, cardIdx, lines)} forceEnabled={!card.lines.length}>
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
