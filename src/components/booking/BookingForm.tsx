import { ChangeEvent, useEffect, useState, useMemo } from 'react';
import FormMiddleware from '../../middleware/formMiddleware';
import Confirmation from '../modal/Confirmation';
import CalendarPicker from './CalendarPicker';
import TimeSlotSelector from './TimeSlotSelector';

interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  selectedDate: string | null;
  selectedTime: string | null;
  message: string;
}

interface ModalState {
  title: string;
  message: string;
  toggleModal: boolean;
}

interface BookingFormState {
  form: FormState;
  availableSlots: TimeSlot[];
  loading: boolean;
  confirmationName: boolean | null;
  confirmationEmail: boolean | null;
  confirmationPhone: boolean | null;
  modal: ModalState;
  isSubmitted: boolean;
  isBlocked: boolean;
  blockedMessage: string;
}

const MAX_BOOKINGS = 2;
const BOOKING_STORAGE_KEY = 'booking_count';

const getBookingCount = (): number => {
  if (typeof window === 'undefined') return 0;
  const stored = localStorage.getItem(BOOKING_STORAGE_KEY);
  if (!stored) return 0;

  const data = JSON.parse(stored);
  const now = Date.now();
  if (now - data.timestamp > 30 * 24 * 60 * 60 * 1000) {
    localStorage.removeItem(BOOKING_STORAGE_KEY);
    return 0;
  }
  return data.count || 0;
};

const incrementBookingCount = (): void => {
  if (typeof window === 'undefined') return;
  const currentCount = getBookingCount();
  localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify({
    count: currentCount + 1,
    timestamp: Date.now(),
  }));
};

function Confetti() {
  const confettiPieces = useMemo(() => {
    const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 8 + Math.random() * 8,
    }));
  }, []);
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti"
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
        />
      ))}
    </div>
  );
}

function StepperHeader({ currentStep, completedSteps }: { currentStep: number; completedSteps: number[] }) {
  const steps = [
    { number: 1, label: 'Date' },
    { number: 2, label: 'Horaire' },
    { number: 3, label: 'Coordonnées' },
  ];

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.number);
          const isActive = currentStep === step.number;
          const isPast = step.number < currentStep;

          return (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={`
                    relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full
                    transition-all duration-300 font-bold text-sm
                    ${
                      isCompleted
                        ? 'bg-gradient-to-br from-primary to-secondary scale-100'
                        : isActive
                          ? 'bg-gradient-to-br from-black to-gray-800 text-white scale-110 shadow-lg shadow-black/20'
                          : 'bg-gray-100 text-gray-400'
                    }
                  `}
                >
                  {isCompleted ? (
                    <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className={isActive ? 'text-white' : 'text-gray-400'}>
                      {step.number}
                    </span>
                  )}
                </div>
                <span
                  className={`
                    mt-2 text-xs sm:text-sm font-medium transition-colors duration-300
                    ${isActive || isCompleted ? 'text-gray-900' : 'text-gray-400'}
                  `}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="flex-1 mx-2 sm:mx-4">
                  <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ${
                        isPast || isCompleted ? 'w-full' : 'w-0'
                      }`}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SummaryBar({
  selectedDate,
  selectedTime,
  currentStep,
  onContinue,
  onBack,
  canContinue,
  isSubmitting,
}: {
  selectedDate: string | null;
  selectedTime: string | null;
  currentStep: number;
  onContinue: () => void;
  onBack: () => void;
  canContinue: boolean;
  isSubmitting?: boolean;
}) {
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
    <div className="sticky bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 px-4 py-3 -mx-4 sm:-mx-6 mt-6 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
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
          className={`
            flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm
            transition-all duration-300 touch-manipulation whitespace-nowrap shrink-0
            ${
              canContinue && !isSubmitting
                ? 'bg-gradient-to-r from-black to-gray-800 text-white hover:shadow-lg hover:shadow-black/20 hover:scale-[1.02] active:scale-[0.98]'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }
          `}
        >
          {isSubmitting ? (
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : null}
          {getButtonText()}
          {!isSubmitting && currentStep !== 3 && (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export default function BookingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const [state, setState] = useState<BookingFormState>({
    form: {
      name: '',
      email: '',
      phone: '',
      selectedDate: null,
      selectedTime: null,
      message: '',
    },
    availableSlots: [],
    loading: false,
    confirmationName: null,
    confirmationEmail: null,
    confirmationPhone: null,
    modal: {
      title: '',
      message: '',
      toggleModal: false,
    },
    isSubmitted: false,
    isBlocked: false,
    blockedMessage: '',
  });

  useEffect(() => {
    if (getBookingCount() >= MAX_BOOKINGS) {
      setState((prev) => ({
        ...prev,
        isBlocked: true,
        blockedMessage: `Vous avez déjà effectué ${MAX_BOOKINGS} réservations. Pour prendre un nouveau rendez-vous, veuillez nous contacter directement.`,
      }));
    }
  }, []);

  const minDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date;
  }, []);

  const maxDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date;
  }, []);

  useEffect(() => {
    if (state.form.selectedDate) {
      fetchAvailableSlots(state.form.selectedDate);
    }
  }, [state.form.selectedDate]);

  const fetchAvailableSlots = async (date: string) => {
    setState((prev) => ({ ...prev, loading: true }));

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}booking/slots?date=${date}`
      );
      const data = await response.json();

      if (response.ok) {
        setState((prev) => ({
          ...prev,
          availableSlots: data.slots || [],
          loading: false,
          form: { ...prev.form, selectedTime: null },
        }));
      } else {
        setState((prev) => ({
          ...prev,
          availableSlots: [],
          loading: false,
          modal: {
            title: 'Erreur',
            message: data.erreur || 'Erreur lors du chargement des créneaux',
            toggleModal: true,
          },
        }));
      }
    } catch {
      setState((prev) => ({
        ...prev,
        availableSlots: [],
        loading: false,
        modal: {
          title: 'Erreur',
          message: 'Erreur de connexion. Veuillez réessayer.',
          toggleModal: true,
        },
      }));
    }
  };

  const handleChange = (field: string, value: string) => {
    setState((prev) => ({
      ...prev,
      form: { ...prev.form, [field]: value },
    }));
  };

  const handleDateSelect = (date: string) => {
    setState((prev) => ({
      ...prev,
      form: { ...prev.form, selectedDate: date },
    }));
  };

  const handleSlotSelect = (time: string) => {
    setState((prev) => ({
      ...prev,
      form: { ...prev.form, selectedTime: time },
    }));
  };

  const validateName = () => {
    const isValid = state.form.name.length >= 3 && state.form.name.length <= 70;
    setState((prev) => ({ ...prev, confirmationName: isValid }));
    return isValid;
  };

  const validateEmail = () => {
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = regex.test(state.form.email);
    setState((prev) => ({ ...prev, confirmationEmail: isValid }));
    return isValid;
  };

  const validatePhone = () => {
    const isValid = state.form.phone.length >= 10;
    setState((prev) => ({ ...prev, confirmationPhone: isValid }));
    return isValid;
  };

  const handleResponse200 = () => {
    incrementBookingCount();
    setShowConfetti(true);
    setIsSubmitting(false);
    setState((prev) => ({
      ...prev,
      isSubmitted: true,
      form: {
        name: '',
        email: '',
        phone: '',
        selectedDate: null,
        selectedTime: null,
        message: '',
      },
      availableSlots: [],
    }));
    setTimeout(() => setShowConfetti(false), 4000);
  };

  const handleResponseError = (errorMessage: string) => {
    setIsSubmitting(false);
    const isRateLimitError = errorMessage?.includes('maximum') || errorMessage?.includes('limite');

    setState((prev) => ({
      ...prev,
      isBlocked: isRateLimitError ? true : prev.isBlocked,
      blockedMessage: isRateLimitError ? errorMessage : prev.blockedMessage,
      modal: {
        title: isRateLimitError ? 'Limite atteinte' : 'Erreur',
        message: errorMessage || 'Une erreur est survenue. Veuillez réessayer.',
        toggleModal: true,
      },
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (getBookingCount() >= MAX_BOOKINGS) {
      const msg = `Vous avez déjà effectué ${MAX_BOOKINGS} réservations. Veuillez nous contacter directement pour plus de rendez-vous.`;
      setState((prev) => ({
        ...prev,
        isBlocked: true,
        blockedMessage: msg,
        modal: {
          title: 'Limite atteinte',
          message: msg,
          toggleModal: true,
        },
      }));
      return;
    }

    if (!validateName() || !validateEmail() || !validatePhone()) {
      setState((prev) => ({
        ...prev,
        modal: {
          title: 'Erreur',
          message: 'Veuillez renseigner correctement tous les champs obligatoires',
          toggleModal: true,
        },
      }));
      return;
    }

    if (!state.form.selectedDate || !state.form.selectedTime) {
      setState((prev) => ({
        ...prev,
        modal: {
          title: 'Erreur',
          message: 'Veuillez sélectionner une date et un créneau horaire',
          toggleModal: true,
        },
      }));
      return;
    }

    setIsSubmitting(true);

    const dateTime = new Date(state.form.selectedTime);
    const formData = {
      name: state.form.name,
      email: state.form.email,
      phone: state.form.phone,
      date: dateTime.toISOString().split('T')[0],
      time: dateTime.toTimeString().slice(0, 5),
      message: state.form.message || '',
    };

    FormMiddleware(formData, 'booking/create', handleResponse200, handleResponseError);
  };

  const closeModal = () => {
    setState((prev) => ({
      ...prev,
      modal: { ...prev.modal, toggleModal: false },
    }));
  };

  const handleContinue = () => {
    if (currentStep === 1 && state.form.selectedDate) {
      setCurrentStep(2);
    } else if (currentStep === 2 && state.form.selectedTime) {
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getCompletedSteps = () => {
    const completed: number[] = [];
    if (state.form.selectedDate) completed.push(1);
    if (state.form.selectedTime) completed.push(2);
    return completed;
  };

  const canContinue = () => {
    if (currentStep === 1) return !!state.form.selectedDate;
    if (currentStep === 2) return !!state.form.selectedTime;
    if (currentStep === 3) {
      return (
        state.form.name.length >= 3 &&
        state.form.email.length > 0 &&
        state.form.phone.length >= 10
      );
    }
    return false;
  };

  if (state.isBlocked) {
    return (
      <div className="text-center p-6">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-orange-100 flex items-center justify-center">
          <svg className="w-8 h-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold mb-2">Limite de réservations atteinte</h3>
        <p className="text-sm text-gray-600">{state.blockedMessage}</p>
      </div>
    );
  }

  if (state.isSubmitted) {
    return (
      <>
        {showConfetti && <Confetti />}
        <div className="text-center py-4">
          <div className="relative w-28 h-28 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 animate-pulse" />
            <div className="absolute inset-4 bg-gradient-to-br from-primary via-secondary to-primary rounded-2xl shadow-lg flex items-center justify-center">
              <div className="relative">
                <svg className="w-10 h-10 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md">
                  <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2">Rendez-vous confirmé !</h3>
          <p className="text-gray-600 mb-4">Votre demande a été envoyée avec succès.</p>

          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 text-left max-w-sm mx-auto">
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500">Email de confirmation</p>
                <p className="font-medium text-gray-900 text-sm">Google Calendar</p>
              </div>
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-500 flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Vérifiez votre boîte mail (et spam)
          </p>
        </div>
      </>
    );
  }

  return (
    <div className="booking-form">
      <StepperHeader currentStep={currentStep} completedSteps={getCompletedSteps()} />

      <form onSubmit={handleSubmit}>
        {/* Étape 1: Calendrier */}
        <div className={`transition-all duration-300 ${currentStep === 1 ? 'opacity-100' : 'opacity-0 hidden'}`}>
          <CalendarPicker
            onDateSelect={handleDateSelect}
            selectedDate={state.form.selectedDate}
            minDate={minDate}
            maxDate={maxDate}
          />
        </div>

        {/* Étape 2: Créneaux horaires */}
        <div className={`transition-all duration-300 ${currentStep === 2 ? 'opacity-100' : 'opacity-0 hidden'}`}>
          <TimeSlotSelector
            slots={state.availableSlots}
            selectedSlot={state.form.selectedTime}
            onSlotSelect={handleSlotSelect}
            loading={state.loading}
          />
        </div>

        {/* Étape 3: Formulaire de contact */}
        <div className={`transition-all duration-300 ${currentStep === 3 ? 'opacity-100' : 'opacity-0 hidden'}`}>
          <div className="space-y-4">
            {/* Nom */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nom complet <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={state.form.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('name', e.target.value)}
                  onBlur={validateName}
                  placeholder="Votre nom"
                  className={`
                    w-full pl-12 pr-12 py-3.5 rounded-xl border-2 text-base
                    transition-all duration-200 touch-manipulation
                    focus:outline-none focus:ring-0 focus:shadow-none
                    ${
                      state.confirmationName === false
                        ? 'border-red-300 bg-red-50'
                        : state.confirmationName === true
                          ? 'border-green-300 bg-green-50'
                          : 'border-gray-200 focus:border-black bg-white'
                    }
                  `}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  {state.confirmationName === true && (
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {state.confirmationName === false && (
                    <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
              </div>
              {state.confirmationName === false && (
                <p className="mt-1.5 text-sm text-red-500">Le nom doit contenir entre 3 et 70 caractères</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  value={state.form.email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('email', e.target.value)}
                  onBlur={validateEmail}
                  placeholder="votre@email.com"
                  className={`
                    w-full pl-12 pr-12 py-3.5 rounded-xl border-2 text-base
                    transition-all duration-200 touch-manipulation
                    focus:outline-none focus:ring-0 focus:shadow-none
                    ${
                      state.confirmationEmail === false
                        ? 'border-red-300 bg-red-50'
                        : state.confirmationEmail === true
                          ? 'border-green-300 bg-green-50'
                          : 'border-gray-200 focus:border-black bg-white'
                    }
                  `}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  {state.confirmationEmail === true && (
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {state.confirmationEmail === false && (
                    <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
              </div>
              {state.confirmationEmail === false && (
                <p className="mt-1.5 text-sm text-red-500">Veuillez renseigner une adresse email valide</p>
              )}
            </div>

            {/* Téléphone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Téléphone <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <input
                  type="tel"
                  value={state.form.phone}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('phone', e.target.value)}
                  onBlur={validatePhone}
                  placeholder="06 12 34 56 78"
                  className={`
                    w-full pl-12 pr-12 py-3.5 rounded-xl border-2 text-base
                    transition-all duration-200 touch-manipulation
                    focus:outline-none focus:ring-0 focus:shadow-none
                    ${
                      state.confirmationPhone === false
                        ? 'border-red-300 bg-red-50'
                        : state.confirmationPhone === true
                          ? 'border-green-300 bg-green-50'
                          : 'border-gray-200 focus:border-black bg-white'
                    }
                  `}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  {state.confirmationPhone === true && (
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {state.confirmationPhone === false && (
                    <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
              </div>
              {state.confirmationPhone === false && (
                <p className="mt-1.5 text-sm text-red-500">Veuillez renseigner un numéro de téléphone valide</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Message <span className="text-gray-400 font-normal">(optionnel)</span>
              </label>
              <div className="relative">
                <textarea
                  value={state.form.message}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleChange('message', e.target.value)}
                  placeholder="Décrivez brièvement l'objet de votre rendez-vous..."
                  rows={3}
                  maxLength={500}
                  className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-black text-base transition-all duration-200 touch-manipulation resize-none focus:outline-none focus:ring-0 focus:shadow-none bg-white"
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                  {state.form.message.length}/500
                </div>
              </div>
            </div>
          </div>
        </div>

        <SummaryBar
          selectedDate={state.form.selectedDate}
          selectedTime={state.form.selectedTime}
          currentStep={currentStep}
          onContinue={handleContinue}
          onBack={handleBack}
          canContinue={canContinue()}
          isSubmitting={isSubmitting}
        />
      </form>

      <Confirmation
        title={state.modal.title}
        message={state.modal.message}
        toggleModal={state.modal.toggleModal}
      />
    </div>
  );
}
