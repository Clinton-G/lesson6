import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CreatePost from './CreatePost';
import { createPost } from './api';

jest.mock('./api', () => ({
  createPost: jest.fn(),
}));

const queryClient = new QueryClient();

const renderCreatePost = () => {
  render(
    <QueryClientProvider client={queryClient}>
      <CreatePost />
    </QueryClientProvider>
  );
};

describe('CreatePost Component', () => {
  it('creates new post and updates ui', async () => {
    createPost.mockResolvedValue({ id: 1, title: 'New Post', body: 'New Post Body' });

    renderCreatePost();

    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'New Post' } });
    fireEvent.change(screen.getByPlaceholderText('Body'), { target: { value: 'New Post Body' } });
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => screen.getByText('New Post'));
    expect(screen.getByText('New Post')).toBeInTheDocument();
  });

  it('displays error message if create fails', async () => {
    createPost.mockRejectedValue(new Error('Eror creating post'));

    renderCreatePost();

    fireEvent.change(screen.getByPlaceholderText('Title'), { target: { value: 'New Post' } });
    fireEvent.change(screen.getByPlaceholderText('Body'), { target: { value: 'New Post Body' } });
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => screen.getByText('Eror Creating Post: Error creating post'));
    expect(screen.getByText('Error Creating Post: Error creating post')).toBeInTheDocument();
  });
});
