import React, { useState } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [editMode, setEditMode] = useState(null);

  const handleInputChange = (e) => {
    setCurrentNote(e.target.value);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const toggleBold = () => {
    setBold(!bold);
  };

  const toggleItalic = () => {
    setItalic(!italic);
  };

  const toggleUnderline = () => {
    setUnderline(!underline);
  };

  const handleAddNote = () => {
    if (currentNote.trim() !== '') {
      setNotes([
        ...notes,
        { content: currentNote, file: selectedFile, bold, italic, underline, id: Date.now() }
      ]);
      setCurrentNote('');
      setSelectedFile(null);
      setBold(false);
      setItalic(false);
      setUnderline(false);
    }
  };

  const handleEditNote = (id) => {
    const noteToEdit = notes.find((note) => note.id === id);
    setCurrentNote(noteToEdit.content);
    setBold(noteToEdit.bold);
    setItalic(noteToEdit.italic);
    setUnderline(noteToEdit.underline);
    setEditMode(id);
  };

  const handleSaveEdit = () => {
    const editedNotes = notes.map((note) =>
      note.id === editMode
        ? { ...note, content: currentNote, bold, italic, underline }
        : note
    );
    setNotes(editedNotes);
    setCurrentNote('');
    setBold(false);
    setItalic(false);
    setUnderline(false);
    setEditMode(null);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="App">
      <h1>Victor Notepad Application</h1>
      <div className="notes-container">
        <textarea
          rows="4"
          cols="50"
          value={currentNote}
          onChange={handleInputChange}
          style={{
            fontWeight: bold ? 'bold' : 'normal',
            fontStyle: italic ? 'italic' : 'normal',
            textDecoration: underline ? 'underline' : 'none'
          }}
          placeholder="Enter your note..."
        ></textarea>
        <div className="formatting-buttons">
          <button onClick={toggleBold} className={bold ? 'active' : ''}>
            Bold
          </button>
          <button onClick={toggleItalic} className={italic ? 'active' : ''}>
            Italics
          </button>
          <button onClick={toggleUnderline} className={underline ? 'active' : ''}>
            Underline
          </button>
        </div>
        <input type="file" accept="image/*, video/*" onChange={handleFileChange} />
        {editMode ? (
          <button onClick={handleSaveEdit} className="save-btn">
            Save
          </button>
        ) : (
          <button onClick={handleAddNote} className="add-btn">
            Add Note
          </button>
        )}
      </div>
      <div className="notes-list">
        {notes.map((note, index) => (
          <div key={note.id} className="note">
            <p
              style={{
                fontWeight: note.bold ? 'bold' : 'normal',
                fontStyle: note.italic ? 'italic' : 'normal',
                textDecoration: note.underline ? 'underline' : 'none'
              }}
            >
              {`Note ${index + 1}: ${note.content}`}
            </p>
            {note.file && (
              <div className="file-container">
                {note.file.type.startsWith('image') ? (
                  <img src={URL.createObjectURL(note.file)} alt="Note attachment" />
                ) : note.file.type.startsWith('video') ? (
                  <video controls src={URL.createObjectURL(note.file)}></video>
                ) : (
                  <p>Unsupported file format</p>
                )}
              </div>
            )}
            <div className="note-buttons">
              {!editMode && (
                <>
                  <button onClick={() => handleEditNote(note.id)} className="edit-btn">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteNote(note.id)} className="delete-btn">
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;