import React, { createContext, useState } from "react";
import { getAccessToken, getRefreshToken, getUserId } from "data/ApiConsumer"

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLogin, setLogin] = useState(
    getAccessToken() && getRefreshToken() && getUserId() ? true : false
  );

  const logout = () => {
    localStorage.clear();
    setLogin(false);
  };

  return (
    <AuthContext.Provider value={{ logout, isLogin, setLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
