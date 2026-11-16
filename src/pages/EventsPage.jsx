import { useState } from 'react';
import EventCard, { getDisplayStatus } from '../components/EventCard.jsx';
import EventFilters from '../components/EventFilters.jsx';
import EmptyState from '../components/EmptyState.jsx';

const DEFAULT_FILTERS = { search: '', game: 'all', status: 'upcoming' };

// Browse all events with search + filters.
function EventsPage({ events, registrations, onSelectEvent }) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const filteredEvents = events
    .filter((e) => {
      const status = getDisplayStatus(e, registrations);
      const matchesSearch = e.title.toLowerCase().includes(filters.search.toLowerCase());
      const matchesGame = filters.game === 'all' || e.game === filters.game;
      const matchesStatus =
        filters.status === 'all' ||
        (filters.status === 'open' && status === 'open') ||
        (filters.status === 'upcoming' && (status === 'open' || status === 'full'));
      return matchesSearch && matchesGame && matchesStatus;
    })
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <section>
      <h1>Events</h1>
      <EventFilters filters={filters} onChange={setFilters} onReset={() => setFilters(DEFAULT_FILTERS)} />
      <p className="muted result-count">
        {filteredEvents.length} event{filteredEvents.length !== 1 && 's'} found
      </p>

      {filteredEvents.length === 0 ? (
        <EmptyState
          title="No events match your filters"
          message="Try another game or clear your search."
          actionLabel="Clear filters"
          onAction={() => setFilters(DEFAULT_FILTERS)}
        />
      ) : (
        <div className="event-grid">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} registrations={registrations} onSelect={onSelectEvent} />
          ))}
        </div>
      )}
    </section>
  );
}

export default EventsPage;
