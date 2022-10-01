import { describe, it, expect } from 'vitest';
import { HttpError, ValidationError } from './errors';

describe('class httpError', () => {
  it('should contain the provided status code, message and data', () => {
    const statusCode = 200;
    const testMessage = 'test';
    const data = { key: 'test' };
    const testError = new HttpError(statusCode, testMessage, data);

    expect(testError.statusCode).toBe(statusCode);
    expect(testError.message).toBe(testMessage);
    expect(testError.data).toBe(data);
  });
  it('should contain  undefiend as data if no data is provided', () => {
    const statusCode = 200;
    const testMessage = 'test';
    const testError = new HttpError(statusCode, testMessage);

    expect(testError.statusCode).toBe(statusCode);
    expect(testError.message).toBe(testMessage);
    expect(testError.data).toBeUndefined();
  });
});

describe('class ValidationError', () => {
  it('should contain provided msg', () => {
    const errorMsg = 'fix it!';
    const testError = new ValidationError(errorMsg);

    expect(testError.message).toBe(errorMsg);
  });
});
