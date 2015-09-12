const alt = require('../alt');
const jetpack = require('fs-jetpack');
const Immutable = require('immutable');


class DialogueActions {
  constructor() {
    this.generateActions('undo');
  }

  load(path) {
    return (dispatch) => {
      jetpack.readAsync(path, 'json')
        .then(Immutable.fromJS)
        .then(dispatch)
        .catch((err) => console.error(err));
    };
  }

  performOperation(operation) {
    this.dispatch(operation);
  }
}

module.exports = alt.createActions(DialogueActions);
