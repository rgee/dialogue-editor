const React = require('react/addons');

const ENTER_KEY_CODE = 13;
const CardEditor = React.createClass({
   propTypes: {
     onComplete: React.PropTypes.func.isRequired,
     lines: React.PropTypes.array.isRequired
   },

   componentWillMount() {
     this.setState({ pendingLines: this.props.lines.join(' ')});
   },

   getInitialState() {
     return { pendingLines: [] };
   },

   change(e) {
     this.setState({
       pendingLines: e.target.value
     });
   },

   keyDown(e) {
     if (e.keyCode === ENTER_KEY_CODE) {
       this.props.onComplete(this.getSentences(this.state.pendingLines));
     }
   },

   getSentences(lines) {
     return lines.replace(/([.?!])\x20{1,2}(?=[A-Z\d])/g, "$1|").split("|");
   },

   halt(e) {
     e.stopPropagation();
   },

   render() {
     const { pendingLines } = this.state;
     return (
       <div className="card-editor">
         <textarea
           ref="input"
           rows="3"
           value={pendingLines}
           onChange={this.change}
           onKeyDown={this.keyDown}
           onClick={this.halt}
         />
       </div>
     );
   }
});

module.exports = CardEditor;
