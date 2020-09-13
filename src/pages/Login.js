import React, {useState, useContext} from 'react'
import AuthContext from 'data/AuthContext'
import { login } from 'data/ApiConsumer'
import { useHistory, Link } from 'react-router-dom'
import 'styles/_login.scss'
import Button from "shared/Button"

const Login = () => {
  const history = useHistory()
  const { setLogin } = useContext(AuthContext)
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
      <div className="login-wrapper">
        <div>
          <h3>Login</h3>
        </div>
        <input type="text" value={userName} onChange={(e)=>setUserName(e.target.value)} placeholder="username" ></input>
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="password" ></input>
        <Button className="btn-center" onClick={()=>sendData()} >Login</Button>
        <div>
          Don't have account? <Link to="/signup">Signup</Link>
        </div>
      </div>
    </div>
  )
}

export default Login