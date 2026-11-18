import { createServer } from "node:http";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { DatabaseSync } from "node:sqlite";

const root = dirname(fileURLToPath(import.meta.url));
const databasePath = resolve(root, process.env.DATABASE_PATH || "data/website.db");
mkdirSync(dirname(databasePath), { recursive: true });
const database = new DatabaseSync(databasePath);
database.exec(`
  PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    tags TEXT NOT NULL DEFAULT '[]',
    position INTEGER NOT NULL DEFAULT 0
  );
`);

const count = database.prepare("SELECT COUNT(*) AS count FROM projects").get().count;
if (count === 0) {
  const insert = database.prepare(
    "INSERT INTO projects (title, summary, tags, position) VALUES (?, ?, ?, ?)",
  );
  const seed = [
    ["Property Management System", "Designed and implemented a full-stack property management platform for tenants, property owners, and administrators with role-based workflows for leases, payments, and maintenance requests.", ["Node.js", "Express", "MySQL"]],
    ["In-Network Temperature Aggregation over CTP", "Built a TinyOS application to compute average temperature in-network over CTP, reducing transmissions by up to 95% while maintaining strong packet reception in TOSSIM simulations.", ["nesC", "TinyOS", "TOSSIM"]],
    ["Insta to Mastodon Reposter", "Created a Node.js automation tool that scrapes Instagram content, filters posts from the previous day, and reposts them to Mastodon on a daily schedule through the API.", ["Node.js", "Masto.js", "cron"]],
  ];
  seed.forEach(([title, summary, tags], position) =>
    insert.run(title, summary, JSON.stringify(tags), position),
  );
}

const server = createServer((request, response) => {
  response.setHeader("Access-Control-Allow-Origin", process.env.WEB_ORIGIN || "http://localhost:5173");
  response.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (request.method === "OPTIONS") {
    response.writeHead(204).end();
    return;
  }
  if (request.method === "GET" && request.url === "/api/projects") {
    const projects = database
      .prepare("SELECT id, title, summary, tags FROM projects ORDER BY position, id")
      .all()
      .map((project) => ({ ...project, tags: JSON.parse(project.tags) }));
    response.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    response.end(JSON.stringify(projects));
    return;
  }
  response.writeHead(404, { "Content-Type": "application/json" });
  response.end(JSON.stringify({ error: "Not found" }));
});

const port = Number(process.env.API_PORT || 3001);
server.listen(port, () => console.log(`Website database API listening on http://localhost:${port}`));
