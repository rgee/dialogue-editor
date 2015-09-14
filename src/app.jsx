const React = require('react/addons');
const ipc = require('ipc');

const Editor = require('./components/Editor');

const DialogueActions = require('./actions/DialogueActions');
const CurrentDirectoryActions = require('./actions/CurrentDirectoryActions');

module.exports = () => {
  React.render(<Editor />, document.body);
  ipc.on('undo', DialogueActions.undo);
  ipc.on('redo', DialogueActions.redo);
  ipc.on('open', CurrentDirectoryActions.requestDirectory)
};
