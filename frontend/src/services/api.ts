import axios from 'axios';
import type { ContentDisplay, UserInfo } from '../types';

const client = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

export const fetchUserInfo = async (openid: string) => {
  const response = await client.get<UserInfo>(`/users/${openid}`);
  return response.data;
};

export const upsertUserInfo = async (payload: UserInfo) => {
  const response = await client.put<UserInfo>('/users', payload);
  return response.data;
};

export const fetchContentByRole = async (role: 'student' | 'volunteer') => {
  const response = await client.get<ContentDisplay[]>(`/content`, {
    params: { role },
  });
  return response.data;
};
