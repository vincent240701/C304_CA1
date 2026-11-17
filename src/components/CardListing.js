import { useState } from 'react';
import CardArt from './CardArt.js';
import ConditionBadge from './ConditionBadge.js';
import { formatPrice } from '../utils.js';

// One card in the shop grid. Kept deliberately light: image, name, set/number,
// condition and price. Everything else lives in the CardViewer.
function CardListing({ card, onSelect }) {
  const [side, setSide] = useState('front');

  function handleOpen() {
    onSelect(card.id);
  }

  return (
    <article className="card-tile">
      <div className="card-tile-media">
        {/* Clicking the picture opens the viewer */}
        <div className="card-tile-image" onClick={handleOpen}>
          <CardArt card={card} side={side} />
        </div>
        {/* The Front/Back switch is outside the clickable picture, so it only flips the card */}
        <div className="side-toggle" role="group" aria-label="Show card side">
          <button className={side === 'front' ? 'active' : ''} onClick={() => setSide('front')}>
            Front
          </button>
          <button className={side === 'back' ? 'active' : ''} onClick={() => setSide('back')}>
            Back
          </button>
        </div>
      </div>
      <div className="card-tile-body" onClick={handleOpen}>
        <h3 title={card.name}>{card.name}</h3>
        <p className="muted card-tile-set">
          {card.set} · {card.cardNumber}
        </p>
        <div className="card-tile-foot">
          <ConditionBadge card={card} />
          <strong className="price">{formatPrice(card.price)}</strong>
        </div>
      </div>
    </article>
  );
}

export default CardListing;
