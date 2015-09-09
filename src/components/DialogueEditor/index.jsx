const React = require('react/addons');
const CurrentDirectoryActions = require('../actions/CurrentDirectoryActions');

const Editor = React.createClass({
  render() {
    return <div>
      <h1>Dialogue Editor</h1>
      <button onClick={CurrentDirectoryActions.requestDirectory()} label="click me" />
    </div>;
  }
});

module.exports = Editor;
