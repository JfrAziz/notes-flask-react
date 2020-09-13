import React, {useContext, useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";
import AuthContext from "data/AuthContext";
import { getUsers } from "data/ApiConsumer";
import Button from "shared/Button"
import "styles/_header.scss"

const Header = ({openModal}) => {
  const history = useHistory();
  const { logout } = useContext(AuthContext);
  const handleLogout = () => logout() && history.push("/login");
  const [userName, setUserName] = useState("")
  const getUserName = async () => {
    const users = await getUsers()
    setUserName(users.userName)
  }
  useEffect(() => {
    getUserName()
    return () => {
      setUserName("")
    }
  }, [])
  return (
    <header>
      <div className="left">
        <div className="username">
          {userName}
        </div>
      </div>
      <div className="right">
        <Button onClick={()=>openModal()} >Add Modal</Button>
        <Button onClick={()=>handleLogout()} >Logout</Button>
      </div>
    </header>
  )
}

export default Header