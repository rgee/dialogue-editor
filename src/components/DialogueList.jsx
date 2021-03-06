const React = require('react/addons');
const connectToStores = require('alt/utils/connectToStores');

const DialoguePathStore = require('../stores/DialoguePathStore');
const remote = require('remote');
const path = remote.require('path');

const DialogueList = React.createClass({
  propTypes: {
    paths: React.PropTypes.arrayOf(React.PropTypes.string),
    onClick: React.PropTypes.func.isRequired
  },

  statics: {
    getStores() {
      return [DialoguePathStore];
    },

    getPropsFromStores() {
      const { paths } = DialoguePathStore.getState();
      return { paths };
    }
  },

  render() {
    const { paths } = this.props;
    if (paths.length <= 0) {
      return <div>None</div>;
    }

    return <div className="dialogue-list">
      <ul>
        {paths.map((p) => {
          const base = path.parse(p).base;
          return <li className="list-unstyled" onClick={() => this.props.onClick(p)} key={base}>{base}</li>;
        })}
      </ul>
    </div>;
  }
});

module.exports = connectToStores(DialogueList);
