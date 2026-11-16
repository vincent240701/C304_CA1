import { useState } from 'react';
import StatusBadge from '../components/StatusBadge.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { formatDate } from '../utils.js';

// Lists the signed-in player's registrations with an option to cancel.
function MyRegistrationsPage({ events, registrations, onCancel, onSelectEvent, onNavigate }) {
  const [showCancelled, setShowCancelled] = useState(false);
  const [message, setMessage] = useState('');

  const visible = registrations.filter((r) => showCancelled || r.status !== 'cancelled');

  function handleCancel(reg, eventTitle) {
    if (window.confirm(`Cancel your registration for "${eventTitle}"?`)) {
      onCancel(reg.id);
      setMessage(`Registration for "${eventTitle}" cancelled.`);
    }
  }

  return (
    <section>
      <div className="section-head">
        <h1>My Registrations</h1>
        <label className="checkbox">
          <input type="checkbox" checked={showCancelled} onChange={(e) => setShowCancelled(e.target.checked)} />
          Show cancelled
        </label>
      </div>

      {message && <div className="alert alert-success">{message}</div>}

      {visible.length === 0 ? (
        <EmptyState
          title="No registrations yet"
          message="Find an event you like and reserve a seat."
          actionLabel="Browse events"
          onAction={() => onNavigate('events')}
        />
      ) : (
        <ul className="reg-list">
          {visible.map((reg) => {
            const event = events.find((e) => e.id === reg.eventId);
            const canCancel = reg.status === 'registered' || reg.status === 'waitlisted';
            return (
              <li key={reg.id} className="reg-item">
                <div>
                  <button className="link-btn strong" onClick={() => onSelectEvent(event.id)}>{event.title}</button>
                  <p className="muted">{formatDate(event.date)} · {event.startTime} · ID {reg.gameId}</p>
                </div>
                <div className="reg-actions">
                  <StatusBadge status={reg.status} />
                  {canCancel && (
                    <button className="btn btn-danger-ghost" onClick={() => handleCancel(reg, event.title)}>Cancel</button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default MyRegistrationsPage;
