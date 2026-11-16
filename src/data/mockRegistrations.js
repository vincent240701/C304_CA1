// Mock data for the Registration entity (links a User to an Event).
// status: 'registered' | 'waitlisted' | 'checked-in' | 'cancelled'

export const mockRegistrations = [
  { id: 'reg-001', eventId: 'evt-001', userId: 'usr-001', playerName: 'Aiden Tan', gameId: 'POK-2231-8812', status: 'registered', registeredAt: '2026-11-10T09:15:00' },
  { id: 'reg-002', eventId: 'evt-001', userId: 'usr-002', playerName: 'Priya Nair', gameId: 'POK-5520-1934', status: 'registered', registeredAt: '2026-11-11T18:40:00' },
  { id: 'reg-003', eventId: 'evt-003', userId: 'usr-003', playerName: 'Marcus Lim', gameId: 'FAB-00981', status: 'registered', registeredAt: '2026-11-08T12:00:00' },
  { id: 'reg-004', eventId: 'evt-003', userId: 'usr-001', playerName: 'Aiden Tan', gameId: 'FAB-01422', status: 'waitlisted', registeredAt: '2026-11-12T21:05:00' },
  { id: 'reg-005', eventId: 'evt-007', userId: 'usr-001', playerName: 'Aiden Tan', gameId: 'OP-778120', status: 'checked-in', registeredAt: '2026-11-05T10:30:00' },
  { id: 'reg-006', eventId: 'evt-002', userId: 'usr-002', playerName: 'Priya Nair', gameId: 'OP-334901', status: 'registered', registeredAt: '2026-11-13T08:20:00' },
];
