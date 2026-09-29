# MOA User Pages Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** MOA의 모든 활성 일반 사용자 화면을 현재 카테고리 화면의 밝고 따뜻한 커뮤니티 무드와 일관된 정보 구조로 개편한다.

**Architecture:** 표현 계층을 공통 UI 프리미티브와 페이지 패턴으로 분리하고 기존 페이지는 데이터 요청과 사용자 동작만 유지한다. 목록, 상세, 작성, 활동, 인증 화면을 순차적으로 공통화하여 각 단계가 독립적으로 테스트·배포 가능하게 만든다.

**Tech Stack:** React 18, TypeScript, React Router, Emotion, React Icons, Axios, Jest, React Testing Library, Spring Boot 3.3/JPA(조회 계약 변경 시)

**Spec:** `docs/superpowers/specs/2026-09-29-moa-user-pages-redesign.md`

## Global Constraints

- 전역 배경색은 유지하고 주요 행동은 코랄, 보조 선택은 따뜻한 크림색을 사용한다.
- 전역 헤더 높이는 64px, 기본 버튼은 40~44px, 입력 필드는 44~48px을 사용한다.
- 일반 페이지 본문 최대 폭은 1320~1440px 범위로 통일한다.
- 모임 목록은 데스크톱 4열, 1120px 이하 3열, 820px 이하 2열, 520px 이하 1열이다.
- 목록 API는 페이지당 12개를 기본으로 요청하고 필터·정렬 변경 시 첫 페이지로 돌아간다.
- 관리자 시각 언어를 일반 사용자에게 노출하지 않는다.
- 기존 인증, 관심 모임, 이미지 URL과 핵심 API 동작은 유지한다.
- 로딩, 빈 상태, 요청 오류를 서로 구분한다.

## Review Focus

- 이미지가 없거나 깨진 모임도 카드 높이와 클릭 영역이 유지되는지 Task 3 테스트로 고정한다.
- API가 빈 배열, 페이지 객체, 실패 응답을 반환할 때 각각 올바른 상태가 표시되는지 Task 2와 Task 3 테스트로 고정한다.
- 긴 한글 제목·주소·사용자명이 작은 화면에서 가로 스크롤을 만들지 않는지 Task 10 브라우저 검수로 확인한다.
- 비로그인 사용자가 보호 경로에 진입할 때 기존 로그인 리디렉션이 유지되는지 Task 8 테스트로 고정한다.
- 키보드 사용자에게 선택 칩·정렬·페이지 버튼의 초점과 현재 상태가 전달되는지 Task 1 테스트로 고정한다.

---

### Task 1: 공통 화면 프리미티브 확장

**Files:**
- Create: `src/components/ui/SectionCard.tsx`
- Create: `src/components/ui/ResultToolbar.tsx`
- Create: `src/components/ui/SortTabs.tsx`
- Create: `src/components/ui/Pagination.tsx`
- Create: `src/components/ui/AsyncState.tsx`
- Create: `src/components/ui/FormSection.tsx`
- Create: `src/components/ui/FormActions.tsx`
- Create: `src/components/ui/DangerZone.tsx`
- Modify: `src/components/ui/EmptyState.tsx`
- Modify: `src/components/ui/index.ts`
- Test: `src/components/ui/user-pages-ui.test.tsx`

**Interfaces:**
- Produces: `ResultToolbar({ title, description, count, filters, actions })`, `SortTabs({ value, options, onChange })`, `Pagination({ page, totalPages, onChange })`, `AsyncState({ status, empty, error, children })`, `FormSection`, `FormActions`, `DangerZone`.

- [ ] **Step 1: Write the failing UI contract tests**

Assert active sort uses `aria-pressed`, current page uses `aria-current="page"`, disabled pagination cannot fire, empty and error states expose distinct accessible labels, and focus-visible styles exist.

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --watchAll=false src/components/ui/user-pages-ui.test.tsx`
Expected: FAIL because the shared components do not exist.

- [ ] **Step 3: Implement the shared primitives**

Keep each file responsible for one display pattern. Reuse theme tokens from `src/index.css`; do not introduce a component library dependency.

- [ ] **Step 4: Run the targeted and existing UI tests**

Run: `npm test -- --watchAll=false src/components/ui/user-pages-ui.test.tsx src/components/ui/ui.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui
git commit -m "feat: add shared user page patterns"
```

### Task 2: 공통 모임 목록 데이터 및 페이지 셸

**Files:**
- Create: `src/components/meeting-list/MeetingListPage.tsx`
- Create: `src/components/meeting-list/MeetingCard.tsx`
- Create: `src/components/meeting-list/useMeetingList.ts`
- Create: `src/components/meeting-list/style.ts`
- Test: `src/components/meeting-list/MeetingListPage.test.tsx`
- Modify: `src/components/pagination-scroll/PaginationScroll.tsx`

**Interfaces:**
- Consumes: Task 1 `ResultToolbar`, `SortTabs`, `Pagination`, `AsyncState`.
- Produces: `MeetingListPage({ title, description, eyebrow, apiUrl, params, emptyCopy })` and `useMeetingList({ apiUrl, params, pageSize: 12 })` returning `{ data, status, page, totalPages, totalElements, sort, setPage, setSort, reload }`.

- [ ] **Step 1: Write failing list behavior tests**

Cover 12-item page requests, first-page reset after sort/params change, empty/error distinction, and page-object versus array response normalization.

- [ ] **Step 2: Verify RED**

Run: `npm test -- --watchAll=false src/components/meeting-list/MeetingListPage.test.tsx`
Expected: FAIL because the list shell and hook do not exist.

- [ ] **Step 3: Implement the hook, card and list shell**

Use `MeetingGroup` and existing image/interest APIs. Replace infinite accumulation with explicit page replacement for list pages.

- [ ] **Step 4: Verify GREEN**

Run: `npm test -- --watchAll=false src/components/meeting-list/MeetingListPage.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/meeting-list src/components/pagination-scroll/PaginationScroll.tsx
git commit -m "feat: add unified meeting list page"
```

### Task 3: 홈·단기·정기·검색 목록 통합

**Files:**
- Modify: `src/views/home/HomeGroup.tsx`
- Modify: `src/views/home/index.tsx`
- Modify: `src/views/home/style.ts`
- Modify: `src/views/short-regular-group/ShortGroup.tsx`
- Modify: `src/views/short-regular-group/RegularGroup.tsx`
- Modify: `src/views/short-regular-group/style.ts`
- Modify: `src/layouts/search-bar/category-bar/CategorySearchList.tsx`
- Modify: `src/layouts/search-bar/search-bar/KeywordSearchGroupList.tsx`
- Delete after migration: `src/components/pagination-scroll/usePaginationScrollShortRegularHook.tsx`
- Test: `src/views/meeting-list-routes.test.tsx`

**Interfaces:**
- Consumes: Task 2 `MeetingListPage`.
- Produces: consistent route variants for all, short, regular, category and keyword lists.

- [ ] **Step 1: Write failing route variant tests**

Assert `/main`, `/main/grouptype/shorttype`, `/main/grouptype/regulartype`, category and keyword routes render the shared toolbar, correct heading/description, 12-card grid contract and image fallback.

- [ ] **Step 2: Verify RED**

Run: `npm test -- --watchAll=false src/views/meeting-list-routes.test.tsx`
Expected: FAIL because short/regular/search still use legacy separators and hooks.

- [ ] **Step 3: Replace the five list implementations**

Remove duplicate sort markup and the accidental `ShortGroup.tsx` component name mismatch. Preserve exact API params `단기모임` and `정기모임`.

- [ ] **Step 4: Verify routes and category regressions**

Run: `npm test -- --watchAll=false src/views/meeting-list-routes.test.tsx src/layouts/category-placement.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/views/home src/views/short-regular-group src/layouts/search-bar src/components/pagination-scroll
git commit -m "feat: unify meeting discovery pages"
```

### Task 4: 모임 상세·참여·운영 흐름 개편

**Files:**
- Modify: `src/views/group-detail/group-detail-page/GroupDetailPage.tsx`
- Modify: `src/views/group-detail/group-detail-page/style.ts`
- Modify: `src/views/join-group/GroupHeader.tsx`
- Modify: `src/views/join-group/style.ts`
- Modify: `src/views/join-group/join-main/GroupMainPage.tsx`
- Modify: `src/views/join-group/join-main/style.ts`
- Modify: `src/views/join-group/join-group/JoinGroupStart.tsx`
- Modify: `src/views/join-group/join-group/JoinGroupAnswer.tsx`
- Modify: `src/views/join-group/join-group/GroupAnswerResult.tsx`
- Modify: `src/views/join-group/join-group/style.ts`
- Modify: `src/views/join-group/user-list/UserListPage.tsx`
- Modify: `src/views/join-group/user-list/style.ts`
- Test: `src/views/join-group/group-flow-layout.test.tsx`

**Interfaces:**
- Consumes: Task 1 `SectionCard`, `PageHeader`, `AsyncState`, `FormActions`.
- Produces: a consistent detail hero and step-based participation flow.

- [ ] **Step 1: Write failing semantic layout tests**

Assert one H1 per page, labeled metadata sections, consistent primary/secondary actions, step labels and no administrator copy.

- [ ] **Step 2: Verify RED**

Run: `npm test -- --watchAll=false src/views/join-group/group-flow-layout.test.tsx`
Expected: FAIL on legacy layouts and copy.

- [ ] **Step 3: Rebuild detail and participation layouts without changing API calls**

Treat participant approval and member lists as meeting operations, not site administration.

- [ ] **Step 4: Verify GREEN**

Run: `npm test -- --watchAll=false src/views/join-group/group-flow-layout.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/views/group-detail/group-detail-page src/views/join-group
git commit -m "feat: redesign meeting detail and participation"
```

### Task 5: 작성·편집 양식 통합

**Files:**
- Modify: `src/views/group-detail/create-group/CreateGroup.tsx`
- Modify: `src/views/group-detail/create-group/style.ts`
- Modify: `src/views/manager/group-update/GroupUpdate.tsx`
- Modify: `src/views/manager/group-update/style.ts`
- Modify: `src/views/review/create-review/CreateReview.tsx`
- Modify: `src/views/review/create-review/style.ts`
- Modify: `src/views/report/ReportPage.tsx`
- Modify: `src/views/report/style.ts`
- Test: `src/views/forms/user-form-layout.test.tsx`

**Interfaces:**
- Consumes: Task 1 `FormSection`, `FormActions`, `SectionCard`.
- Produces: labeled and responsive form sections with consistent actions.

- [ ] **Step 1: Write failing form contract tests**

Assert label/input associations, image preview controls, required primary action, secondary action order and report danger styling.

- [ ] **Step 2: Verify RED**

Run: `npm test -- --watchAll=false src/views/forms/user-form-layout.test.tsx`
Expected: FAIL on legacy forms.

- [ ] **Step 3: Migrate the four forms**

Keep existing validation and submission calls. Rename visible manager-oriented meeting update copy to meeting management copy.

- [ ] **Step 4: Verify GREEN**

Run: `npm test -- --watchAll=false src/views/forms/user-form-layout.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/views/group-detail/create-group src/views/manager/group-update src/views/review/create-review src/views/report
git commit -m "feat: unify user form layouts"
```

### Task 6: 후기·공지 커뮤니티 화면 개편

**Files:**
- Modify: `src/views/review/review-main/ReviewMain.tsx`
- Modify: `src/views/review/review-main/style.ts`
- Modify: `src/views/my-page/mypage-review/MyPageReview.tsx`
- Modify: `src/views/my-page/mypage-review/style.ts`
- Modify: `src/views/notice/NoticePage.tsx`
- Modify: `src/views/notice/style.ts`
- Test: `src/views/community/community-pages.test.tsx`

**Interfaces:**
- Consumes: Task 1 `PageHeader`, `SectionCard`, `AsyncState`, `Pagination`.
- Produces: review feed cards and scan-friendly notice rows.

- [ ] **Step 1: Write failing community page tests**

Assert review action placement, default image fallback, empty/error states, notice date/title hierarchy and absence of inline sentinel styling.

- [ ] **Step 2: Verify RED**

Run: `npm test -- --watchAll=false src/views/community/community-pages.test.tsx`
Expected: FAIL on the existing raw feed and notice cards.

- [ ] **Step 3: Implement the review feed and notice list**

Replace uncontrolled infinite-scroll presentation with explicit load-more or pagination state that exposes progress.

- [ ] **Step 4: Verify GREEN**

Run: `npm test -- --watchAll=false src/views/community/community-pages.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/views/review src/views/my-page/mypage-review src/views/notice
git commit -m "feat: redesign community content pages"
```

### Task 7: 마이페이지·참여 일정·탈퇴 개편

**Files:**
- Modify: `src/views/my-page/get-user-info/MyPageStart.tsx`
- Modify: `src/views/my-page/get-user-info/GetUserInfo.tsx`
- Modify: `src/views/my-page/get-user-info/style.css`
- Modify: `src/views/my-page/participation-status-page/ParticipationStatusPage.tsx`
- Modify: `src/views/my-page/participation-status-page/style.ts`
- Modify: `src/views/my-page/delete-user-info/DelelteUserInfoStart.tsx`
- Modify: `src/views/my-page/delete-user-info/DelelteUserInfo.tsx`
- Modify: `src/views/my-page/delete-user-info/style.css`
- Test: `src/views/my-page/my-page-layout.test.tsx`

**Interfaces:**
- Consumes: Task 1 `PageHeader`, `SectionCard`, `FormSection`, `DangerZone`, `AsyncState`.
- Produces: account overview, profile form, participation cards and isolated withdrawal flow.

- [ ] **Step 1: Write failing account layout tests**

Assert profile summary hierarchy, responsive labels, participation empty state, withdrawal danger region and confirmation step.

- [ ] **Step 2: Verify RED**

Run: `npm test -- --watchAll=false src/views/my-page/my-page-layout.test.tsx`
Expected: FAIL on legacy CSS layouts.

- [ ] **Step 3: Migrate account and activity pages**

Preserve authentication and destructive confirmation behavior.

- [ ] **Step 4: Verify GREEN**

Run: `npm test -- --watchAll=false src/views/my-page/my-page-layout.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/views/my-page
git commit -m "feat: redesign account and activity pages"
```

### Task 8: 인증 화면군 통합

**Files:**
- Modify: `src/views/auth/signin/SignIn.tsx`
- Modify: `src/views/auth/signin/style.ts`
- Modify: `src/views/auth/signup/SignUp.tsx`
- Modify: `src/views/auth/signup/style.ts`
- Modify: `src/views/auth/find-user-id/FindUserId.tsx`
- Modify: `src/views/auth/find-user-id/FindUserIdResult.tsx`
- Modify: `src/views/auth/find-user-id/style.ts`
- Modify: `src/views/auth/find-password/FindPassword.tsx`
- Modify: `src/views/auth/find-password/VerificationPassword.tsx`
- Modify: `src/views/auth/find-password/style.ts`
- Modify: `src/views/auth/signin/SnsSuccess.tsx`
- Test: `src/views/auth/auth-pages-layout.test.tsx`
- Test: `src/auth-layout.test.ts`

**Interfaces:**
- Consumes: Task 1 `FormSection`, `FormActions`, `AsyncState`.
- Produces: standalone responsive auth cards without app chrome.

- [ ] **Step 1: Write failing auth family tests**

Assert all auth paths are standalone, each page has one card/H1, long signup uses grouped sections, feedback states are accessible and protected routes still redirect unauthenticated users.

- [ ] **Step 2: Verify RED**

Run: `npm test -- --watchAll=false src/views/auth/auth-pages-layout.test.tsx src/auth-layout.test.ts`
Expected: FAIL on incomplete auth family consistency.

- [ ] **Step 3: Migrate auth pages to the shared card/form language**

Do not change OAuth callback or credential submission behavior.

- [ ] **Step 4: Verify GREEN**

Run: `npm test -- --watchAll=false src/views/auth/auth-pages-layout.test.tsx src/auth-layout.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/views/auth src/auth-layout.test.ts
git commit -m "feat: unify authentication pages"
```

### Task 9: 랜딩·전역 내비게이션·라우팅 정리

**Files:**
- Modify: `src/views/web-main/WebMainPage.tsx`
- Modify: `src/views/web-main/style.ts`
- Modify: `src/layouts/information-navi-bar/InformationNaviBar.tsx`
- Modify: `src/layouts/information-navi-bar/style.ts`
- Modify: `src/layouts/group-navi-bar/GroupNaviBar.tsx`
- Modify: `src/layouts/group-navi-bar/style.ts`
- Modify: `src/App.tsx`
- Modify: `src/constants/index.ts`
- Test: `src/navigation-routes.test.tsx`

**Interfaces:**
- Consumes: all prior common components and completed page routes.
- Produces: one consistent navigation shell and cleaned active user route map.

- [ ] **Step 1: Write failing route and navigation tests**

Assert duplicate notice route is gone, category uses one destination, no `모임 찾기` or administrator copy appears, auth remains standalone, and landing external links include safe rel attributes.

- [ ] **Step 2: Verify RED**

Run: `npm test -- --watchAll=false src/navigation-routes.test.tsx`
Expected: FAIL on duplicate routes and remaining legacy structure.

- [ ] **Step 3: Rebuild landing content and clean routing/navigation**

Keep meeting-owner tools reachable from the relevant meeting, not from a global administrator section.

- [ ] **Step 4: Verify GREEN**

Run: `npm test -- --watchAll=false src/navigation-routes.test.tsx src/App.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/views/web-main src/layouts src/App.tsx src/constants/index.ts src/navigation-routes.test.tsx
git commit -m "feat: complete unified MOA navigation"
```

### Task 10: 전체 회귀 및 실제 화면 순회 검수

**Files:**
- Create: `docs/qa/2026-09-29-user-pages-visual-checklist.md`

Any defect discovered during this audit becomes a new scoped follow-up task with its exact source and test files recorded in the checklist before editing.

**Interfaces:**
- Consumes: Tasks 1–9 complete implementation.
- Produces: verified desktop/mobile user experience and recorded QA coverage.

- [ ] **Step 1: Run the full frontend suite**

Run: `npm test -- --watchAll=false`
Expected: all suites and tests PASS; record any pre-existing warnings separately.

- [ ] **Step 2: Run the production build**

Run: `npm run build`
Expected: exit code 0.

- [ ] **Step 3: Run backend tests if API contracts changed**

Run from `moa-was/moa`: `$env:JAVA_HOME='C:\Users\youngjun\.jdks\graalvm-jdk-17.0.12'; $env:GRADLE_USER_HOME='D:\Moa-Project\.gradle-user-home'; .\gradlew.bat test`
Expected: `BUILD SUCCESSFUL`.

- [ ] **Step 4: Audit every active route at desktop width**

Visit all 24 routes from the spec. Record title, max width, primary action, loading, empty, error, card/form alignment and horizontal overflow in the QA checklist.

- [ ] **Step 5: Audit representative routes at 820px, 720px and 520px**

At minimum inspect home, category, short, regular, detail, create, review, notice, my page, signup and login. Expected: no horizontal scroll, clipped action, overlapping navigation or unreadable metadata.

- [ ] **Step 6: Fix only defects found by the audit and rerun affected tests**

Each defect requires a reproducing test before its fix.

- [ ] **Step 7: Run final full verification and commit**

```bash
git add docs/qa src
git commit -m "test: verify unified MOA user experience"
```
