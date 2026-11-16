// Small helper functions shared by several components.

export function formatDate(isoDate) {
  return new Date(isoDate + 'T00:00:00').toLocaleDateString('en-SG', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatFee(fee) {
  return fee === 0 ? 'Free' : `S$${fee}`;
}

// Turns a game name into a CSS class, e.g. "Yu-Gi-Oh!" -> "game-yugioh" (colours live in index.css).
export function gameClass(game) {
  return `game-${game.replace(/[^a-z]/gi, '').toLowerCase()}`;
}

// Card prices can have cents (e.g. S$0.50), so always show 2 decimals.
export function formatPrice(price) {
  return `S$${price.toFixed(2)}`;
}

// Count registrations that take up a seat (waitlisted/cancelled don't).
export function countFilledSeats(registrations, eventId) {
  return registrations.filter(
    (r) => r.eventId === eventId && (r.status === 'registered' || r.status === 'checked-in')
  ).length;
}
