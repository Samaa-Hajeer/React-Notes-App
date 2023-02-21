import { useEffect, useState } from "react";
import NoteList from "./components/NoteList";
import { nanoid } from "nanoid";
import Search from "./components/Search";
import Header from "./components/Header";

const App = () => {
  const [notes, setNotes] = useState(!localStorage.getItem("Note-project-storage")
    ? [
      {
        id: nanoid(),
        text: "First Note",
        date: "6/2/2023"

      },
      {
        id: nanoid(),
        text: "Second Note",
        date: "6/2/2023"
      },
      {
        id: nanoid(),
        text: "Third Note",
        date: "6/2/2023"
      }
    ]

    : JSON.parse(localStorage.getItem("Note-project-storage"))
  );
  const [searchText, setSearchText] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("Note-project-storage"));
    if (savedNotes) {
      console.log(savedNotes);
      setNotes(savedNotes);
    }
  }, []);


  useEffect(() => { localStorage.setItem("Note-project-storage", JSON.stringify(notes)) }, [notes]);

  // useEffect(() => {
  // 	const savedNotes = JSON.parse(
  // 		localStorage.getItem("react-notes-app-data")
  // 	);

  // 	if (savedNotes) {
  // 		setNotes(savedNotes);
  // 	}
  // }, []);

  // useEffect(() => {
  // 	localStorage.setItem(
  // 		"react-notes-app-data",
  // 		JSON.stringify(notes)
  // 	);
  // }, [notes]);

  const AddNote = (text) => {
    const date = new Date();

    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString()
    }

    const newNotes = [...notes, newNote];
    setNotes(newNotes);

  }

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  }

  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="container">
        <Header handleDarkMode={setDarkMode} />
        <Search handleSearch={setSearchText} />
        <NoteList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText.toLocaleLowerCase())
          )}
          handleAddNote={AddNote} handleDeleteNote={deleteNote}
        />
      </div>
    </div>
  )
}
export default App;