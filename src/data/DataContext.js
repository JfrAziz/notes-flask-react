import React, { createContext, useContext } from "react";
import AuthContext from "./AuthContext";
import URL from './REST_API_URLS'

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const {isLogin, getAccessToken, getUserId , handleResponse} = useContext(AuthContext)

  const getUsers = () => {
    if (!isLogin) return;
    let config = {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${getAccessToken()}`,
      },
    };
    fetch(URL.USERS + `/${getUserId()}`, config)
      .then(handleResponse)
      .then((data) => console.log(data))
  };

  const getNotes = () => {
    if (!isLogin) return;
    return fetch(URL.NOTES, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    })
      .then(handleResponse)
      .then((json) => json.data.notes)
  };

  const addNotes = (data) => {
    if (!isLogin) return;
    return fetch(URL.NOTES, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getAccessToken()}`,
      },
      body: JSON.stringify(data),
    })
      .then(handleResponse)
      .then((json) => json.data.notes)
  };

  const getNotesById = (id) => {
    if (!isLogin) return;
    let config = {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${getAccessToken()}`,
      },
    };
    fetch(URL.NOTES + `/${id}`, config)
      .then(handleResponse)
      .then((json) => json.data.notes)
  };

  const deleteNotesById = (id) => {
    if (!isLogin) return;
    let config = {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${getAccessToken()}`,
      },
    };
    fetch(URL.NOTES + `/${id}`, config)
      .then(handleResponse)
  };

  const editNotesById = (id, data) => {
    if (!isLogin) return;
    let config = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getAccessToken()}`,
      },
      body: JSON.stringify(data),
    };
    fetch(URL.NOTES + `/${id}`, config)
      .then(handleResponse)
      .then((json) => json.data.notes)
  };

  return (
    <DataContext.Provider
      value={{
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
