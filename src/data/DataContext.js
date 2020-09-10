import React, { createContext } from "react";

const DataContext = createContext();

const URL = {
  SIGNUP : "/api/signup",
  LOGIN : "/api/login",
  USERS : "/api/users",
  NOTES : "/api/notes"
}


const DataProvider = ({ children }) => {
  
  const storeUserData = (id, access_token, refresh_token) => {
    localStorage.setItem('id', id)
    localStorage.setItem('access_token', access_token)
    localStorage.setItem('refresh_token', refresh_token)
  }

  const getAccessToken = () => localStorage.getItem('access_token')
  const getRefreshToken = () => localStorage.getItem('refresh_token')
  const getUserId = () => localStorage.getItem('id')
  
  const checkUserData = () => getAccessToken() && getRefreshToken() && getUserId() ? true : false

  const signup = (data) => {
    let config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    }
    fetch(URL.SIGNUP, config)
      .then(resp => {
        if(!resp.ok) throw resp
        return resp
      })
      .then(resp => resp.json())
      .then(json => {
        const { access_token, refresh_token, users } = json.data
        storeUserData(users.id, access_token, refresh_token)
      })   
      .catch(e => console.log(e))
  }

  const login = (data) => {
    let config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    }
    fetch(URL.LOGIN, config)
      .then(resp => {
        if(!resp.ok) throw resp
        return resp
      })
      .then(resp => resp.json())
      .then(json => {
        const { access_token, refresh_token, users } = json.data
        storeUserData(users.id, access_token, refresh_token)
      })
      .catch(e => console.log(e))
  }

  const logout = () => localStorage.clear()

  const getUsers = () => {
    if (!checkUserData()) return
    let config = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getAccessToken()}`
      },
    }
    fetch(URL.USERS+`/${getUserId()}`, config)
      .then(resp => {
        if(!resp.ok) throw resp
        return resp
      })
      .then(resp => resp.json())
      .then(data => console.log(data))
      .catch(e => console.log(e))
  }

  const getNotes = () => {
    if (!checkUserData()) return
    let config = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getAccessToken()}`
      },
    }
    fetch(URL.NOTES, config)
      .then(resp => {
        if(!resp.ok) throw resp
        return resp
      })
      .then(resp => resp.json())
      .then(data => console.log(data))
      .catch(e => console.log(e))
  }

  const addNotes = (data) => {
    if (!checkUserData()) return
    let config = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAccessToken()}`
      },
      body: JSON.stringify(data)
    }
    fetch(URL.NOTES, config)
      .then(resp => {
        if(!resp.ok) throw resp
        return resp
      })
      .then(resp => resp.json())
      .then(data => console.log(data))
      .catch(e => console.log(e))
  }

  const getNotesById = (id) => {
    if (!checkUserData()) return
    let config = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${getAccessToken()}`
      },
    }
    fetch(URL.NOTES+`/${id}`, config)
      .then(resp => {
        if(!resp.ok) throw resp
        return resp
      })
      .then(resp => resp.json())
      .then(data => console.log(data))
      .catch(e => console.log(e))
  }

  const deleteNotesById = (id) => {
    if (!checkUserData()) return
    let config = {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getAccessToken()}`
      },
    }
    fetch(URL.NOTES+`/${id}`, config)
      .then(resp => {
        if(!resp.ok) throw resp
        return resp
      })
      .then(resp => resp.json())
      .then(data => console.log(data))
      .catch(e => console.log(e))
  }

  const editNotesById = (id, data) => {
    if (!checkUserData()) return
    let config = {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getAccessToken()}`
      },
      body: JSON.stringify(data)
    }
    fetch(URL.NOTES+`/${id}`, config)
      .then(resp => {
        if(!resp.ok) throw resp
        return resp
      })
      .then(resp => resp.json())
      .then(data => console.log(data))
      .catch(e => console.log(e))
  }


  return (
    <DataContext.Provider
      value={{
        signup,
        login,
        logout,
        checkUserData,
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
