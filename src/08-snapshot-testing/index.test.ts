// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const element = ['values 1', 'values 2', 'values 3'];
    const result = generateLinkedList(element);

    expect(result.value).toStrictEqual(element[0]);
  });

  test('should generate linked list from values 2', () => {
    const result = generateLinkedList(['values 2', 'values 3']);

    expect(result).toMatchSnapshot();
  });
});
