import React, { useEffect, useState, setNotes } from "react";

const NotesListPage = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    let res = await fetch("http://127.0.0.1:8000/notes");
    let data = await res.json();
    console.log("DATA: ", data);
    setNotes(data);
  };

  return <div>notes</div>;
};

export default NotesListPage;
