import { useState } from 'react';
import StatusBadge from '../components/StatusBadge.jsx';
import RegistrationForm from '../components/RegistrationForm.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { getDisplayStatus } from '../components/EventCard.jsx';
import { formatDate, formatFee, countFilledSeats } from '../utils.js';

// Full details for one event, plus the registration form.
function EventDetailPage({ event, registrations, currentUser, onRegister, onBack, onNavigate }) {
  const [resultStatus, setResultStatus] = useState(null); // set after a successful submit

  if (!event) {
    return <EmptyState title="Event not found" message="It may have been removed." actionLabel="Back to events" onAction={onBack} />;
  }

  const status = getDisplayStatus(event, registrations);
  const filled = countFilledSeats(registrations, event.id);
  const existing = registrations.find(
    (r) => r.eventId === event.id && r.userId === currentUser.id && r.status !== 'cancelled'
  );

  function handleSubmit(formData) {
    setResultStatus(onRegister(event.id, formData));
  }

  // Decide what goes in the right-hand panel
  let panel;
  if (resultStatus) {
    panel = (
      <div className="alert alert-success">
        {resultStatus === 'waitlisted'
          ? "You're on the waitlist. We'll let you know if a seat opens up."
          : "You're registered! See you at the table."}
        <button className="link-btn" onClick={() => onNavigate('my-registrations')}>View my registrations →</button>
      </div>
    );
  } else if (existing) {
    panel = (
      <div className="alert alert-info">
        You already have a registration for this event (<StatusBadge status={existing.status} />).
      </div>
    );
  } else if (status === 'cancelled' || status === 'completed') {
    panel = <div className="alert alert-muted">Registration is closed for this event.</div>;
  } else {
    panel = <RegistrationForm isFull={status === 'full'} defaultName={currentUser.name} onSubmit={handleSubmit} />;
  }

  return (
    <section>
      <button className="link-btn" onClick={onBack}>← Back to events</button>
      <div className="detail">
        <div className="detail-main">
          <div className="detail-tags">
            <span className="game-tag dark">{event.game}</span>
            <StatusBadge status={status} />
          </div>
          <h1>{event.title}</h1>
          <dl className="detail-list">
            <div><dt>Date</dt><dd>{formatDate(event.date)}</dd></div>
            <div><dt>Start</dt><dd>{event.startTime}</dd></div>
            <div><dt>Format</dt><dd>{event.format}</dd></div>
            <div><dt>Entry</dt><dd>{formatFee(event.entryFee)}</dd></div>
            <div><dt>Seats</dt><dd>{filled} / {event.capacity}</dd></div>
          </dl>
          <h3>About this event</h3>
          <p>{event.description}</p>
          <h3>Prizes</h3>
          <p>{event.prizeInfo}</p>
        </div>
        <aside className="detail-side">
          <h3>Registration</h3>
          {panel}
        </aside>
      </div>
    </section>
  );
}

export default EventDetailPage;
