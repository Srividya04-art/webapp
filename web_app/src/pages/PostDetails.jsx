import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPosts } from '../services/postService.js';

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const data = await getPosts(); 
      const selected = data.find(p => p.id.toString() === id);
      setPost(selected);
    };
    fetchPost();
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <small>Author ID: {post.author_id}</small>
    </div>
  );
}

export default PostDetails;
