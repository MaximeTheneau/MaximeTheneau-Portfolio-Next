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

  if (loading) {
    return (
      <div className="time-slot-selector">
        <p className="text-center text-gray-500">Chargement des créneaux disponibles...</p>
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <div className="time-slot-selector">
        <p className="text-center text-gray-500">
          Aucun créneau disponible pour cette date.
          Veuillez sélectionner une autre date.
        </p>
      </div>
    );
  }

  const availableSlots = slots.filter((slot) => slot.available);

  if (availableSlots.length === 0) {
    return (
      <div className="time-slot-selector">
        <p className="text-center text-gray-500">
          Tous les créneaux sont réservés pour cette date.
          Veuillez sélectionner une autre date.
        </p>
      </div>
    );
  }

  return (
    <div className="time-slot-selector">
      <label className="block text-sm font-medium mb-2">
        Sélectionnez un créneau horaire
      </label>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
        {slots.map((slot) => {
          if (!slot.available) return null;

          const isSelected = selectedSlot === slot.start;

          return (
            <button
              key={slot.start}
              type="button"
              onClick={() => onSlotSelect(slot.start)}
              className={`
                p-2 rounded-lg border-2 text-sm font-medium transition-all
                ${
                  isSelected
                    ? 'bg-primary border-primary text-black'
                    : 'bg-white border-gray-300 text-gray-700 hover:border-primary hover:bg-gray-50'
                }
              `}
            >
              {formatTime(slot.start)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
