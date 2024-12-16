import { createContext, useContext } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  setAuthenticated: (authStatus: boolean) => void;
  checkAuthentication: () => Promise<void>;
  setToken: (token: string) => void;
  refreshAccessToken: () => Promise<boolean>;
}
