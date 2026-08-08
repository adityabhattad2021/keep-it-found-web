# Roadmap voting

The public roadmap is static website content. Firebase stores only three anonymous priorities per
browser identity, aggregate counts, and optional private context submitted after a pick.

```text
GitHub Pages -> Firebase App Check -> callable function -> private Firestore collections
```

Browser clients cannot read or write Firestore directly. `getRoadmapVotes` returns aggregate
counts and the current anonymous identity's picks. `setRoadmapPicks` receives the complete desired
pick set and applies every add, removal, or replacement in one transaction. Removing a pick also
deletes its optional response.

Firestore keeps three private collections:

- `roadmapFeatures/{featureId}` stores the aggregate count.
- `roadmapVoters/{anonymousUid}` stores at most three selected feature identifiers.
- `roadmapFeedback/{featureId}_{anonymousUid}` stores optional private context.

## Firebase console setup

1. Use the same Firebase project as Found Crashlytics, or create a dedicated production project.
2. Enable the Blaze plan. Cloud Functions deployment requires billing even when usage remains in
   its no-cost allowance. Configure a Google Cloud budget alert before deployment.
3. Create the default Firestore database. The functions currently run in `us-central1`; choose a
   compatible nearby Firestore location before data exists.
4. In Authentication, enable the Anonymous provider. Do not enable automatic anonymous-account
   cleanup because a browser identity owns its pick-removal capability.
5. Register a Firebase Web app and copy its public configuration values.
6. Register the Web app with Firebase App Check using reCAPTCHA Enterprise. Allow
   `keep-it-found.app` and `www.keep-it-found.app`; retain the GitHub Pages hostname only while
   testing the domain transition. Monitor valid traffic before changing broader Firebase
   enforcement settings.

## Local website configuration

Copy `.env.example` to `.env.local` and fill in the public Web app values. For local
App Check testing, set `VITE_FIREBASE_APP_CHECK_DEBUG_TOKEN=true`, open the roadmap once, and add the
debug token printed by Firebase to the project's App Check debug-token list. Never commit the token.

Run the independent checks:

```sh
npm run check
npm run check --prefix functions
```

## Deploy the backend

Install and authenticate the Firebase CLI on the development machine, then deploy only this
codebase and its rules from the repository root:

```sh
firebase deploy --only functions:roadmap,firestore:rules --project YOUR_FIREBASE_PROJECT_ID
```

The repository intentionally does not commit `.firebaserc`; every deployment names its target
project explicitly. The Firestore rules deny all browser access because Cloud Functions use the
Admin SDK.

## Configure GitHub Pages

Create these GitHub Actions repository variables:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_APP_CHECK_SITE_KEY`
- `VITE_FIREBASE_FUNCTIONS_REGION` (`us-central1` unless the backend changes)

Firebase Web configuration and the App Check site key identify public clients; they are not server
credentials. App Check, Authentication, callable validation, and private Firestore rules enforce
the boundary. The Pages workflow checks that every value exists before creating a deployable site.

## Data and limits

- A visitor can keep at most three picks per persistent anonymous browser identity.
- Replacing picks updates both aggregate counts atomically. Removed picks also remove their context.
- Clearing site data can create another identity; picks are product signals, not an election.
- Written context is limited to 500 characters, remains private, and is accepted only for a current pick.
- Roadmap ordering is editorial and never changes automatically from pick totals.
- Feature identifiers are duplicated at the two deployment boundaries intentionally. A repository contract
  test fails when the website and function allowlists diverge.
