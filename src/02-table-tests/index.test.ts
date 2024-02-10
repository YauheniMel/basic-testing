// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const cases = {
  add: 'should add two numbers',
  subtract: 'should subtract two numbers',
  divide: 'should divide two numbers',
  multiply: 'should multiply two numbers',
  exponentiate: 'should exponentiate two numbers',
  invalidArguments: 'should return null for invalid arguments',
  invalidAction: 'should return null for invalid action',
};

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3, name: cases.add },
  { a: 2, b: 2, action: Action.Add, expected: 4, name: cases.add },
  { a: 3, b: 2, action: Action.Add, expected: 5, name: cases.add },
  { a: 4, b: 2, action: Action.Subtract, expected: 2, name: cases.subtract },
  { a: 5, b: 2, action: Action.Subtract, expected: 3, name: cases.subtract },
  { a: 12, b: 2, action: Action.Subtract, expected: 10, name: cases.subtract },
  { a: 2, b: 2, action: Action.Multiply, expected: 4, name: cases.multiply },
  { a: 3, b: 2, action: Action.Multiply, expected: 6, name: cases.multiply },
  { a: 11, b: 2, action: Action.Multiply, expected: 22, name: cases.multiply },
  { a: 8, b: 2, action: Action.Divide, expected: 4, name: cases.divide },
  { a: 22, b: 11, action: Action.Divide, expected: 2, name: cases.divide },
  { a: 10, b: 5, action: Action.Divide, expected: 2, name: cases.divide },
  {
    a: 8,
    b: 2,
    action: Action.Exponentiate,
    expected: 64,
    name: cases.exponentiate,
  },
  {
    a: 3,
    b: 4,
    action: Action.Exponentiate,
    expected: 81,
    name: cases.exponentiate,
  },
  {
    a: 10,
    b: 4,
    action: Action.Exponentiate,
    expected: 10000,
    name: cases.exponentiate,
  },
  {
    a: '22',
    b: 11,
    action: Action.Add,
    expected: null,
    name: cases.invalidArguments,
  },
  {
    a: '22',
    b: '11',
    action: Action.Subtract,
    expected: null,
    name: cases.invalidArguments,
  },
  {
    a: 22,
    b: '11',
    action: Action.Divide,
    expected: null,
    name: cases.invalidArguments,
  },
  { a: 2, b: 2, action: '%', expected: null, name: cases.invalidAction },
];

describe('simpleCalculator', () => {
  it.each(testCases)('$name', ({ expected, ...data }) => {
    const result = simpleCalculator(data);

    expect(result).toEqual(expected);
  });
});
