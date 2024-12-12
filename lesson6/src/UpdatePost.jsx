import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePost } from './api';

const UpdatePost = ({ post }) => {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  const updatePostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: (updatedPost) => {
      queryClient.setQueryData(['posts'], (oldPosts) =>
        oldPosts.map((p) => (p.id === updatedPost.id ? updatedPost : p))
      );
    },
    onError: (error) => {
      console.error("Error Updating Post:", error);
    },
  });

  const handleUpdate = () => {
    const updatedPost = { ...post, title, body };
    updatePostMutation.mutate(updatedPost);
  };

  return (
    <div>
      <h3>Update Post</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Body"
      />
      <button onClick={handleUpdate} disabled={updatePostMutation.isLoading}>
        {updatePostMutation.isLoading ? 'Updating' : 'Update Post'}
      </button>
      {updatePostMutation.isError && (
        <p>Error: {updatePostMutation.error.message}</p>
      )}
    </div>
  );
};

export default UpdatePost;
