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
    <div className=" ">
      <div className="flex justify-center ">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={onBack}
              className="btn"
              aria-label="Retour"
            >
              Retour
            </button>
          )}

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
