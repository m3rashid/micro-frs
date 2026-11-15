<div align="center">

# 🧩 micro-frs

**Micro-frontend platform using module federation.** Go discovery server + React container, apps loaded dynamically.

[![Go](https://img.shields.io/badge/Go-1.21-00ADD8?logo=go&logoColor=white)](https://go.dev)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

---

## 🏗 Architecture

- **`discovery/`** — Go/Fiber server scanning `apps/`, serving each app's `dist/` bundle and `config/`
- **`core/`** — React container (Vite) consuming federated apps
- **`apps/`** — independently built federated apps

## 🛠 Tech

`Go` · `Fiber` · `React` · `Vite` · `pnpm workspaces` · `Module Federation`

## 📦 Quick start

```bash
git clone https://github.com/m3rashid/micro-frs.git
cd micro-frs
pnpm install
cd discovery && go run main.go   # serves apps on :4001
```

## 📄 License

MIT
