import React, { useEffect } from 'react';
import Button from '../ui/Button';
import CookieChoice from './CookieChoice';
import { useCookies } from '../../context/CookiesContext';

const createGoogleAnalyticsScript = (cookiesGoogle) => {
  const scriptInit = document.createElement('script');
  scriptInit.async = true;
  scriptInit.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`;
  scriptInit.id = 'google-analytics-init';

  const script = document.createElement('script');

  script.id = 'google-analytics';

  const consentSettings = cookiesGoogle ? {
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
    analytics_storage: 'granted',
  } : {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
  };
  const consent = cookiesGoogle ? 'update' : 'default';
  const scriptCode = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('consent', "${consent}", ${JSON.stringify(consentSettings)});
    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', {
      page_path: window.location.pathname
    });
    gtag('js', new Date());
  `;
  script.textContent = scriptCode;
  return { scriptInit, script };
};

export default function CookiesModal() {
  const { cookies, updateCookies } = useCookies();

  const handleCookieChange = (cookieName) => {
    updateCookies(cookieName, !cookies[cookieName]);
  };

  useEffect(() => {
    if (!window.localStorage.getItem('cookiesGoogle')) {
      setTimeout(() => {
        updateCookies('cookiesModal', false);
      }, 1000);
    }
  }, []);

  useEffect(() => {
    // if (window.localStorage.getItem('cookiesAdsense')) {
    //   updateCookies('cookiesAdsense', true);
    //   const scriptAdsense = document.createElement('script');
    //   scriptAdsense.async = true;
    //   scriptAdsense.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9194552698690511';
    //   scriptAdsense.id = 'google-adsense';
    //   const existingScriptAd = document.getElementById('google-adsense');

    //   if (existingScriptAd) {
    //     document.head.removeChild(existingScriptAd);
    //   }
    //   document.head.appendChild(scriptAdsense);
    // }

    if (window.localStorage.getItem('cookiesGoogle')) {
      updateCookies('cookiesGoogle', window.localStorage.getItem('cookiesGoogle'));
      const cookiesGoogleValue = window.localStorage.getItem('cookiesGoogle') !== 'false';
      const { scriptInit, script } = createGoogleAnalyticsScript(cookiesGoogleValue);
      const existingScript = document.getElementById('google-analytics');
      const existingScriptInit = document.getElementById('google-analytics-init');
      if (existingScriptInit) {
        document.head.removeChild(existingScriptInit);
      }
      document.head.appendChild(scriptInit);

      if (existingScript) {
        document.head.removeChild(existingScript);
      }
      document.head.appendChild(script);
    }
  }, [cookies.cookiesModal]);

  const handleAcceptCookies = () => {
    document.body.classList.remove('overflow-hidden');
    window.localStorage.setItem('cookiesModal', true);
    window.localStorage.setItem('cookiesGoogle', true);
    window.localStorage.setItem('cookiesAdsense', true);
    updateCookies('cookiesModal', null);
    updateCookies('cookiesGoogle', true);
    updateCookies('cookiesAdsense', true);
  };

  const handleRefuseCookies = () => {
    document.body.classList.remove('overflow-hidden');
    updateCookies('cookiesModal', null);
  };

  if (cookies.cookiesModal === null) {
    return null;
  }

  return (
    <div className="bottom-0 fixed bg-primary z-10 p-4 w-full shadow-custom ">
      {cookies.cookiesChoice ? (
        <div>
          <table className="w-full ">
            <tbody>
              <CookieChoice
                label="Google Analytic"
                checked={cookies.cookiesGoogle}
                onClick={() => {
                  handleCookieChange('cookiesGoogle');
                  window.localStorage.setItem('cookiesGoogle', !cookies.cookiesGoogle);
                }}
              />
            </tbody>
          </table>
          <div>
            <Button
              type="button"
              className="bg-form"
              onClick={() => {
                handleCookieChange('cookiesModal');
                updateCookies('cookiesModal', null);
              }}
            >
              Confirmer
            </Button>
          </div>
        </div>
      ) : (
        <>
          <p>
            Acceptez l&apos;utilisation des cookies pour nous aider à améliorer
            notre site internet. À vous de choisir !
          </p>
          <div className="flex justify-around my-4">
            <Button
              onClick={handleAcceptCookies}
              className="bg-green"
            >
              Accepter
            </Button>
            <Button
              className="bg-form"
              onClick={() => handleCookieChange('cookiesChoice')}
            >
              Personaliser
            </Button>
            <Button
              className="font-thin"
              onClick={handleRefuseCookies}
            >
              Refuser
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
