import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isUser, setIsUser] = useState(false);
  const [isGuest, setIsGuest] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const values = {
    isUser,
    setIsUser,
    isGuest,
    setIsGuest,
    isAdmin,
    setIsAdmin,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
};
