import StatusBadge from './StatusBadge.jsx';
import EmptyState from './EmptyState.jsx';

// Staff view of everyone registered for one event, with check-in toggle.
function AttendeeList({ attendees, onUpdate }) {
  if (attendees.length === 0) {
    return <EmptyState title="No sign-ups yet" message="Registrations for this event will appear here." />;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Player</th>
          <th>Player ID</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {attendees.map((a) => (
          <tr key={a.id}>
            <td>{a.playerName}</td>
            <td className="mono">{a.gameId}</td>
            <td><StatusBadge status={a.status} /></td>
            <td>
              {a.status === 'registered' && (
                <button className="btn btn-small" onClick={() => onUpdate(a.id, 'checked-in')}>Check in</button>
              )}
              {a.status === 'checked-in' && (
                <button className="btn btn-small btn-ghost" onClick={() => onUpdate(a.id, 'registered')}>Undo</button>
              )}
              {a.status === 'waitlisted' && (
                <button className="btn btn-small btn-ghost" onClick={() => onUpdate(a.id, 'registered')}>Promote</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AttendeeList;
