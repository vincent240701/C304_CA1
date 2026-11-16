import { CONDITION_SHORT } from '../data/mockCards.js';

// Shows the grade for slabbed cards (e.g. "PSA 10"), otherwise the raw condition (e.g. "NM").
function ConditionBadge({ card, long = false }) {
  if (card.grade) {
    return (
      <span className="badge badge-graded">
        {card.grade.company} {card.grade.score}
      </span>
    );
  }
  const short = CONDITION_SHORT[card.condition];
  return (
    <span className={`badge badge-cond-${short.toLowerCase()}`} title={card.condition}>
      {long ? card.condition : short}
    </span>
  );
}

export default ConditionBadge;
