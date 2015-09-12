const alt = require('../alt');
const jetpack = require('fs-jetpack');
const Immutable = require('immutable');


class DialogueActions {
  load(path) {
    return (dispatch) => {
      jetpack.readAsync(path, 'json')
        .then(Immutable.fromJS)
        .then(dispatch);
    };
  }
}

module.exports = alt.createActions(DialogueActions);
