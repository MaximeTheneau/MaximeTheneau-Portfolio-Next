import React, { ChangeEvent, useEffect, useState } from 'react';
import FormMiddleware from '../../middleware/formMiddleware';
import Confirmation from '../modal/Confirmation';
import Input from '../contact/form/Input';
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
}

// Composant Stepper Header - texte uniquement
function StepperHeader({ currentStep, completedSteps }: { currentStep: number; completedSteps: number[] }) {
  const steps = [
    { number: 1, label: 'Date' },
    { number: 2, label: 'Horaire' },
    { number: 3, label: 'Coordonnées' },
  ];

  return (
    <div className="mb-6">
      <div className="flex items-center justify-center gap-6 sm:gap-8">
        {steps.map((step) => {
          const isCompleted = completedSteps.includes(step.number);
          const isActive = currentStep === step.number;

          return (
            <span
              key={step.number}
              className={`
                text-sm font-semibold transition-colors duration-300
                ${isActive ? 'text-gray-900' : isCompleted ? 'text-primary' : 'text-gray-300'}
              `}
            >
              {step.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}

// Composant Summary Bar
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
    if (currentStep === 3) return 'Confirmer le rendez-vous';
    return 'Continuer';
  };

  return (
    <div className="sticky bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 px-4 py-3 -mx-4 sm:-mx-6 mt-6 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-center gap-3">
        {/* Bouton Retour */}
        {currentStep > 1 && (
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 transition-all duration-300 touch-manipulation hover:scale-[1.02] active:scale-[0.98]"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Retour
          </button>
        )}

        {/* Badges de résumé */}
        <div className="flex items-center gap-2 flex-wrap">
          {selectedDate && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-elevated rounded-full text-sm font-medium text-gray-700 border border-gray-100">
              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="capitalize">{formatDate(selectedDate)}</span>
            </span>
          )}
          {selectedTime && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-elevated rounded-full text-sm font-medium text-gray-700 border border-gray-100">
              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {formatTime(selectedTime)}
            </span>
          )}
        </div>

        {/* Bouton Continuer */}
        <button
          type={currentStep === 3 ? 'submit' : 'button'}
          onClick={currentStep !== 3 ? onContinue : undefined}
          disabled={!canContinue || isSubmitting}
          className={`btn flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm
            transition-all duration-300 touch-manipulation whitespace-nowrap
          `}
        >
          {getButtonText()}
        </button>
      </div>
    </div>
  );
}

export default function BookingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  });

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);

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
    } catch (error) {
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
  };

  const handleResponseError = (data: any) => {
    setIsSubmitting(false);
    setState((prev) => ({
      ...prev,
      modal: {
        title: 'Erreur',
        message: data.erreur || 'Une erreur est survenue. Veuillez réessayer.',
        toggleModal: true,
      },
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

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

  // État succès
  if (state.isSubmitted) {
    return (
      <div className="booking-form p-4 text-center">
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-8 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Rendez-vous confirmé !</h3>
          <p>Votre rendez-vous a été réservé avec succès.</p>
          <p className="mt-2">Vous allez recevoir un email de confirmation de Google Calendar.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-form text-center mx-auto">
      {/* Stepper Header */}
      <StepperHeader currentStep={currentStep} completedSteps={getCompletedSteps()} />

      <form onSubmit={handleSubmit} className='bg-white rounded-t-3xl'>
        {/* Étape 1: Calendrier */}
        <div className={`transition-all duration-300 ${currentStep === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 hidden'}`}>
          <CalendarPicker
            onDateSelect={handleDateSelect}
            selectedDate={state.form.selectedDate}
            minDate={minDate}
            maxDate={maxDate}
          />
        </div>

        {/* Étape 2: Créneaux horaires */}
        <div className={`transition-all duration-300 ${currentStep === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 hidden'}`}>
          <TimeSlotSelector
            slots={state.availableSlots}
            selectedSlot={state.form.selectedTime}
            onSlotSelect={handleSlotSelect}
            loading={state.loading}
          />
        </div>

        {/* Étape 3: Formulaire de contact */}
        <div className={`transition-all duration-300 ${currentStep === 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 hidden'}`}>
          <div>
            <label htmlFor="name">
              <p className="label">
                Nom <span className="text-red-500">*</span>
              </p>
              <Input
                type="text"
                id="name"
                title="Nom"
                value={state.form.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange('name', e.target.value)
                }
                onBlur={validateName}
                placeholder="Votre nom"
                required
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              {state.confirmationName === false && (
                <p className="text-red-500 text-sm mt-1">
                  Le nom doit contenir entre 3 et 70 caractères
                </p>
              )}
            </label>
          </div>

          <div>
            <label htmlFor="email">
              <p className="label">
                Email <span className="text-red-500">*</span>
              </p>
              <Input
                type="email"
                id="email"
                title="Email"
                value={state.form.email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange('email', e.target.value)
                }
                onBlur={validateEmail}
                placeholder="votre@email.com"
                required
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              {state.confirmationEmail === false && (
                <p className="text-red-500 text-sm mt-1">
                  Veuillez renseigner une adresse email valide
                </p>
              )}
            </label>
          </div>

          <div>
            <label htmlFor="phone">
              <p className="label">
                Téléphone <span className="text-red-500">*</span>
              </p>
              <Input
                type="tel"
                id="phone"
                title="Téléphone"
                value={state.form.phone}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange('phone', e.target.value)
                }
                onBlur={validatePhone}
                placeholder="06 12 34 56 78"
                required
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              {state.confirmationPhone === false && (
                <p className="text-red-500 text-sm mt-1">
                  Veuillez renseigner un numéro de téléphone valide
                </p>
              )}
            </label>
          </div>

          <div>
            <label htmlFor="message">
              <p className="label">Message (optionnel)</p>
              <textarea
                id="message"
                name="message"
                value={state.form.message}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  handleChange('message', e.target.value)
                }
                placeholder="Décrivez brièvement l'objet de votre rendez-vous..."
                rows={3}
                maxLength={500}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </label>
          </div>
        </div>

        {/* Barre de résumé sticky */}
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
        handleCloseModal={closeModal}
      />
    </div>
  );
}
