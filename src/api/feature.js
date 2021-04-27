import http from './http';

export async function invite(payload) {
  return http.post('/register-user', payload);
}

export async function searchVisit(payload) {
  return http.post('/register-user', payload);
}
