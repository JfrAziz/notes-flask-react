import React, {useState, useContext} from 'react'
import DataContext from '../data/DataContext'
import { useHistory } from 'react-router-dom'

const Login = () => {
  const history = useHistory()
  const { login } = useContext(DataContext)
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  const sendData = async () => {
    let data = {
      userName: userName,
      password: password
    }
    try {
      const loginSuccess = await login(data)
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
    </div>
  )
}

export default Login