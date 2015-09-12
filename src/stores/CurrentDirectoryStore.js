  const alt = require('../alt');
const CurrentDirectoryActions = require('../actions/CurrentDirectoryActions');

class CurrentDirectoryStore {
  constructor() {
    this.bindListeners({
      updateCurrentDirectory: CurrentDirectoryActions.requestDirectory
    });

    this.currentDirectory = null;
  }

  updateCurrentDirectory(directory) {
    if (directory) {
      this.currentDirectory = directory;
    }
  }
}

module.exports = alt.createStore(CurrentDirectoryStore, 'CDStore');
