# micro-frs

Micro-frontend platform using **module federation**. A Go-based discovery server serves each app's built bundle and config; a React "core" container loads apps dynamically.

## Architecture

- `discovery/` — Go/Fiber server that scans `apps/`, serves each app's `dist/` bundle and `config/` at `/app/apps/<name>` and `/config/<name>`
- `core/` — React container (Vite) that consumes federated apps
- `apps/` — individual federated apps (each built independently)

## Tech

Go · Fiber · React · Vite · pnpm workspaces · Module Federation

## Quick start

```bash
git clone https://github.com/m3rashid/micro-frs.git
cd micro-frs
pnpm install
cd discovery && go run main.go   # serves apps on :4001
```

## License

MIT
