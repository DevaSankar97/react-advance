# Interview Prep — L&T Vyoma, UI Developer (Chennai)

Read this first: **of every role we've looked at, this is the closest match to what you have actually done.** Not the most prestigious, but the one where the job description reads like a description of your career.

---

## Why this fits better than the others

Compare the requirements against your record:

| They ask for | You have |
|---|---|
| 6–12 years frontend/UI for enterprise or product platforms | 7+ years, JioMart at Reliance |
| React / Angular / **Vue** | React and Vue both in production |
| Component-based, reusable UI architectures | 15+ React features at Jio; 8 products at Seaant |
| **Responsive dashboards and admin portals** | Built public-flow-plus-admin-console across 7 products |
| REST API integration, async workflows, error handling | 20+ APIs at Jio, integration across 8 products |
| Redux / Context API | Redux in production |
| Secure login, **RBAC**, session management | JWT auth, 14 security findings closed, admin consoles with roles |
| Bootstrap, CSS preprocessors | Bootstrap and SASS |
| Lazy loading, code splitting, caching | 24% page load reduction, method attached |
| Cross-browser and cross-device compatibility | On your résumé, from Seaant onward |
| Ability to lead UI modules or components | Seven years, delivered independently and in teams |

The line that matters most is **"experience building responsive dashboards and admin portals."** That is the thing you have done over and over — HearZap, Winovr, Lending Quarters, Shri Umadri Mahal, HRTech all pair a customer-facing flow with an internal admin console. Most React candidates have built consumer screens. You've built the operator surface behind them, repeatedly. Lead with this.

Also worth noting: this role lists Vue as an accepted framework. You dropped Vue from your résumé for React-focused applications. **Put it back for this one** — it's a listed skill and one fewer candidate will have both.

---

## Know what Vyoma actually is

Interviewers notice when a candidate has read past the job title. Two minutes of this in the room is disproportionately valuable.

Larsen & Toubro Vyoma is L&T's sovereign, secure and integrated AI cloud and hyperscale data centre business, offering sovereign cloud platforms, GPU-as-a-Service, hyperscale colocation and mission-critical digital infrastructure. It serves government, BFSI, healthcare, manufacturing and high-compute industries.

They launched their Sovereign Cloud Platform in February 2026 — an AI-first cloud infrastructure aimed at enterprise and public-sector demand for data sovereignty, regulatory compliance and secure AI adoption. Sovereignty runs across the full stack including infrastructure and control plane, data storage and processing, identity and access management, audit controls and AI model governance, with all workloads staying inside sovereign boundaries. They've been signing partnerships — SRIT for GovTech and healthcare, Lexlegis for legal AI — and are running a one-month free trial for eligible enterprises.

**What this means for the UI role.** The platform is new, so the cloud management portal, dashboards and self-service workflows are largely being built now rather than maintained. That's greenfield work, and it explains why they want someone who can "lead UI modules." It also explains the emphasis on authentication, RBAC, sessions and accessibility: the customers are government bodies, banks and hospitals, where identity management and audit controls are contractual requirements, not polish.

Say something like this in the interview: *"Since Vyoma is sovereign infrastructure for government and BFSI, I'd expect the portal to have hard requirements around role-based access, audit trails and accessibility that a consumer product wouldn't."* That single sentence separates you from candidates who read only the tech stack.

---

## Your gaps, in priority order

Five items, roughly two weeks of evenings for the ones that matter.

**1. OAuth 2.0 / OpenID Connect (frontend perspective)** — highest priority. You have JWT, which is adjacent but not the same. Learn: the authorization code flow with PKCE and why SPAs use it, what an ID token is versus an access token, refresh token handling, where to store tokens (memory vs httpOnly cookie vs localStorage, and why localStorage is discouraged), silent renewal, and logout across an SSO session. A sovereign cloud portal will be OIDC-based; expect to be asked.

**2. Accessibility / WCAG** — this is the third role in a row that requires it, so treat it as a permanent gap to close rather than per-application cramming. Semantic HTML first, ARIA only when semantics fall short; keyboard navigation, focus management and focus traps in modals; WCAG 2.1 AA basics — contrast ratios, text alternatives, form labels; `aria-live` for dynamic content; testing with axe DevTools and the Lighthouse accessibility audit. Be able to answer "how do you make a data table or a modal accessible?" without stalling.

**3. Unit and UI testing** — they list it and nothing on your résumé covers it. Know Jest and React Testing Library at minimum: rendering a component, querying by role, firing events, mocking an API call. Know what Cypress or Playwright do for end-to-end. Even a small tested component in a personal repo makes this answerable.

**4. Redux Toolkit and React Query** — you have classic Redux. RTK is now the default: `configureStore`, `createSlice`, Immer under the hood, `createAsyncThunk`, RTK Query. React Query is a different model worth understanding — server state as cache with staleness and refetching, rather than server data stuffed into Redux. A day of reading covers both well enough to discuss.

**5. Tailwind and GraphQL** — lower priority. Tailwind is utility-first CSS; you'll pick it up in a day and can say so. GraphQL appears as "REST / GraphQL" so REST likely dominates, but know the basics: single endpoint, client-specified queries, over-fetching and under-fetching solved, and what Apollo Client's cache does. Don't claim experience.

**RxJS** is marked Angular good-to-have. Skip it.

---

## The education requirement — check this early

The posting says **BE/B-Tech or equivalent with Computer Science or Electronics & Communication**. You hold an MCA and a BSc in Computer Science.

"Or equivalent" gives room, and an MCA is a postgraduate computing degree, but L&T is a traditional engineering company and some of its HR processes treat BE/B.Tech strictly. Ask the recruiter directly in the first call whether MCA plus BSc Computer Science qualifies. It's a fair question, and better answered before four rounds than after.

---

## Likely process and what to prepare

Expect something like a technical screen, a deeper technical round, possibly a panel or architecture discussion, then HR. L&T processes tend to be structured and less algorithm-heavy than product companies — closer to the services-firm pattern than to Freshworks or Walmart. Prepare depth in React and browser fundamentals rather than LeetCode.

Your existing **answer bank file** covers the React, JavaScript and state-management questions. Add these role-specific ones:

**"How would you architect the frontend for a cloud management portal?"**
Talk about: feature-based folder structure over type-based; a shared component library with design tokens; route-level code splitting; a typed API layer with centralised error handling and interceptors; separating server state (React Query or RTK Query) from client UI state (Redux or Context); and RBAC enforced at both route and component level, with the backend as the real gate and the UI hiding rather than protecting.

**"How do you handle role-based access in a UI?"**
Roles arrive in the token claims or a `/me` endpoint. Route guards for page level, a permission-check wrapper or hook for component level. Say the important part out loud: **hiding a button is UX, not security** — the API must enforce it regardless. That distinction is exactly what a security-conscious platform team wants to hear.

**"How do you handle token expiry and refresh?"**
Interceptor catches a 401, attempts refresh, queues concurrent failed requests so you refresh once rather than N times, and redirects to login if refresh fails. Mention silent renewal ahead of expiry as the nicer approach.

**"How do you optimise a dashboard with many widgets and large tables?"**
Route and component-level code splitting; virtualization for long tables (`react-window`); memoising expensive derived data; debouncing filter inputs; pagination or server-side filtering rather than loading everything; caching with staleness rules; skeleton states so perceived performance holds. Then attach your real story — the 24% page load reduction through code splitting, memoization and bundle optimization.

**"How do you build for cross-browser and cross-device?"**
Mobile-first responsive layouts, progressive enhancement, feature detection over browser sniffing, a defined support matrix, and testing on real devices. You have this from Seaant onward.

**Browser fundamentals they'll probe:** DOM and event delegation, bubbling and capturing, localStorage vs sessionStorage vs cookies (and which is right for tokens), HTTP caching headers and cache busting, CORS, and frontend security — XSS, CSRF, why you sanitize, and what Content Security Policy does. Your Jio security work gives you a real anchor here: input sanitization, JWT auth and rate limiting closing 14 audit findings.

---

## Stories to have ready

- **Admin console pattern** — pick one, probably Winovr or Shri Umadri Mahal, and walk through the roles, permissions and operator workflows. This is the story that matches the job.
- **Security work at Jio** — the 14 findings, what the vulnerabilities were, what you implemented.
- **Performance** — the 24%, with the method and how you measured.
- **Handy / OCR** — your most technically interesting work, and a good answer to "what's the hardest UI problem you've solved."
- **Leading a module** — they want someone who can lead UI modules. Use the fact that you delivered eight products at Seaant, several independently.

## Questions to ask them

- Is the cloud portal greenfield, or are you extending something that exists?
- React or Angular for the platform UI, and is that settled?
- Which identity provider backs the portal — Keycloak, an in-house IdP, something else?
- What accessibility standard do your government and BFSI customers contract you to?
- What does "lead UI modules" mean here — team size, and how much of the architecture is mine?

---

## Do this now

1. Ask the recruiter about the BE/B.Tech requirement before investing further.
2. Put Vue back on the résumé version you send here.
3. Two evenings on OAuth 2.0 / OIDC from the frontend side.
4. Two evenings on accessibility — it recurs across every senior role you're targeting.
5. One evening each on Redux Toolkit, React Query, and Jest plus React Testing Library.
6. Rehearse the admin-console story until it's crisp. It's the strongest card you hold for this job.
