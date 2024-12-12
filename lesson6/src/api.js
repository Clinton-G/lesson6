export const fetchPosts = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      throw new Error('Error fetching posts');
    }
    return response.json();
  };
  
  export const createPost = async (newPost) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    });
  
    if (!response.ok) {
      throw new Error('Eror Creating Post');
    }
  
    return response.json();
  };
  
  export const deletePost = async (postId) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      throw new Error('Error Deleting Post');
    }
  
    return postId;
  };
  
  export const updatePost = async (updatedPost) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${updatedPost.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPost),
    });
  
    if (!response.ok) {
      throw new Error('Eror Updating Post');
    }
  
    return response.json();
  };