# Waypoint — Hotel Search Explorer

A responsive hotel discovery app built with React + Vite, consuming the
[Hotel Search API](https://demohotelsapi.pythonanywhere.com/) (`GET /hotels/`).

Design concept: hotel results are presented as **ticket stubs** (perforated
edge, mono-spaced "STAY-####" id, stamped rating) on a cool paper canvas —
a nod to the boarding-pass feel of planning a trip.

## Features

- **Search** by hotel name or city
- **Filter** by city, price range, and minimum rating
- **Sort** by rating, price, or name (ascending/descending)
- **Pagination** (12 results per page)
- **Detail view** with a photo carousel, description, price and rating
- Loading, empty, and error states
- Fully responsive, keyboard-accessible (focus states, Escape/Arrow keys in
  the photo modal)

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

To build a production bundle:

```bash
npm run build
npm run preview
```

## Project structure

```
hotel-search-app/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx              # React entry point
│   ├── App.jsx                # top-level layout & state wiring
│   ├── api/
│   │   └── hotelApi.js        # fetch wrapper for the Hotels API
│   ├── hooks/
│   │   └── useHotels.js       # data loading + filter/sort/pagination logic
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── SearchPanel.jsx
│   │   ├── HotelGrid.jsx
│   │   ├── HotelCard.jsx
│   │   ├── HotelModal.jsx
│   │   ├── Pagination.jsx
│   │   └── LoadingState.jsx
│   └── styles/
│       └── index.css          # design tokens + all component styles
└── README.md
```

## API integration notes

The API documents server-side query params for filtering, sorting and
pagination: `location`, `min_price`, `max_price`, `min_rating`, `search`,
`order_by`, `limit`, `skip`. This app sends all of these on every request,
exactly as documented.

In testing, this particular hosted demo instance returned the same full
500-hotel dataset regardless of which params were sent (i.e. `limit`,
`skip`, and the filters didn't visibly change the response). To make sure
search/filter/sort/pagination work correctly for users regardless of that
backend behavior, the app also re-applies the same logic client-side
(`src/hooks/useHotels.js`) on top of whatever the server returns. If the
backend's param handling is fixed or differs in another environment, the
client-side logic still produces the correct result — it's a safety net,
not a replacement for real API integration.

## Tech

- React 18 + Vite
- Plain CSS (custom properties, no framework) for full control over the
  ticket-stub visual system
- No external UI libraries — keeps the bundle small and the code easy to
  read for review

## Pushing to GitHub

```bash
git init
git add .
git commit -m "Initial commit: hotel search explorer"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```
