interface SummaryBarProps {
  selectedDate: string | null;
  selectedTime: string | null;
  currentStep: number;
  onContinue: () => void;
  onBack: () => void;
  canContinue: boolean;
  isSubmitting?: boolean;
}

export default function SummaryBar({
  selectedDate,
  selectedTime,
  currentStep,
  onContinue,
  onBack,
  canContinue,
  isSubmitting,
}: SummaryBarProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  };

  const formatTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getButtonText = () => {
    if (isSubmitting) return 'Confirmation...';
    if (currentStep === 3) return 'Confirmer';
    return 'Continuer';
  };

  return (
    <div className="sticky bottom-0 left-0 right-0 z-10 bg-white/95 backdrop-blur-md border-t border-gray-100 px-4 py-3 -mx-4 sm:-mx-6 mt-6 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap flex-1 min-w-0">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={onBack}
              className="flex items-center justify-center w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 transition-all duration-200 touch-manipulation shrink-0"
              aria-label="Retour"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          {selectedDate && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-full text-sm font-medium text-gray-700 border border-gray-100">
              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="capitalize">{formatDate(selectedDate)}</span>
            </span>
          )}
          {selectedTime && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-full text-sm font-medium text-gray-700 border border-gray-100">
              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {formatTime(selectedTime)}
            </span>
          )}
        </div>

        <button
          type={currentStep === 3 ? 'submit' : 'button'}
          onClick={currentStep !== 3 ? onContinue : undefined}
          disabled={!canContinue || isSubmitting}
          className={`btn ${!canContinue || isSubmitting ? 'btn--disabled' : ''}`}
        >
          {isSubmitting ? (
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : null}
          {getButtonText()}
        </button>
      </div>
    </div>
  );
}
