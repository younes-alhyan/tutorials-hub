# ⚡ Express.js Tutorial

[<img src="../icons/express.svg" width="250"/>](https://younes-alhyan.github.io/tutorials-hub/index.html?tutorial=express)  
**Learn Express.js essentials for building APIs and web servers quickly and effectively.** 🚀

## 📌 Table of Contents

1. [🏁 Introduction & Setup](#🏁-introduction--setup)
2. [🖥️ Creating a Server](#🖥️-creating-a-server)
3. [🛣️ Routing](#🛣️-routing)
4. [📥 Request Object (req)](#📥-request-object-req)
5. [📤 Response Object (res)](#📤-response-object-res)
6. [🧩 Middlewares](#🧩-middlewares)
7. [🗂️ Routers & Structure](#🗂️-routers--structure)
8. [📡 Status Codes](#📡-status-codes)
9. [🌍 CORS](#🌍-cors)
10. [❌ Error Handling](#❌-error-handling)
11. [✅ Best Practices](#✅-best-practices)

## 🏁 Introduction & Setup

- Express.js is a **minimal and flexible web framework** built on Node’s `http` module.
- Install Express:

```bash
npm install express
```

- Import and create an app:

```js
const express = require("express");
const app = express();
```

## 🖥️ Creating a Server

```js
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

## 🛣️ Routing

- Define endpoints with HTTP methods: `get`, `post`, `put`, `delete`.

```js
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/user", (req, res) => {
  res.json({ message: "User created" });
});

app.put("/user/:id", (req, res) => {
  res.send(`Updated user with ID ${req.params.id}`);
});

app.delete("/user/:id", (req, res) => {
  res.send(`Deleted user with ID ${req.params.id}`);
});
```

## 📥 Request Object (`req`)

- `req.params` → URL parameters (`/user/:id`)
- `req.query` → Query string (`/search?name=John`)
- `req.body` → Request body (needs `express.json()`)
- `req.headers` → Request headers

## 📤 Response Object (`res`)

- `res.send("text")` → Send text/HTML
- `res.json({ key: "value" })` → Send JSON
- `res.status(404).send("Not Found")` → Status + message
- `res.sendFile(path)` → Send a file
- `res.redirect("/new-route")` → Redirect

## 🧩 Middlewares

- Middlewares run before routes.

```js
// Built-in
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse form data

// Custom
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // continue to next middleware/route
});
```

## 🗂️ Routers & Structure

Organize routes into separate files:

```js
// routes/user.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => res.send("All users"));
router.post("/", (req, res) => res.send("Create user"));

module.exports = router;

// app.js
const userRoutes = require("./routes/user");
app.use("/users", userRoutes);
```

📂 Suggested project structure:

```
project/
├── app.js
├── routes/
│   └── user.js
├── controllers/
│   └── userController.js
├── middlewares/
│   └── auth.js
└── models/
    └── user.js
```

## 📡 Status Codes

Common HTTP status codes in Express:

| Code                          | Meaning                         | Example                      |
| ----------------------------- | ------------------------------- | ---------------------------- |
| **200 OK**                    | Success                         | `res.status(200).json(data)` |
| **201 Created**               | Resource created                | After POST                   |
| **204 No Content**            | Success, no response body       | After DELETE                 |
| **400 Bad Request**           | Invalid request                 | Missing fields               |
| **401 Unauthorized**          | No valid auth                   | Not logged in                |
| **403 Forbidden**             | Authenticated but no permission | No access                    |
| **404 Not Found**             | Resource missing                | Wrong ID                     |
| **409 Conflict**              | Conflict with existing resource | Duplicate user               |
| **500 Internal Server Error** | Server error                    | Crash/bug                    |

## 🌍 CORS

Browsers block cross-origin requests unless the server includes CORS headers.

### Install & enable:

```bash
npm install cors
```

```js
const cors = require("cors");
app.use(cors()); // allow all origins
```

### Restrict origins:

```js
app.use(
  cors({
    origin: "http://localhost:3000", // only allow this frontend
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
```

### Route-specific:

```js
app.get("/public", cors(), (req, res) => {
  res.json({ msg: "Anyone can access" });
});
```

## ❌ Error Handling

Custom error middleware:

```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});
```

## ✅ Best Practices

- Always use `express.json()` for APIs.
- Organize with **routes, controllers, middleware**.
- Use **CORS** properly (open in dev, restricted in prod).
- Use `.env` for configs (with [dotenv](https://www.npmjs.com/package/dotenv)).
- Return correct **status codes** for clarity.
- Use async/await and don’t block the event loop.

> 💡 Express is most often used to build **REST APIs**. Once you’re comfortable, you can combine it with databases (MongoDB, PostgreSQL, etc.) and authentication (JWT, sessions).
