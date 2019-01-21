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

  doesAccept(givenString) {
    if (givenString === ""){
      return this.acceptableStates.includes(this.currentState);
    }
    this.nextState(givenString[0]);
    return this.doesAccept(givenString.slice(1));
  }

  clearState(){
    this.currentState = this.startState;
  }
}

module.exports = DFA;
