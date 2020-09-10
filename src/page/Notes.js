import React, {useContext} from 'react'
import DataContext from '../data/DataContext'
import { useHistory } from 'react-router-dom'

const Notes = () => {
  const history = useHistory()
  const {logout} = useContext(DataContext)
  return (
    <div id="notes-page">
      <h1>This is notes page</h1>
      <button onClick={()=>{logout()&&history.push("/login")}} >Logout</button>
    </div>
  )
}

export default Notes