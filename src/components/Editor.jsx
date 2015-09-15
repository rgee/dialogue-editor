const React = require('react/addons');
const connectToStores = require('alt/utils/connectToStores');
const { path: pathJoin } = require('fs-jetpack');

const PathList = require('./DialogueList');
const EditorPane = require('./EditorPane');
const Modal = require('react-modal');

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
        history: history,
        dialogue: history ? history.getState() : null
      };
    }
  },

  getInitialState() {
    return {
      requestingFileName: false
    };
  },

  componentWillReceiveProps(newProps) {
    if (!this.props.currentDirectory && newProps.currentDirectory) {
      setTimeout(() => {
        DialoguePathActions.loadDialoguePaths(newProps.currentDirectory)
      }, 0);
    }
  },

  selectDialoguePath(path) {
    // check for unsaved changes
    const { history } = this.props;
    const { requestingSave } = this.state;
    if (!requestingSave && history && history.isDirty()) {
      this.setState({
        requestingSave: true,
        pendingPath: path
      });
    } else {
      const fullPath = pathJoin(this.props.currentDirectory, path);
      DialogueActions.load(fullPath);
      setTimeout(this.endSaveFlow, 10);
    }
  },

  startAddFileFlow() {
    this.setState({
      requestingFileName: true
    });
  },

  endAddFileFlow() {
    this.setState({
      requestingFileName: false
    });
  },

  updatePendingFileName(e) {
    this.setState({
      pendingFileName: e.target.value
    });
  },

  saveAndLoadNewDialogue() {
    const { history, currentDirectory } = this.props;
    const fullPath = pathJoin(currentDirectory, history.path);
    DialogueActions.save(fullPath, history.getState(), () => {
      this.selectDialoguePath(this.state.pendingPath);
    });
  },

  endSaveFlow() {
    this.setState({
      requestingSave: false,
      pendingPath: null
    });
  },

  discardDialogue() {
    this.selectDialoguePath(this.state.pendingPath);
  },

  addDialogue() {
    const { currentDirectory } = this.props;
    const { pendingFileName } = this.state;

    const path = pathJoin(currentDirectory, pendingFileName);
    DialoguePathActions.writeNewDialogue(path);
    this.setState({
      pendingFileName: null,
      requestingFileName: false
    });
  },

  render() {
    const { currentDirectory, dialogue } = this.props;
    const jsDialogue = dialogue ? dialogue.toJS() : null;

    return <div className="editor">
      <div className="nav-panel">
        <h2 className="dialogues-header">
          <span className="dialogues-header-label">Dialogues</span>
          {currentDirectory ? <button
            type="button"
            onClick={this.startAddFileFlow}
            className="btn btn-xs btn-default">
            Add
          </button> : null}
        </h2>
        <PathList onClick={this.selectDialoguePath}/>
      </div>
      <div className="main-content">
        <EditorPane dialogue={jsDialogue} />
      </div>
      {this.renderFileModal()}
      {this.renderOptionalSaveModal()}
    </div>;
  },

  renderOptionalSaveModal() {
    const { requestingSave } = this.state;
    return (
      <Modal isOpen={requestingSave} onRequestClose={this.endSaveFlow}>
        <div className="modal modal-open">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Unsaved Changes</h4>
                <button type="button" className="close" onClick={this.endSaveFlow}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>You have unsaved changes. Would you like to save them?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="save-dialogue btn"
                  onClick={this.endSaveFlow}>
                  Cancel
                </button>
                <button
                  type="button"
                  className="save-dialogue btn btn-danger"
                  onClick={this.discardDialogue}>
                  Discard
                </button>
                <button
                  type="button"
                  className="save-dialogue btn btn-primary"
                  onClick={this.saveAndLoadNewDialogue}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );

  },

  renderFileModal() {
    const { requestingFileName, pendingFileName } = this.state;
    return (
      <Modal isOpen={requestingFileName} onRequestClose={this.endAddFileFlow}>
        <div className="modal modal-open">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">New Dialogue</h4>
                <button type="button" className="close" onClick={this.endAddFileFlow}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="pending-file-name"
                  placeholder="File Name"
                  onChange={this.updatePendingFileName}
                  value={pendingFileName}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.addDialogue}>
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
});

module.exports = connectToStores(Editor);
