const React = require('react/addons');
const partition = require('lodash/collection/partition');
const StateToggle = require('./StateToggle');

const ClickStateToggle = React.createClass({
  propTypes: {
    onComplete: React.PropTypes.func
  },

  getInitialState() {
    return { enabled: false };
  },

  toggleEnabled() {
    this.setState({ enabled: !this.state.enabled });
  },

  render() {
    const { children, onComplete } = this.props;
    let [display, editing] = children;
    editing = React.cloneElement(editing, {
      onComplete: () => {
        onComplete.apply(this, arguments);
        this.setState({ enabled: false });
      }
    });

    return (
      <div onClick={this.toggleEnabled}>
        <StateToggle enabled={this.state.enabled}>
          {[display, editing]}
        </StateToggle>
      </div>
    );
  }
});

module.exports = ClickStateToggle;
