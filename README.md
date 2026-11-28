# AgriShare

AgriShare is a university startup prototype for renting farm machinery and cold storage across Sicily. The marketplace uses seeded listings and illustrative imagery. Profiles, favorites, and booking requests are stored in the current browser. The demo asks for no passwords and collects no payments.

## Launch

Use Node.js 24 LTS and npm. From the repository root, run:

```bash
npm ci
npm run dev
```

Open the URL printed by Next.js (port 3000 by default). To make the dev server available on a cloud or LAN interface, run `npm run dev -- --hostname 0.0.0.0`.

## Try the booking journey

1. Open **Guided demo** from the footer, or search the marketplace directly.
2. Pick a listing and continue as a **Farmer**. Select a date range, review the demo total and submit a request.
3. Open the Farmer dashboard and select **Switch to Owner**. Approve or decline the request.
4. Select **Switch to Farmer** to see the updated status. Approved dates become unavailable for that listing.

A €100 rental costs a Farmer €103 with the 3% service fee. The Owner’s illustrative payout is €92 after the 8% commission. Impact figures are sample scenarios. To reset demo state, clear this site’s browser data.

## Checks

```bash
npm run lint
npm run typecheck
npm run build
npm start
```
