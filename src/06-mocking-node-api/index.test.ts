// Uncomment the code below and write your tests
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';
import * as path from 'path';
import * as fsSync from 'fs';
import * as fsPromises from 'fs/promises';

describe('doStuffByTimeout', () => {
  const fiveSecond = 5000;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const cb = jest.fn();
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(cb, fiveSecond);

    expect(setTimeoutSpy).toHaveBeenCalledWith(cb, fiveSecond);
  });

  test('should call callback only after timeout', () => {
    const cb = jest.fn();
    doStuffByTimeout(cb, fiveSecond);

    expect(cb).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(cb).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  const fiveSecond = 5000;

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const cb = jest.fn();
    const setIntervalSpy = jest.spyOn(global, 'setInterval');

    doStuffByInterval(cb, fiveSecond);

    expect(setIntervalSpy).toHaveBeenCalledWith(cb, fiveSecond);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const cb = jest.fn();
    const numberOfTimes = 5;
    doStuffByInterval(cb, fiveSecond);

    expect(cb).not.toHaveBeenCalled();

    jest.advanceTimersByTime(numberOfTimes * fiveSecond);

    expect(cb).toHaveBeenCalledTimes(numberOfTimes);
  });
});

jest.mock('path');
jest.mock('fs');
jest.mock('fs/promises');

describe('readFileAsynchronously', () => {
  const pathToFile = '/test/test';

  test('should call join with pathToFile', async () => {
    const joinPathSpy = jest.spyOn(path, 'join');

    await readFileAsynchronously(pathToFile);

    expect(joinPathSpy).toHaveBeenCalledTimes(1);
    expect(joinPathSpy).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fsSync, 'existsSync').mockReturnValueOnce(false);

    expect(await readFileAsynchronously(pathToFile)).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const fileContentString = 'Hello world!';
    const fileContentBuffer = Buffer.from(fileContentString, 'utf8');

    jest.spyOn(path, 'join').mockReturnValueOnce(pathToFile);
    jest.spyOn(fsSync, 'existsSync').mockImplementation(() => true);
    jest
      .spyOn(fsPromises, 'readFile')
      .mockReturnValue(Promise.resolve(fileContentBuffer));

    expect(await readFileAsynchronously(pathToFile)).toBe(fileContentString);
  });
});
