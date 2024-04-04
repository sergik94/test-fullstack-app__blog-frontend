import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../features/axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');
  return data;
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get('/tags');
  return data;
});

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) => {
  return await axios.delete(`/posts/${id}`);
});

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    // getting posts
    [fetchPosts.pending]: (state) => {
      state.posts.status = 'loading';
      state.posts.items = [];
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.status = 'loaded';
      state.posts.items = action.payload;
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.status = 'error';
      state.posts.items = [];
    },
    // getting tags
    [fetchTags.pending]: (state) => {
      state.tags.status = 'loading';
      state.tags.items = [];
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.status = 'loaded';
      state.tags.items = action.payload;
    },
    [fetchTags.rejected]: (state) => {
      state.tags.status = 'error';
      state.tags.items = [];
    },
    // removing post
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg);
    },
  },
});

export const postsReducer = postsSlice.reducer;
