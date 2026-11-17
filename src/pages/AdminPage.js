import { useState } from 'react';
import EventForm from '../components/EventForm.js';
import AttendeeList from '../components/AttendeeList.js';
import { countFilledSeats, formatDate } from '../utils.js';

// Staff dashboard: two tabs – manage attendees, or create a new event.
function AdminPage({ events, registrations, onAddEvent, onUpdateRegistration }) {
  const [tab, setTab] = useState('attendees');
  const [selectedId, setSelectedId] = useState(events.length > 0 ? events[0].id : '');

  const attendees = registrations.filter((r) => r.eventId === selectedId && r.status !== 'cancelled');
  const selectedEvent = events.find((e) => e.id === selectedId);

  return (
    <section>
      <h1>Staff Dashboard</h1>
      <div className="tabs">
        <button className={`tab ${tab === 'attendees' ? 'active' : ''}`} onClick={() => setTab('attendees')}>
          Attendees &amp; check-in
        </button>
        <button className={`tab ${tab === 'create' ? 'active' : ''}`} onClick={() => setTab('create')}>
          Create event
        </button>
      </div>

      {tab === 'attendees' ? (
        <div className="card">
          <label className="inline-label">
            Event
            <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
              {events.map((e) => (
                <option key={e.id} value={e.id}>
                  {formatDate(e.date)} – {e.title}
                </option>
              ))}
            </select>
          </label>
          {selectedEvent && (
            <p className="muted">
              {countFilledSeats(registrations, selectedId)} of {selectedEvent.capacity} seats filled ·{' '}
              {attendees.filter((a) => a.status === 'checked-in').length} checked in
            </p>
          )}
          <AttendeeList attendees={attendees} onUpdate={onUpdateRegistration} />
        </div>
      ) : (
        <div className="card narrow">
          <EventForm onSubmit={onAddEvent} />
        </div>
      )}
    </section>
  );
}

export default AdminPage;
