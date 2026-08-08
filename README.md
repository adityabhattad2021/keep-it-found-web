# Found website

The public storefront for Found. It contains the static home, roadmap, privacy,
and support pages. Roadmap voting is its only server-backed feature and lives in
this repository under `functions/`.

```sh
make install
make start
make check
```

GitHub Pages deploys `dist/` from `.github/workflows/pages.yml`. Production uses the custom domain
`https://keep-it-found.app`, so the workflow builds with a root base path.

Public release links and support contact details live in
`src/site-config.ts`. A platform action remains visibly unavailable until it has
a real destination.

Roadmap voting architecture and Firebase setup are documented in
[`docs/roadmap-voting.md`](docs/roadmap-voting.md).
