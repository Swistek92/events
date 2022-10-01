import React from 'react';

const Input = ({ name, type, value, onChange }) => {
  const dispatch = onChange[0];
  const actionType = onChange[1];
  return (
    <>
      <label htmlFor={name}> {name} </label>
      <input
        data-testid='todo-1'
        id={name}
        type={type}
        value={value}
        onChange={(e) =>
          dispatch({ type: actionType, payload: e.target.value })
        }
      />
    </>
  );
};

export default Input;
