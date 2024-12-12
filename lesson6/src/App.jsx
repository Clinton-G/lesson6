import React from 'react';
import PostList from './PostList';
import CreatePost from './CreatePost';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header>
        <h1>Platform Testing</h1>
      </header>
      <main>
        <CreatePost />
        <PostList />
      </main>
    </div>
  );
};

export default App;
