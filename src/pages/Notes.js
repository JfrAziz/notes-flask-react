import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "data/AuthContext";
import DataContext from "data/DataContext";
import ModalNotes from 'components/ModalNotes'

const Notes = () => {
  const history = useHistory();
  const { logout } = useContext(AuthContext);
  const { getNotes } = useContext(DataContext)
  const handleLogout = () => logout() && history.push("/login");

  const [isModalOpen, setModalOpen] = useState(false);
  const [ notesData, setNotesData ] = useState([])
  const [notesId, setNotesId] = useState(null)

  const fetchNotes = async () => {
    try {
      const result = await getNotes()
      setNotesData(result)
    } catch (error) {
      console.log(`error get data : ${error}`)
    }
  }

  useEffect(() => {
      fetchNotes()
  }, [])

  const openModal = (id = null) => {
    setNotesId(id)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    fetchNotes()
  }
  
  return (
    <div id="notes-page">
      <h1>This is notes page</h1>
      <button onClick={() => handleLogout()}>Logout</button>
      <button onClick={() => openModal()}>Open Modal</button>

      {
        notesData.map((note, id) => {
          return (
            <div key={id}>
              {note.notes}
              {note.id}
              <button onClick={()=>openModal(note.id)} >Edit</button>
            </div>
          )
        })
      }

      {
        notesId 
          ? <ModalNotes isOpen={isModalOpen} onClose={closeModal} notesId={notesId}/>
          : <ModalNotes isOpen={isModalOpen} onClose={closeModal}/>
      }

      
    </div>
  );
};

export default Notes;
