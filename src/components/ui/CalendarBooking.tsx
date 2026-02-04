/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const BookingForm = dynamic(() => import('../booking/BookingForm'), {
  ssr: false,
});

function CalendarBooking() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div>
      {/* Bouton pour ouvrir le modal */}
      <button
        onClick={handleOpen}
        type="button"
        className=" text-black text-center underline mx-auto block  w-full p-4 md:w-1/2 bg-primary my-4 px-8 py-4 rounded-lg font-bold "
      >
        📞 Prendre un rendez-vous téléphonique
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed top-0 inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handleClose}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header du modal */}
            <div className="flex justify-between items-center border-b px-4 py-3 sticky top-0 bg-white">
              <h2 className="text-lg font-semibold">Prendre un rendez-vous</h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &#x2715;
              </button>
            </div>

            {/* Contenu du modal */}
            <div className="p-4">
              <BookingForm />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarBooking;
