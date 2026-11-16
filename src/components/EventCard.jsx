import StatusBadge from './StatusBadge.jsx';
import { formatDate, formatFee, countFilledSeats } from '../utils.js';

// Works out what status to SHOW: cancelled/completed come from the event itself,
// but "full" is calculated from how many seats are taken.
export function getDisplayStatus(event, registrations) {
  if (event.status !== 'open') return event.status;
  return countFilledSeats(registrations, event.id) >= event.capacity ? 'full' : 'open';
}

// One event in a grid/list. Used on Home and Events pages.
function EventCard({ event, registrations, onSelect }) {
  const filled = countFilledSeats(registrations, event.id);
  const status = getDisplayStatus(event, registrations);
  const percent = Math.min(100, Math.round((filled / event.capacity) * 100));

  return (
    <article className="event-card" onClick={() => onSelect(event.id)}>
      <div className={`event-card-top game-${event.game.replace(/[^a-z]/gi, '').toLowerCase()}`}>
        <span className="game-tag">{event.game}</span>
        <StatusBadge status={status} />
      </div>
      <div className="event-card-body">
        <h3>{event.title}</h3>
        <p className="muted">
          {formatDate(event.date)} · {event.startTime}
        </p>
        <p className="muted">
          {event.format} · {formatFee(event.entryFee)}
        </p>
        <div className="seats">
          <div className="seats-bar">
            <div className="seats-fill" style={{ width: `${percent}%` }} />
          </div>
          <span className="seats-text">
            {filled}/{event.capacity} seats
          </span>
        </div>
      </div>
    </article>
  );
}

export default EventCard;
