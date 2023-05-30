import { NextApiRequest, NextApiResponse } from 'next';
import Confirmation from '../components/modal/Confirmation';

export function formMiddleware(req, handleResponse200, handleResponseError) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  };
  fetch(`${process.env.NEXT_PUBLIC_API_CONTACT}`, requestOptions)
    .then((response) => {
      if (response.ok) {
        handleResponse200()
      } else {
        handleResponseError()
      }}) 
      .catch((error) => {
        console.log(error);
      });
}
