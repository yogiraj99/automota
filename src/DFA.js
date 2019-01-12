class DFA {
  constructor(tuple){
    this.transitions = tuple.delta;
    this.startState = tuple['start-state'];
    this.currentState = this.startState;
    this.acceptableStates = tuple['final-states'];
  }

  nextState(givenAlphabet){
    let transitionOfCurrentState = this.transitions[this.currentState];
    this.currentState=transitionOfCurrentState[givenAlphabet];
  }

  doesAccept(string) {
    if (string === ""){
      return this.acceptableStates.includes(this.currentState);
    }
    this.nextState(string[0]);
    return this.doesAccept(string.slice(1));
  }

  clearState(){
    this.currentState = this.startState;
  }
}

module.exports = DFA;
