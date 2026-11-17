import { useState } from 'react';

// Form for a player to sign up for one event.
// Validates input, then calls onSubmit(formData) from the parent.
function RegistrationForm({ isFull, defaultName, onSubmit }) {
  const [formData, setFormData] = useState({ playerName: defaultName, gameId: '', agree: false });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  }

  function validate() {
    const newErrors = {};
    if (formData.playerName.trim().length < 2) newErrors.playerName = 'Please enter your name.';
    if (!/^[A-Za-z0-9-]{5,20}$/.test(formData.gameId.trim()))
      newErrors.gameId = 'Player ID should be 5–20 letters, numbers or dashes.';
    if (!formData.agree) newErrors.agree = 'You must agree to the event rules.';
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onSubmit({ playerName: formData.playerName.trim(), gameId: formData.gameId.trim() });
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      {isFull && <div className="alert alert-warning">This event is full. Submitting will add you to the waitlist.</div>}

      <label>
        Player name
        <input name="playerName" value={formData.playerName} onChange={handleChange} />
        {errors.playerName && <span className="error">{errors.playerName}</span>}
      </label>

      <label>
        Official player ID
        <input name="gameId" placeholder="e.g. POK-1234-5678" value={formData.gameId} onChange={handleChange} />
        {errors.gameId && <span className="error">{errors.gameId}</span>}
      </label>

      <label className="checkbox">
        <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} />
        I agree to the store's tournament rules and code of conduct
      </label>
      {errors.agree && <span className="error">{errors.agree}</span>}

      <button type="submit" className="btn btn-primary">
        {isFull ? 'Join waitlist' : 'Register'}
      </button>
    </form>
  );
}

export default RegistrationForm;
