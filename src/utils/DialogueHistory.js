class DialogueHistory {
  constructor(initialState) {
    this.states = [initialState];
    this.ops = [];
  }

  getState() {
    return this.states[this.states.length - 1];
  }

  performOperation(operation) {
    const latestState = this.states[this.states.length -1];
    this.states.push(operation.action(latestState));
    this.ops.push(operation.name);
  }
}

module.exports = DialogueHistory;
