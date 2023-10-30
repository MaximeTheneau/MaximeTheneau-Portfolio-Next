export default function formMiddleware(req, handleResponse200, handleResponseError) {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(req),
  };
  fetch(`https://back.theneau-maxime.fr/api/contact`, requestOptions)
    .then((response) => {
      if (response.ok) {
        handleResponse200();
      } else if (response.status === 500) {
        handleResponseError('Serveur en panne, veuillez revenir plus tard');
      } else {
        response.json().then((data) => {
          handleResponseError(data.erreur);
        });
      }
    });
}
