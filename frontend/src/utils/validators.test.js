import { it, expect, describe } from 'vitest';
import { validateEventData } from './validators';

describe('validateEventData', () => {
  // const validateEventData = (calendarDate, email, name, lastName);

  it('should not throw when data is correct', () => {
    const correctData = {
      date: new Date(),
      firstName: 'ssaadss',
      lastName: 'zzzadszzzz',
      email: 'asd@asda.pl',
    };

    const validationFn = () => {
      validateEventData(correctData);
    };

    expect(validationFn).not.toThrow();
  });

  it('should throw when date is miss', () => {
    const data = {
      // date: new Date(),
      firstName: 'ssas',
      lastName: 'zzzzzzz',
      email: 'asd@asda.pl',
    };
    const validationFn = () => {
      validateEventData(data);
    };
    expect(validationFn).toThrow();
  });

  it('should throw when data is not valid date', () => {
    const data = {
      date: ['asd'],
      firstName: 'ssas',
      lastName: 'zzzzzzz',
      email: 'asd@asda.pl',
    };
    const validationFn = () => {
      validateEventData(data);
    };
    expect(validationFn).toThrow();
  });
  it('should throw when firstName is miss', () => {
    const data = {
      date: new Date(),
      // firstName: '',
      lastName: 'asdasda',
      email: 'asd@asda.pl',
    };
    const validationFn = () => {
      validateEventData(data);
    };
    expect(validationFn).toThrow();
  });
  it('should throw when lastName is miss', () => {
    const data = {
      date: new Date(),
      firstName: 'asdasdas',
      // lastName: 'asdasda',
      email: 'asd@asda.pl',
    };
    const validationFn = () => {
      validateEventData(data);
    };
    expect(validationFn).toThrow();
  });
  it('should throw when email is miss', () => {
    const data = {
      date: new Date(),
      firstName: 'asdasdas',
      lastName: 'asdasda',
      // email: 'asd@asda.pl',
    };
    const validationFn = () => {
      validateEventData(data);
    };
    expect(validationFn).toThrow();
  });
  it('should throw when email is not valid email', () => {
    const data = {
      date: new Date(),
      firstName: 'asdasdas',
      lastName: 'asdasda',
      email: 'asasd',
    };
    const validationFn = () => {
      validateEventData(data);
    };
    expect(validationFn).toThrow();
  });
});
