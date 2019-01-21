class NFA {
  constructor(tuple) {
    this.transitions = tuple.delta;
    this.startState = tuple['start-state'];
    this.currentStates = [this.startState];
    this.acceptableStates = tuple['final-states'];
  }

  clearState() {
    this.currentStates = [this.startState];
  }

  getNewEpsilonStates(currentTransition, previousEpsilonStates) {
    let doesHaveEpsilonStates = currentTransition && currentTransition['e'];
    if (doesHaveEpsilonStates) {
      return currentTransition['e'].filter((epsilonState) => !previousEpsilonStates.includes(epsilonState));
    }
    return [];
  }

  getEpsilonStatesFor(states, givenEpsilonStates = []) {
    return states.reduce((previousEpsilonStates, currentState) => {
      let currentTransition = this.transitions[currentState];
      let newEpsilonStates = this.getNewEpsilonStates(currentTransition, previousEpsilonStates);
      let doesHaveNewEpsilonStates = newEpsilonStates.length > 0;
      if (!doesHaveNewEpsilonStates) {
        return previousEpsilonStates;
      }
      let resultantEpsilonStates = previousEpsilonStates.concat(newEpsilonStates);
      return this.getEpsilonStatesFor(newEpsilonStates, resultantEpsilonStates);
    }, givenEpsilonStates)
  }

  getNextState(currentState, alphabet) {
    let currentTransition = this.transitions[currentState];
    if (currentTransition && currentTransition[alphabet]) {
      return currentTransition[alphabet]
    }
    return undefined;
  }

  transit(alphabet) {
    this.currentStates = this.currentStates.reduce((resultantStates, currentState) => {
      let nextState = this.getNextState(currentState, alphabet);
      if (nextState) {
        return resultantStates.concat(nextState)
      }
      return resultantStates;
    }, []);
  }

  doesAccept(givenString) {
    let epsilonStates = this.getEpsilonStatesFor(this.currentStates);
    this.currentStates = this.currentStates.concat(epsilonStates);
    if (givenString === "") {
      return this.acceptableStates.some((acceptableState) => {
        return this.currentStates.includes(acceptableState)
      });
    }
    this.transit(givenString[0]);
    return this.doesAccept(givenString.slice(1));
  }

}

module.exports = NFA;
