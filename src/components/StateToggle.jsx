const React = require('react/addons');

const StateToggle = React.createClass({
  propTypes: {
    enabled: React.PropTypes.bool.isRequired,
    children: (props, propName) => {
      const prop = props[propName];
      if (React.Children.count(prop) !== 2) {
        return new Error('Must provide only two children.');
      }
    }
  },

  getDefaultProps() {
    return { enabled: false };
  },

  render() {
    const { children, enabled } = this.props;
    if (enabled) {
      return children[1];
    } else {
      return children[0];
    }
  }
});

module.exports = StateToggle;
