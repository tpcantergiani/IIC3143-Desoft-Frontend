import http from './http';

export async function login(payload) {
  return http.post('/apilogin', payload);
}

export async function register(payload) {
  return http.post('/signUp', payload);
}
