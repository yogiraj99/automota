const NFA = require('../src/NFA');
const assert = require('chai').assert;
const fs = require('fs');

describe('NFA', () => {
  let testCasesJson = fs.readFileSync('test/testCases.json').toString();
  let testCases = JSON.parse(testCasesJson);
  let nfaTestCases = testCases.filter(t => t.type === "nfa");
  nfaTestCases.forEach((testCase) => {
    describe(testCase.name, function () {
      let tuple = testCase.tuple;
      let nfa = new NFA(tuple);
      let passCases = testCase['pass-cases'];
      let failCases = testCase['fail-cases'];

      passCases.forEach((passingString) => {
        it(`should pass for ${passingString}`, function () {
          // console.log(`testing ${testCase.name} for pass case ${passingString}`);
          nfa.clearState();
          assert.isOk(nfa.doesAccept(passingString));
        });
      });

      failCases.forEach((failingString) => {
        it(`should fail for ${failingString}`, function () {
          // console.log(`testing ${testCase.name} for fail case ${failingString}`);
          nfa.clearState();
          assert.isNotOk(nfa.doesAccept(failingString));
        });
      });
    });
  });
});
