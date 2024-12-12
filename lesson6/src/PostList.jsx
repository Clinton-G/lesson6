import React, { useState, useMemo, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from './api';
import Post from './Post';

const PostList = () => {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleUserSelection = useCallback((e) => {
    setSelectedUserId(Number(e.target.value));
  }, []);

  const filteredPosts = useMemo(() => {
    if (!selectedUserId) return posts;
    return posts.filter(post => post.userId === selectedUserId);
  }, [posts, selectedUserId]);

  if (isLoading) return <p>Loading Posts...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Posts List:</h2>
      <select onChange={handleUserSelection} aria-label="Filter by User">
        <option value="">All Users</option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
      </select>

      {filteredPosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
