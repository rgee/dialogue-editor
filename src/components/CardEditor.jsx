const React = require('react/addons');

const ENTER_KEY_CODE = 13;
const CardEditor = React.createClass({
   propTypes: {
     onComplete: React.PropTypes.func.isRequired,
     lines: React.PropTypes.array.isRequired
   },

   componentWillMount() {
     this.setState({ pendingLines: this.props.lines.join('. ')});
   },

   getInitialState() {
     return { pendingLines: [] };
   },

   change(e) {
     this.setState({
       pendingLines: e.target.value.split('. ')
     });
   },

   keyDown(e) {
     if (e.keyCode === ENTER_KEY_CODE) {
       this.props.onComplete(this.state.pendingLines);
     }
   },

   halt(e) {
     e.stopPropagation();
   },

   render() {
     const { pendingLines } = this.state;
     return <input
       ref="input"
       value={pendingLines}
       onChange={this.change}
       onKeyDown={this.keyDown}
       onClick={this.halt}
     />;
   }
});

module.exports = CardEditor;
