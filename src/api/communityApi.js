import React from 'react';
import { URL } from 'config/config';
import axios from 'axios';

export const postPost = async () => {
  try {
    const response = await axios.get(`${URL}/post`);
    console.log('postPosts', response);
    const { data } = response;
    console.log(data);
    return data;
  } catch (error) {
    console.log('requestPost', error);
  }
};

export const getPosts = async () => {
  try {
    const response = await axios.get(`${URL}/posts/1`);
    console.log('getPosts', response);
    const { data } = response;
    console.log(data);
    return data;
  } catch (error) {
    console.log('requestCommunityList', error);
  }
};

// export default communityApi;
