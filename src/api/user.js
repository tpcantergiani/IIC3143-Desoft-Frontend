import http from './http';

export async function login(payload) {
  return http.post('/apilogin', payload);
}

export async function register(payload) {
  return http.post('/register-user', payload);
}

export async function putPassword(payload) {
  return http.put('/change-password', payload);
}

export async function delPlate(payload) {
  return http.delete('/remove_plate', payload);
}
