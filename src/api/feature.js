import http from './http';

export async function invite(payload) {
  return http.post('/create_invitation', payload);
}

export async function searchVisit(payload) {
  return http.post('/register-user', payload);
}
