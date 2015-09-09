const React = require('react/addons');
const connectToStores = require('alt/utils/connectToStores');

const CurrentDirectoryActions = require('../actions/CurrentDirectoryActions');
const CurrentDirectoryStore = require('../stores/CurrentDirectoryStore');

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

  render() {
    const { currentDirectory } = this.props;
    return <div>
      <h1> Dialogue Editor </h1>
      <div>Current Directory: {currentDirectory || 'None'}</div>
      <button onClick={CurrentDirectoryActions.requestDirectory}>Click Me</button>
    </div>;
  }
});

module.exports = connectToStores(Editor);
