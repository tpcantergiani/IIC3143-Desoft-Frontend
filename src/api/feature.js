import http from './http';

export async function invite(payload) {
  return http.post('/create_invitation', payload);
}

export async function registerVisit(payload) {
  return http.post('/register-user', payload);
}

export async function searchVisit(payload) {
  return http.post('/verify_rut_plate', payload);
}

export async function getInvitationsRoute() {
  return http.get('get_invitations');
}

export async function getUserContacts() {
  return http.get('/contacts');
}
