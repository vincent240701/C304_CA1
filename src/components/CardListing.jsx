import { useState } from 'react';
import CardArt from './CardArt.jsx';
import ConditionBadge from './ConditionBadge.jsx';
import { formatPrice } from '../utils.js';

// One card in the shop grid. Kept deliberately light: image, name, set/number,
// condition and price. Everything else lives in the CardViewer.
function CardListing({ card, onSelect }) {
  const [side, setSide] = useState('front');

  // The front/back buttons sit inside the clickable tile, so stop the click
  // from also opening the viewer.
  function showSide(e, newSide) {
    e.stopPropagation();
    setSide(newSide);
  }

  return (
    <article className="card-tile" onClick={() => onSelect(card.id)}>
      <div className="card-tile-media">
        <CardArt card={card} side={side} />
        <div className="side-toggle" role="group" aria-label="Show card side">
          <button className={side === 'front' ? 'active' : ''} onClick={(e) => showSide(e, 'front')}>
            Front
          </button>
          <button className={side === 'back' ? 'active' : ''} onClick={(e) => showSide(e, 'back')}>
            Back
          </button>
        </div>
      </div>
      <div className="card-tile-body">
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
