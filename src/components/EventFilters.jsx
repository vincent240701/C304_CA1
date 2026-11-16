import { GAMES } from '../data/mockEvents.js';

// Controlled filter inputs. The filter values live in the parent (EventsPage);
// this component only displays them and reports changes through onChange.
function EventFilters({ filters, onChange, onReset }) {
  function handleChange(e) {
    onChange({ ...filters, [e.target.name]: e.target.value });
  }

  return (
    <div className="filters">
      <input
        type="text"
        name="search"
        placeholder="Search events…"
        value={filters.search}
        onChange={handleChange}
      />
      <select name="game" value={filters.game} onChange={handleChange}>
        <option value="all">All games</option>
        {GAMES.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>
      <select name="status" value={filters.status} onChange={handleChange}>
        <option value="upcoming">Upcoming (open &amp; full)</option>
        <option value="open">Open only</option>
        <option value="all">All statuses</option>
      </select>
      <button className="btn btn-ghost" onClick={onReset}>
        Reset
      </button>
    </div>
  );
}

export default EventFilters;
