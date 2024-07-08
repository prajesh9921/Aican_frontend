import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import "./styles.css";
import JoditEditor from "jodit-react";

const socket = io.connect("https://heyhomie-backend.onrender.com");

export default function Home() {
  const editor = useRef(null);
  const [text, setText] = useState("");

  const GetText = async () => {
    try {
      const res = await axios.get("https://heyhomie-backend.onrender.com/gettext");
      setText(res.data.text);
    } catch (error) {
      console.log("error fetching text", error);
      return "error";
    }
  };

  useEffect(() => {
    GetText();
    socket.on("gettext", (newText) => {
      setText(newText);
    });
  }, []);

  const handleTextArea = (newText) => {
    setText(newText);
    socket.emit("text", newText);
  };

  return (
    <div className="container">
      <h1>Welcome to realtime text editor</h1>
      <p>Start your collaborative writing.</p>
      <JoditEditor
        ref={editor}
        value={text}
        onChange={(newContent) => handleTextArea(newContent)}
        className="editor"
      />
    </div>
  );
}
