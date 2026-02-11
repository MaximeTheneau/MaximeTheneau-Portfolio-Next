/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect, useCallback } from 'react';
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
      const timer = setTimeout(() => setIsMounted(false), 300);
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    window.history.pushState(null, '', '#calendar');
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    window.history.pushState(null, '', window.location.pathname + window.location.search);
  }, []);

  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#calendar') {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);
    window.addEventListener('popstate', checkHash);
    return () => {
      window.removeEventListener('hashchange', checkHash);
      window.removeEventListener('popstate', checkHash);
    };
  }, []);

  return (
    <>
      {/* Bouton fixed en bas à droite */}
      <button
        onClick={handleOpen}
        type="button"
        aria-label="Prendre rendez-vous"
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-10 h-10 rounded-full bg-black text-white shadow-lg shadow-black/20 hover:scale-105 active:scale-95 transition-all duration-300 touch-manipulation"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>

      {/* Modal Glassmorphism */}
      {isMounted && (
        <div
          className={`fixed z-20 inset-0  flex items-end sm:items-center justify-center transition-all duration-300 ${
            isOpen ? 'bg-black/30 sm:backdrop-blur-sm' : 'bg-transparent'
          }`}
          onClick={handleClose}
        >
          <div
            className={`liquid-glass w-full sm:w-auto sm:min-w-[600px] sm:max-w-2xl max-h-[95vh] sm:max-h-[90vh] sm:rounded-3xl rounded-t-3xl transition-all duration-300 ${
              isOpen
                ? 'translate-y-0 opacity-100 sm:scale-100'
                : 'translate-y-full sm:translate-y-0 opacity-0 sm:scale-90'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative px-6 py-4 border-b border-white/30">

              <div className="relative flex justify-between items-center">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                    Prendre rendez-vous
                  </h2>
                </div>

                {/* Bouton fermeture avec rotation au hover */}
                <button
                  onClick={handleClose}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white/50 text-gray-600 hover:text-gray-800 transition-all duration-300 hover:rotate-90 touch-manipulation"
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
    </>
  );
}

export default CalendarBooking;
