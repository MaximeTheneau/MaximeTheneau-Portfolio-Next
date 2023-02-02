import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";


export function formMiddleware(event, req: NextApiRequest, res: NextApiResponse) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event),
  };
  return middleware(
    req,
    res,
    () => {
      fetch('https://back.theneaumaxime.fr/public/api/message', requestOptions)
        .catch((err) => console.log(err));
    },      
  );
}

export function middleware(req: NextApiRequest, res: NextApiResponse, next: () => void) {

  return next();
}
