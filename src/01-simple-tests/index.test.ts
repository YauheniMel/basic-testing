// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  const a = 12;
  const b = 2;
  const invalidAction = '%';

  test('should add two numbers', () => {
    const result = simpleCalculator({ a, b, action: Action.Add });

    expect(result).toEqual(14);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a, b, action: Action.Subtract });

    expect(result).toEqual(10);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a, b, action: Action.Multiply });

    expect(result).toEqual(24);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a, b, action: Action.Divide });

    expect(result).toEqual(6);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({ a, b, action: Action.Exponentiate });

    expect(result).toEqual(144);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a, b, action: invalidAction });

    expect(result).toEqual(null);
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: 'a', b, action: Action.Divide });
    const result2 = simpleCalculator({ a, b: 'b', action: Action.Add });
    const result3 = simpleCalculator({
      a: 'a',
      b: 'b',
      action: Action.Multiply,
    });

    expect(result).toEqual(null);
    expect(result2).toEqual(null);
    expect(result3).toEqual(null);
  });
});
