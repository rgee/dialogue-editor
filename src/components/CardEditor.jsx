const React = require('react/addons');

const ENTER_KEY_CODE = 13;
const CardEditor = React.createClass({
   propTypes: {
     onComplete: React.PropTypes.func.isRequired,
     lines: React.PropTypes.array.isRequired
   },

   keyDown(e) {
     if (e.keyCode === ENTER_KEY_CODE) {
       this.props.onComplete(this.refs.input.value);
     }
   },

   halt(e) {
     e.stopPropagation();
   },

   render() {
     const { lines } = this.props;
     return <input
       ref="input"
       value={lines.join(' ')}
       onKeyDown={this.keyDown}
       onClick={this.halt}
     />;
   }
});

module.exports = CardEditor;
