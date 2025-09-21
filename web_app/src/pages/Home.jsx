import React, { useEffect, useState } from "react";
import { getAllPosts } from "../services/postService";
import PostCard from "../components/PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      <h2 style={{ color: "#4a90e2", marginBottom: "1.5rem" }}>All Posts</h2>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post.id}
            style={{
              backgroundColor: "#ffffff",
              padding: "1rem",
              borderRadius: "8px",
              marginBottom: "1rem",
              boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
            }}
          >
            <PostCard post={post} />
          </div>
        ))
      ) : (
        <p style={{ color: "#555" }}>No posts yet.</p>
      )}
    </div>
  );
};

export default Home;
