const React = require('react/addons');
const ipc = require('ipc');

const Editor = require('./components/Editor');

const DialogueActions = require('./actions/DialogueActions');
const CurrentDirectoryActions = require('./actions/CurrentDirectoryActions');
const DialogueHistoryStore = require('./stores/DialogueHistoryStore');

module.exports = () => {
  React.render(<Editor />, document.body);
  ipc.on('undo', DialogueActions.undo);
  ipc.on('redo', DialogueActions.redo);
  ipc.on('open', CurrentDirectoryActions.requestDirectory)
  ipc.on('save', () => {
    const { history } = DialogueHistoryStore.getState();
    if (history && history.isDirty()) {
      const { path } = history;
      DialogueActions.save(path, history.getState());
    }
  });
};
