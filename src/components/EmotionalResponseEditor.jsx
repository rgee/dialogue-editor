const React = require('react/addons');
const EmotionSelector = require('./EmotionSelector');

const FacingSelector = React.createClass({
  propTypes: {
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <div className="facing-selector">
        <select {...this.props}>
          <option value="left">Left</option>
          <option value="right">Right</option>
        </select>
      </div>
    );
  }
});

const SlotSelector = React.createClass({
  propTypes: {
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <div className="slot-selector">
        <select {...this.props}>
          {[0, 1, 2, 3].map((slot) => {
            return <option value={slot}>{slot}</option>;
          })}
        </select>
      </div>
    );
  }
});

const EmotionalResponseEditor = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func.isRequired,
    actorName: React.PropTypes.string.isRequired,
    value: React.PropTypes.shape({
      emotion: React.PropTypes.string.isRequired,
      facing: React.PropTypes.string.isRequired,
      position: React.PropTypes.number.isRequired
    })
  },

  onPositionChange(e) {
    const position = e.target.value;
    const newValue = Object.assign({}, this.props.value, { position });
    this.emit(newValue);
  },

  onEmotionChange(e) {
    const emotion = e.target.value;
    const newValue = Object.assign({}, this.props.value, { emotion });
    this.emit(newValue);
  },

  onFacingChange(e) {
    const facing = e.target.value;
    const newValue = Object.assign({}, this.props.value, { facing });
    this.emit(newValue);
  },

  emit(value) {
    const { onChange, actorName } = this.props;
    const result = Object.assign({}, {
      actorName
    }, value);

    onChange(result);
  },

  render() {
    const { actorName, value } = this.props;
    return (
      <div className="emotional-response-editor">
        <h4 className="actor-name">{actorName}</h4>
        <div>
          Emotion: <EmotionSelector value={value.emotion} onChange={this.onEmotionChange} />
        </div>
        <div>
          Facing: <FacingSelector value={value.facing} onChange={this.onFacingChange} />
        </div>
        <div>
          Slot: <SlotSelector value={value.position} onChange={this.onPositionChange} />
        </div>
      </div>
    );
  }
});

module.exports = EmotionalResponseEditor;
