import React, { useEffect, useState } from "react";
import { getProfilePosts, deletePost } from "../services/postService";
import axios from "axios";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const Profile = () => {
  const [profile, setProfile] = useState({
    username: "",
    bio: "",
    profile_pic: "",
    posts: [],
  });
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    username: "",
    bio: "",
    profile_pic: "",
  });

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await getProfilePosts(token);
      setProfile(data);
      setEditData({
        username: data.username,
        bio: data.bio,
        profile_pic: data.profile_pic,
      });
    } catch (err) {
      console.error(err);
      setError("Failed to load profile.");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      fetchProfile();
    } catch (err) {
      console.error(err);
      alert("Failed to delete post");
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:5000/api/users/me",
        {
          name: editData.username,
          bio: editData.bio,
          profile_pic: editData.profile_pic, 
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsEditing(false);
      fetchProfile();
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f0f4f8", minHeight: "100vh" }}>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {}
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
          backgroundColor: "#ffffff",
          padding: "1.5rem",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
          marginBottom: "2rem",
        }}
      >
        {}
        {!isEditing && (
          <AiOutlineEdit
            onClick={() => setIsEditing(true)}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              cursor: "pointer",
              fontSize: "22px",
              color: "#4a90e2",
            }}
            title="Edit Profile"
          />
        )}

        <img
          src={profile.profile_pic || "https://via.placeholder.com/120"}
          
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            border: "4px solid #4a90e2",
            objectFit: "cover",
          }}
        />

        <div style={{ flex: 1 }}>
          {isEditing ? (
            <>
              <input
                type="text"
                name="username"
                value={editData.username}
                onChange={handleEditChange}
                placeholder="Username"
                style={{ fontSize: "18px", padding: "5px", marginBottom: "0.5rem", width: "100%" }}
              />
              <textarea
                name="bio"
                value={editData.bio}
                onChange={handleEditChange}
                placeholder="Bio"
                rows={3}
                style={{ width: "100%", padding: "5px", fontSize: "14px", marginBottom: "0.5rem" }}
              />
              <input
                type="text"
                name="profile_pic"
                value={editData.profile_pic}
                onChange={handleEditChange}
                placeholder="Profile Image URL"
                style={{ width: "100%", padding: "5px", fontSize: "14px", marginBottom: "0.5rem" }}
              />
              <div style={{ marginTop: "0.5rem" }}>
                <button
                  onClick={handleSaveProfile}
                  style={{ marginRight: "1rem", padding: "5px 10px", background: "#4a90e2", color: "white", border: "none", borderRadius: "5px" }}
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  style={{ padding: "5px 10px", border: "1px solid #ccc", borderRadius: "5px" }}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 style={{ color: "#333", marginBottom: "0.5rem" }}>
                {profile.username || "No username"}
              </h2>
              <p style={{ color: "#555", fontSize: "16px", lineHeight: "1.5" }}>
                {profile.bio || "No bio available."}
              </p>
            </>
          )}
        </div>
      </div>

      {}
      <h3 style={{ color: "#4a90e2", marginBottom: "1rem" }}>Your Posts:</h3>
      {profile.posts.length > 0 ? (
        profile.posts.map((post) => (
          <div
            key={post.id}
            style={{
              borderBottom: "1px solid #ccc",
              padding: "1rem 1rem 1rem 0",
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              marginBottom: "1rem",
              boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
            }}
          >
            {}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h4 style={{ color: "#222", margin: 0 }}>{post.title}</h4>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <AiOutlineEdit
                  style={{ cursor: "pointer", color: "#4a90e2", fontSize: "20px" }}
                  title="Edit Post"
                  onClick={() => alert("Edit functionality coming soon")}
                />
                <AiOutlineDelete
                  style={{ cursor: "pointer", color: "#e94e77", fontSize: "20px" }}
                  title="Delete Post"
                  onClick={() => handleDelete(post.id)}
                />
              </div>
            </div>
            <p style={{ color: "#555", marginTop: "0.5rem" }}>{post.content}</p>
          </div>
        ))
      ) : (
        <p style={{ color: "#555" }}>No posts yet.</p>
      )}
    </div>
  );
};

export default Profile;
