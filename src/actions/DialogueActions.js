const alt = require('../alt');
const jetpack = require('fs-jetpack');
const Immutable = require('immutable');


class DialogueActions {
  constructor() {
    this.generateActions('undo', 'redo');
  }

  save(path, dialogue) {
    return (dispatch) => {
      jetpack.writeAsync(path, dialogue)
        .then(dispatch)
        .catch(err => console.error(err));
    };
  }

  load(path) {
    return (dispatch) => {
      jetpack.readAsync(path, 'json')
        .then(Immutable.fromJS)
        .then(data => dispatch({ path, dialogue: data }))
        .catch((err) => console.error(err));
    };
  }

  performOperation(operation) {
    this.dispatch(operation);
  }
}

module.exports = alt.createActions(DialogueActions);
