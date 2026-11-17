import { useState } from 'react';
import { GAMES } from '../data/mockEvents.js';

const EMPTY_EVENT = {
  title: '', game: GAMES[0], format: '', date: '', startTime: '',
  entryFee: '', capacity: '', prizeInfo: '', description: '',
};

// Staff form to create a new event.
function EventForm({ onSubmit }) {
  const [form, setForm] = useState(EMPTY_EVENT);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSuccess('');
  }

  function validate() {
    const err = {};
    const today = new Date().toISOString().slice(0, 10);
    if (form.title.trim().length < 5) err.title = 'Title must be at least 5 characters.';
    if (!form.format.trim()) err.format = 'Format is required.';
    if (!form.date) err.date = 'Pick a date.';
    else if (form.date < today) err.date = 'Date cannot be in the past.';
    if (!form.startTime) err.startTime = 'Pick a start time.';
    if (form.entryFee === '' || Number(form.entryFee) < 0) err.entryFee = 'Enter 0 or more.';
    if (!Number.isInteger(Number(form.capacity)) || Number(form.capacity) < 2) err.capacity = 'At least 2 players.';
    return err;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length > 0) return;

    onSubmit({ ...form, entryFee: Number(form.entryFee), capacity: Number(form.capacity) });
    setSuccess(`"${form.title}" has been published.`);
    setForm(EMPTY_EVENT);
  }

  // Small helper so each field doesn't repeat the same label/error markup
  function field(name, label, props = {}) {
    return (
      <label>
        {label}
        <input name={name} value={form[name]} onChange={handleChange} {...props} />
        {errors[name] && <span className="error">{errors[name]}</span>}
      </label>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      {success && <div className="alert alert-success">{success}</div>}
      {field('title', 'Event title')}
      <div className="form-row">
        <label>
          Game
          <select name="game" value={form.game} onChange={handleChange}>
            {GAMES.map((g) => <option key={g}>{g}</option>)}
          </select>
        </label>
        {field('format', 'Format', { placeholder: 'e.g. Standard' })}
      </div>
      <div className="form-row">
        {field('date', 'Date', { type: 'date' })}
        {field('startTime', 'Start time', { type: 'time' })}
      </div>
      <div className="form-row">
        {field('entryFee', 'Entry fee (S$)', { type: 'number', min: 0 })}
        {field('capacity', 'Capacity', { type: 'number', min: 2 })}
      </div>
      {field('prizeInfo', 'Prizes')}
      <label>
        Description
        <textarea name="description" rows="3" value={form.description} onChange={handleChange} />
      </label>
      <button type="submit" className="btn btn-primary">Publish event</button>
    </form>
  );
}

export default EventForm;
