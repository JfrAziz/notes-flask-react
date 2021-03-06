import React, { useState, useContext } from "react";
import AuthContext from "data/AuthContext";
import { signup } from 'data/ApiConsumer'
import { useHistory, Link } from "react-router-dom";
import Button from "shared/Button"

const Register = () => {
  const history = useHistory();
  const { setLogin } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const sendData = async () => {
    let data = {
      name: name,
      email: email,
      userName: userName,
      password: password,
    };
    try {
      const signupSuccess = await signup(data);
      setLogin(signupSuccess);
      if (signupSuccess) {
        history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="login-page">
      <div className="login-wrapper">
        <div>
          <h3>Signup</h3>
        </div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
        ></input>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        ></input>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="username"
        ></input>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        ></input>
        <Button onClick={() => sendData()}>Login</Button>
        <div>
          Aleredy have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
