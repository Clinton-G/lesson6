import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Post from './Post';
import { updatePost } from './api';

jest.mock('./api', () => ({
  updatePost: jest.fn(),
}));

const queryClient = new QueryClient();

const renderPostComponent = (post) => {
  render(
    <QueryClientProvider client={queryClient}>
      <Post post={post} />
    </QueryClientProvider>
  );
};

describe('Post Component', () => {
  it('updates the posts and shows changes in the ui', async () => {
    const post = { id: 1, title: 'Old Title', body: 'Old Body' };
    updatePost.mockResolvedValue({ id: 1, title: 'Updated Title', body: 'Updated Body' });

    renderPostComponent(post);

    fireEvent.click(screen.getByText('Update'));
    await waitFor(() => screen.getByText('Updated Title'));
    expect(screen.getByText('Updated Title')).toBeInTheDocument();
    expect(screen.getByText('Updated Body')).toBeInTheDocument();
  });

  it('displays error messages if the update fails', async () => {
    const post = { id: 1, title: 'Old Title', body: 'Old Body' };
    updatePost.mockRejectedValue(new Error('Error updating post'));

    renderPostComponent(post);

    fireEvent.click(screen.getByText('Update'));

    await waitFor(() => screen.getByText('Error Updating Post: Error updating post'));
    expect(screen.getByText('Error Updating Post: Error updating post')).toBeInTheDocument();
  });
});
