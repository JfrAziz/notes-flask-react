import React, { createContext, useState } from "react";
import URL from "./REST_API_URLS";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const storeUserData = (id, access_token, refresh_token) => {
    localStorage.setItem("id", id);
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
  };

  const getAccessToken = () => localStorage.getItem("access_token");
  const getRefreshToken = () => localStorage.getItem("refresh_token");
  const getUserId = () => localStorage.getItem("id");

  const [isLogin, setLogin] = useState(
    getAccessToken() && getRefreshToken() && getUserId() ? true : false
  );

  

  const handleResponse = (resp) => {
    if (!resp.ok) throw resp;
    return resp.json();
  };

  const signup = (data) =>
    fetch(URL.SIGNUP, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(handleResponse)
      .then((json) => {
        const { access_token, refresh_token, users } = json.data;
        storeUserData(users.id, access_token, refresh_token);
        return true;
      });

  const login = (data) =>
    fetch(URL.LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(handleResponse)
      .then((json) => {
        const { access_token, refresh_token, users } = json.data;
        storeUserData(users.id, access_token, refresh_token);
        return true;
      });

  const logout = () => {
    localStorage.clear();
    setLogin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        signup,
        login,
        logout,
        isLogin,
        setLogin,
        getAccessToken,
        getUserId,
        getRefreshToken,
        handleResponse
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
