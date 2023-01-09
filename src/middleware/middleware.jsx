import { NextResponse } from 'next/server';

export function formMiddleware(event) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event),
  };
  fetch('https://back.theneaumaxime.fr/public/api/message', requestOptions)
    .catch((err) => console.log(err));
  return NextResponse.next();
}

export function middleware() {
  return NextResponse.next();
}
