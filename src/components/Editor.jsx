const React = require('react/addons');
const connectToStores = require('alt/utils/connectToStores');
const { path: pathJoin } = require('fs-jetpack');

const PathList = require('./DialogueList');
const EditorPane = require('./EditorPane');

const DialogueActions = require('../actions/DialogueActions');
const CurrentDirectoryActions = require('../actions/CurrentDirectoryActions');
const CurrentDirectoryStore = require('../stores/CurrentDirectoryStore');
const DialogueHistoryStore = require('../stores/DialogueHistoryStore');

const DialoguePathActions = require('../actions/DialoguePathActions');

const Editor = React.createClass({
  propTypes: {
    currentDirectory: React.PropTypes.string.isRequired,
    dialogue: React.PropTypes.object
  },

  statics: {
    getStores() {
      return [CurrentDirectoryStore, DialogueHistoryStore];
    },

    getPropsFromStores() {
      const { history } = DialogueHistoryStore.getState();
      return {
        currentDirectory: CurrentDirectoryStore.getState().currentDirectory,
        dialogue: history ? history.getState() : null
      };
    }
  },

  componentWillReceiveProps(newProps) {
    if (!this.props.currentDirectory && newProps.currentDirectory) {
      setTimeout(() => {
        DialoguePathActions.loadDialoguePaths(newProps.currentDirectory)
      }, 0);
    }
  },

  selectDialoguePath(path) {
    const fullPath = pathJoin(this.props.currentDirectory, path);
    DialogueActions.load(fullPath);
  },

  render() {
    const { currentDirectory, dialogue } = this.props;
    const jsDialogue = dialogue ? dialogue.toJS() : null;

    return <div className="editor">
      <h1> Dialogue Editor </h1>
      <div className="row">
        <div className="col-xs-4">
          <h2>Dialogues</h2>
          <PathList onClick={this.selectDialoguePath}/>
        </div>
        <div className="col-xs-8">
          <EditorPane dialogue={jsDialogue} />
        </div>
      </div>
    </div>;
  }
});

module.exports = connectToStores(Editor);
