import URL from "./REST_API_URLS";

const storeUserData = (id, access_token, refresh_token) => {
  localStorage.setItem("id", id);
  localStorage.setItem("access_token", access_token);
  localStorage.setItem("refresh_token", refresh_token);
};

const getAccessToken = () => localStorage.getItem("access_token");
const getRefreshToken = () => localStorage.getItem("refresh_token");
const getUserId = () => localStorage.getItem("id");

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

const getUsers = () =>
  fetch(URL.USERS + `/${getUserId()}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  })
    .then(handleResponse)
    .then((data) => data.users);

const getNotes = () =>
  fetch(URL.NOTES, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  })
    .then(handleResponse)
    .then((json) => json.data.notes);

const addNotes = (data) =>
  fetch(URL.NOTES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .then((json) => json.data.notes);

const getNotesById = (id) =>
  fetch(URL.NOTES + `/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  })
    .then(handleResponse)
    .then((json) => json.data.notes);

const deleteNotesById = (id) =>
  fetch(URL.NOTES + `/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  }).then((resp) => {
    if (!resp.ok) throw resp;
    if (resp.status == 204) return resp;
    return resp.json();
  });

const editNotesById = (id, data) =>
  fetch(URL.NOTES + `/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .then((json) => json.data.notes);

export { login };
export { signup };
export { getUsers };
export { getNotes };
export { addNotes };
export { editNotesById };
export { deleteNotesById };
export { getNotesById };
export { getAccessToken };
export { getRefreshToken };
export { getUserId };
