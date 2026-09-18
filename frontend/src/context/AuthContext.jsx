import { createContext, useEffect, useState } from "react";
import { loginUser } from "../services/authService";
import {
  getToken,
  removeToken,
  saveToken,
} from "../utils/storage";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(getToken());

  const isAuthenticated = Boolean(token);

  useEffect(() => {
    if (token) {
      saveToken(token);
    } else {
      removeToken();
    }
  }, [token]);

  const login = async (credentials) => {
    const data = await loginUser(credentials);

    setToken(data.token);

    return data;
  };

  const logout = () => {
    setToken(null);
  };

  const value = {
    token,
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}