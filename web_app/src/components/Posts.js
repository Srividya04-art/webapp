import React from 'react';
import PostCard from './PostCard.jsx';

function Posts({ posts }) {
  return (
    <div>
      {posts.length === 0 && <p>No posts available.</p>}
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Posts;
