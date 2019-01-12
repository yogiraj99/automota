const DFA = require('../src/DFA');
const assert = require('chai').assert;
const fs = require('fs');

describe('DFA', () => {
  let testCasesJson = fs.readFileSync('test/testCases.json').toString();
  let testCases = JSON.parse(testCasesJson);
  let dfaTestCases = testCases.filter(t => t.type === "dfa");
  dfaTestCases.forEach((testCase) => {
    describe(testCase.name, function () {
      let tuple = testCase.tuple;
      let dfa = new DFA(tuple);
      let passCases = testCase['pass-cases'];
      let failCases = testCase['fail-cases'];

      passCases.forEach((passingString) => {
        it(`should pass for ${passingString}`, function () {
          // console.log(`testing ${testCase.name} for pass case ${passingString}`);
          assert.isOk(dfa.doesAccept(passingString));
          dfa.clearState();
        });
      });

      failCases.forEach((failingString) => {
        it(`should fail for ${failingString}`, function () {
          // console.log(`testing ${testCase.name} for fail case ${failingString}`);
          assert.isNotOk(dfa.doesAccept(failingString));
          dfa.clearState();
        });
      });
    });
  });
});
