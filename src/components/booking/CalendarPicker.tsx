import { useState, useMemo } from 'react';

interface CalendarPickerProps {
  onDateSelect: (date: string) => void;
  selectedDate: string | null;
  minDate: Date;
  maxDate: Date;
}

const DAYS_OF_WEEK = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const MONTHS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];

export default function CalendarPicker({
  onDateSelect,
  selectedDate,
  minDate,
  maxDate,
}: CalendarPickerProps) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  const formatDateString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isDateDisabled = (date: Date): boolean => {
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const minOnly = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
    const maxOnly = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
    return dateOnly < minOnly || dateOnly > maxOnly;
  };

  const isDateSelected = (date: Date): boolean => {
    if (!selectedDate) return false;
    return formatDateString(date) === selectedDate;
  };

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // Premier jour du mois (0 = Dimanche, on veut Lundi = 0)
    let firstDayOfMonth = new Date(year, month, 1).getDay();
    firstDayOfMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    // Nombre de jours dans le mois
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Jours du mois précédent pour compléter la première semaine
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days: { date: Date; isCurrentMonth: boolean }[] = [];

    // Jours du mois précédent
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, daysInPrevMonth - i),
        isCurrentMonth: false,
      });
    }

    // Jours du mois actuel
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    // Jours du mois suivant pour compléter la dernière semaine
    const remainingDays = 42 - days.length; // 6 semaines * 7 jours
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return days;
  }, [currentMonth]);

  const goToPreviousMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const canGoPrevious = useMemo(() => {
    const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    const lastDayOfPrevMonth = new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 0);
    return lastDayOfPrevMonth >= minDate;
  }, [currentMonth, minDate]);

  const canGoNext = useMemo(() => {
    const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    return nextMonth <= maxDate;
  }, [currentMonth, maxDate]);

  const handleDateClick = (date: Date) => {
    if (!isDateDisabled(date)) {
      onDateSelect(formatDateString(date));
    }
  };

  return (
    <div className="calendar-picker">
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        Sélectionnez une date
      </label>

      {/* Container du calendrier Bento */}
      <div className="bg-surface-elevated rounded-2xl p-4 shadow-lg shadow-black/5 border border-gray-100">
        {/* Navigation du mois */}
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={goToPreviousMonth}
            disabled={!canGoPrevious}
            className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 touch-manipulation ${
              canGoPrevious
                ? 'bg-white hover:bg-gray-50 hover:scale-105 active:scale-95 shadow-sm border border-gray-200 text-gray-700'
                : 'bg-gray-50 text-gray-300 cursor-not-allowed'
            }`}
            aria-label="Mois précédent"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <h3 className="text-lg font-bold text-gray-900">
            {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h3>

          <button
            type="button"
            onClick={goToNextMonth}
            disabled={!canGoNext}
            className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 touch-manipulation ${
              canGoNext
                ? 'bg-white hover:bg-gray-50 hover:scale-105 active:scale-95 shadow-sm border border-gray-200 text-gray-700'
                : 'bg-gray-50 text-gray-300 cursor-not-allowed'
            }`}
            aria-label="Mois suivant"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Grille des jours de la semaine */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAYS_OF_WEEK.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-semibold text-gray-400 uppercase tracking-wide py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Grille Bento des jours */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map(({ date, isCurrentMonth }, index) => {
            const disabled = isDateDisabled(date) || !isCurrentMonth;
            const selected = isDateSelected(date);
            const today = isToday(date);

            return (
              <button
                key={index}
                type="button"
                onClick={() => handleDateClick(date)}
                disabled={disabled}
                className={`
                  relative aspect-square flex items-center justify-center rounded-xl text-sm font-medium
                  transition-all duration-200 touch-manipulation
                  ${
                    selected
                      ? 'bg-gradient-to-br from-black to-gray-800 text-white scale-105 shadow-lg shadow-black/20'
                      : disabled
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'hover:bg-white hover:shadow-md hover:-translate-y-0.5 active:scale-95 text-gray-700'
                  }
                  ${today && !selected ? 'ring-2 ring-primary ring-offset-2' : ''}
                  ${!isCurrentMonth ? 'opacity-40' : ''}
                `}
              >
                {date.getDate()}

                {/* Point indicateur pour aujourd'hui */}
                {today && !selected && (
                  <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                )}

                {/* Badge check pour sélection */}
                {selected && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center shadow-sm">
                    <svg className="w-2.5 h-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Affichage de la date sélectionnée */}
      {selectedDate && (
        <div className="mt-3 flex items-center gap-2 text-sm text-gray-600 animate-fade-in-up">
          <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>
            Date sélectionnée :{' '}
            <span className="font-semibold text-gray-900 capitalize">
              {new Date(selectedDate).toLocaleDateString('fr-FR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
              })}
            </span>
          </span>
        </div>
      )}
    </div>
  );
}
