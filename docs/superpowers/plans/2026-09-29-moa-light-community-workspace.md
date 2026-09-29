# MOA Light Community Workspace Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign every logged-in MOA screen as a bright, full-window community workspace with consistent navigation, controls, content density, and responsive behavior while preserving existing product flows.

**Architecture:** Introduce a small Emotion-based design-system layer and migrate the existing shell and page groups to consume it. Preserve Axios, Zustand, cookies, DTOs, route paths, and business handlers; only presentation structure, semantics, and UI state affordances change.

**Tech Stack:** React 18, TypeScript 4.9, Emotion, React Router 6, React Icons, Jest, React Testing Library, Create React App

**Spec:** `docs/superpowers/specs/2026-09-29-moa-light-community-workspace-design.md`

## Global Constraints

- Do not change backend APIs, DTO shapes, cookie authentication, Zustand responsibilities, or route URLs.
- Keep the public `web-main` landing page outside the redesign.
- Preserve all pre-existing user changes in the dirty working tree.
- Use MOA orange only for primary actions, selection, and current location; use red only for destructive confirmation.
- Maintain at least 44px touch targets on mobile and visible keyboard focus.
- Treat `views/manager` as group-owner tools inside the ordinary user workspace, not as a global administrator console.
- Complete every task with a production build that has no TypeScript errors.

## Review Focus

- An empty or very long group list must reflow without clipping the shell; Task 3 verifies an empty list and Task 8 checks long-content routes.
- A long nickname or group title must truncate without pushing header actions offscreen; Task 3 adds the semantic truncation case.
- Search and category controls must remain keyboard reachable and usable at 320px; Task 4 tests labels and Task 8 verifies the breakpoint.
- Destructive controls must not look primary until confirmation; Task 7 checks button variants and confirmation semantics.
- Unauthenticated routes must retain their existing navigation and auth behavior; Task 7 runs authentication component tests and Task 8 runs the complete suite.

---

### Task 1: Design tokens and UI primitives

**Files:**
- Create: `moa-web/moa/src/styles/theme.ts`
- Create: `moa-web/moa/src/components/ui/Button.tsx`
- Create: `moa-web/moa/src/components/ui/PageHeader.tsx`
- Create: `moa-web/moa/src/components/ui/EmptyState.tsx`
- Create: `moa-web/moa/src/components/ui/FormField.tsx`
- Create: `moa-web/moa/src/components/ui/index.ts`
- Create: `moa-web/moa/src/components/ui/ui.test.tsx`
- Modify: `moa-web/moa/src/index.css`

**Interfaces:**
- Produces: `Button({ variant, ...buttonProps })`, `PageHeader({ eyebrow, title, description, actions })`, `EmptyState({ title, description, action })`, and `FormField({ label, error, hint, required, children })`.
- Produces: Emotion exports `page`, `panel`, `card`, `field`, `chip`, `sectionTitle`, `responsiveGrid`, and `visuallyHidden` from `styles/theme.ts`.

- [ ] **Step 1: Write failing semantic tests**

Add tests asserting that Button defaults to `type="button"`, destructive and primary variants remain distinguishable by `data-variant`, PageHeader exposes one heading, FormField connects label/error with `aria-describedby`, and EmptyState renders its action.

- [ ] **Step 2: Run the primitive tests and verify RED**

Run: `npm test -- --watchAll=false src/components/ui/ui.test.tsx`

Expected: FAIL because the UI modules do not exist.

- [ ] **Step 3: Implement the minimal primitives and token layer**

Implement the exact interfaces above with Emotion and native semantic elements. Extend `index.css` with the approved color, type, spacing, radius, shadow, shell-size, focus, and reduced-motion variables.

- [ ] **Step 4: Run tests and build**

Run: `npm test -- --watchAll=false src/components/ui/ui.test.tsx && npm run build`

Expected: primitive tests PASS and build exits 0.

- [ ] **Step 5: Commit**

Commit: `feat: add MOA workspace design system`

### Task 2: Full-window application shell

**Files:**
- Modify: `moa-web/moa/src/layouts/root-layout/style.ts`
- Modify: `moa-web/moa/src/layouts/root-container/style.ts`
- Modify: `moa-web/moa/src/layouts/main-container/style.ts`
- Modify: `moa-web/moa/src/layouts/group-navi-bar/GroupNaviBar.tsx`
- Modify: `moa-web/moa/src/layouts/group-navi-bar/style.ts`
- Modify: `moa-web/moa/src/layouts/information-navi-bar/InformationNaviBar.tsx`
- Modify: `moa-web/moa/src/layouts/information-navi-bar/style.ts`
- Modify: `moa-web/moa/src/components/HamburgerMenu.tsx`
- Create: `moa-web/moa/src/layouts/app-shell.test.tsx`

**Interfaces:**
- Consumes: Task 1 tokens and Button conventions.
- Produces: a 76px group rail, 224px service navigation, 72px aligned header, flexible content region, mobile drawer trigger, and bottom group switcher below 720px.

- [ ] **Step 1: Write failing shell semantics tests**

Mock network/auth stores and assert that the shell exposes labeled primary navigation, group navigation, global search entry, create-group action, and a mobile menu button.

- [ ] **Step 2: Run shell tests and verify RED**

Run: `npm test -- --watchAll=false src/layouts/app-shell.test.tsx`

Expected: FAIL because the existing shell lacks the required navigation labels and mobile control.

- [ ] **Step 3: Implement the shell structure and responsive styles**

Replace the floating centered frame with the full viewport shell. Align rail/header separators, add the light service navigation, preserve all existing navigation destinations, and ensure long labels truncate.

- [ ] **Step 4: Run shell tests and build**

Run: `npm test -- --watchAll=false src/layouts/app-shell.test.tsx && npm run build`

Expected: shell tests PASS and build exits 0.

- [ ] **Step 5: Commit**

Commit: `feat: rebuild MOA application shell`

### Task 3: Home and group discovery cards

**Files:**
- Modify: `moa-web/moa/src/views/home/index.tsx`
- Modify: `moa-web/moa/src/views/home/HomeGroup.tsx`
- Modify: `moa-web/moa/src/views/home/style.ts`
- Modify: `moa-web/moa/src/views/short-regular-group/ShortGroup.tsx`
- Modify: `moa-web/moa/src/views/short-regular-group/RegularGroup.tsx`
- Modify: `moa-web/moa/src/views/short-regular-group/style.ts`
- Modify: `moa-web/moa/src/components/pagination-scroll/PaginationScroll.tsx`
- Modify: `moa-web/moa/src/components/pagination-scroll/style.ts`
- Create: `moa-web/moa/src/views/home/home-ui.test.tsx`

**Interfaces:**
- Consumes: Task 1 PageHeader, EmptyState, card/grid tokens; Task 2 content region.
- Produces: consistent discovery headings, category chips, responsive group grids, and readable empty states for home, short, regular, and paginated search lists.

- [ ] **Step 1: Write failing discovery tests**

Assert that empty data renders a named EmptyState, cards expose group titles as headings, images have descriptive alt text, and long titles remain available through accessible text.

- [ ] **Step 2: Verify RED**

Run: `npm test -- --watchAll=false src/views/home/home-ui.test.tsx`

Expected: FAIL on missing heading/empty-state semantics.

- [ ] **Step 3: Implement discovery presentation**

Create the approved welcome hierarchy, filters, shared card geometry, hover/focus treatment, and responsive grid without changing fetch hooks or navigation callbacks.

- [ ] **Step 4: Verify GREEN and build**

Run: `npm test -- --watchAll=false src/views/home/home-ui.test.tsx && npm run build`

Expected: tests PASS and build exits 0.

- [ ] **Step 5: Commit**

Commit: `feat: redesign group discovery views`

### Task 4: Search and category workspace

**Files:**
- Modify: `moa-web/moa/src/layouts/search-bar/index.tsx`
- Modify: `moa-web/moa/src/layouts/search-bar/style.ts`
- Modify: `moa-web/moa/src/layouts/search-bar/search-bar/SearchBar.tsx`
- Modify: `moa-web/moa/src/layouts/search-bar/search-bar/KeywordSearchGroupList.tsx`
- Modify: `moa-web/moa/src/layouts/search-bar/category-bar/HobbyAndRegionCategory.tsx`
- Modify: `moa-web/moa/src/layouts/search-bar/category-bar/CategorySearchList.tsx`
- Create: `moa-web/moa/src/layouts/search-bar/search-ui.test.tsx`

**Interfaces:**
- Consumes: Task 1 form, chip, page, and EmptyState primitives; Task 3 group-card layout.
- Produces: labeled search input, in-flow filter panel, selected category/region chips, and responsive result pages.

- [ ] **Step 1: Write failing search accessibility tests**

Assert that search can be found by label, Enter triggers the existing route handler, category and region buttons expose pressed state, and 320px markup retains all controls.

- [ ] **Step 2: Verify RED**

Run: `npm test -- --watchAll=false src/layouts/search-bar/search-ui.test.tsx`

Expected: FAIL because the existing category buttons have no pressed semantics and the input lacks the approved label.

- [ ] **Step 3: Implement search and filters**

Move category UI into a wide in-flow panel, enlarge inputs and chips, add selected state, and keep the current store and route behavior.

- [ ] **Step 4: Verify GREEN and build**

Run: `npm test -- --watchAll=false src/layouts/search-bar/search-ui.test.tsx && npm run build`

Expected: tests PASS and build exits 0.

- [ ] **Step 5: Commit**

Commit: `feat: redesign search and category filters`

### Task 5: Group detail, creation, and joining flows

**Files:**
- Modify: `moa-web/moa/src/views/group-detail/group-detail-page/GroupDetailPage.tsx`
- Modify: `moa-web/moa/src/views/group-detail/group-detail-page/style.ts`
- Modify: `moa-web/moa/src/views/group-detail/create-group/CreateGroup.tsx`
- Modify: `moa-web/moa/src/views/group-detail/create-group/style.ts`
- Modify: `moa-web/moa/src/views/join-group/GroupHeader.tsx`
- Modify: `moa-web/moa/src/views/join-group/style.ts`
- Modify: `moa-web/moa/src/views/join-group/join-main/GroupMainPage.tsx`
- Modify: `moa-web/moa/src/views/join-group/join-main/style.ts`
- Modify: `moa-web/moa/src/views/join-group/join-group/*.tsx`
- Modify: `moa-web/moa/src/views/join-group/join-group/style.ts`
- Modify: `moa-web/moa/src/views/join-group/user-list/UserListPage.tsx`
- Modify: `moa-web/moa/src/views/join-group/user-list/style.ts`
- Create: `moa-web/moa/src/views/group-detail/group-flow-ui.test.tsx`

**Interfaces:**
- Consumes: Task 1 Button, FormField, PageHeader, panel and field tokens.
- Produces: hero-led detail layout, consistent group forms, visible join progress, member list, and responsive actions.

- [ ] **Step 1: Write failing flow tests**

Assert heading hierarchy, labeled required inputs, progress/current-step semantics, descriptive image alternatives, and primary-versus-secondary action variants.

- [ ] **Step 2: Verify RED**

Run: `npm test -- --watchAll=false src/views/group-detail/group-flow-ui.test.tsx`

Expected: FAIL on missing labels/progress/action variants.

- [ ] **Step 3: Implement presentation migration**

Recompose existing data and handlers into hero, information sections, form fields, step panels, and member rows. Do not change payload construction or endpoint calls.

- [ ] **Step 4: Verify GREEN and build**

Run: `npm test -- --watchAll=false src/views/group-detail/group-flow-ui.test.tsx && npm run build`

Expected: tests PASS and build exits 0.

- [ ] **Step 5: Commit**

Commit: `feat: redesign group detail and join flows`

### Task 6: Reviews, notices, reports, and voting

**Files:**
- Modify: `moa-web/moa/src/views/review/review-main/ReviewMain.tsx`
- Modify: `moa-web/moa/src/views/review/review-main/style.ts`
- Modify: `moa-web/moa/src/views/review/create-review/CreateReview.tsx`
- Modify: `moa-web/moa/src/views/review/create-review/style.ts`
- Modify: `moa-web/moa/src/views/notice/NoticePage.tsx`
- Modify: `moa-web/moa/src/views/notice/style.ts`
- Modify: `moa-web/moa/src/views/report/ReportPage.tsx`
- Modify: `moa-web/moa/src/views/report/style.ts`
- Modify: `moa-web/moa/src/components/vote-component/VoteComponent.tsx`
- Modify: `moa-web/moa/src/components/vote-component/style.ts`
- Create: `moa-web/moa/src/views/review/content-ui.test.tsx`

**Interfaces:**
- Consumes: Task 1 PageHeader, Button, FormField, EmptyState, and reading-layout tokens.
- Produces: divider-led content lists, readable article/forms, and consistent voting/report actions.

- [ ] **Step 1: Write failing content tests**

Assert list/article landmarks, heading order, labeled report/review inputs, empty states, and keyboard-operable voting controls.

- [ ] **Step 2: Verify RED**

Run: `npm test -- --watchAll=false src/views/review/content-ui.test.tsx`

Expected: FAIL on missing landmarks, labels, or button semantics.

- [ ] **Step 3: Implement content presentation**

Apply the reading layout and common forms while preserving existing uploads, API mutations, and voting state.

- [ ] **Step 4: Verify GREEN and build**

Run: `npm test -- --watchAll=false src/views/review/content-ui.test.tsx && npm run build`

Expected: tests PASS and build exits 0.

- [ ] **Step 5: Commit**

Commit: `feat: unify MOA content and feedback views`

### Task 7: Profile, group-owner tools, and authentication

**Files:**
- Modify: `moa-web/moa/src/views/my-page/**/*.{tsx,ts,css}`
- Modify: `moa-web/moa/src/views/manager/index.tsx`
- Modify: `moa-web/moa/src/views/manager/**/style.ts`
- Modify: `moa-web/moa/src/views/manager/**/*.{tsx,ts}`
- Modify: `moa-web/moa/src/views/auth/**/style.ts`
- Modify: `moa-web/moa/src/views/auth/**/*.css`
- Modify: `moa-web/moa/src/views/auth/**/*.{tsx,ts}` only where semantic wrappers or shared buttons/fields are required
- Create: `moa-web/moa/src/views/my-page/account-ui.test.tsx`

**Interfaces:**
- Consumes: all Task 1 primitives and Task 2 shell conventions.
- Produces: user-facing profile workspace, group-owner navigation, larger tables/charts/member rows, unified authentication forms, and confirmation-oriented destructive actions.

- [ ] **Step 1: Write failing account and management tests**

Assert that the group-owner area is labeled “모임 관리”, destructive actions use the destructive variant and confirmation copy, profile/auth fields retain labels, and auth navigation links remain unchanged.

- [ ] **Step 2: Verify RED**

Run: `npm test -- --watchAll=false src/views/my-page/account-ui.test.tsx`

Expected: FAIL on manager labeling, button variants, or form semantics.

- [ ] **Step 3: Implement account, owner, and auth presentation**

Replace the small manager tabs with workspace navigation, enlarge list/table/chart surfaces, unify profile panels and auth cards, and merge around the user's existing manager edits without changing their API logic.

- [ ] **Step 4: Verify GREEN and build**

Run: `npm test -- --watchAll=false src/views/my-page/account-ui.test.tsx && npm run build`

Expected: tests PASS and build exits 0.

- [ ] **Step 5: Commit**

Commit: `feat: redesign account and group management views`

### Task 8: Responsive, accessibility, and visual regression pass

**Files:**
- Modify: any files touched in Tasks 1-7 only where verification reveals an issue
- Modify: `moa-web/moa/src/App.test.tsx`
- Create: `moa-web/moa/src/styles/responsive-ui.test.tsx`

**Interfaces:**
- Consumes: completed workspace UI.
- Produces: verified desktop, tablet, and mobile app with clean build and full test suite.

- [ ] **Step 1: Write failing regression tests for issues found during route review**

Cover at minimum the 320px navigation labels, long title/nickname accessibility, empty result state, focusable search/category controls, and destructive-action semantics.

- [ ] **Step 2: Verify RED for each regression**

Run: `npm test -- --watchAll=false src/styles/responsive-ui.test.tsx`

Expected: every newly recorded regression fails for its intended reason before the fix.

- [ ] **Step 3: Fix responsive and accessibility regressions**

Apply the smallest fixes to touched UI files. Check the main, search, detail, create/join, review, profile, group-owner, and auth routes at 1440px, 768px, and 320px.

- [ ] **Step 4: Run the complete verification suite**

Run: `npm test -- --watchAll=false && npm run build`

Expected: all tests PASS and production build exits 0 with no TypeScript errors.

- [ ] **Step 5: Commit**

Commit: `fix: complete responsive workspace polish`
