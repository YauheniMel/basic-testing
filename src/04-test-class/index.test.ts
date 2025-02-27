//noinspection JSUnusedGlobalSymbols
import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';
import * as lodash from 'lodash';

jest.mock('lodash', () => ({
  __esModule: true,
  ...jest.requireActual('lodash'),
}));

describe('BankAccount', () => {
  const initialBalance = 100;
  const sumOfMoney = 20;

  let account: BankAccount;

  beforeEach(() => {
    account = new BankAccount(initialBalance);
  });

  test('should create account with initial balance', () => {
    const getBalanceSpy = jest.spyOn(account, 'getBalance');

    account.getBalance();

    expect(getBalanceSpy).toHaveReturnedWith(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const overThanBalance = initialBalance + 20;

    expect(() => {
      account.withdraw(overThanBalance);
    }).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => {
      account.transfer(sumOfMoney, account);
    }).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    const depositSpy = jest.spyOn(account, 'deposit');
    const getBalanceSpy = jest.spyOn(account, 'getBalance');

    account.deposit(sumOfMoney);
    account.getBalance();

    expect(depositSpy).toHaveBeenCalledWith(sumOfMoney);
    expect(getBalanceSpy).toHaveReturnedWith(initialBalance + sumOfMoney);
  });

  test('should withdraw money', () => {
    const withdrawSpy = jest.spyOn(account, 'withdraw');
    const getBalanceSpy = jest.spyOn(account, 'getBalance');

    account.withdraw(sumOfMoney);
    account.getBalance();

    expect(withdrawSpy).toHaveBeenCalledWith(sumOfMoney);
    expect(getBalanceSpy).toHaveReturnedWith(initialBalance - sumOfMoney);
  });

  test('should transfer money', () => {
    const account2 = new BankAccount(initialBalance);
    const transferSpy = jest.spyOn(account, 'transfer');
    const getBalanceSpy = jest.spyOn(account, 'getBalance');

    account.transfer(sumOfMoney, account2);
    account.getBalance();

    expect(transferSpy).toHaveBeenCalledTimes(1);
    expect(getBalanceSpy).toHaveReturnedWith(initialBalance - sumOfMoney);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest
      .spyOn(lodash, 'random')
      .mockReturnValueOnce(initialBalance)
      .mockReturnValueOnce(1);

    await expect(account.fetchBalance()).resolves.toBe(initialBalance);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const newBalance = 87;

    const synchronizeBalanceSpy = jest.spyOn(account, 'synchronizeBalance');
    jest
      .spyOn(account, 'fetchBalance')
      .mockImplementation(async () => Promise.resolve(newBalance));
    const getBalanceSpy = jest.spyOn(account, 'getBalance');

    await account.synchronizeBalance();
    account.getBalance();

    expect(synchronizeBalanceSpy).toHaveBeenCalledTimes(1);
    expect(getBalanceSpy).toHaveReturnedWith(newBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest
      .spyOn(account, 'fetchBalance')
      .mockImplementation(async () => Promise.resolve(null));

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
