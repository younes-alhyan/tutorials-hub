# 📦 Docker Tutorial

[<img src="../icons/docker.svg" width="250"/>](https://younes-alhyan.github.io/tutorials-hub/index.html?tutorial=docker)

**Learn Docker for consistent environments, clean development workflows, and production-ready deployments.** 🐳
This tutorial covers Docker concepts, syntax, and real-world usage so you understand _what Docker does_, _why it exists_, and _how to use it correctly_.

## 📌 Table of Contents

1. [🏁 Getting Started](#🏁-getting-started)
2. [🧠 Core Concepts](#🧠-core-concepts)
3. [📄 Dockerfile Syntax](#📄-dockerfile-syntax)
4. [🏗️ Building Images](#🏗️-building-images)
5. [▶️ Running Containers](#▶️-running-containers)
6. [📦 Volumes & Data](#📦-volumes--data)
7. [🌐 Networking](#🌐-networking)
8. [🧩 Docker Compose](#🧩-docker-compose)
9. [🛠️ Development vs Production](#🛠️-development-vs-production)
10. [✅ Best Practices](#✅-best-practices)

## 🏁 Getting Started

### Check installation

```bash
docker --version
docker compose version
```

### Verify Docker works

```bash
docker run hello-world
```

> This command pulls an image, creates a container, runs it, then exits.

## 🧠 Core Concepts

- **Image** → blueprint (read-only)
- **Container** → running instance of an image
- **Dockerfile** → instructions to build an image
- **Volume** → persistent data outside the container
- **Registry** → place where images are stored (Docker Hub)

Mental model:

```
Dockerfile → Image → Container
```

## 📄 Dockerfile Syntax

A Dockerfile defines **how your environment is built**.

### Basic example

```dockerfile
FROM node:20-slim
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["node", "index.js"]
```

### Common instructions

- `FROM` → base image
- `WORKDIR` → working directory inside container
- `COPY` → copy files from host to image
- `RUN` → run commands at build time
- `ENV` → set environment variables
- `EXPOSE` → document exposed ports
- `CMD` → default runtime command

> `RUN` happens **when building**, `CMD` happens **when running**.

## 🏗️ Building Images

Build an image from a Dockerfile:

```bash
docker build -t myapp .
```

- `-t` → tag (name)
- `.` → build context (current directory)

List images:

```bash
docker images
```

Remove image:

```bash
docker rmi myapp
```

## ▶️ Running Containers

Run a container:

```bash
docker run -p 3000:3000 myapp
```

Common flags:

- `-p host:container` → port mapping
- `-d` → detached mode
- `--name` → container name
- `--rm` → auto-remove after stop

Example:

```bash
docker run --rm -it myapp sh
```

List containers:

```bash
docker ps
docker ps -a
```

Stop container:

```bash
docker stop <container>
```

## 📦 Volumes & Data

Containers are **ephemeral**. Data disappears when they’re removed.

### Named volume

```bash
docker volume create app-data
```

```bash
docker run -v app-data:/data myapp
```

### Bind mount (common in development)

```bash
docker run -v $(pwd):/app myapp
```

- Host files ↔ container files
- No rebuild on code changes

> **Images are immutable. Volumes are mutable.**

## 🌐 Networking

Each container has its own network namespace.

- `localhost` inside a container ≠ your machine
- Containers talk via **service names**, not IPs

Example:

```yaml
services:
  app: ...
  db:
    image: postgres
```

App connects to:

```text
db:5432
```

## 🧩 Docker Compose

Compose manages **multiple containers** with one file.

### `compose.yaml`

```yaml
services:
  app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
    command: npm run dev
```

Run:

```bash
docker compose up
docker compose up --build
docker compose down
```

> Compose is for **development orchestration**, not just “convenience”.

## 🛠️ Development vs Production

### Development

- Use volumes
- Hot reload
- Rare rebuilds

```text
Image = environment
Code = mounted
```

### Production

- No volumes
- Code baked into image
- Always rebuild

```text
Image = environment + code
```

## ✅ Best Practices

- Use `.dockerignore`
- Pin base image versions (`node:20-slim`)
- Copy dependency files before source code
- Use multi-stage builds
- Don’t run as root
- Don’t store secrets in images
- Rebuild **only when environment changes**
- Containers are disposable — **don’t treat them like VMs**
