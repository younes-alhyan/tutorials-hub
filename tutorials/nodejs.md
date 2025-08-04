# 📦 Node.js Tutorial

[<img src="../icons/nodejs.svg" width="250"/>](https://younes-alhyan.github.io/tutorials-hub/index.html?tutorial=nodejs)  
**Learn Node.js essentials for backend development, package management, and building scalable apps.** 🚀

## 📌 Table of Contents

1. [🏁 Introduction & Setup](#🏁-introduction--setup)
2. [📦 Modules & Packages](#📦-modules--packages)
3. [🗂️ File System](#🗂️-file-system)
4. [💧 Streams & Buffers](#💧-streams--buffers)
5. [⚡ Events & EventEmitter](#⚡-events--eventemitter)
6. [👶 Child Processes](#👶-child-processes)
7. [🌐 Environment & Config](#🌐-environment--config)
8. [⏱️ Timers & Scheduling](#⏱️-timers--scheduling)
9. [❌ Error Handling](#❌-error-handling)

## 🏁 Introduction & Setup

- Node.js allows running JavaScript **outside the browser**.
- Install Node.js from [official website](https://nodejs.org/).
- Check version:

```bash
node -v
npm -v
```

- Initialize a project:

```bash
npm init -y
```

## 📦 Modules & Packages

- **Core modules**: `fs`, `path`, `http`, `os`, `crypto`, etc.
- **Importing modules** (CommonJS):

```js
const fs = require("fs");
```

- **ESM import** (if `"type": "module"` in package.json):

```js
import fs from "fs";
```

- Install packages:

```bash
npm install <package-name>
```

- Save dev dependencies:

```bash
npm install <package> --save-dev
```

- Package files:

  - `package.json` → project metadata & dependencies
  - `package-lock.json` → exact versions of installed packages
  - `node_modules/` → installed modules

## 🗂️ File System (fs)

- Read file:

```js
const fs = require("fs");
fs.readFile("file.txt", "utf-8", (err, data) => {});
```

- Write file:

```js
fs.writeFile("file.txt", "content", (err) => {});
```

- Synchronous versions: `fs.readFileSync`, `fs.writeFileSync`

## 💧 Streams & Buffers

- Streams allow **efficient I/O** for large files:

```js
const readable = fs.createReadStream("file.txt");
const writable = fs.createWriteStream("out.txt");
readable.pipe(writable);
```

- Buffers store **binary data**:

```js
const buffer = Buffer.from("Hello World");
```

## ⚡ Events & EventEmitter

- Core Node.js module: `events`
- Create event-driven apps:

```js
const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.on("message", (msg) => console.log(msg));
emitter.emit("message", "Hello Node!");
```

## 👶 Child Processes

- Run system commands:

```js
const { exec } = require("child_process");
exec("ls -la", (err, stdout, stderr) => console.log(stdout));
```

- Useful for automation, scripts, or running other programs.

## 🌐 Environment & Config

- Access environment variables:

```js
process.env.PORT;
process.env.NODE_ENV;
```

- Use `.env` files with [dotenv](https://www.npmjs.com/package/dotenv):

```js
require("dotenv").config();
console.log(process.env.MY_KEY);
```

## ⏱️ Timers & Scheduling

- Delays:

```js
setTimeout(() => console.log("Hello"), 1000);
```

- Repeated intervals:

```js
setInterval(() => console.log("Tick"), 1000);
```

- Immediate execution:

```js
setImmediate(() => console.log("Next tick"));
```

## ❌ Error Handling

- Catch errors in async code:

```js
try {
  const data = fs.readFileSync("file.txt");
} catch (err) {
  console.error(err);
}
```

- Handle promise rejections:

```js
Promise.reject(new Error("Oops")).catch((err) => console.error(err));
```

> 💡 Focus on these Node.js core concepts first. Once you master them, combining Node.js with frameworks like **Express** or **Next.js** becomes seamless.
