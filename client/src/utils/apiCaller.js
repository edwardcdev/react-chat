import axios from 'axios';
import moment from 'moment-timezone';

const baseUrl = '/api/v1';

export const anonymousRequest = (method, path, options = {}) => {
  const config = {
    method,
    url: baseUrl + path,
  };
  if (options.body) {
    config.data = options.body;
  }
  config.headers = { 'Content-Type': 'application/json' };
  return axios(config);
};

const newAccessToken = async (email, refreshToken) => {
  try {
    const response = await anonymousRequest('post', '/auth/refresh-token', { body: { email, refreshToken } });
    localStorage.setItem('chatting_app_token', JSON.stringify(response.data));
    return response.data.accessToken;
  } catch (error) {
    return null;
  }
};

export const authorizedRequest = async (method, path, options = {}) => {
  const config = {
    method,
    url: baseUrl + path,
  };
  if (options.body) {
    config.data = options.body;
  }
  config.headers = { 'Content-Type': 'application/json' };
  let token = localStorage.getItem('chatting_app_token');
  const userEmail = localStorage.getItem('chatting_app_user_email');
  if (token && userEmail) {
    token = JSON.parse(token);
    let { accessToken } = token;
    if (moment(token.expiresIn) < moment()) {
      accessToken = await newAccessToken(userEmail, token.refreshToken);
    }
    config.headers.Authorization = `${token.tokenType} ${accessToken}`;
  }
  return axios(config);
};
