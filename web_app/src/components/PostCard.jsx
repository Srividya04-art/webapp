import React from "react";

const PostCard = ({ post }) => {
  const createdAt = new Date(post.created_at).toLocaleString();

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        marginBottom: "1rem",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <h3>{post.title}</h3>
      <p style={{ fontStyle: "italic", color: "#555" }}>
        By {post.author_name || post.author} on {createdAt}
      </p>
      <p>{post.content}</p>
      {post.tags && (
        <p>
          <strong>Tags:</strong>{" "}
          {post.tags.split(",").map((tag, i) => (
            <span
              key={i}
              style={{
                background: "#eee",
                padding: "2px 6px",
                marginRight: "5px",
                borderRadius: "4px",
                fontSize: "0.85rem",
              }}
            >
              {tag.trim()}
            </span>
          ))}
        </p>
      )}
    </div>
  );
};

export default PostCard;
