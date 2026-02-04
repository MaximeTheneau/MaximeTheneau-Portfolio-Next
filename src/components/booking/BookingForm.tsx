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

export default function BookingForm() {
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

  const handleResponse200 = (data: any) => {
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

  if (state.isSubmitted) {
    return (
      <div className="booking-form p-4 text-center">
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-8 rounded-lg">
          <h3 className="text-xl font-bold mb-2">✓ Rendez-vous confirmé !</h3>
          <p>Votre rendez-vous a été réservé avec succès.</p>
          <p className="mt-2">Vous allez recevoir un email de confirmation de Google Calendar.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-form p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <CalendarPicker
            onDateSelect={handleDateSelect}
            selectedDate={state.form.selectedDate}
            minDate={minDate}
            maxDate={maxDate}
          />
        </div>

        {state.form.selectedDate && (
          <div>
            <TimeSlotSelector
              slots={state.availableSlots}
              selectedSlot={state.form.selectedTime}
              onSlotSelect={handleSlotSelect}
              loading={state.loading}
            />
          </div>
        )}

        {state.form.selectedTime && (
          <>
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

            <button
              type="submit"
              className="w-full bg-primary text-black font-bold py-4 px-8 rounded-lg hover:bg-secondary transition-colors"
            >
              Confirmer le rendez-vous
            </button>
          </>
        )}
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
