const alt = require('../alt');
const remote = require('remote');
const dialog = remote.require('dialog');

class CurrentDirectoryActions {
  requestDirectory() {
    const dirs = dialog.showOpenDialog({
      properties: ['openDirectory']
    });

    return (dirs && dirs[0]) || null;
  }
}

module.exports = alt.createActions(CurrentDirectoryActions);
