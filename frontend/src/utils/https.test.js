import { describe, expect, it, vi } from 'vitest';
import { HttpError } from './errors';
import { sendEventData } from './http';

const testResponseData = {
  testkey: 'aabbcc',
};

const testFetch = vi.fn((url, options) => {
  return new Promise((resolve, reject) => {
    if (typeof options.body !== 'string') {
      reject('Not a string');
    }
    const testResponse = {
      ok: true,
      json() {
        return new Promise((resolve, reject) => {
          resolve(testResponseData);
        });
      },
    };

    resolve(testResponse);
  });
});

vi.stubGlobal('fetch', testFetch);

describe('sendEventData', () => {
  it('should return response data', async () => {
    const testData = { key: 'test' };
    const testResponse = await sendEventData(testData);
    expect(testResponse).toEqual(testResponseData);
  });

  it('should convert the provided data to json before sending req', async () => {
    const testData = { key: 'test' };
    let errorMsg;
    try {
      await sendEventData(testData);
    } catch (error) {
      errorMsg = error;
    }

    expect(errorMsg).not.toBe('Not a string');
  });

  it('should throw an httpError in case non-ok response', () => {
    testFetch.mockImplementationOnce((url, options) => {
      return new Promise((resolve, reject) => {
        const testResponse = {
          ok: false,
          json() {
            return new Promise((resolve, reject) => {
              resolve(testResponseData);
            });
          },
        };

        resolve(testResponse);
      });
    });
    const testData = { key: 'test' };

    return expect(sendEventData(testData)).rejects.toBeInstanceOf(HttpError);
  });
});
