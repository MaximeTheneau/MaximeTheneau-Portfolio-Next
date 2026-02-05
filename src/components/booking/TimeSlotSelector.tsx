import React from 'react';

interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
}

interface TimeSlotSelectorProps {
  slots: TimeSlot[];
  selectedSlot: string | null;
  onSlotSelect: (time: string) => void;
  loading: boolean;
}

export default function TimeSlotSelector({
  slots,
  selectedSlot,
  onSlotSelect,
  loading,
}: TimeSlotSelectorProps) {
  const formatTime = (dateTimeStr: string): string => {
    const date = new Date(dateTimeStr);
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Spinner moderne pendant le chargement
  if (loading) {
    return (
      <div className="time-slot-selector animate-fade-in-up">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Sélectionnez un créneau horaire
        </label>
        <div className="bg-surface-elevated rounded-2xl p-8 shadow-lg shadow-black/5 border border-gray-100">
          <div className="flex flex-col items-center justify-center gap-4">
            {/* Spinner moderne */}
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
              <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            </div>
            <p className="text-sm text-gray-500 animate-pulse-soft">
              Chargement des créneaux disponibles...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // État vide avec illustration
  if (slots.length === 0) {
    return (
      <div className="time-slot-selector animate-fade-in-up">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Sélectionnez un créneau horaire
        </label>
        <div className="bg-surface-elevated rounded-2xl p-8 shadow-lg shadow-black/5 border border-gray-100">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            {/* Illustration calendrier vide */}
            <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v4m0 0h-2m2 0h2" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-700">Aucun créneau disponible</p>
              <p className="text-sm text-gray-500 mt-1">
                Veuillez sélectionner une autre date.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const availableSlots = slots.filter((slot) => slot.available);

  // Tous les créneaux réservés
  if (availableSlots.length === 0) {
    return (
      <div className="time-slot-selector animate-fade-in-up">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Sélectionnez un créneau horaire
        </label>
        <div className="bg-surface-elevated rounded-2xl p-8 shadow-lg shadow-black/5 border border-gray-100">
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            {/* Illustration créneaux complets */}
            <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-700">Tous les créneaux sont réservés</p>
              <p className="text-sm text-gray-500 mt-1">
                Cette journée est complète. Essayez une autre date.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="time-slot-selector animate-fade-in-up">
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Sélectionnez un créneau horaire
        <span className="text-gray-400 font-normal ml-2">
          ({availableSlots.length} disponible{availableSlots.length > 1 ? 's' : ''})
        </span>
      </label>

      {/* Grille premium des créneaux */}
      <div className="bg-surface-elevated rounded-2xl p-4 shadow-lg shadow-black/5 border border-gray-100">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {slots.map((slot) => {
            if (!slot.available) return null;

            const isSelected = selectedSlot === slot.start;

            return (
              <button
                key={slot.start}
                type="button"
                onClick={() => onSlotSelect(slot.start)}
                className={`
                  relative group p-4 rounded-2xl border-2 text-center font-medium
                  transition-all duration-200 touch-manipulation min-h-[60px]
                  ${
                    isSelected
                      ? 'bg-gradient-to-br from-black to-gray-800 border-black text-white shadow-lg shadow-black/20 scale-[1.02]'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:-translate-y-1 hover:shadow-md active:scale-95'
                  }
                `}
              >
                {/* Icône horloge */}
                <div className={`flex items-center justify-center gap-2 ${isSelected ? 'text-white' : 'text-gray-600'}`}>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-base">{formatTime(slot.start)}</span>
                </div>

                {/* Badge check pour sélection */}
                {isSelected && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-primary rounded-full flex items-center justify-center shadow-sm animate-scale-in">
                    <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Affichage du créneau sélectionné */}
      {selectedSlot && (
        <div className="mt-3 flex items-center gap-2 text-sm text-gray-600 animate-fade-in-up">
          <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>
            Créneau sélectionné :{' '}
            <span className="font-semibold text-gray-900">
              {formatTime(selectedSlot)}
            </span>
          </span>
        </div>
      )}
    </div>
  );
}
