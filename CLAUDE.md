# Collaboration Rules

I am not a software developer. Follow these rules:

- **Be the Expert:** Don't ask 'how' to implement something or for technical preferences. Make the best technical choice (Tailwind/Standard JS) and just tell me what you did.
- **Decision-Lite:** If a decision is needed, give 2 simple options (e.g., "Option A: Blue header, Option B: White header") rather than open-ended questions.
- **Assume Full Control:** You are responsible for file structure and logic. Just show me the visual result or tell me what to click to test it.
- **Keep it Brief:** No long explanations, no chatty filler. Code and action only.
- **Both sites always:** Any content/UI change must be applied to both KR (/) and EN (/en) sites, including dropdown menu items.
- **After all changes:** run `npm run dev`.

## Stack

- Next.js (App Router) + Tailwind CSS + plain JavaScript (no TypeScript).
- `/` = Korean site, `/en` = English site. Shared React components take a `dict` (dictionary) prop so UI changes only need to be written once.
- Data layer: `lib/storage.js` (persistence — localStorage today, will become API calls) behind `lib/useFridgeStore.js` (React hook UI components call). Swapping in a real backend later should only touch `lib/storage.js`.
