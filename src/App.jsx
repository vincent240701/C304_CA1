import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import EventsPage from './pages/EventsPage.jsx';
import EventDetailPage from './pages/EventDetailPage.jsx';
import MyRegistrationsPage from './pages/MyRegistrationsPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import ShopPage from './pages/ShopPage.jsx';
import { mockEvents } from './data/mockEvents.js';
import { mockCards } from './data/mockCards.js';
import { mockRegistrations } from './data/mockRegistrations.js';
import { mockUsers, CURRENT_USER_ID } from './data/mockUsers.js';
import { getDisplayStatus } from './components/EventCard.jsx';

// App is the top-level component. It:
//  1. keeps the "database" (events + registrations) in state, so every page sees the same data
//  2. decides which page to show (state-based navigation; can be swapped for React Router later)
//  3. passes data and handler functions down to pages as props
function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [events, setEvents] = useState(mockEvents);
  const [registrations, setRegistrations] = useState(mockRegistrations);

  const currentUser = mockUsers.find((u) => u.id === CURRENT_USER_ID);
  const selectedEvent = events.find((e) => e.id === selectedEventId);

  function navigate(page) {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }

  function openEvent(eventId) {
    setSelectedEventId(eventId);
    navigate('detail');
  }

  // --- Handlers (in CA2 each of these becomes an API call) ---

  // POST /api/events/:id/registrations
  function registerForEvent(eventId, formData) {
    const event = events.find((e) => e.id === eventId);
    const isFull = getDisplayStatus(event, registrations) === 'full';

    const newRegistration = {
      id: `reg-${Date.now()}`,
      eventId,
      userId: currentUser.id,
      playerName: formData.playerName,
      gameId: formData.gameId,
      status: isFull ? 'waitlisted' : 'registered',
      registeredAt: new Date().toISOString(),
    };
    setRegistrations([...registrations, newRegistration]);
    return newRegistration.status;
  }

  // PATCH /api/registrations/:id
  function updateRegistrationStatus(registrationId, newStatus) {
    setRegistrations(
      registrations.map((r) => (r.id === registrationId ? { ...r, status: newStatus } : r))
    );
  }

  // POST /api/events
  function addEvent(eventData) {
    const newEvent = { ...eventData, id: `evt-${Date.now()}`, status: 'open' };
    setEvents([...events, newEvent]);
  }

  // --- Decide which page to render ---
  function renderPage() {
    switch (currentPage) {
      case 'events':
        return <EventsPage events={events} registrations={registrations} onSelectEvent={openEvent} />;
      case 'shop':
        // GET /api/cards (read-only for now, so no state needed yet)
        return <ShopPage cards={mockCards} />;
      case 'detail':
        return (
          <EventDetailPage
            event={selectedEvent}
            registrations={registrations}
            currentUser={currentUser}
            onRegister={registerForEvent}
            onBack={() => navigate('events')}
            onNavigate={navigate}
          />
        );
      case 'my-registrations':
        return (
          <MyRegistrationsPage
            events={events}
            registrations={registrations.filter((r) => r.userId === currentUser.id)}
            onCancel={(id) => updateRegistrationStatus(id, 'cancelled')}
            onSelectEvent={openEvent}
            onNavigate={navigate}
          />
        );
      case 'admin':
        return (
          <AdminPage
            events={events}
            registrations={registrations}
            onAddEvent={addEvent}
            onUpdateRegistration={updateRegistrationStatus}
          />
        );
      default:
        return (
          <HomePage
            events={events}
            registrations={registrations}
            cards={mockCards}
            onSelectEvent={openEvent}
            onNavigate={navigate}
          />
        );
    }
  }

  return (
    <div className="app">
      <Navbar currentPage={currentPage} onNavigate={navigate} currentUser={currentUser} />
      <main className="container">{renderPage()}</main>
      <Footer />
    </div>
  );
}

export default App;
