import { useState } from 'react';
import CardArt from './CardArt.js';
import ConditionBadge from './ConditionBadge.js';
import { formatPrice } from '../utils.js';

// Pop-up with a large view of a card.
//  - Thumbnails switch between Front, Back, or both side by side
//  - Clicking the image zooms in 2.5x; scroll inside the box to inspect corners and edges
function CardViewer({ card, onClose }) {
  const [view, setView] = useState('front'); // 'front' | 'back' | 'both'
  const [zoomed, setZoomed] = useState(false);

  function handleChangeView(newView) {
    setView(newView);
    setZoomed(false);
  }

  function handleToggleZoom() {
    setZoomed((prevZoomed) => !prevZoomed);
  }

  // When zoomed, the card is drawn 2.5x wider inside a scrollable box.
  const zoomStyle = { width: zoomed ? '250%' : '100%' };

  return (
    <div className="modal-overlay">
      {/* Clicking the dark backdrop closes the viewer */}
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal card-viewer" role="dialog" aria-label={card.name}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="viewer-media">
          {view === 'both' ? (
            <div className="viewer-both">
              <CardArt card={card} side="front" />
              <CardArt card={card} side="back" />
            </div>
          ) : (
            <div className={`viewer-stage ${zoomed ? 'zoomed' : ''}`} onClick={handleToggleZoom}>
              <div className="viewer-zoom" style={zoomStyle}>
                <CardArt card={card} side={view} />
              </div>
            </div>
          )}
          <p className="muted viewer-hint">
            {view === 'both' ? 'Pick one side to zoom in.' : zoomed ? 'Scroll to inspect · click to zoom out' : 'Click the card to zoom in'}
          </p>

          <div className="viewer-thumbs" role="group" aria-label="Choose view">
            {['front', 'back'].map((side) => (
              <button key={side} className={`thumb ${view === side ? 'active' : ''}`} onClick={() => handleChangeView(side)}>
                <CardArt card={card} side={side} />
                <span>{side === 'front' ? 'Front' : 'Back'}</span>
              </button>
            ))}
            <button className={`thumb thumb-both ${view === 'both' ? 'active' : ''}`} onClick={() => handleChangeView('both')}>
              <div className="thumb-pair">
                <CardArt card={card} side="front" />
                <CardArt card={card} side="back" />
              </div>
              <span>Both</span>
            </button>
          </div>
        </div>

        <div className="viewer-info">
          <span className="game-tag dark">{card.game}</span>
          <h2>{card.name}</h2>
          <p className="price-large">{formatPrice(card.price)}</p>

          <dl className="detail-list">
            <div><dt>Set</dt><dd>{card.set}</dd></div>
            <div><dt>Card no.</dt><dd>{card.cardNumber}</dd></div>
            <div><dt>Rarity</dt><dd>{card.rarity}</dd></div>
            <div><dt>Year</dt><dd>{card.year}</dd></div>
            <div><dt>Condition</dt><dd><ConditionBadge card={card} long /></dd></div>
            <div><dt>Centering</dt><dd>{card.centering}</dd></div>
          </dl>

          {card.grade && (
            <p className="muted">
              Graded by {card.grade.company} ({card.grade.score}). Raw condition before grading: {card.condition}.
            </p>
          )}
          {card.notes && <div className="alert alert-info">{card.notes}</div>}
          <p className="muted">
            {card.stock === 1 ? 'Only 1 copy in store' : `${card.stock} copies in store`} · pick up at the counter
          </p>
        </div>
      </div>
    </div>
  );
}

export default CardViewer;
