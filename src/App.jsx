import { useEffect, useState } from 'react'
import "./main.css"
import NoteAPI from './NoteAPI';
import Rectangle7 from './assets/Rectangle7.png';
import Pencil from "./assets/pencil.png";
import Bin from "./assets/bin.png";
import Add from './assets/add.png';

function App() {
  const [notes, setNotes] = useState([]);
  const[activeNote, setActiveNote] = useState(null);


  const fetchNotes = () => {
    const notes = NoteAPI.getAllNotes();
    setNotes(notes);
  }

  useEffect(()=> {
    fetchNotes();
  }, []);


  //NoteView
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleBodyChange = (event) => {
    setBody(event.target.value)
  }

  const reset = () => {
    setTitle("");
    setBody("");
    setActiveNote(null);
  }

  //App.jsx
  const handleNoteAdd = () => {
    const newNote = {id : new Date().toISOString(),
                    title,
                    body,
    };
    NoteAPI.saveNote(newNote);
    reset();
    fetchNotes();
  }

  const handleNoteDelete = (id) => {
    NoteAPI.deleteNote(id);
    reset();
    fetchNotes();
  }

  //NoteSelect 
  useEffect(() => {
    if (activeNote) {
        setTitle(activeNote.title || "");
        setBody(activeNote.body || "");
    } else {
        setTitle("");
        setBody("");
    }
  }, [activeNote]);

  const handleNoteEdit = (noteToEdit) => {
      setActiveNote(noteToEdit);
      NoteAPI.deleteNote(noteToEdit.id);
      if (activeNote) {
        NoteAPI.saveNote({
          id: activeNote.id,
          title,
          body
        });
        setNotes(NoteAPI.getAllNotes());
        setActiveNote(null);
  };
  }

  return (
    <>
      <div className="navbar">
          <div className="logo">
            <img src={Rectangle7} alt="logo" height="40px"/>
          </div>
          <h1>Paracosm's Note App</h1>
        </div>
      <div className="note-app">
        <div className="note-sidebar">
          <div className="note-list">
            {notes.map(note => (
              <div className="note-list-item"
                  key={note.id}>
                  <div className="note-list-item-title">{note.title}</div>
                  <div className="note-list-item-body">
                    {note.body.length > 200 ? `${note.body.slice(0, 200)}...` : note.body}
                  </div>
                  <div className="note-list-item-date">{note.id}</div>
                  <div className="note-list-item-buttons">
                     <div className="note-list-item-buttons-delete">
                         <button onClick={() => handleNoteDelete(note.id)}>
                            <img src={Bin} height="15px" width="15px"></img>
                         </button>
                     </div>
                     <div className="note-list-item-buttons-edit">
                         <button onClick={() => handleNoteEdit(note)}>
                            <img src={Pencil} height="15px" width="15px"></img>
                         </button>
                      </div>
                   </div>
                </div>
            ))}
          </div>
        </div>
        <div className="selected-note">
          <div className="note-list-item-title">
            <input placeholder="New Note"
                  type="text"
                  value={title}
                  onChange={handleTitleChange}>
            </input>
          </div>
          <div className="note-list-item-body">
            <textarea placeholder="New Note Body...."
                      type="text"
                      value={body}
                      onChange={handleBodyChange}>
            </textarea>
          </div>
        </div>
        <div className='button-add-note'>
            <button onClick={handleNoteAdd}>
              <img src={Add} height="15px" width="15px"></img>
            </button>
        </div>

      </div>


    </>
  )
}

export default App
