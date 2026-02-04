import React from 'react';

interface CalendarPickerProps {
  onDateSelect: (date: string) => void;
  selectedDate: string | null;
  minDate: Date;
  maxDate: Date;
}

export default function CalendarPicker({
  onDateSelect,
  selectedDate,
  minDate,
  maxDate,
}: CalendarPickerProps) {
  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onDateSelect(event.target.value);
  };

  return (
    <div className="calendar-picker">
      <label htmlFor="booking-date" className="block text-sm font-medium mb-2">
        Sélectionnez une date
      </label>
      <input
        type="date"
        id="booking-date"
        value={selectedDate || ''}
        onChange={handleDateChange}
        min={formatDate(minDate)}
        max={formatDate(maxDate)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        required
      />
    </div>
  );
}
