import validator from 'validator';
import { ValidationError } from './errors';

export const validateEventData = (props) => {
  const { date, email, firstName, lastName } = props;
  const error = (msg) => {
    throw new ValidationError(msg);
  };

  if (!validator.isDate(date)) error('chooise correct date');
  if (!date) error('chooise a date');
  if (!firstName) error('chooise a firstName');
  if (!lastName) error('chooise a lastName');
  if (!validator.isEmail(email)) error('chooise correct email');

  return;
};
