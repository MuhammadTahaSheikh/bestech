import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  adminLogin,
  adminLogout,
  adminMe,
  getStoredToken,
  setStoredToken
} from '../utils/cmsApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const token = getStoredToken();
    if (!token) {
      setBooting(false);
      return undefined;
    }
    let cancelled = false;
    (async () => {
      try {
        const data = await adminMe();
        if (!cancelled) setUser({ username: data.username });
      } catch {
        if (!cancelled) {
          setStoredToken('');
          setUser(null);
        }
      } finally {
        if (!cancelled) setBooting(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (username, password) => {
    const data = await adminLogin(username, password);
    setStoredToken(data.token);
    setUser({ username: data.username });
  }, []);

  const logout = useCallback(async () => {
    try {
      await adminLogout();
    } catch {
      /* still clear locally */
    }
    setStoredToken('');
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, booting, login, logout }),
    [user, booting, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
}
