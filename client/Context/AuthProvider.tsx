import React, { createContext, useContext, useMemo, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../lib/useLocalStorage";

interface AuthContextValue {
  token: { token: string | null, refreshToken: string | null } | null;
  login: (data: { token: string, refreshToken: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  token: null,
  login: async () => { },
  logout: () => { },
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useLocalStorage<{ token: string | null, refreshToken: string | null } | null>('auth', null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the token
  const login = async (data: { token: string, refreshToken: string }) => {
    setToken(data);
    navigate("/");
  };

  // call this function to sign out logged in token
  const logout = () => {
    setToken(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      token,
      login,
      logout,
    }),
    [token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  return useContext(AuthContext);
};
