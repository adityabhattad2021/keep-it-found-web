# Found website

The public site for Found for iPhone. It contains the static home, the App Store
and setup page, roadmap, journal, privacy, First Edition terms, and support pages.
Roadmap voting is its only server-backed feature and lives in this repository
under `functions/`.

```sh
make install
make start
make check
```

GitHub Pages deploys `dist/` from `.github/workflows/pages.yml`. Production uses the custom domain
`https://keep-it-found.app`, so the workflow builds with a root base path.

The App Store destination lives in `src/app-store.ts` and feeds the site, the page
metadata plugin in `vite.config.ts`, and the tests. Support contact details live in
`src/site-config.ts`. Public capability claims must stay within
[`docs/iphone-release-claim-ledger.md`](docs/iphone-release-claim-ledger.md), and
`tests/one-platform.test.mjs` keeps other platforms, stores, and test programs out of public copy.

Roadmap voting architecture and Firebase setup are documented in
[`docs/roadmap-voting.md`](docs/roadmap-voting.md).
