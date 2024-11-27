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
  const router = useRouter();

  const existingScript = document.getElementById('google-adsense');
  if (existingScript) {
    return;
  }
  if (router.pathname.startsWith('/blog')) {
    const scriptAdsense = document.createElement('script');
    scriptAdsense.async = true;
    scriptAdsense.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9194552698690511';
    scriptAdsense.id = 'google-adsense';
    scriptAdsense.crossOrigin = 'anonymous';

    document.head.appendChild(scriptAdsense);
  }
};

export default function CookiesModal() {
  const { cookies, updateCookies } = useCookies();
  const router = useRouter();

  const handleCookieChange = (cookieName) => {
    updateCookies(cookieName, !cookies[cookieName]);
  };

  useEffect(() => {
    if (router.pathname.startsWith('/blog')) {
      if (window.localStorage.getItem('cookiesAdsense')) {
        createGoogleAdsenseScript();
      }
    } else {
      const adsElements = document.querySelectorAll('.adsbygoogle');
      const existingScript = document.getElementById('google-adsense');
      const existingAdsenseScript = document.querySelector('script[src*="/adsense/"]');

      adsElements.forEach((adElement) => {
        adElement.remove();
      });

      if (existingScript) {
        existingScript.remove();
      }

      if (existingAdsenseScript) {
        existingAdsenseScript.remove();
      }
    }
  }, [router.pathname]);

  useEffect(() => {
    if (window.localStorage.getItem('cookiesGoogle')) {
      createGoogleAnalyticsScript(true);
    } else {
      setTimeout(() => {
        updateCookies('cookiesModal', false);
      }, 5000);
    }

    if (!window.localStorage.getItem('cookiesAdsense')) {
      setTimeout(() => {
        updateCookies('cookiesModal', false);
      }, 5000);
    }
  }, []);

  const handleAcceptCookies = () => {
    document.body.classList.remove('overflow-hidden');
    window.localStorage.setItem('cookiesModal', true);
    window.localStorage.setItem('cookiesGoogle', true);
    window.localStorage.setItem('cookiesAdsense', true);
    updateCookies('cookiesModal', null);
    updateCookies('cookiesGoogle', true);
    updateCookies('cookiesAdsense', true);
    createGoogleAnalyticsScript(true);
    createGoogleAdsenseScript();
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
      <div className="-translate-y-6">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-75 29-147t81-128.5q52-56.5 125-91T475-881q21 0 43 2t45 7q-9 45 6 85t45 66.5q30 26.5 71.5 36.5t85.5-5q-26 59 7.5 113t99.5 56q1 11 1.5 20.5t.5 20.5q0 82-31.5 154.5t-85.5 127q-54 54.5-127 86T480-80Zm-60-480q25 0 42.5-17.5T480-620q0-25-17.5-42.5T420-680q-25 0-42.5 17.5T360-620q0 25 17.5 42.5T420-560Zm-80 200q25 0 42.5-17.5T400-420q0-25-17.5-42.5T340-480q-25 0-42.5 17.5T280-420q0 25 17.5 42.5T340-360Zm260 40q17 0 28.5-11.5T640-360q0-17-11.5-28.5T600-400q-17 0-28.5 11.5T560-360q0 17 11.5 28.5T600-320ZM480-160q122 0 216.5-84T800-458q-50-22-78.5-60T683-603q-77-11-132-66t-68-132q-80-2-140.5 29t-101 79.5Q201-644 180.5-587T160-480q0 133 93.5 226.5T480-160Zm0-324Z" /></svg>
      </div>
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
                  createGoogleAnalyticsScript(true);
                }}
              />
              <CookieChoice
                label="Google AdSense"
                checked={cookies.cookiesAdsense}
                onClick={() => {
                  handleCookieChange('cookiesAdsense');
                  window.localStorage.setItem('cookiesAdsense', !cookies.cookiesAdsense);
                  createGoogleAdsenseScript();
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
