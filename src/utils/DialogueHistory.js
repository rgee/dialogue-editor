class DialogueHistory {
  constructor(path, initialState) {
    this.path = path;
    this.states = [initialState];
    this.ops = [];
    this.stateIndex = 0;
    this.lastSaved = initialState;
  }

  save() {
    this.lastSaved = this.getState();
  }

  isDirty() {
    return this.lastSaved !== this.getState();
  }

  getState() {
    return this.states[this.stateIndex];
  }

  performOperation(operation) {
    const currentState = this.getState();
    const nextState = operation.action(currentState);
    this.states = this.states.slice(0, this.stateIndex + 1)
      .concat([nextState]);

    this.ops = this.ops.slice(0, this.stateIndex + 1)
      .concat([operation.name]);

    console.log(this.ops);
    this.stateIndex++;
  }

  undo() {
    this.stateIndex = Math.max(this.stateIndex - 1, 0);
  }

  redo() {
    this.stateIndex = Math.min(this.stateIndex + 1, this.states.length - 1);
  }
}

module.exports = DialogueHistory;
