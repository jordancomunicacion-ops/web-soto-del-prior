# Documentation: Custom Tracking Logic for CRM

This document explains the logic implemented in `AnalyticsTracker.tsx` to replicate user behavior tracking for the CRM. This logic is designed to solve two main problems:
1.  **SPA Tracking**: Tracking navigation in a Single Page Application without reloading.
2.  **Section Tracking**: Treating scrollable sections on the home page as distinct "virtual pages" (e.g., `/inicio/restaurante`).

## Core Logic

### 1. URL Renaming
- **Goal**: Rename the root path `/` to `/inicio` for better readability and alignment with user preference.
- **Implementation**:
  - On component mount, if `window.location.pathname` is `/`, we use `window.history.replaceState` to silently update the browser URL to `/inicio`.
  - A server-side rewrite in `next.config.ts` ensures that if a user reloads on `/inicio`, they are still served the home page content instead of a 404.

### 2. Section Tracking (Virtual Page Views)
- **Goal**: Trigger a tracking event when a user scrolls to a specific section (Restaurant, Events, etc.).
- **Implementation**:
  - We use the **Intersection Observer API** to monitor specific `<section>` elements on the page.
  - The `rootMargin` is set to `-50% 0px -50% 0px`. This triggers the event when the *center* of the section passes the *center* of the viewport (i.e., when the section is the dominant focused element).
  - When a section becomes active, we calculate a **Virtual URL**:
    - Hero Section -> `/inicio`
    - Restaurant -> `/inicio/restaurante`
    - Events -> `/inicio/eventos`
    - ...etc.
  - We update the browser URL bar using `replaceState` to reflect this virtual location.

### 3. Data Transmission (The "Clone")

The `sendTracking(virtualUrl)` function is responsible for dispatching the data. It sends data to **two destinations** simultaneously:

#### A. Metricool (External)
- **Method**: Image Pixel Hack.
- **Code**:
  ```javascript
  const img = new Image();
  img.src = `https://tracker.metricool.com/c3po.jpg?hash=...&r=${Math.random()}`;
  ```
- **Context**: Since Metricool's simple pixel relies on the HTTP `Referer` header, updating the browser URL via `history.replaceState` *before* firing this pixel helps Metricool "see" the new virtual URL.

#### B. Internal CRM (Your System)
- **Method**: `POST` request to your API.
- **Endpoint**: `http://localhost:3004/api/analytics/track` (Configurable).
- **Payload**:
  ```json
  {
      "websiteId": "a4490d26-e7f1-4ea9-bf86-9327eb39ec60",
      "url": "/inicio/restaurante",  // <--- The Virtual URL
      "referrer": "http://previous-page...",
      "userAgent": "Mozilla/5.0...",
      "timestamp": "2024-02-04T12:00:00Z"
  }
  ```
- **Status**: This JSON payload contains everything the backend needs to reconstruct the user's journey.

## How to Implement in CRM Backend
To "clone" Metricool's reporting:
1.  **Endpoint**: Create an API route (like `/api/analytics/track`) that accepts the JSON above.
2.  **Storage**: Store each event as a "Visit" or "PageView" record.
3.  **Aggregation**: Group these records by `url` to see stats (e.g., "How many people saw `/inicio/restaurante`?").
4.  **Sessionization**: Use `referrer` and IP/UserAgent (or a generated `sessionId` cookie) to group events into a single "Session".

## Files Modified
- `src/components/AnalyticsTracker.tsx`: Main logic.
- `next.config.ts`: Rewrites to support `/inicio`.
