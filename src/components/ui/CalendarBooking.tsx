/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const BookingForm = dynamic(() => import('../booking/BookingForm'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center py-12">
      <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

function CalendarBooking() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => setIsMounted(false), 300);
  };

  return (
    <div>
      {/* Bouton CTA Premium */}
      <button
        onClick={handleOpen}
        type="button"
        className="group relative text-black text-center mx-auto block w-[calc(100%-2rem)] sm:w-full md:w-1/2 bg-gradient-to-r from-primary to-secondary my-4 px-4 sm:px-8 py-4 rounded-2xl font-bold touch-manipulation transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/25 active:scale-[0.98] overflow-hidden"
      >
        <span className="relative z-10 flex items-center justify-center gap-3">
          <svg
            className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Prendre un rendez-vous téléphonique
        </span>
        {/* Effet de brillance au hover */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </button>

      {/* Modal Glassmorphism */}
      {isMounted && (
        <div
          className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center transition-all duration-300 ${
            isOpen ? 'bg-black/40 backdrop-blur-md' : 'bg-transparent'
          }`}
          onClick={handleClose}
        >
          <div
            className={`bg-white/95 backdrop-blur-xl w-full sm:w-auto sm:min-w-[600px] sm:max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden sm:rounded-3xl rounded-t-3xl shadow-2xl shadow-black/20 transition-all duration-300 ${
              isOpen
                ? 'translate-y-0 opacity-100 sm:scale-100'
                : 'translate-y-full sm:translate-y-0 opacity-0 sm:scale-90'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header avec gradient subtil */}
            <div className="relative px-6 py-4 border-b border-gray-100">
              {/* Gradient de fond */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent" />

              <div className="relative flex justify-between items-center">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                    Prendre rendez-vous
                  </h2>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Choisissez votre créneau idéal
                  </p>
                </div>

                {/* Bouton fermeture avec rotation au hover */}
                <button
                  onClick={handleClose}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-all duration-300 hover:rotate-90 touch-manipulation"
                  aria-label="Fermer"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Contenu scrollable */}
            <div className="overflow-y-auto max-h-[calc(95vh-80px)] sm:max-h-[calc(90vh-80px)]">
              <div className="p-4 sm:p-6">
                <BookingForm />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarBooking;
