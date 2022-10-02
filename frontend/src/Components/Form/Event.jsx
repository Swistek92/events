import React, { useState, useReducer, useContext } from 'react';
import Calendar from 'react-calendar';
import Input from '../inputs/Input';
import Dropdown from '../dropdown/dropdown';
import styles from './styles.module.css';
import { validateEventData } from '../../utils/validators';
import { sendEventData } from '../../utils/http';
import NotificationContext from '../../store/notification-context';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  date: new Date(),
};

const personActionTypes = {
  updateFirstName: 'UPDATE_FIRSTNAME',
  updateLastName: 'UPDATE_LASTNAME',
  updateEmail: 'UPDATE_EMAIL',
  updateDate: 'UPDATE_DATE',
  resetPerson: 'RESET_PERSON',
};

function personReducer(prevState = initialState, action) {
  switch (action.type) {
    case personActionTypes.updateFirstName:
      return {
        ...prevState,
        firstName: action.payload,
      };
    case personActionTypes.updateLastName:
      return {
        ...prevState,
        lastName: action.payload,
      };
    case personActionTypes.updateEmail:
      return {
        ...prevState,
        email: action.payload,
      };
    case personActionTypes.updateDate:
      return {
        ...prevState,
        date: action.payload,
      };
    case personActionTypes.resetPerson:
      return {
        ...prevState,
        ...initialState,
      };
    default:
      return prevState;
  }
}

const Event = () => {
  const [userData, dispatch] = useReducer(personReducer, initialState);
  const { firstName, lastName, email, date } = userData;
  const notificationCtx = useContext(NotificationContext);

  const [error, setError] = useState('');
  const localDate = date.toLocaleDateString('en-us');

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      notificationCtx.showNotification({
        title: 'registring for event',
        message: 'registring for event',
        status: 'pending',
      });
      validateEventData(userData);
      await sendEventData(userData);
      notificationCtx.showNotification({
        title: 'Success!',
        message: 'Successfully registered for event!',
        status: 'success',
      });
      dispatch({ type: personActionTypes.resetPerson });
      setError('');
    } catch (error) {
      console.log(error);
      // setError(error.message || error || 'smth went wrong');
      notificationCtx.showNotification({
        title: 'Error!',
        message: error.message || error || 'smth went wrong',
        status: 'error',
      });
    }
  };

  return (
    <div className={styles.modal}>
      <form onSubmit={onSubmit} className={styles.form}>
        <Input
          name='name'
          type='text'
          value={firstName}
          onChange={[dispatch, personActionTypes.updateFirstName]}
        />
        <Input
          name='lastname'
          type='text'
          value={lastName}
          onChange={[dispatch, personActionTypes.updateLastName]}
        />
        <Input
          name='email'
          type='email'
          value={email}
          onChange={[dispatch, personActionTypes.updateEmail]}
        />

        <h2>Date: {localDate} </h2>
        <Dropdown name='PickDate'>
          <Calendar
            onChange={(e) =>
              dispatch({
                type: personActionTypes.updateDate,
                payload: e,
              })
            }
            value={date}
          />
        </Dropdown>

        {error && <h4 className={styles.error}> {error}</h4>}
        <button type='submit' className={styles.btn}>
          send a request
        </button>
      </form>
    </div>
  );
};

export default Event;
