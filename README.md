# Personal website

## Run the website with its database

The projects section is backed by a local SQLite database. Use Node.js 22.13 or newer (the built-in `node:sqlite` module is used).

Open two terminals in the project folder:

1. Run `npm run dev:api` to start the API. On first launch it creates `data/website.db` and seeds it with the featured projects.
2. Run `npm run dev` and open the Vite URL shown in the terminal.

Vite forwards `/api` requests to the API at `http://localhost:3001`. The project list is available at `GET /api/projects`. The SQLite file is ignored by Git so local content stays on your machine.

To use a different database file, set `DATABASE_PATH` before starting the API. To change the API port, set `API_PORT`; if the website runs on a different origin, set `WEB_ORIGIN` to that origin.
