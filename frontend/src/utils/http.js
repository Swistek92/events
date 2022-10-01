import { HttpError } from './errors';
const url = 'http://localhost:3001/api/v1/';

export const sendEventData = async (data) => {
  const response = await fetch(url + 'events/', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  });
  const responseData = await response.json();

  if (!response.ok) {
    throw new HttpError(response.status, 'seding request failed', responseData);
  }

  return responseData;
};
