// Mock data for the User entity.
// In CA2 these will be real accounts with hashed passwords and login (JWT/session).

export const mockUsers = [
  { id: 'usr-001', name: 'Aiden Tan', email: 'aiden.tan@example.com', role: 'player' },
  { id: 'usr-002', name: 'Priya Nair', email: 'priya.nair@example.com', role: 'player' },
  { id: 'usr-003', name: 'Marcus Lim', email: 'marcus.lim@example.com', role: 'player' },
  { id: 'usr-004', name: 'Shop Staff', email: 'staff@deckhouse.example', role: 'admin' },
];

// Until login exists (CA2), we pretend this player is signed in.
export const CURRENT_USER_ID = 'usr-001';
