# 📚 summaries_website

**A collaborative platform for sharing and accessing high-quality academic course summaries.**  
Built by students, for students — fully open-source and community-driven.

---

## 🚀 Features

-A simple way to browse and share course summaries with others

-Built by students from different universities, open and community-driven

-Makes it easy to find helpful notes and share your own with others

-Clean separation between frontend and backend for smoother development

-Easy to get started locally with Docker and Docker Compose

---

## 🏗️ Docker best practices
- Keep images slim with a `.dockerignore` (exclude `node_modules/`, `venv/`, build artefacts).
- Use official, minimal base images (e.g., `python:3.12-slim`, `node:20-alpine`) to reduce CVEs.
- Leverage multi-stage builds for better layer caching and smaller final images.

## 🛠 Tech Stack

- **Frontend**: React + Vite + pnpm  
- **Backend**: FastAPI + uvicorn 
- **Package Managers**: pnpm, uv  
- **Containerization**: Docker & Docker Compose  

---

## 🛠 Setup Instructions

To run the project locally, make sure you have the following installed:

- [Docker](https://www.docker.com/products/docker-desktop)  
- [Docker Compose](https://docs.docker.com/compose/install/)  

Once you’ve got the tools, you can check out the individual setup guides for each part of the project:


- [Frontend Setup Instructions](https://github.com/ItamarShalev/summaries_website/blob/main/frontend/README.md)
-  [Backend Setup Instructions](https://github.com/ItamarShalev/summaries_website/blob/main/backend/README.md)

---

## 🔧 Local Development (Docker Setup)

```bash
# 1. Clone the repository
git clone https://github.com/ItamarShalev/summaries_website.git
cd summaries_website

# 2. Build and run the containers
docker compose up --build

# 3. To stop
docker compose down
```

---