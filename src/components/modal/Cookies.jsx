import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from '../ui/Button';
import CookieChoice from './CookieChoice';
import { useCookies } from '../../context/CookiesContext';

const createGoogleAnalyticsScript = (cookiesGoogle) => {
  if (document.getElementById('google-analytics-init')) return;

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
    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', {
      page_path: window.location.pathname
    });
    gtag('consent', "${consent}", ${JSON.stringify(consentSettings)});
    gtag('js', new Date());
  `;
  script.textContent = scriptCode;

  document.head.appendChild(scriptInit);
  document.head.appendChild(script);
};

const createGoogleAdsenseScript = () => {
  const existingScript = document.getElementById('google-adsense');

  if (existingScript) {
    existingScript.remove();
  }

  const scriptAdsense = document.createElement('script');
  scriptAdsense.async = true;
  scriptAdsense.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9194552698690511';
  scriptAdsense.id = 'google-adsense';
  scriptAdsense.crossOrigin = 'anonymous';

  document.head.appendChild(scriptAdsense);
};

export default function CookiesModal() {
  const { cookies, updateCookies } = useCookies();
  const router = useRouter();

  const handleCookieChange = (cookieName) => {
    updateCookies(cookieName, !cookies[cookieName]);
  };

  useEffect(() => {
    if (window.localStorage.getItem('cookiesGoogle')) {
      createGoogleAnalyticsScript(true);
    } else {
      setTimeout(() => {
        updateCookies('cookiesModal', false);
      }, 5000);
    }

    const shouldLoadAdsense = window.localStorage.getItem('cookiesAdsense') === 'true'
      || router.pathname.startsWith('/blog');

    if (shouldLoadAdsense) {
      createGoogleAdsenseScript();
    } else {
      setTimeout(() => {
        updateCookies('cookiesModal', false);
      }, 5000);
    }

    const existingScript = document.getElementById('google-adsense');
    if (!router.pathname.startsWith('/blog') && existingScript) {
      existingScript.remove();
    }
  }, [router.pathname, updateCookies]);

  useEffect(() => {
    const addAdSenseScript = () => {
      const existingScript = document.getElementById('google-adsense');
      if (!existingScript) {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9194552698690511';
        script.id = 'google-adsense';
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
      }
    };

    const addAnalyticsScript = () => {
      const existingInit = document.getElementById('google-analytics-init');
      const existingScript = document.getElementById('google-analytics');

      if (existingInit) document.head.removeChild(existingInit);
      if (existingScript) document.head.removeChild(existingScript);

      createGoogleAnalyticsScript(true);
    };

    if (cookies.cookiesAdsense) {
      addAdSenseScript();
    }

    if (cookies.cookiesGoogle) {
      addAnalyticsScript();
    }
  }, [cookies.cookiesAdsense, cookies.cookiesGoogle]);

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
    <div className="bottom-0 fixed bg-form z-10 p-4 w-full shadow-custom ">
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
              <CookieChoice
                label="Google AdSense"
                checked={cookies.cookiesAdsense}
                onClick={() => {
                  handleCookieChange('cookiesAdsense');
                  window.localStorage.setItem('cookiesAdsense', !cookies.cookiesAdsense);
                }}
              />
            </tbody>
          </table>
          <div>
            <Button
              type="button"
              className="bg-green"
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
