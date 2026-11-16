import { useState } from 'react';
import EventCard, { getDisplayStatus } from '../components/EventCard.jsx';
import CardListing from '../components/CardListing.jsx';
import CardViewer from '../components/CardViewer.jsx';
import Conveyor from '../components/Conveyor.jsx';

// Landing page: upcoming events and shop cards, each on a moving "conveyor belt".
function HomePage({ events, registrations, cards, onSelectEvent, onNavigate }) {
  // Clicking a card opens the same front/back zoom viewer used on the Shop page.
  const [selectedCardId, setSelectedCardId] = useState(null);
  const selectedCard = cards.find((c) => c.id === selectedCardId);

  const upcoming = events
    .filter((e) => ['open', 'full'].includes(getDisplayStatus(e, registrations)))
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <>
      <section className="home-section">
        <div className="section-head">
          <h2>Coming up next</h2>
          <button className="link-btn" onClick={() => onNavigate('events')}>
            See all →
          </button>
        </div>
        {upcoming.length === 0 ? (
          <p className="muted">No upcoming events right now. Check back soon!</p>
        ) : (
          <Conveyor
            items={upcoming}
            itemWidth={300}
            secondsPerItem={7}
            renderItem={(event) => (
              <EventCard event={event} registrations={registrations} onSelect={onSelectEvent} />
            )}
          />
        )}
      </section>

      <section className="home-section">
        <div className="section-head">
          <h2>In the shop</h2>
          <button className="link-btn" onClick={() => onNavigate('shop')}>
            See all →
          </button>
        </div>
        {cards.length === 0 ? (
          <p className="muted">No cards in stock right now.</p>
        ) : (
          <Conveyor
            items={cards}
            itemWidth={220}
            secondsPerItem={6}
            renderItem={(card) => <CardListing card={card} onSelect={setSelectedCardId} />}
          />
        )}
      </section>

      {selectedCard && <CardViewer card={selectedCard} onClose={() => setSelectedCardId(null)} />}
    </>
  );
}

export default HomePage;
