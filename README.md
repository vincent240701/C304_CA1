# Deckhouse TCG – Event Registration (C304 CA1)

A React frontend prototype for a trading card game (TCG) shop's **events side**. Players can browse tournaments, register or join a waitlist, and manage their registrations. Shop staff can create events and check players in.

> Deckhouse TCG is a fictional shop. The concept is inspired by real Singapore card shops that run weekly tournaments.

---

## 1. Setup / Run Instructions

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (usually http://localhost:5173).

Production build: `npm run build`, then `npm run preview`.

---

## 2. Problem Statement

Local card shops run many weekly events (league nights, pre-releases, store championships). Today sign-ups are usually handled through Instagram/Discord posts, DMs, Google Forms and spreadsheets. This causes:

- **Overbooking or empty seats**: staff can't see live capacity, and players don't know whether an event is full.
- **Missed updates**: cancellations or changes get buried in chat channels.
- **Manual check-in**: staff tick names off on paper on the day, which is slow and error-prone.
- **No personal record**: players can't easily see which events they've signed up for.

### Target users
| User | Description |
|---|---|
| **Player** | Casual and competitive TCG players (teens to adults) who attend in-store events. |
| **Shop staff / admin** | Staff who schedule events, manage capacity and run check-in on event day. |

### User needs
- Players need to quickly find events for *their* game and see date, fee, format and remaining seats.
- Players need to register in under a minute and get clear confirmation (registered vs waitlisted).
- Players need to view and cancel their registrations.
- Staff need to publish new events with correct details.
- Staff need to see who is coming and check players in at the door.

### Why a web app?
Players already discover events online on their phones. A web app works on any device without installing anything, shows the same live data to players and staff, and (in CA2) can be backed by one central database instead of scattered chats and spreadsheets.

---

## 3. Features & Page / Navigation Description

| Page | Who | Key features |
|---|---|---|
| **Home** | Player | Two slowly scrolling looping "conveyor belts" (pause on hover): all upcoming events, and shop cards (click one to open the card viewer). Each has a "See all" link to Events / Shop |
| **Events** | Player | All events as cards; search by title; filter by game and status; result count; "no results" empty state |
| **Shop** | Player | Grid of single cards (image, name, set · number, condition/grade, price) with Front/Back switch on each tile; filters by game, set, rarity, condition (raw grades or graded only), year, plus name/card-number search and 7 sort options; click a card for a viewer with click-to-zoom (2.5×, scroll to inspect), Front / Back / side-by-side thumbnails, and full details (centering, grade, notes, stock). Grid is 2 square-ish tiles per row on mobile |
| **Event Detail** | Player | Full event info, seat count, status badge; registration form with validation; waitlist when full; message if already registered or registration closed |
| **My Registrations** | Player | List of own registrations with status; cancel with confirmation; toggle to show cancelled; empty state |
| **Staff Dashboard** | Staff | Tab 1: pick an event, see attendees, check in / undo / promote from waitlist. Tab 2: create event form with validation and success message |

### Navigation flow

```
                ┌──────────── Navbar (always visible) ────────────┐
                │  Home   Events   My Registrations   Staff       │
                └─────────────────────────────────────────────────┘
Home ──"See all"──────► Events ──click card──► Event Detail ──register──► success ──► My Registrations
  │                                                  ▲                                     │
  └──click upcoming card─────────────────────────────┘◄──────── click event title ─────────┘

Staff ──► [Attendees & check-in]  ⇄  [Create event]
```

Navigation is handled with React state (`currentPage` in `App.js`) for CA1. It is designed so that each `case` in `renderPage()` maps directly to a React Router route later:

| Page | Planned route |
|---|---|
| Home | `/` |
| Events | `/events` |
| Event Detail | `/events/:id` |
| Shop | `/shop` (viewer: `/shop/:cardId`) |
| My Registrations | `/me/registrations` |
| Staff Dashboard | `/admin` |

---

## 4. Component Tree

```
App  (state: currentPage, selectedEventId, events, registrations)
├── Navbar                 (props: currentPage, onNavigate, currentUser)
├── <current page>
│   ├── HomePage           (state: selectedCardId; props: events, registrations, cards, …)
│   │   ├── Conveyor       (props: items, renderItem, itemWidth, secondsPerItem)
│   │   │   └── EventCard ×n   (props: event, registrations, onSelect)
│   │   │       └── StatusBadge
│   │   ├── Conveyor
│   │   │   └── CardListing ×n
│   │   └── CardViewer     (when a card is clicked)
│   ├── EventsPage         (state: filters)
│   │   ├── EventFilters   (props: filters, onChange, onReset)
│   │   ├── EventCard ×n
│   │   └── EmptyState     (when no results)
│   ├── ShopPage           (state: filters, selectedCardId; props: cards)
│   │   ├── CardFilters    (props: filters, sets, years, onChange, onReset)
│   │   ├── CardListing ×n (state: side; props: card, onSelect)
│   │   │   ├── CardArt    (props: card, side)
│   │   │   └── ConditionBadge
│   │   ├── CardViewer     (state: view, zoomed; props: card, onClose)
│   │   └── EmptyState
│   ├── EventDetailPage    (state: resultStatus)
│   │   ├── StatusBadge
│   │   └── RegistrationForm  (state: formData, errors; props: isFull, defaultName, onSubmit)
│   ├── MyRegistrationsPage (state: showCancelled, message)
│   │   ├── StatusBadge ×n
│   │   └── EmptyState
│   └── AdminPage          (state: tab, selectedId)
│       ├── AttendeeList   (props: attendees, onUpdate)
│       │   ├── StatusBadge ×n
│       │   └── EmptyState
│       └── EventForm      (state: form, errors, success; props: onSubmit)
└── Footer
```

### Folder structure
```
src/
├── App.js              # top-level state + page switching
├── main.js             # React entry point
├── index.css            # global styles
├── utils.js             # formatDate, formatFee, countFilledSeats
├── data/                # mock data (one file per future DB table)
│   ├── mockEvents.js
│   ├── mockRegistrations.js
│   └── mockUsers.js
├── components/          # reusable UI pieces
│   ├── Navbar.js, Footer.js
│   ├── EventCard.js, StatusBadge.js, EmptyState.js
│   ├── EventFilters.js, RegistrationForm.js
│   └── EventForm.js, AttendeeList.js
└── pages/               # one file per page/view
    ├── HomePage.js, EventsPage.js, EventDetailPage.js
    ├── MyRegistrationsPage.js
    └── AdminPage.js
```

### How the CA1 requirements are covered
| Requirement | Where |
|---|---|
| Components with clear responsibilities | `components/` and `pages/` folders |
| Props (data + functions) | e.g. `App → EventDetailPage (onRegister) → RegistrationForm (onSubmit)` |
| State | filters, form input, selected event, registrations list, tabs |
| Form with validation / feedback | `RegistrationForm`, `EventForm` |
| List from array of objects | `EventsPage`, `MyRegistrationsPage`, `AttendeeList` (`.map()`) |
| Conditional rendering | status badges, full/waitlist warning, empty states, success alerts, check-in buttons |

---

## 5. Mock Data & Planned Backend Entities

Mock data lives in `src/data/`. Each file maps to one future database table/collection.

### Event
| Field | Type | Example |
|---|---|---|
| id | string (PK) | `evt-001` |
| title | string | `Weekly Pokémon League Challenge` |
| game | string (enum) | `Pokémon` |
| format | string | `Standard` |
| date | date (YYYY-MM-DD) | `2026-11-21` |
| startTime | string (HH:mm) | `14:00` |
| entryFee | number (SGD) | `10` |
| capacity | integer | `32` |
| prizeInfo | string | `Top 4 receive booster packs` |
| description | string | … |
| status | enum: `open` · `cancelled` · `completed` (`full` is calculated from seats) | `open` |

### Registration
| Field | Type | Example |
|---|---|---|
| id | string (PK) | `reg-001` |
| eventId | string (FK → Event) | `evt-001` |
| userId | string (FK → User) | `usr-001` |
| playerName | string | `Aiden Tan` |
| gameId | string (official player ID) | `POK-2231-8812` |
| status | enum: `registered` · `waitlisted` · `checked-in` · `cancelled` | `registered` |
| registeredAt | datetime | `2026-11-10T09:15:00` |

### User
| Field | Type | Example |
|---|---|---|
| id | string (PK) | `usr-001` |
| name | string | `Aiden Tan` |
| email | string (unique) | `aiden.tan@example.com` |
| role | enum: `player` · `admin` | `player` |
| passwordHash | string (*CA2 only*) | – |

### Card (shop listing)
| Field | Type | Example |
|---|---|---|
| id | string (PK) | `card-001` |
| name | string | `Emberwing Drake` |
| game | string (enum) | `Pokémon` |
| set | string | `Ashen Skies` |
| cardNumber | string | `006/165` |
| rarity | enum: `Common` · `Uncommon` · `Rare` · `Holo Rare` · `Ultra Rare` · `Secret Rare` | `Ultra Rare` |
| year | integer | `2025` |
| condition | enum: `Near Mint` · `Lightly Played` · `Moderately Played` · `Heavily Played` | `Near Mint` |
| grade | object or null `{ company, score }` | `{ "company": "PSA", "score": 10 }` |
| price | number (SGD) | `420` |
| stock | integer | `1` |
| centering | string | `55/45` |
| notes | string | `Freshly graded slab` |
| imageFront / imageBack | string (URL, optional) | – (placeholder art is drawn when missing) |

Relationships: one **User** has many **Registrations**; one **Event** has many **Registrations**.

---

## 6. Planned API Endpoints (CA2)

| Method | Path | Purpose | Request body / query | Response |
|---|---|---|---|---|
| GET | `/api/events` | List events | query: `game`, `status`, `search` | `Event[]` with `filledSeats` |
| GET | `/api/events/:id` | Get one event | – | `Event` |
| POST | `/api/events` | Create event (admin) | `{ title, game, format, date, startTime, entryFee, capacity, prizeInfo, description }` | `201` + created `Event` |
| PUT | `/api/events/:id` | Update event (admin) | any Event fields | updated `Event` |
| DELETE | `/api/events/:id` | Cancel/delete event (admin) | – | `204` |
| GET | `/api/events/:id/registrations` | Attendee list (admin) | – | `Registration[]` |
| POST | `/api/events/:id/registrations` | Register current user | `{ playerName, gameId }` | `201` + `Registration` (status `registered` or `waitlisted`) |
| GET | `/api/users/me/registrations` | Current user's registrations | – | `Registration[]` with event info |
| PATCH | `/api/registrations/:id` | Change status (cancel, check in, promote) | `{ status }` | updated `Registration` |
| GET | `/api/cards` | List shop cards | query: `game`, `set`, `rarity`, `condition`, `year`, `search`, `sort` | `Card[]` |
| GET | `/api/cards/:id` | Get one card | – | `Card` |
| POST | `/api/auth/register` | Sign up | `{ name, email, password }` | `201` + user |
| POST | `/api/auth/login` | Log in | `{ email, password }` | `{ token, user }` |

In `App.js`, each handler (`registerForEvent`, `updateRegistrationStatus`, `addEvent`) is commented with the endpoint it will call, so CA2 only needs to swap the state update for a `fetch()` call.

---

## 7. Teamwork Distribution & Individual Contribution

> Fill in names/IDs. Suggested split for 3 members. Each owner should make the commits for their files.

| Member | Student ID | Owns (pages / components / features) |
|---|---|---|
| Member A | | `HomePage`, `EventsPage`, `EventCard`, `EventFilters`, search & filter feature |
| Member B | | `EventDetailPage`, `RegistrationForm`, `MyRegistrationsPage`, register/waitlist/cancel flow |
| Member C | | `AdminPage`, `EventForm`, `AttendeeList`, check-in feature |
| Shared | | `App.js`, `Navbar`, `Footer`, `StatusBadge`, `EmptyState`, mock data, styles |

### Individual evidence (each member fills in)
- **Contribution summary:**
- **Code explanation video (≈3 min):** link —
- **Improvement after feedback/testing:** what changed and why —
- **Commit / file references:**

### GitHub
- Repository: `<link>` (lecturer added as collaborator)
- Commit distribution: *(screenshot of Insights → Contributors)*

---

## 8. AI Use Acknowledgement

The initial project scaffold (folder structure, base components, mock data and this README template) was generated with AI assistance (Claude) and then reviewed, modified and extended by the team. Each member is responsible for understanding and explaining their owned components.

---

## 9. Screenshots

*(add screenshots of Home, Events, Event Detail, My Registrations, Staff Dashboard)*
