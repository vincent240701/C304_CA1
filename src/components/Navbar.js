// Top navigation bar. Receives the current page and a navigate function from App.
const NAV_LINKS = [
  { page: 'home', label: 'Home' },
  { page: 'events', label: 'Events' },
  { page: 'shop', label: 'Shop' },
  { page: 'my-registrations', label: 'My Registrations' },
  { page: 'admin', label: 'Staff' },
];

function Navbar({ currentPage, onNavigate, currentUser }) {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <button className="brand" onClick={() => onNavigate('home')}>
          <span className="brand-mark">◆</span> Deckhouse <span className="brand-sub">TCG</span>
        </button>
        <nav className="nav-links">
          {NAV_LINKS.map((link) => (
            <button
              key={link.page}
              className={`nav-link ${currentPage === link.page ? 'active' : ''}`}
              onClick={() => onNavigate(link.page)}
            >
              {link.label}
            </button>
          ))}
        </nav>
        <span className="nav-user">Hi, {currentUser.name.split(' ')[0]}</span>
      </div>
    </header>
  );
}

export default Navbar;
