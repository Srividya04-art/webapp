import React, { useState } from "react";
import { createPost } from "../services/postService";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await createPost({ title, content, tags: tags.split(",") }, token);
      alert("Post created successfully!");
      setTitle("");
      setContent("");
      setTags("");
    } catch (err) {
      console.error(err);
      alert("Failed to create post");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f5f5f5",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "10px",
          width: "100%",
          maxWidth: "600px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          Create Post
        </h2>

        <div style={{ marginBottom: "1rem" }}>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "100%", padding: "0.8rem", marginTop: "0.5rem" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows="6"
            style={{ width: "100%", padding: "0.8rem", marginTop: "0.5rem" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Tags (comma-separated)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            style={{ width: "100%", padding: "0.8rem", marginTop: "0.5rem" }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "1rem",
            background: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
