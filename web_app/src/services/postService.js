import axiosInstance from "../api/axiosInstance.js";


export const getAllPosts = async () => {
  const res = await axiosInstance.get("/posts");
  return res.data;
};


export const createPost = async (postData, token) => {
  const res = await axiosInstance.post("/posts", postData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};


export const getProfilePosts = async (token) => {
  const res = await axiosInstance.get("/users/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  const { user, posts } = res.data;
  return {
    username: user.name,
    bio: user.bio,
    profile_pic: user.profile_pic,
    posts,
  };
};




export const updatePost = async (id, postData) => {
  const response = await axiosInstance.put(`/posts/${id}`, postData);
  return response.data;
};

export const deletePost = async (id) => {
  const response = await axiosInstance.delete(`/posts/${id}`);
  return response.data;
};

