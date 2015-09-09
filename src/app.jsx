const React = require('react/addons');
const Editor = require('./components/Editor');
const CurrentDirectoryStore = require('./stores/CurrentDirectoryStore');

module.exports = () => {
  React.render(<Editor />, document.body);
};
