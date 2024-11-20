import { useState } from 'react';
import Button from '../ui/Button';

export default function Comments({ posts }) {
  const [state, setState] = useState({
    responses: {
      error: false,
      confirmEmail: false,
      confirm: false,
      message: '',
      messageComment: '',
      isLoading: false,
    },
    form: {
      user: '',
      email: '',
      comment: '',
      posts: posts.id,
    },
  });
  const handleBlur = (e) => {
    if (!e.target.value) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}comments/verify_email`, {
      method: 'POST',
      body: JSON.stringify({
        email: e.target.value,
      }),
      credentials: 'include',

    })
      .then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          setState({
            ...state,
            responses: {
              ...state.responses,
              confirmEmail: data.message,
              messageComment: '',
            },
          });
        } else {
          const errorData = await response.json();
          setState({
            ...state,
            responses: {
              ...state.responses,
              messageComment: errorData.message,
              confirmEmail: false,
            },
          });
        }
      });
  };

  const isFormValid = state.form.email
    && state.form.user
    && state.form.comment;

  function formattedDate(isoDate) {
    const date = new Date(isoDate);
    const options = {
      year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric',
    };
    return date.toLocaleDateString('fr-FR', options);
  }
  const handleResponse200 = () => {
    setState({
      ...state,
      form: {
        user: '',
        email: '',
        comment: '',
        posts: posts.id,
      },
      responses: {
        message: 'On vous répondra au plus vite',
      },
    });
  };
  const handleResponseError = (error) => {
    setState({
      ...state,
      modal: {
        title: 'Erreur',
        message: error,
        toggleModal: true,
      },
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setState({
      ...state,
      responses: {
        ...state.responses,
        isLoading: true,
      },
    });
    fetch(`${process.env.NEXT_PUBLIC_API_URL}comments`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(state.form),
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setState({
          ...state,
          form: {
            user: '',
            email: '',
            comment: '',
            posts: posts.id,
          },
          responses: {
            ...state.responses,
            message: data.message,
          },
        });
        handleResponse200();
      } else {
        handleResponseError();
        const errorData = await response.json();
        setState({
          ...state,
          responses: {
            ...state.responses,
            error: true,
            message: errorData.message,
          },
        });
      }
    });
  };

  return (
    <section>
      {posts.comments?.length > 0 && (
      <>
        <h3>
          {posts.comments?.length}
          {' '}
          Commentaires
        </h3>
        <ul>
          {posts.comments?.map((comment) => (
            <li key={comment.id}>
              <p>
                {comment.User}
                {' '}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </p>
              <p>
                le
                {' '}
                <time dateTime={comment.createdAt}>{formattedDate(comment.createdAt)}</time>
              </p>
              <p>{comment.comment}</p>
              {comment.replies?.length > 0 && (
              <ul>
                <li>
                  <h4>Réponses :</h4>
                </li>
                  {comment.replies?.map((response) => (
                    <li key={response.id}>
                      <p>
                        {response.User}
                        {' '}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </p>
                      <p>
                        le
                        {' '}
                        <time dateTime={response.createdAt}>
                          {formattedDate(response.createdAt)}
                        </time>
                      </p>
                      <p>{response.comment}</p>
                    </li>
                  ))}
              </ul>
              )}
            </li>
          ))}
        </ul>
      </>
      )}

      <h3>Postez un commentaire !</h3>
      <form className="flex flex-col md:w-1/3" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="user">
          Prénom ou pseudo (obligatoire)
          <input
            type="text"
            id="user"
            name="user"
            value={state.form.user}
            onChange={(e) => setState({
              ...state,
              form: {
                ...state.form,
                user: e.target.value,
              },
            })}
          />
        </label>
        <label htmlFor="email">
          E-mail (obligatoire)
          <input
            type="email"
            id="email"
            name="email"
            value={state.form.email}
            onChange={(e) => setState({
              ...state,
              form: {
                ...state.form,
                email: e.target.value,
              },
            })}
            onBlur={(e) => handleBlur(e)}
          />
        </label>
        {state.responses.messageComment && (
        <p className="error">
          {state.responses.messageComment}
        </p>
        )}
        <label htmlFor="comment">
          Commentaire (obligatoire)
          <textarea
            id="comment"
            name="comment"
            value={state.form.comment}
            onChange={(e) => setState({
              ...state,
              form: {
                ...state.form,
                comment: e.target.value,
              },
            })}
          />
        </label>
        {state.responses.isLoading ? (
          <p>
            Envoie en cours...
            {' '}
          </p>
        ) : (
          <p className="error">
            {state.responses.message && (
              state.responses.message
            )}
          </p>
        )}
        {isFormValid && state.responses.confirmEmail ? (
          <Button type="submit">
            Envoyer
          </Button>
        ) : (
          <Button disabled>
            Envoyer
          </Button>
        )}
      </form>
    </section>

  );
}
