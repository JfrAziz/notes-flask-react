import React, { createContext } from "react";

const DataContext = createContext();

const URL = {
  SIGNUP: "/api/signup",
  LOGIN: "/api/login",
  USERS: "/api/users",
  NOTES: "/api/notes",
};

const DataProvider = ({ children }) => {
  const storeUserData = (id, access_token, refresh_token) => {
    localStorage.setItem("id", id);
    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);
  };

  const getAccessToken = () => localStorage.getItem("access_token");
  const getRefreshToken = () => localStorage.getItem("refresh_token");
  const getUserId = () => localStorage.getItem("id");

  const isLogin = () =>
    getAccessToken() && getRefreshToken() && getUserId() ? true : false;

  const handleResponse = (resp) =>{
    if (!resp.ok) throw resp;
    return resp.json();
  }

  const signup = (data) => {
    let config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    return fetch(URL.SIGNUP, config)
      .then(handleResponse)
      .then((json) => {
        const { access_token, refresh_token, users } = json.data;
        storeUserData(users.id, access_token, refresh_token);
        return true
      })
  };

  const login = (data) => {
    let config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    return fetch(URL.LOGIN, config)
      .then(handleResponse)
      .then((json) => {
        const { access_token, refresh_token, users } = json.data;
        storeUserData(users.id, access_token, refresh_token);
        return true
      })
  };

  const logout = () => localStorage.clear();

  const getUsers = () => {
    if (!isLogin()) return;
    let config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    };
    fetch(URL.USERS + `/${getUserId()}`, config)
      .then(handleResponse)
      .then((data) => console.log(data))
  };

  const getNotes = () => {
    if (!isLogin()) return;
    let config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    };
    fetch(URL.NOTES, config)
      .then(handleResponse)
      .then((data) => console.log(data))
  };

  const addNotes = (data) => {
    if (!isLogin()) return;
    let config = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
      body: JSON.stringify(data),
    };
    fetch(URL.NOTES, config)
      .then(handleResponse)
      .then((data) => console.log(data))
  };

  const getNotesById = (id) => {
    if (!isLogin()) return;
    let config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    };
    fetch(URL.NOTES + `/${id}`, config)
      .then(handleResponse)
      .then((data) => console.log(data))
  };

  const deleteNotesById = (id) => {
    if (!isLogin()) return;
    let config = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    };
    fetch(URL.NOTES + `/${id}`, config)
      .then(handleResponse)
      .then((data) => console.log(data))
  };

  const editNotesById = (id, data) => {
    if (!isLogin()) return;
    let config = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
      body: JSON.stringify(data),
    };
    fetch(URL.NOTES + `/${id}`, config)
      .then(handleResponse)
      .then((data) => console.log(data))
  };

  return (
    <DataContext.Provider
      value={{
        signup,
        login,
        logout,
        isLogin,
        getUsers,
        getNotes,
        addNotes,
        deleteNotesById,
        editNotesById,
        getNotesById,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataProvider };
export default DataContext;
