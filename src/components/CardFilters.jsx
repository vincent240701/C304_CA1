import { CARD_GAMES, CONDITIONS, RARITIES } from '../data/mockCards.js';

export const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: low → high' },
  { value: 'price-desc', label: 'Price: high → low' },
  { value: 'year-desc', label: 'Newest first' },
  { value: 'year-asc', label: 'Oldest first' },
  { value: 'name-asc', label: 'Name A → Z' },
  { value: 'number-asc', label: 'Card number' },
];

// Controlled filter inputs for the shop. Values live in ShopPage.
// `sets` and `years` are passed in because they depend on the card data
// (and the set list narrows down when a game is picked).
function CardFilters({ filters, sets, years, onChange, onReset }) {
  function handleChange(e) {
    const next = { ...filters, [e.target.name]: e.target.value };
    // A set belongs to one game, so changing the game clears the set.
    if (e.target.name === 'game') next.set = 'all';
    onChange(next);
  }

  return (
    <div className="filters card-filters">
      <input
        type="search"
        name="search"
        placeholder="Search name or card number…"
        value={filters.search}
        onChange={handleChange}
      />
      <select name="game" value={filters.game} onChange={handleChange} aria-label="Game">
        <option value="all">All games</option>
        {CARD_GAMES.map((g) => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>
      <select name="set" value={filters.set} onChange={handleChange} aria-label="Set">
        <option value="all">All sets</option>
        {sets.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <select name="rarity" value={filters.rarity} onChange={handleChange} aria-label="Rarity">
        <option value="all">All rarities</option>
        {RARITIES.map((r) => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>
      <select name="condition" value={filters.condition} onChange={handleChange} aria-label="Condition">
        <option value="all">Any condition</option>
        <option value="graded">Graded only (PSA / BGS)</option>
        <option value="raw">Raw only</option>
        {CONDITIONS.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <select name="year" value={filters.year} onChange={handleChange} aria-label="Year">
        <option value="all">Any year</option>
        {years.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
      <select name="sort" value={filters.sort} onChange={handleChange} aria-label="Sort by">
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>Sort: {o.label}</option>
        ))}
      </select>
      <button className="btn btn-ghost" onClick={onReset}>
        Reset
      </button>
    </div>
  );
}

export default CardFilters;
