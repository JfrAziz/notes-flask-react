import React, {useState, useContext} from 'react'
import AuthContext from 'data/AuthContext'
import { useHistory, Link } from 'react-router-dom'

const Login = () => {
  const history = useHistory()
  const { login, setLogin } = useContext(AuthContext)
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  const sendData = async () => {
    let data = {
      userName: userName,
      password: password
    }
    try {
      const loginSuccess = await login(data)
      setLogin(loginSuccess)
      if(loginSuccess) {
        history.push("/")
      }
    } catch (error) {
      console.log(error) 
    }
  }

  return (
    <div id="login-page">
      <input type="text" value={userName} onChange={(e)=>setUserName(e.target.value)} placeholder="username" ></input>
      <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="password" ></input>
      <button onClick={()=>sendData()} >Login</button>
      <Link to="/signup">Signup</Link>
    </div>
  )
}

export default Login