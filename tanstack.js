// npm create vite@latest my-react-app --template react
// cd my-react-app
// npm install @tanstack/react-query axios



// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    'Content-Type': 'application/json',
  },
  // timeout: 1000,
});

export const getPosts = async () => {
  const response = await api.get('/posts');
  return response.data;
};

export const createPost = async (newPost) => {
  const response = await api.post('/posts', newPost);
  return response.data;
};

export const updatePost = async (id, updatedPost) => {
  const response = await api.put(`/posts/${id}`, updatedPost);
  return response.data;
};

export const deletePost = async (id) => {
  await api.delete(`/posts/${id}`);
};

// src/App.jsx
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPosts, createPost, updatePost, deletePost } from './api';

const App = () => {
  const queryClient = useQueryClient();

  const { data: posts, isLoading, error } = useQuery(['posts'], getPosts);

  const createMutation = useMutation(createPost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    },
  });

  const updateMutation = useMutation(updatePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    },
  });

  const deleteMutation = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Posts</h1>
      <button
        onClick={() => createMutation.mutate({ title: 'New Post', body: 'This is a new post' })}
      >
        Add Post
      </button>
      <ul>
        {posts?.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <button onClick={() => updateMutation.mutate({ id: post.id, title: 'Updated Title', body: 'Updated Body' })}>
              Update
            </button>
            <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
