const React = require('react/addons');
const partition = require('lodash/collection/partition');
const StateToggle = require('./StateToggle');

const ClickStateToggle = React.createClass({
  propTypes: {
    onComplete: React.PropTypes.func,
    forceEnabled: React.PropTypes.boolean
  },

  getDefaultProps() {
    return { forceEnabled: false };
  },

  getInitialState() {
    return { enabled: false };
  },

  toggleEnabled() {
    this.setState({ enabled: !this.state.enabled });
  },

  onComplete() {
    this.props.onComplete.apply(this, arguments);
    this.setState({ enabled: false });
  },

  render() {
    const { forceEnabled, children, onComplete } = this.props;
    const { enabled } = this.state;
    let [display, editing] = children;
    editing = React.cloneElement(editing, {
      onComplete: this.onComplete
    });

    return (
      <div onClick={this.toggleEnabled}>
        <StateToggle enabled={enabled || forceEnabled}>
          {[display, editing]}
        </StateToggle>
      </div>
    );
  }
});

module.exports = ClickStateToggle;
