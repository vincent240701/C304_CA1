import { gameClass } from '../utils.js';

// Draws one face (front or back) of a trading card at the standard 63:88 ratio.
// If the listing has a real photo (imageFront / imageBack) it shows that;
// otherwise it draws a simple placeholder so the layout still works.
function CardArt({ card, side = 'front', className = '' }) {
  const photo = side === 'front' ? card.imageFront : card.imageBack;

  if (photo) {
    return (
      <div className={`card-art ${className}`}>
        <img src={photo} alt={`${card.name} (${side})`} draggable="false" />
      </div>
    );
  }

  if (side === 'back') {
    return (
      <div className={`card-art card-art-back ${gameClass(card.game)} ${className}`} aria-label={`${card.name} (back)`}>
        <div className="card-back-inner">
          <span className="card-back-mark">◆</span>
          <span className="card-back-game">{card.game}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`card-art card-art-front ${gameClass(card.game)} ${className}`} aria-label={`${card.name} (front)`}>
      <div className="card-front-name">{card.name}</div>
      <div className="card-front-window">
        <span>◆</span>
      </div>
      <div className="card-front-footer">
        <span>{card.set}</span>
        <span>{card.cardNumber}</span>
      </div>
    </div>
  );
}

export default CardArt;
