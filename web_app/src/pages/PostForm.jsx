import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../services/postService";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await createPost({ title, content, tags }, token);
      navigate("/profile"); 
    } catch (err) {
      console.error(err);
      setError("Failed to create post");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          width: "400px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Create Post</h2>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "1rem",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows="5"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "1rem",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        ></textarea>

        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "1.5rem",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default PostForm;
