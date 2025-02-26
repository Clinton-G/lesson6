import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PostList from './PostList';
import { fetchPosts } from './api';

jest.mock('./api', () => ({
  fetchPosts: jest.fn(),
}));

const queryClient = new QueryClient();

const renderPostList = () => {
  render(
    <QueryClientProvider client={queryClient}>
      <PostList />
    </QueryClientProvider>
  );
};

describe('PostList Component', () => {
  it('fetches and displays posts', async () => {
    fetchPosts.mockResolvedValue([
      { id: 1, title: 'Post 1', body: 'Body of Post 1' },
      { id: 2, title: 'Post 2', body: 'Body of Post 2' },
    ]);

    renderPostList();

    await waitFor(() => screen.getByText('Post 1'));
    expect(screen.getByText('Post 1')).toBeInTheDocument();
    expect(screen.getByText('Post 2')).toBeInTheDocument();
  });

  it('displays loading state while fetching posts', () => {
    fetchPosts.mockResolvedValue([]);
    renderPostList();
    expect(screen.getByText('Loading Posts...')).toBeInTheDocument();
  });

  it('displays error message if fetch fails', async () => {
    fetchPosts.mockRejectedValue(new Error('Error fetching posts'));
    renderPostList();
    await waitFor(() => screen.getByText('Error: Error fetching posts'));
    expect(screen.getByText('Error: Error fetching posts')).toBeInTheDocument();
  });
});
