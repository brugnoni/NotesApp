import React, { useState, useEffect, useCallback } from "react";
import { ReactComponent as ArrowLeft } from "../assets/back-button.svg";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NotePage = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  let [note, setNote] = useState({ body: "" });

  let getNote = useCallback(async () => {
    if (id === "create") return;
    let response = await fetch(`/notes/${id}/`);
    let data = await response.json();
    setNote(data);
  }, [id]);

  useEffect(() => {
    getNote();
  }, [getNote]);

  let createNote = async () => {
    fetch("/notes/create/", {
      body: JSON.stringify(note),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res);
    });
    navigate("/");
  };

  let updateNote = async () => {
    fetch(`/notes/${id}/update/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  let deleteNote = async () => {
    fetch(`/notes/${id}/delete/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    navigate("/");
  };

  let handleSubmit = () => {
    if (id !== "create" && note.body === "") {
      deleteNote();
    } else if (id !== "create") {
      updateNote();
    } else if (id === "create" && note.body !== null) {
      createNote();
    }
    navigate("/");
  };

  let handleChange = (value) => {
    setNote((prevNote) => ({ ...prevNote, body: value }));
    console.log("Handle Change:", note);
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <ArrowLeft onClick={handleSubmit} />
        </h3>
        {id !== "create" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={createNote}>Done</button>
        )}
      </div>
      <textarea
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        value={note?.body}
      ></textarea>
    </div>
  );
};

export default NotePage;
