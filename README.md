# Mini Instagram

A lightweight Instagram-like social media application built with Node.js, Express, and MySQL.

## Overview

This is a lightweight web application that allows users to create, read, update, and delete posts with a like feature. The application mimics basic Instagram functionality with a clean, dark-themed UI.

## Features

- **View All Posts** - Display all posts in reverse chronological order
- **Create Posts** - Add new posts with title and caption
- **Edit Posts** - Modify existing post title and caption
- **Delete Posts** - Remove posts from the database
- **Like Posts** - Increment like count on posts

## Project Structure

```
Mini Instagram/
├── app.js                 # Main Express application and route definitions
├── package.json           # Project dependencies and scripts
├── db/
│   └── connection.js      # MySQL database connection setup
├── public/
│   └── style.css          # Global styles (currently empty)
└── views/
    ├── index.ejs          # Main feed displaying all posts
    ├── new.ejs            # Form to create new posts
    └── edit.ejs           # Form to edit existing posts
```

## Tech Stack

- **Backend**: Node.js with Express.js
- **Frontend**: EJS (Embedded JavaScript templating)
- **Database**: MySQL
- **Styling**: CSS (Instagram-inspired dark theme)
- **Utilities**: method-override (for PUT/DELETE requests)

## Dependencies

```json
{
  "ejs": "^3.1.10",
  "express": "^5.1.0",
  "method-override": "^3.0.0",
  "mysql2": "^3.15.3"
}
```

## Installation

1. Clone or download the project
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up MySQL database and create the `instagram_db` database with a `posts` table:
   ```sql
   CREATE DATABASE instagram_db;
   USE instagram_db;
   
   CREATE TABLE posts (
     id INT AUTO_INCREMENT PRIMARY KEY,
     title VARCHAR(255) NOT NULL,
     caption TEXT,
     likes INT DEFAULT 0,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

4. Update database credentials in `db/connection.js` if needed (default: host=localhost, user=root, password=mother)

## Usage

Start the server:
```bash
npm start
```

The application will run on `http://localhost:3000`

### Available Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Redirect to index |
| GET | `/index` | Display all posts |
| GET | `/new` | Redirect to new post form |
| GET | `/index/new` | Show new post form |
| POST | `/index` | Create new post |
| GET | `/index/:id/edit` | Show edit form for post |
| PUT | `/index/:id` | Update post |
| DELETE | `/index/:id` | Delete post |
| POST | `/index/:id/like` | Like a post |

## Design

The application features an Instagram-inspired dark theme with:
- Black background (#000)
- Dark container backgrounds (#121212)
- Blue action buttons (#0095f6)
- Clean, responsive layout
- Instagram-style typography

## Database Connection

Connection details are stored in `db/connection.js`. The app uses MySQL2 for database operations with prepared statements to prevent SQL injection.

## Notes

- The application uses method-override to support PUT and DELETE methods in HTML forms
- All posts are displayed in descending order by ID
- The `style.css` file in the public folder is currently empty; inline styles are used in the EJS templates

