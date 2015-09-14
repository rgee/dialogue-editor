const React = require('react/addons');
const capitalize = require('lodash/string/capitalize');

const EMOTIONS = [
  'default',
  'happy',
  'sad'
];
const EmotionSelector = React.createClass({
  propTypes: {
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <div className="emotion-selector">
        <select {...this.props}>{
            EMOTIONS.map((emotion) => {
              const label = capitalize(emotion);
              return <option key={emotion} value={emotion}>{label}</option>;
            })
          }
        </select>
      </div>
    );
  }
});

module.exports = EmotionSelector;
