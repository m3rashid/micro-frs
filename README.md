<div align="center">

# 🧩 micro-frs

### Micro-frontend platform using module federation

[![Go](https://img.shields.io/badge/Go-1.21-00ADD8?style=for-the-badge&logo=go&logoColor=white)](https://go.dev)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

> *A container app loads federated apps dynamically — each built and deployed independently.*

</div>

---

## 📖 Overview

**micro-frs** is a micro-frontend platform built on **module federation**. A Go-based discovery server serves each app's built bundle and config; a React "core" container loads apps dynamically at runtime. Each app is built and deployed independently.

## 🏗 Architecture

```
micro-frs/
├── discovery/   # Go/Fiber server: scans apps/, serves dist/ + config/
├── core/        # React container (Vite) consuming federated apps
├── apps/        # individual federated apps
└── pnpm-workspace.yaml
```

### Discovery endpoints

| Path | Description |
|---|---|
| `/config/<name>` | App config |
| `/app/apps/<name>` | App bundle (dist/) |

## 🛠 Tech stack

`Go` · `Fiber` · `React` · `Vite` · `pnpm workspaces` · `Module Federation`

## 📦 Quick start

```bash
git clone https://github.com/m3rashid/micro-frs.git
cd micro-frs
pnpm install
cd discovery && go run main.go   # serves apps on :4001
```

## 📄 License

MIT © [m3rashid](https://github.com/m3rashid)
