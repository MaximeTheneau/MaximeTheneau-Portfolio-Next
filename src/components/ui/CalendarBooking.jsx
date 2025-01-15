import { useState } from 'react';

function CalendarBooking() {
  // Liste des créneaux horaires disponibles (9h-18h, 30 min d'intervalle)
  const timeSlots = [];
  for (let hour = 9; hour < 18; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = new Date();
      time.setHours(hour, minute, 0, 0);
      timeSlots.push(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
  }

  // Vérifier que le jour actuel est un jour de semaine (lundi-vendredi)
  const isWeekday = (date) => {
    const day = date.getDay();
    return day >= 1 && day <= 5; // 1 = Lundi, 5 = Vendredi
  };

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [error, setError] = useState('');

  const handleBooking = async () => {
    if (!selectedSlot) {
      setError('Veuillez sélectionner un créneau');
      return;
    }

    // Vérifier que le jour sélectionné est un jour de semaine
    const selectedDate = new Date();
    const [hour, minute] = selectedSlot.split(':');
    selectedDate.setHours(hour, minute, 0, 0);

    if (!isWeekday(selectedDate)) {
      setError('Les rendez-vous sont uniquement disponibles du lundi au vendredi.');
      return;
    }

    // Envoi de la réservation au backend Symfony via une requête POST
    try {
      const response = await fetch('https://back.recideas.com/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: selectedDate.toISOString(),
          user: 'Maxime', // Ou le nom de l'utilisateur si nécessaire
        }),
      });

      if (response.ok) {
        alert('Votre rendez-vous a bien été pris');
      } else {
        alert('Erreur lors de la réservation');
      }
    } catch (error) {
      alert('Erreur de connexion');
    }
  };

  return (
    <div>
      <h2>Choisissez un créneau pour votre rendez-vous</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        {timeSlots.map((slot) => (
          <button
            key={slot}
            onClick={() => setSelectedSlot(slot)}
            style={{
              margin: '5px',
              backgroundColor: selectedSlot === slot ? 'green' : 'lightgray',
            }}
          >
            {slot}
          </button>
        ))}
      </div>
      <button onClick={handleBooking}>Confirmer le rendez-vous</button>
    </div>
  );
}

export default CalendarBooking;
