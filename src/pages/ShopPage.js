import { useState } from 'react';
import CardListing from '../components/CardListing.js';
import CardFilters from '../components/CardFilters.js';
import CardViewer from '../components/CardViewer.js';
import EmptyState from '../components/EmptyState.js';

const DEFAULT_FILTERS = {
  search: '',
  game: 'all',
  set: 'all',
  rarity: 'all',
  condition: 'all',
  year: 'all',
  sort: 'featured',
};

function matchesCondition(card, condition) {
  if (condition === 'all') return true;
  if (condition === 'graded') return card.grade !== null;
  if (condition === 'raw') return card.grade === null;
  return card.grade === null && card.condition === condition;
}

function sortCards(list, sort) {
  const sorted = [...list];
  switch (sort) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price);
    case 'year-desc':
      return sorted.sort((a, b) => b.year - a.year);
    case 'year-asc':
      return sorted.sort((a, b) => a.year - b.year);
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'number-asc':
      // card numbers are zero-padded (e.g. "041/165"), so text order = number order
      return sorted.sort((a, b) => a.cardNumber.localeCompare(b.cardNumber));
    default:
      return sorted;
  }
}

// Browse single cards for sale, with filters, sorting and a front/back zoom viewer.
function ShopPage({ cards }) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [selectedCardId, setSelectedCardId] = useState(null);

  // Dropdown options that depend on the data.
  // reduce() walks through the cards and only adds a value the first time it is seen (no duplicates).
  const setOptions = cards
    .filter((c) => filters.game === 'all' || c.game === filters.game)
    .reduce((list, c) => (list.includes(c.set) ? list : [...list, c.set]), [])
    .sort();
  const yearOptions = cards
    .reduce((list, c) => (list.includes(c.year) ? list : [...list, c.year]), [])
    .sort((a, b) => b - a);

  const search = filters.search.trim().toLowerCase();
  const filteredCards = sortCards(
    cards.filter(
      (c) =>
        (c.name.toLowerCase().includes(search) || c.cardNumber.toLowerCase().includes(search)) &&
        (filters.game === 'all' || c.game === filters.game) &&
        (filters.set === 'all' || c.set === filters.set) &&
        (filters.rarity === 'all' || c.rarity === filters.rarity) &&
        (filters.year === 'all' || c.year === Number(filters.year)) &&
        matchesCondition(c, filters.condition)
    ),
    filters.sort
  );

  const selectedCard = cards.find((c) => c.id === selectedCardId);
  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  return (
    <section>
      <h1>Card Shop</h1>
      <p className="muted">Singles and graded slabs in store. Tap a card to see the front and back up close.</p>

      <CardFilters
        filters={filters}
        sets={setOptions}
        years={yearOptions}
        onChange={setFilters}
        onReset={resetFilters}
      />
      <p className="muted result-count">
        {filteredCards.length} card{filteredCards.length !== 1 && 's'} found
      </p>

      {filteredCards.length === 0 ? (
        <EmptyState
          title="No cards match your filters"
          message="Try a different set or condition, or clear your search."
          actionLabel="Clear filters"
          onAction={resetFilters}
        />
      ) : (
        <div className="card-grid">
          {filteredCards.map((card) => (
            <CardListing key={card.id} card={card} onSelect={setSelectedCardId} />
          ))}
        </div>
      )}

      {selectedCard && <CardViewer card={selectedCard} onClose={() => setSelectedCardId(null)} />}
    </section>
  );
}

export default ShopPage;
