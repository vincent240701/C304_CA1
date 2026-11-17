// Shown when a list has nothing to display (no results, no registrations, etc.)
function EmptyState({ title, message, actionLabel, onAction }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">🃏</div>
      <h3>{title}</h3>
      <p className="muted">{message}</p>
      {actionLabel && (
        <button className="btn btn-primary" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyState;
