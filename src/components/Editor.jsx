const React = require('react/addons');
const connectToStores = require('alt/utils/connectToStores');

const PathList = require('./DialogueList');

const CurrentDirectoryActions = require('../actions/CurrentDirectoryActions');
const CurrentDirectoryStore = require('../stores/CurrentDirectoryStore');

const DialoguePathActions = require('../actions/DialoguePathActions');

const Editor = React.createClass({
  propTypes: {
    currentDirectory: React.PropTypes.string.isRequired
  },

  statics: {
    getStores() {
      return [CurrentDirectoryStore];
    },

    getPropsFromStores() {
      return {
        currentDirectory: CurrentDirectoryStore.getState().currentDirectory
      };
    }
  },

  componentWillReceiveProps(newProps) {
    if (newProps.currentDirectory) {
      DialoguePathActions.loadDialoguePaths(newProps.currentDirectory);
    }
  },

  render() {
    const { currentDirectory } = this.props;
    return <div>
      <h1> Dialogue Editor </h1>
      <div>Current Directory: {currentDirectory || 'None'}</div>
      <button onClick={CurrentDirectoryActions.requestDirectory}>Click Me</button>
      <h2>Dialogues:</h2>
      <PathList />
    </div>;
  }
});

module.exports = connectToStores(Editor);
