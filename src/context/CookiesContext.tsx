import React, {
  useMemo, useCallback, createContext, useState, useContext, ReactNode,
} from 'react';

type CookiesState = {
  cookiesGoogle: string | null;
  cookiesAdsense: string | null;
  cookiesModal: string | null;
  cookiesWebmaster: string | null;
  cookiesChoice: string | null;
  cookiesAll: string | null;
};

type CookiesContextType = {
  cookies: CookiesState;
};

const CookiesContext = createContext<CookiesContextType | undefined>(undefined);

type CookiesProviderProps = {
  children: ReactNode;
};

export function CookiesProvider({ children }: CookiesProviderProps) {
  const [cookies, setCookies] = useState<CookiesState>({
    cookiesGoogle: null,
    cookiesAdsense: null,
    cookiesModal: null,
    cookiesWebmaster: null,
    cookiesChoice: null,
    cookiesAll: null,
  });

  const updateCookies = useCallback((_cookieName: keyof CookiesState, value: string | null) => {
    setCookies((prevCookies) => ({
      ...prevCookies,
      [_cookieName]: value,
    }));
  }, []);

  const contextValue = useMemo(() => ({ cookies, updateCookies }), [cookies, updateCookies]);

  return (
    <CookiesContext.Provider value={contextValue}>
      {children}
    </CookiesContext.Provider>
  );
}

export const useCookies = (): CookiesContextType => {
  const context = useContext(CookiesContext);
  if (!context) {
    throw new Error('useCookies must be used within a CookiesProvider');
  }
  return context;
};
