// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
describe('throttledGetDataFromApi', () => {
  const baseURL = 'https://test.test.com';
  const data = 'Test data';

  const axiosInstance = {
    defaults: {
      baseURL,
    },
  };
  const relativePath = '/posts';

  beforeEach(() => jest.resetAllMocks());

  test('should create instance with provided base url', async () => {
    const getAxiosSpy = jest
      .spyOn(axios, 'get')
      .mockReturnValue(Promise.resolve({ data }));

    const createAxiosSpy = jest
      .spyOn(axios, 'create')
      .mockReturnValue({ ...axiosInstance, get: getAxiosSpy } as any);

    await throttledGetDataFromApi(relativePath);

    expect(createAxiosSpy).toHaveReturnedWith({
      ...axiosInstance,
      get: getAxiosSpy,
    });
  });

  test('should perform request to correct provided url', async () => {
    const getAxiosSpy = jest
      .spyOn(axios, 'get')
      .mockReturnValue(Promise.resolve({ data }));

    jest
      .spyOn(axios, 'create')
      .mockReturnValue({ ...axiosInstance, get: getAxiosSpy } as any);

    await throttledGetDataFromApi(relativePath);

    expect(getAxiosSpy).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const getAxiosSpy = jest.spyOn(axios, 'get').mockResolvedValue({ data });

    jest
      .spyOn(axios, 'create')
      .mockReturnValue({ ...axiosInstance, get: getAxiosSpy } as any);

    expect(await throttledGetDataFromApi(relativePath)).toBe(data);
  });
});
