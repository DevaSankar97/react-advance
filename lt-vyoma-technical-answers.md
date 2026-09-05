# L&T Vyoma — UI Developer: Technical Answers

Job ID LNT/UD/1821046. This is the answer companion to the earlier strategy file — actual responses, at the length you'd say them.

---

## What the official posting adds

Three things changed from the LinkedIn version.

**1. Minimum Qualification is stated as Bachelor of Technology (BTech).** On LinkedIn this read as "BE/B-Tech or equivalent." Here it's a structured field with no "or equivalent" attached. You hold MCA and BSc Computer Science.

This is now the single biggest risk on this application, and it's a filter that can reject you before anyone reads your experience. **Call or email the recruiter before investing further** and ask plainly whether MCA with a BSc in Computer Science satisfies the minimum qualification. Frame it neutrally: *"I hold an MCA and a BSc in Computer Science rather than a BTech — could you confirm whether that meets the minimum qualification for this requisition?"* A yes costs you one email; a no saves you three weeks.

**2. The window is open until 2 February 2027**, posted 6 August 2026. A six-month requisition window usually means a hard-to-fill role or rolling hiring. That's mildly good news — roles like this often flex on secondary criteria, sometimes including qualification, when the right candidate turns up.

**3. The structured skill tags are React JS, Angular, REST, UI, Bootstrap.** Vue appears only in the body text, not the tags. Angular does appear in the tags, twice in the posting overall. Their internal search will filter on these five, so make sure React JS, REST and Bootstrap are literally on your CV in those words. They are.

---

## Your opening pitch (about 90 seconds)

Have this ready for "tell me about yourself." It's structured to hit their exact requirement list.

> I'm a frontend engineer with seven-plus years building production interfaces. I'm currently at Jio Platforms working on JioMart and the Jio Commerce Platform, where I've shipped 15+ React features and built 20+ REST APIs with Node and Express, and reduced page load time by 24% through code splitting, memoization and bundle optimization.
>
> Before that I spent two years at an agency delivering the UI for eight products across healthcare, US fintech, Japanese recruitment tech and hospitality. What's relevant to this role is that almost every one of them paired a customer-facing application with an internal admin console — roles, permissions, operator workflows. I've built that operator surface repeatedly rather than once.
>
> On security I closed 14 findings from internal audits at Jio by implementing JWT authentication, input sanitization and rate limiting. So the combination this role asks for — dashboards and admin portals, secure sessions and RBAC, performance work — is close to what I've actually spent my career doing.

Note what that does: it front-loads "responsive dashboards and admin portals," which is their stated requirement and your strongest genuine claim.

---

## AUTHENTICATION & AUTHORIZATION

This section is where you're weakest and where a sovereign cloud platform will push hardest. Learn it properly.

### "Walk me through OAuth 2.0 / OIDC from the frontend."

OAuth 2.0 is an authorization framework — it gets your app an access token to call an API on the user's behalf. OpenID Connect sits on top and adds authentication: it returns an ID token that tells you who the user is.

For a browser SPA the correct flow is **authorization code with PKCE**. The app redirects to the identity provider, the user authenticates there, and the IdP redirects back with a short-lived authorization code. The app exchanges that code — plus a code verifier it generated before the redirect — for tokens.

PKCE exists because a SPA can't hold a client secret; anything in the bundle is public. The code verifier proves the app exchanging the code is the same one that started the flow, so an intercepted code is useless on its own. The older implicit flow returned tokens directly in the URL fragment and is now discouraged.

### "ID token vs access token?"

The **ID token** is for your app — a JWT describing who the user is: subject, issuer, audience, expiry, and claims like name, email and often roles. You validate it and use it to establish the session.

The **access token** is for the API — you attach it as a bearer token. Your frontend shouldn't care what's inside it; the resource server validates it.

The mistake to avoid: sending the ID token to APIs, or making authorization decisions from an unvalidated token.

### "Where do you store tokens?"

The honest answer names the tradeoff rather than reciting one rule.

`localStorage` is convenient but readable by any JavaScript on the page, so one XSS gets your token. `sessionStorage` is the same risk, shorter-lived. An **httpOnly, Secure, SameSite cookie** can't be read by JavaScript, which handles XSS, but introduces CSRF, so you need SameSite plus a CSRF token. Holding the access token **in memory only**, with a refresh token in an httpOnly cookie, is the pattern most current guidance points to — nothing persisted where script can reach it, at the cost of re-authenticating silently on page reload.

For a platform handling government and BFSI workloads I'd expect the in-memory plus httpOnly refresh cookie pattern.

### "How do you handle token expiry and refresh?"

An HTTP interceptor catches a 401, calls the refresh endpoint, and retries the original request. The important detail: **queue concurrent failures**. If five requests fail at once you must refresh once and replay all five, not fire five refreshes — otherwise you get a race, and with refresh token rotation you'll invalidate your own session.

Better still is silent renewal: refresh proactively before expiry using the token's `exp` claim, so the user never hits a 401. And if refresh fails, clear state and redirect to login cleanly rather than leaving the UI half-authenticated.

### "How do you implement RBAC in a UI?"

Roles and permissions arrive in the ID token claims or from a `/me` endpoint after login. I hold them in an auth context and enforce at three levels: route guards for whole pages, a permission hook or wrapper component for sections and actions, and disabled or hidden controls at the element level.

Then say the sentence that matters:

> **Hiding a button is UX, not security.** The API has to enforce every permission independently, because anyone can open devtools and flip a flag. The UI's job is to not show people things they can't do — the backend's job is to refuse them.

That distinction is exactly what a security-conscious platform team wants to hear, and many candidates miss it.

Add the practical follow-ups: permissions should be granular strings rather than coarse role checks scattered through the code, so `canDeleteInstance` beats `if (role === 'admin')` in fifty places. And handle the 403 case in the UI — a clear "you don't have access" state, not a blank screen.

### "How do you handle session management securely?"

Idle timeout with a warning before logout; absolute session lifetime regardless of activity; logout that clears local state *and* calls the IdP's end-session endpoint so SSO doesn't silently log them back in; and multi-tab consistency — if the user logs out in one tab, the others should notice, which you can do with a storage event or a broadcast channel.

---

## SPA & UI ARCHITECTURE

### "How would you architect the frontend for a cloud management portal?"

Feature-based folder structure rather than type-based — group by domain (`billing/`, `instances/`, `iam/`) so a feature's components, hooks and API calls sit together. Type-based folders (`components/`, `hooks/`, `utils/`) stop scaling once you pass a few dozen screens.

Then: a shared component library with design tokens for spacing, colour and typography; route-level code splitting so each area loads on demand; a single typed API layer with interceptors handling auth, retries and error normalisation; and a clear split between **server state** (React Query or RTK Query — cached, refetched, has staleness) and **client UI state** (Redux or Context — modals, filters, wizard steps).

For a platform portal I'd also expect a layout shell with navigation driven by permissions, so the sidebar reflects what the user can actually reach.

### "SPA concepts and best practices?"

Client-side routing with the bundle loaded once and views swapped without a full page load. The tradeoffs you should name: initial bundle size matters more, so code splitting is essential; SEO needs SSR or pre-rendering if the pages are public — usually irrelevant for an authenticated portal; you must manage focus and announce route changes for screen readers, since there's no page reload to reset them; and you need real handling for deep links, browser back, and unsaved-changes guards.

### "How do you build reusable component architectures?"

Composition over configuration — a component with fifteen boolean props is a signal it should be several components. Compound components for things like tabs or accordions where parts need shared context. Controlled and uncontrolled variants where it makes sense. Design tokens rather than hard-coded values. Documented props and a Storybook so other teams can discover what exists instead of rebuilding it.

Ground it in your own work: you built the same public-plus-admin shape across eight products, which is where you learn what genuinely deserves to be shared.

---

## API CONSUMPTION & STATE MANAGEMENT

### "Redux vs Redux Toolkit vs Context?"

Context is dependency injection, not state management — no devtools, no middleware, and every consumer re-renders when the value changes, so it suits low-frequency values like theme, locale and the current user.

Redux gives you traceable state changes, middleware and time-travel debugging, and earns its place when state is shared widely and updates often.

**Redux Toolkit is now the default.** `configureStore` sets up thunk, devtools and dev-time mutation checks; `createSlice` generates actions and types from your reducers; Immer lets you write what looks like mutation while producing an immutable update underneath; `createAsyncThunk` handles pending/fulfilled/rejected. Say the Immer point explicitly — it's the thing being tested.

If you've mostly used classic Redux, say so and say you've read into RTK. That's credible. Claiming daily RTK use and then fumbling `createSlice` is not.

### "React Query or RTK Query — why?"

Because most of what people put in Redux is server state, and server state has properties client state doesn't: it can be stale, it needs refetching, several components want the same data, and it needs caching and deduplication. Query libraries handle that natively — caching, background refetch, retry, invalidation on mutation — and shrink the Redux store to genuine client state.

For a dashboard-heavy portal this matters a lot: multiple widgets asking for the same resource should hit the network once.

### "How do you handle async workflows and error handling?"

Centralise it. One API client with interceptors, so auth headers, 401 refresh, retry with exponential backoff on 5xx, and error normalisation happen in one place rather than in every component.

In the UI, every async surface needs four states, not two: loading, success, empty, and error. Empty is the one people forget, and on an admin portal it's common — a new tenant with no resources yet. For errors, distinguish what the user can act on: a 403 needs a permissions message, a 500 needs a retry, a network failure needs "you appear to be offline."

### "REST vs GraphQL?"

REST is multiple endpoints, each returning a fixed shape, with over-fetching and under-fetching as the common complaints and HTTP caching built in. GraphQL is one endpoint where the client specifies exactly what it needs, which suits dashboards assembling data from many sources, at the cost of more complex caching and server-side query-depth concerns.

**Be honest here:** you've worked extensively in REST and haven't used GraphQL in production. Say that, then show you understand the model. The posting lists "REST / GraphQL," and REST is almost certainly the bulk of it.

---

## ACCESSIBILITY (WCAG)

The posting names accessibility three times and lists WCAG explicitly. This is a stated requirement you currently can't speak to, and it's cheap to fix.

### "How do you approach accessibility?"

Semantic HTML first — a `<button>` is focusable, keyboard-operable and announced correctly, while a `<div onClick>` is none of those. ARIA is for when semantics genuinely can't express something, not a substitute for using the right element.

Then: full keyboard operability with a logical tab order and visible focus indicators; correct labelling of form fields with real `<label>` elements; contrast ratios meeting WCAG 2.1 AA — 4.5:1 for body text, 3:1 for large text and UI components; text alternatives for meaningful images; and `aria-live` regions so dynamic updates get announced.

I'd test with keyboard only, run axe DevTools and the Lighthouse accessibility audit in CI, and check with a screen reader for critical flows.

### "How do you make a modal accessible?"

Move focus into the dialog when it opens, ideally to the first interactive element or the heading. Trap focus inside while it's open so Tab cycles within it. Close on Escape. Return focus to the element that triggered it when it closes. Mark it `role="dialog"` with `aria-modal="true"` and label it with `aria-labelledby` pointing at the title. Hide the rest of the page from assistive tech with `aria-hidden` or the `inert` attribute.

### "How do you make a data table accessible?"

Real `<table>` markup with `<th>` and `scope`, a `<caption>` describing the table, sortable column headers exposing `aria-sort`, and status updates announced through a live region when filtering or pagination changes the results. If the table is virtualised, be careful — screen readers need to know the full row count, which `aria-rowcount` handles.

Admin portals are almost entirely tables and forms, so this is a likely question.

---

## PERFORMANCE

### "How do you optimise a dashboard with many widgets and large tables?"

Route-level code splitting first, then component-level for heavy things — a charting library or an editor shouldn't be in the initial bundle. Virtualise long tables with `react-window` so a thousand rows become twenty DOM nodes. Server-side pagination and filtering rather than shipping everything to the client. Memoise expensive derived data, debounce filter inputs, and cache with sensible staleness so revisiting a tab doesn't refetch. Skeleton states so perceived performance holds while data loads.

Then attach the real story: at Jio I reduced page load time by 24% through code splitting, memoization and bundle optimization.

### "How do you find a performance problem?"

Measure before changing anything. React DevTools Profiler for commit durations and what's re-rendering; the browser Performance panel for long tasks and layout thrashing; Lighthouse and Core Web Vitals — LCP, CLS, INP — for the user-facing picture; bundle analyzer for what's actually shipping.

The common causes are new object or function references passed as props, state sitting higher in the tree than it needs to, Context values changing too often, and un-virtualised lists.

### "Caching strategies?"

Several layers: HTTP caching with `Cache-Control` and ETags; CDN for static assets with content-hashed filenames so cache busting is automatic; the query-library cache for server state, with staleness and invalidation on mutation; and memoisation in-component for expensive computation. Name the hard part — invalidation. On a portal where one user's action changes what another sees, you need to invalidate the right queries on mutation rather than trusting a TTL.

---

## TESTING

Listed in the posting and absent from your background. Learn enough to answer.

Unit tests with **Jest** for pure logic. Component tests with **React Testing Library**, which pushes you to query the way a user would — by role, label or text — rather than by implementation details, so tests survive refactors. End-to-end with **Cypress** or **Playwright** for critical flows: login, a permission-gated action, a form submission.

What I'd test on a portal like this: that a user without a permission doesn't see the control, that token refresh works, that form validation blocks bad input, and that critical tables render and paginate.

Be straight if asked directly: say testing has been lighter in your recent roles, you know the tooling, and you'd expect to write tests as part of the definition of done here. Honesty plus a clear plan beats a bluff a follow-up question will expose.

---

## STYLING & RESPONSIVE

Bootstrap is in your background and in their skill tags. **Tailwind** is utility-first — styles composed from small classes in the markup, with a design-token config, and no context-switching between files. It's a day to pick up; say that rather than claiming experience.

CSS preprocessors: you have SASS — variables, nesting, mixins, partials. Modern approaches worth naming: CSS Modules for scoping, CSS custom properties for theming (which matters if the portal supports light and dark or per-tenant branding), and CSS-in-JS with its runtime cost tradeoff.

Responsive: mobile-first with min-width media queries, fluid layouts with CSS Grid and Flexbox, relative units, and a defined browser support matrix tested on real devices. Note that an admin portal is mostly used on desktop but must not break on tablets — support staff use them.

---

## THE ANGULAR QUESTION

Angular is in their skill tags and named twice. You don't have it.

If asked, don't oversell: *"I've worked in React and Vue in production, not Angular. The concepts transfer — components, dependency injection, reactive data flow — and I picked up Vue on the job at Seaant after being a React developer. RxJS is the piece I'd need to learn properly."*

That answer is honest, evidences that you've learned a second framework before, and names the specific gap. Do not claim Angular experience — they tagged it, so someone on the panel likely uses it.

---

## BEHAVIOURAL — "lead UI modules"

The posting asks for the ability to work independently and lead UI modules or components. Prepare:

- **Owning a module end to end** — Winovr, where you built the template system and the admin console for template and user management
- **Working independently** — you delivered eight client products, several solo, hitting sprint deadlines
- **Collaborating with UX** — they list translating wireframes into clean UI; have an example of receiving a design and what you pushed back on
- **A performance bottleneck you diagnosed and fixed** — the 24%
- **A security issue you resolved** — the 14 audit findings

If you have mentored anyone, say so; the posting mentions code reviews and improving UI standards. If you haven't, talk about code review and shared conventions instead of inventing mentoring.

---

## QUESTIONS TO ASK

- Is the portal greenfield, or extending something already in production?
- React or Angular for the platform UI — is that settled, or part of what this role decides?
- Which identity provider backs the portal, and is it OIDC?
- What accessibility standard do your government and BFSI customers contract you to?
- What does "lead UI modules" mean in practice — team size, and how much of the architecture would be mine?
- How does the UI team sit relative to the Chennai and Bangalore centres?

---

## PRIORITY ORDER

1. **Email the recruiter about the BTech minimum qualification.** Nothing else matters if that's a hard filter.
2. **Two evenings on OAuth 2.0 / OIDC** — authorization code with PKCE, ID vs access token, token storage, refresh queuing. Highest-value gap.
3. **Two evenings on accessibility** — modal, table, keyboard, WCAG AA basics. Third role running that requires it.
4. **One evening on Redux Toolkit and React Query.**
5. **One evening on Jest and React Testing Library** — enough to describe what you'd test.
6. **Rehearse the opening pitch and the admin-console story** until they're crisp. Those two carry the interview.
