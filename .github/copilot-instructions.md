# Adventskalender 2025 - AI Coding Instructions

You are working on a **SvelteKit** application serving as an interactive digital advent calendar. The project uses **Prisma** with **SQLite** for data persistence and **TypeScript** for type safety.

## 🏗 Architecture & Core Concepts

### 1. Content Architecture (Tile System)
The core philosophy is **"Tiles first, Days second"**.
- **Tiles (`Tile` model):** Reusable content blocks with metadata (category, tags, content type). Created in the "Tile Library".
- **Days (`Day` model):** The actual calendar slots (1-24). Tiles are *assigned* to Days.
- **Workflow:** Create a Tile -> Assign to a Day via Calendar Manager.
- **Dual Content:** Content is often split into `contentA` (Creator/Locdoc) and `contentB` (Recipient/Miss Chaos).

### 2. Story Chains
Multi-day narratives or interactions are managed via **Story Chains**.
- **Linkage:** Days/Tiles have `linkedToPrevious`, `linkedToNext`, and `storyChainId`.
- **State:** User choices and inputs across days are stored in the `ChainState` model (keyed by `storyChainId` and `dayNumber`).

### 3. Tech Stack
- **Framework:** SvelteKit (Node.js adapter).
- **Database:** SQLite via Prisma ORM.
- **Styling:** Tailwind CSS (inferred from class names in file lists, verify if unsure).
- **Language:** TypeScript (strict mode).

## 🛠 Developer Workflows

### Database Management
- **Schema Changes:** Modify `prisma/schema.prisma`.
- **Migration:** Run `npx prisma migrate dev --name <descriptive_name>`.
- **Seeding:** Run `npx prisma db seed` (populates all 24 days with default/placeholder content).
- **Studio:** Run `npx prisma studio` to view/edit data visually.

### Content Management (Admin)
- **Access:** `/admin` routes.
- **Tile Library:** `/admin/tiles` (CRUD for Tiles).
- **Calendar Manager:** `/admin/calendar-manager` (Drag & drop Tiles to Days).
- **Chain Builder:** `/admin/story-chain-builder`.

## 🧩 Project Conventions

### Data Models
- **Content Types:** Use the extensive `contentType` enum string (e.g., `'TEXT'`, `'QUIZ_JSON'`, `'SPOTIFY_SONG'`) defined in the `Day` model comments.
- **Response Modes:** `'DISABLED'`, `'OPEN'`, `'AFTER_A'`, `'AFTER_B'`, `'COLLABORATIVE'`.

### Code Patterns
- **Database Access:** Import `prisma` from `$lib/server/database`.
  ```typescript
  import { prisma } from '$lib/server/database';
  ```
- **Server-Side Logic:** Use `+page.server.ts` for data fetching and form actions.
- **Type Safety:** Always define interfaces for JSON content structures (e.g., Quiz data, Poll options).

### Critical Files
- `prisma/schema.prisma`: The source of truth for data models.
- `src/lib/server/database.ts`: Singleton Prisma client instance.
- `TILE_SYSTEM.md`: Detailed documentation on the Tile system logic.
- `STORY-CHAINS-GUIDE.md`: Logic for multi-day interactions.

## 🚀 Common Tasks
- **Adding a new Content Type:**
  1. Update comments in `prisma/schema.prisma` (for documentation).
  2. Update frontend components to render the new type.
  3. Update Admin forms to support inputting the new type.
- **Debugging:** Check `dev.db-journal` implies SQLite WAL mode; ensure no file locks if DB operations fail.
