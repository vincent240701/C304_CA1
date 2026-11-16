// Reusable coloured pill for event and registration statuses.
const LABELS = {
  open: 'Open',
  full: 'Full',
  cancelled: 'Cancelled',
  completed: 'Completed',
  registered: 'Registered',
  waitlisted: 'Waitlisted',
  'checked-in': 'Checked in',
};

function StatusBadge({ status }) {
  return <span className={`badge badge-${status}`}>{LABELS[status] || status}</span>;
}

export default StatusBadge;
