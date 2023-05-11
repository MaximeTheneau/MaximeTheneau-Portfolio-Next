import { NextResponse } from 'next/server';

export function formMiddleware(event, handleResponse) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(event),
  };
  fetch('https://back.unetaupechezvous.fr/public/api/contact', requestOptions)
    .finally(() => handleResponse(true))
    .catch((err) => console.log(err));

  return NextResponse.next();
}

export function middleware() {
  return NextResponse.next();
}