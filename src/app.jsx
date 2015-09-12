const React = require('react/addons');
const Editor = require('./components/Editor');
const ipc = require('ipc');
const DialogueActions = require('./actions/DialogueActions');

module.exports = () => {
  React.render(<Editor />, document.body);
  ipc.on('undo', DialogueActions.undo);
  ipc.on('redo', DialogueActions.redo);
};
