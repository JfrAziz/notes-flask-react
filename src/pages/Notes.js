import React, {useContext, useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import AuthContext from '../data/AuthContext'
import DataContext from '../data/DataContext'

const Notes = () => {
  const history = useHistory()
  const { logout } = useContext(AuthContext)
  const { getNotes, addNotes } = useContext(DataContext)
  const handleLogout = () => logout() && history.push("/login")

  const [title, setTitle] = useState("")
  const [notes, setNotes] = useState("")
  const [ notesData, setNotesData ] = useState([])

  const sendData = async () => {
    try {
      const response = await addNotes({
        title : title,
        notes : notes,
      })
      setNotesData([...notesData,response])
    } catch (error) {
      console.log(`error add data : ${error}`)
    }
  }

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const result = await getNotes()
        setNotesData(result)
      } catch (error) {
        console.log(`error get data : ${error}`)
      }
    }
    fetchNotes()
  }, [])
  return (
    <div id="notes-page">
      <h1>This is notes page</h1>
      <button onClick={()=>handleLogout()} >Logout</button>
      <div>
        <input type="text" placeholder="title" value={title} onChange={(e)=>setTitle(e.target.value)}  ></input>
        <input type="text" placeholder="notes" value={notes} onChange={(e)=>setNotes(e.target.value)}  ></input>
        <button onClick={()=>sendData()} >Add Notes</button>
      </div>
      {
        notesData.map((note) => {
          return (
            <div>
              {note.notes}
            </div>
          )
        })
      }
    </div>
  )
}

export default Notes