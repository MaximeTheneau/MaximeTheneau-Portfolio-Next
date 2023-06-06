import React from 'react';

export default function NotCopie() {
  return (
    <p itemProp="email" className="notCopie" onMouseDown={(e) => e.preventDefault()}>
              <strong>Email : </strong>
              maxime @ theneaumaxime.fr
            </p>
    )
}