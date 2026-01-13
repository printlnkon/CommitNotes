# CommitNotes

A modern note-taking application built with React and Vite, featuring user authentication and note management.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- A [Supabase](https://supabase.com/) project configured with:
  - User authentication enabled
  - A `notes` table containing the following columns:
    - `id` (Primary Key)
    - `title` (text)
    - `note` (text)
    - `archived` (boolean)
    - `user_id` (UUID, foreign key referencing `auth.users.id`)
    - `created_at` (timestamp with timezone)
  - A `login_attempts` table to handle login rate limiting
  - A `signup_attempts` table to handle signup rate limiting

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/printlnkon/CommitNotes.git
cd CommitNotes
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_PROJECT_URL=your_api_base_url
VITE_SUPABASE_ANON_KEY=your_api_base_url
```

### 4. Start the development server

```bash
npm run dev
```

Access the localhost at `http://localhost:5173`