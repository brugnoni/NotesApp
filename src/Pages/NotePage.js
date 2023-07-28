import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/back-button.svg";

const NotePage = () => {
  let { id } = useParams();
  let [note, setNote] = useState(null);

  useEffect(() => {
    let getNote = async () => {
      let response = await fetch(`/notes/${id}`);
      let data = await response.json();
      setNote(data);
    };

    getNote();
  }, [id]);

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to="/">
            <ArrowLeft />
          </Link>
        </h3>
      </div>
      <textarea defaultValue={note?.body}></textarea>
    </div>
  );
};

export default NotePage;
