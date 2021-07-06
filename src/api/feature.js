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

export async function getEntriesRoute() {
  return http.get('/get_entries');
}

export async function getUserContacts() {
  return http.get('/contacts');
}

export async function getUsersList() {
  return http.get('/get_users');
}

export async function deleteUsers(payload) {
  return http.post('/delete-user', payload);
}

export async function getPosiblesHomes() {
  return http.get('/get_homes_numbers');
}
export async function getActualCondominium() {
  return http.get('/init_info');
}

export async function delPlate(payload) {
  return http.delete('/remove_plate', payload);
}

export async function getPlates(payload) {
  return http.get('/get_home_plates', payload);
}
