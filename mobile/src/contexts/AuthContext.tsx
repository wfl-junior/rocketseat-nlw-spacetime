import * as SecureStore from "expo-secure-store";
import { createContext, useCallback, useContext } from "react";
import { ACCESS_TOKEN_STORE_NAME } from "~/constants";

interface AuthContextData {
  signOut: () => Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

export const useAuthContext = () => useContext(AuthContext);

interface AuthContextProviderProps {
  children: React.ReactNode;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
  setIsAuthenticated,
}) => {
  const signOut = useCallback(async () => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_STORE_NAME);
    setIsAuthenticated(false);
  }, [setIsAuthenticated]);

  return (
    <AuthContext.Provider value={{ signOut }}>{children}</AuthContext.Provider>
  );
};
