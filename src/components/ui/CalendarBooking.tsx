/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';

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
          className=" top-0 inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleClose}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-[90%] h-[90%] max-w-4xl"
            onClick={(e) => e.stopPropagation()} // Empêche la fermeture si on clique à l'intérieur
          >
            {/* Header du modal */}
            <div className="flex justify-between items-center border-b px-4 py-2">
              <h2 className="text-lg font-semibold">Prendre un rendez-vous</h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700"
              >
                &#x2715;
              </button>
            </div>

            {/* Contenu du modal */}
            <div className="p-4">
              <iframe
                src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0R4gGtJeJFPMTmXWkiBJpFyW5diK3pXnaqPcfDR-pebm3FLBoHhchJCPFhm-3gLAdab2WSZao4?gv=true"
                width="100%"
                height="400px"
                title="Rendez-vous"
                className="rounded"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarBooking;
