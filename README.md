# Reading List

A small full-stack service for managing a personal reading list. Supports creating, viewing, updating, and deleting items — each with a title, author, optional notes, and a read/unread status.

---

## Tech Stack

| Technology | Purpose | Why |
|---|---|---|
| **Next.js** | Full-stack framework | Handles both the frontend UI and backend API routes in a single project |
| **Supabase** | Database & backend | Managed Postgres with a clean REST API — no infrastructure to maintain |
| **DaisyUI + Tailwind CSS** | UI styling | Tailwind for utility-first styling, DaisyUI for pre-built accessible components |
| **Lucide React** | Icons | Lightweight, consistent, and professionally designed icon set |
| **Vercel** | Deployment | Zero-config deployment with native Next.js support |
| **Github** | Version Control | Allowed me to control and manage my code base, used a dev and main branch for testing and production. |

---

## Data Persistence

Data is persisted in a **Supabase (PostgreSQL) database**. Postgres was chosen because the data is structured and relational by nature — each reading list item has a fixed schema (title, author, notes, status, timestamps). Supabase provides a hosted Postgres instance with a REST API out of the box, which removed the need to manage a database server while keeping all the benefits of a production-grade relational database.

---

## Getting Started

### Prerequisites
- Node.js 18+
- A [Supabase](https://supabase.com) project with the `reading_list` table (see `supabase/migrations/001_create_reading_list.sql`)

### 1. Clone and install

```bash
git clone https://github.com/TemiKayas/reading-list.git
cd reading-list
npm install
```

### 2. Configure environment variables

Create a `.env.local` file in the root with the following:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

These can be found in your Supabase project under **Settings → API**.

### 3. Run the database migration

In the Supabase dashboard, open the **SQL Editor** and run the contents of:

```
supabase/migrations/001_create_reading_list.sql
```

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Using the Service

- **Add an item** — click "Add New Item" at the top to expand the form. Title and author are required; notes are optional. All new items default to unread.
- **Mark read/unread** — click the book icon on any row to toggle its status.
- **Edit an item** — click the pencil icon to open an edit modal with pre-filled fields.
- **Delete an item** — click the trash icon to remove it.
- **Sort** — use the `A–Z` button to sort alphabetically or `Recent` to sort by date added. Click either button again to reverse the order.
- **Filter** — use the Show dropdown to filter by All, Unread, or Read. A Clear button appears whenever filters are active.

### API Routes

The service exposes a REST API if you prefer to interact with it directly:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/reading-list` | List all items |
| `POST` | `/api/reading-list` | Create a new item |
| `PATCH` | `/api/reading-list/:id` | Update an item |
| `DELETE` | `/api/reading-list/:id` | Delete an item |

---

## Deployment

The app is deployed on Vercel. To deploy your own instance:

1. Push the repo to GitHub and import it in [Vercel](https://vercel.com)
2. Add the environment variables from your `.env.local` under **Settings → Environment Variables**
3. Vercel will build and deploy automatically on every push to `main`

---

## AI Assistance

This project was built with the help of **Claude** via the **Claude Code CLI** — an agentic coding tool with access to the full codebase and a large context window, which made it well-suited for end-to-end feature work.

**How AI was used:**

- **Documentation lookup** — asked questions like *"How do I write an update method using the Supabase JS API?"* and *"How should I structure a SQL table given these requirements?"* to get accurate, context-aware answers without leaving the terminal.
- **Test script** — AI wrote and executed a script to test all CRUD operations directly against the database before any frontend was built, verifying inserts, reads, updates, deletes, and validation rules.
- **Seed script** — AI wrote and ran a seed script to populate the database with 10 books.
- **Frontend development** — AI built the full UI given instructions to use DaisyUI and Tailwind CSS, including the inline add form, edit modal, per-row actions, sort controls, and read/unread filter.
- **Writing the README** — I started the README writing everything by hand then had Claude flesh it out so that everything was clear and detailed.

All feature decisions, UI layout choices, library selections, and architecture were directed explicitly (e.g. styling choices like inline form vs modal, which sort controls to include, icon style, color theme). The AI handled implementation based on those instructions.

---

## What I Would Change / Do Differently

- If this was going to be a production and widely used web app, I would not expose any public unprotected API endpoints. To do this I would verify the session token in every API route before allowing any read or write operations.
- I would add authentication (Supabase Auth) so the reading list is tied to a user account rather than being a shared global list.
- If I was working with a larger team I would also be sure to leave more detailed commit messages, and utilize more feature branches for isolation and testing. In addition to this, I would also create more deployments on Vercel for testing different branches in a live deployed environment.

For the scope of this project I kept development simple and fast. I hope you enjoy it.

---
