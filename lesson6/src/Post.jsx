import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost, updatePost } from './api';

const Post = React.memo(({ post }) => {
  const queryClient = useQueryClient();

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: (postId) => {
      queryClient.setQueryData(['posts'], (oldPosts) =>
        oldPosts.filter((p) => p.id !== postId)
      );
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: (updatedPost) => {
      queryClient.setQueryData(['posts'], (oldPosts) =>
        oldPosts.map((p) => (p.id === updatedPost.id ? updatedPost : p))
      );
    },
  });

  const handleDelete = () => {
    deletePostMutation.mutate(post.id);
  };

  const handleUpdate = () => {
    const updatedPost = { ...post, title: 'Updated Title', body: 'Updated Body Content' };
    updatePostMutation.mutate(updatedPost);
  };

  return (
    <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <button onClick={handleUpdate} disabled={updatePostMutation.isLoading}>
        {updatePostMutation.isLoading ? 'Updating' : 'Update'}
      </button>
      <button onClick={handleDelete} disabled={deletePostMutation.isLoading}>
        {deletePostMutation.isLoading ? 'Deleting' : 'Delete'}
      </button>
    </div>
  );
});

export default Post;
