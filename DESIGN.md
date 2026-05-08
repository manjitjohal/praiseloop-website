# Praiseloop — Design System & UI Specification

> Reference file for Claude Code. Follow these specs when building UI components, pages, and layouts.

---

## 1. Brand

- **Name:** Praiseloop
- **Tagline:** Employee recognition & rewards platform
- **Logo:** Stylised "P" icon (rounded, loop shape) + "Praiseloop" wordmark. "Praise" is bold, "loop" is regular weight.
- **Icon only:** Orange "P" loop — used for favicon, mobile header, loading states
- **Wordmark variants:** Dark background (white text), light background (dark text)
- **Logo placement:** Centred on login screen, top-left in dashboard header (icon only on mobile)
- **Font:** [Figtree](https://fonts.google.com/specimen/Figtree) (Google Font) — used for all headings, body text, and UI elements. No other fonts.

---

## 2. Colour Palette

| Token                  | Hex       | Usage                                      |
| ---------------------- | --------- | ------------------------------------------ |
| `--brand-teal`         | `#1B6B6B` | Header backgrounds, primary dark surfaces  |
| `--brand-teal-dark`    | `#153F3F` | Darker teal (gradient start, sidebar, nav) |
| `--brand-orange`       | `#F26522` | Primary CTA buttons, accents, links, logo  |
| `--brand-orange-hover` | `#D9551A` | Button hover state                         |
| `--bg-primary`         | `#FFFFFF` | Card backgrounds, main content area        |
| `--bg-secondary`       | `#F5F5F5` | Page background, section separators        |
| `--bg-light-teal`      | `#E8F0F0` | Subtle teal tinted backgrounds             |
| `--text-primary`       | `#1A1A1A` | Headings, primary text                     |
| `--text-secondary`     | `#6B7280` | Timestamps, labels, secondary info         |
| `--text-white`         | `#FFFFFF` | Text on dark/teal backgrounds              |
| `--border`             | `#E5E7EB` | Card borders, dividers                     |
| `--success`            | `#22C55E` | Positive values, approved status           |
| `--destructive`        | `#DC2626` | Negative amounts, rejected, errors         |
| `--warning`            | `#F59E0B` | Stale approval indicators, pending states  |
| `--coin-gold`          | `#F59E0B` | Coin/points indicators                     |

### Gradients

- **Header gradient:** `linear-gradient(180deg, #153F3F 0%, #1B6B6B 100%)` — used on the top header area and login screen background.
- **Balance card gradient:** Same as header with subtle glass-morphism overlay (`backdrop-blur`, white/10%)

---

## 3. Typography

All text uses **Figtree**. No other fonts.

| Element         | Size | Weight         | Colour             |
| --------------- | ---- | -------------- | ------------------ |
| Page greeting   | 24px | Bold (700)     | `--text-white`     |
| Section heading | 18px | SemiBold (600) | `--text-primary`   |
| Card title      | 16px | SemiBold (600) | `--text-primary`   |
| Body text       | 14px | Regular (400)  | `--text-primary`   |
| Secondary/meta  | 12px | Regular (400)  | `--text-secondary` |
| Badge text      | 11px | Medium (500)   | contextual         |
| Button label    | 16px | SemiBold (600) | `--text-white`     |
| "See All" links | 14px | SemiBold (600) | `--brand-orange`   |
| Balance number  | 32px | Bold (700)     | `--text-white`     |

---

## 4. Spacing, Layout & Radii

- **Approach:** Mobile-first. Design at 390px width, scale up.
- **Page padding:** 16px horizontal
- **Card padding:** 16px
- **Section gap:** 24px between sections
- **Card gap:** 12px between stacked cards

### Border Radii

| Element       | Radius              |
| ------------- | ------------------- |
| Cards         | 12px                |
| Buttons (CTA) | 12px               |
| Buttons (small) | 8px              |
| Inputs        | 12px                |
| Avatars       | 50% (circular)      |
| Bottom sheets | 24px 24px 0 0       |
| Modals        | 20px                |

### Shadows & Elevation

| Element     | Shadow                                |
| ----------- | ------------------------------------- |
| Cards       | `0 1px 3px rgba(0, 0, 0, 0.08)`      |
| Modals      | `0 -4px 20px rgba(0, 0, 0, 0.12)`    |
| Bottom nav  | `0 -1px 4px rgba(0, 0, 0, 0.06)`     |

### Responsive Breakpoints

| Token | Width  | Behaviour                                  |
| ----- | ------ | ------------------------------------------ |
| `sm`  | 640px  | —                                          |
| `md`  | 768px  | Sidebar appears, bottom bar disappears     |
| `lg`  | 1024px | Wider admin tables                         |
| `xl`  | 1280px | Max content width                          |

---

## 5. Iconography

- Use **Lucide React** icons as the default icon set
- Icons are 20px–24px, stroke width 2
- Icon colours match their context (white on dark, `--text-secondary` on light, `--brand-orange` for actions)
- **Value badge icons:** Teamwork (users), Innovation (lightbulb), Integrity (shield-check), Excellence (star), Customer Focus (heart-handshake)

---

## 6. Core Components

### 6.1 Header (Sticky Top)
- Dark teal gradient background
- Profile avatar (circle, top-left)
- Role label above greeting (e.g. "Software Engineer") — small, white, regular
- Greeting: "Good Afternoon, Sarah" — large, white, bold
- Top-right: icon buttons (notifications with unread badge, QR/grid)
- **Balance bar:** Rounded pill shape inside header, shows coin balance + weekly change with trend arrow. Tapping navigates to wallet.

### 6.2 Section Header
- Left: Section title (bold, 18px)
- Right: "See All >" link in orange
- Used for: Buzzfeed, Rewards, Activity, Leaderboards

### 6.3 Recognition Card (Feed Item)
- White card, rounded corners, subtle shadow
- Avatar + "**Name** Recognised **Name**" (bold names, regular verb)
- Timestamp below ("2h Ago")
- Description paragraph (14px, max 3 lines before truncate)
- Tag pills (e.g. "Teamwork") — light teal background (`--bg-light-teal`), teal text, small rounded pill
- Points badge: "+25 LG Coins" in orange text
- "Boost" action link — orange with rocket icon
- Footer row: thumbs up count, comment count, view count
- **Interaction:** Like toggles on tap, card tap opens detail

### 6.4 Reward Card (Horizontal Scroll)
- Horizontal scrolling row of cards
- Each card: product image (rounded top), title, coin price
- "Get Reward" outlined button (orange border, orange text, white background)
- Card width: ~160px, rounded corners

### 6.5 Leaderboard Row
- Numbered list (1, 2, 3...)
- Each row: rank number (bold), avatar (32px), name, score (right-aligned)
- Top 3 get special styling (gold/silver/bronze tint on rank number)
- Clean divider lines between rows

### 6.6 Activity Item (Transaction Row)
- Icon (left) — coloured circle with action icon (download for credit, gift for redemption, etc.)
- Title + timestamp (stacked)
- Points change (right-aligned) — green for positive (+500), red for negative (-250)

### 6.7 Bottom Navigation
- 5 icons: Home, Feed, Centre action (orange filled circle — recognise), Wallet, More/Settings
- Active icon: `--brand-orange` fill + label
- Inactive: `--text-secondary`
- White background, subtle top border/shadow
- On desktop (>=768px): hidden, replaced by sidebar

### 6.8 Sidebar (Desktop Only)
- Width: 240px, background: `--brand-teal-dark`
- Top: logo (icon + wordmark, white)
- Nav items: icon + label (14px), active = white text + orange left border accent
- Role-dependent sections separated by subtle divider + section label
- Bottom: user avatar + name + logout

### 6.9 Primary CTA Button
- Full-width, `--brand-orange` background, white text, SemiBold
- 12px border-radius, 48px height minimum (touch target)
- Hover: `--brand-orange-hover`
- Optional trailing icon (e.g. trophy)

### 6.10 Outline Button
- White background, `--brand-orange` border + text
- Same radius and height as primary
- Used for secondary actions ("Get Reward", "Deny")

### 6.11 Text Input
- Light grey background (`--bg-secondary`) or white with `--border` border
- Rounded corners (12px)
- Placeholder text in `--text-secondary`
- Focus: 2px `--brand-orange` border ring
- Optional trailing icon (e.g. link, search)
- Error state: `--destructive` border + error text below

### 6.12 Dialogs / Bottom Sheets
- **Mobile:** Bottom sheet sliding up, 24px top radius, drag handle at top
- **Desktop:** Centred modal, 20px radius, backdrop overlay (`rgba(0,0,0,0.4)`)
- Used for: create recognition, confirm redemption, approve/reject, allocate coins

### 6.13 Status Badges
- Pill shape, small (11px text, 500 weight)
- `posted`: teal bg/text
- `pending_approval`: amber bg/text (`--warning`)
- `approved`: green bg/text (`--success`)
- `rejected`: red bg/text (`--destructive`)

### 6.14 Value Badges (Recognition)
- Pill shape with icon + text
- Light teal background (`--bg-light-teal`), teal text and icon
- Icons per badge type (see Iconography section)

### 6.15 Interaction States
- **Buttons:** Darken background on hover/press (`--brand-orange-hover`)
- **Cards:** Gentle scale (0.98) on tap for mobile touch feedback
- **Links:** Underline on hover
- **Inputs:** 2px `--brand-orange` border on focus

---

## 7. Layout Architecture

### Mobile (< 768px) — Primary target
```
┌─────────────────────────┐
│ Header (gradient)       │  ← Avatar, greeting, notification bell
│ Balance card            │  ← Coin balance with trend indicator
├─────────────────────────┤
│                         │
│ Scrollable content      │  ← Cards, lists, feeds
│                         │
├─────────────────────────┤
│ Bottom tab bar          │  ← Home, Feed, (+), Wallet, More
└─────────────────────────┘
```

### Desktop (>= 768px)
```
┌──────┬──────────────────────────────────┐
│      │ Top bar (notification, profile)  │
│ Side │──────────────────────────────────│
│ bar  │                                  │
│ 240px│ Content (max-width: 640px feed,  │
│      │         1024px tables)           │
│      │                                  │
└──────┴──────────────────────────────────┘
```

- Feed/cards: single column, max-width 640px (social feed feel)
- Admin tables: wider, up to 1024px
- Content area always horizontally centred

---

## 8. Page Specifications

### 8.1 Login / Welcome Screen
- **Top half:** Full teal gradient background with centred logo (icon + wordmark in white)
- **Bottom half:** White rounded sheet (24px top radius) sliding up
- "Welcome!" heading centred, bold
- Subtitle: secondary text explaining the action
- Input field for invitation link (with link icon)
- "Continue" CTA button (orange, full-width, with trophy icon)
- "Already a member? **Sign In**" — regular text with orange bold link
- **Sign In page:** Same layout but with "Sign in with Google" and "Sign in with Microsoft" SSO buttons
- On desktop: centred card (max-width 440px) over full-screen gradient background

### 8.2 Home Dashboard (Employee)
- **Header section (gradient):**
  - Row: Avatar (40px) on left, notification bell + QR icon on right
  - Below avatar: job title in small text, "Good Afternoon, {firstName}" in 24px/700 white
  - Balance card (see component 6.1)
- **Content sections (scrollable, `--bg-secondary` background):**
  - **Buzzfeed** — section header + 1-2 recent recognition cards (compact)
  - **Rewards For You** — horizontal scroll of reward cards
  - **Activity Leaderboards** — top 3 employees (compact rows)
  - **Activity** — recent transaction list (compact activity items)
- **Desktop:** Two-column layout. Left: feed + activity. Right: balance card + rewards + leaderboard.

### 8.3 Recognition Feed (`/feed`)
- Filter bar at top: pill tabs — All | My Department | Given by Me | Received by Me
- "Recognise" FAB on mobile — orange circle with + icon, bottom-right above tab bar
- Infinite scroll of recognition cards
- Pull-to-refresh on mobile
- On desktop: single-column feed (max-width 640px), "Create Recognition" button in top-right

### 8.4 Create Recognition (Sheet/Modal)
- **Header:** "Send Recognition" title with back arrow. Budget display at top — large number showing available balance from the source wallet (departmental for managers, peer_allowance for employees)
- **Recipient selector:** Search input ("Search Colleagues") → dropdown list (avatar + name + dept). Selected colleague shown as a chip with avatar + name + dismiss X
- **Badge selector:** "Select Value Badge" dropdown or horizontal row of 5 badge pills, tap to select (active = filled orange). Shows selected badge with icon (e.g. Innovation lightbulb)
- **Message textarea:** "What did they do great?" placeholder, character count indicator
- **Coin amount:** "Reward Amount" label, three quick-select pill buttons (+50, +100, +1000) with the first pre-selected, plus a text input for custom amount. Shows current wallet balance above for reference
- **Threshold warning:** When amount exceeds org's `transaction_approval_threshold`, show inline amber alert: "High value (>{threshold}) requires Department Head approval" with info icon. Does NOT block submission — informs user the recognition will be held for approval
- **Submit button:** "Send Recognition" primary button (full-width)
- **Cancel link:** Below submit button
- On desktop: centred modal (max-width 480px) instead of bottom sheet

### 8.5 Wallet / Points Activity Page (`/wallet`)
- **Header section (gradient):** Balance display — large coin number (32px/700), bar chart showing daily/weekly coin activity (5-7 vertical bars representing recent days)
- **Tab bar below header:** "This Week" / "This Month" toggle for chart timeframe
- **Balance cards (below chart):** Side-by-side cards (stacked on narrow mobile)
  - Personal wallet: large balance number, "Redeemable" subtitle
  - Peer allowance: balance / total (e.g. "35 / 50"), "Monthly allowance" subtitle, progress bar
  - Manager: also show departmental wallet card with department budget info
- **"Redeem Coins" button:** primary, full-width below cards
- **Transaction history:** Section heading "Recent Activity"
  - Filterable tabs: All | Earned | Spent | Redeemed
  - Each item: icon (category-coloured circle), description, timestamp, amount (green positive / red negative)
  - Categories group by source: "Salesforce Deal Closed", "Amazon Gift Card", "Peer Recognition" etc.
  - Cursor-paginated infinite scroll

### 8.6 Redemption Catalog / Rewards Shop (`/wallet/redeem`)
- **Header:** "Rewards Shop" title, coin balance pill in top-right ("1,250 Coins")
- **Category tabs:** Horizontal pill tabs — Gift Cards | Prepaid Cards (categories from Tremendous catalog)
- **Search bar:** Below tabs, with filter icon
- **Product grid:** 2 columns mobile, 3-4 on desktop. Each card: product image, title, coin cost, "Get Reward" outline button
- **Product detail page (`/wallet/redeem/:id`):** Full product image, title, description, "How To Redeem" expandable section with step-by-step instructions, "My Reward Balance" display showing current balance and cost, primary "Redeem Now" button
- **Confirmation dialog:** Bottom sheet — product summary, coin cost, balance after redemption, "Confirm Redemption" button
- **Loading state:** Spinner with "Processing your redemption..." text during Tremendous API call
- **Success screen:** Checkmark animation, "Reward Claimed!" heading, order details, "Back to Rewards" button
- **Failure screen:** Error icon, "Something went wrong" heading, "Your coins have been returned" message, "Try Again" button

### 8.7 Manager Dashboard (`/manager`)
- **Header section (gradient):** Same gradient, greeting shows role ("Manager - Sales Dept")
- **Budget card:** Department name, large balance number (allocated), "X / Y remaining" with progress bar, "Resets in: 12 Days" countdown
- **CTA card:** "Want To Recognise Someone?" prompt with description "Quickly reward a team member in just a few clicks" and "Give Recognition" primary button
- **Approval queue section:** "Pending Approvals (N)" heading + "See All >"
  - Each card: requester avatar + name, reason/description, amount ("1,000 Coins"), date, stale indicator (amber badge if >48h)
  - Two action buttons per card: "Deny" (outline/destructive) and "Approve" (primary)
- **Team activity section:** "Team Activity" heading + "See All >"
  - List: avatar + name, description, coin amount (green)

### 8.8 Approval Queue (`/manager/approvals`)
- **Header:** Budget Amount display (large number), "Approving all: X Coins" summary below
- **Tab bar:** Pending (N) | History — toggles between active and resolved approvals
- **Pending tab:** List of approval cards, each with:
  - Requester avatar + name + date
  - Description: "Closed Enterprise Deal ($50k)"
  - "Amount: 1,000 Coins"
  - "Deny" / "Approve" buttons (side by side, equal width)
- **Approve action:** Tapping "Approve" executes immediately (optional confirmation on high amounts)
- **Deny action:** Tapping "Deny" opens a **Reject Reason dialog** (bottom sheet):
  - "Reject Reason" heading with close X
  - Textarea: "Reason for rejection" placeholder
  - **Quick Tags row:** Tappable pill chips — "Budget Limit", "Need more info", "Duplicate" — tapping auto-fills textarea
  - "Confirm Rejection" primary button (destructive colour)
- **History tab:** Same card layout but with status badges instead of action buttons:
  - `Declined` badge (red) with rejection reason shown below
  - `Approved` badge (green)
  - Sorted by decision date, most recent first

### 8.9 User Profile (`/profile/:id`)
- **Header:** Large avatar (80px), full name, job title, department name
- **Stats row:** Three stat cards — Total Coins Earned, Recognitions Received, Recognitions Given
- **Recent activity:** List of this user's recognitions (given + received), compact card format
- **"Recognise" button:** If viewing someone else's profile, primary CTA to recognise them
- On own profile: shows wallet summary instead of Recognise button
- Accessible from: tapping any avatar/name in the feed, team activity, or approval cards

### 8.10 Admin Views

**Organisation Settings (`/admin/settings`):**
- Form: org name, logo upload (drag/drop zone), primary colour picker, secondary colour picker, coin name input, approval threshold input
- "Save Changes" button
- Live preview panel showing how branding looks on a sample card

**Budget Management (`/admin/budgets`):**
- Stats row: Master pool total, Unallocated coins, Total allocated
- Departments table: name, head, allowance, remaining, spent, actions
- "Allocate" action → dialog: select department, enter amount, confirm
- "Assign to Manager" action → dialog: select manager wallet, enter amount

**Employee Management (`/admin/users`):**
- Search + filter bar (by department, role, status)
- Table: name, email, role badge, department, status badge, actions
- "Upload CSV" button → file picker + upload dialog with progress + result summary
- Row action: edit (opens dialog), depart (confirmation dialog)

**Coin Engine (`/admin/coin-engine`):**
- **Rules tab:** List of rules — name, source badge (Salesforce/HubSpot), event type, award amount, active toggle
- "Create Rule" button → form: name, source select, event type, condition builder (field, operator, value), award amount, target field
- **Webhook tab:** Endpoint URL display (copyable), API keys list with create/deactivate
- **Events tab:** Paginated table — timestamp, source, rule, status badge, target user, amount

---

## 9. Animation & Interaction

- **Page transitions:** Subtle fade (150ms) between routes
- **Bottom sheet:** Slide up with spring easing (300ms)
- **Cards:** Gentle scale on press (0.98) for mobile touch feedback
- **Like button:** Heart/thumb pulse animation on tap
- **Balance updates:** Count-up animation when coins change
- **Skeleton loading:** Pulse animation on card-shaped placeholders while data loads
- **Pull-to-refresh:** Standard iOS/Android overscroll behaviour on feed
- **Toast notifications:** Slide in from top, auto-dismiss after 4s (using Sonner)

---

## 10. Accessibility

- Minimum touch targets: 44x44px
- Colour contrast: WCAG AA (white text on teal passes, orange on white passes)
- Focus-visible outlines: 2px `--brand-orange` ring on keyboard focus (not on tap)
- Screen reader: proper ARIA labels on icon-only buttons, live regions for balance updates
- Reduced motion: respect `prefers-reduced-motion` — disable count-up animations and spring transitions

---

## 11. White-Label Theming

Per-organisation theming via CSS custom properties:
- `--brand-orange` overridden by `organisations.primary_colour`
- `--brand-teal` / `--brand-teal-dark` overridden by `organisations.secondary_colour` (auto-derive dark variant)
- `coin_name` replaces "LG Coins" throughout the UI
- `logo_url` replaces the Praiseloop logo in the header
- All other tokens (surfaces, text, borders) remain consistent across tenants

```typescript
// On app load, inject org branding into CSS
document.documentElement.style.setProperty('--brand-orange', org.primaryColour)
document.documentElement.style.setProperty('--brand-teal', org.secondaryColour)
```

---

## 12. Tech Notes (for Claude Code)

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS — map the tokens above to `tailwind.config.ts` via `extend.colors`
- **Font loading:** Use `next/font/google` to load Figtree
- **Icons:** `lucide-react`
- **UI primitives:** shadcn/ui (already installed — button, input, card, dialog, table, badge, avatar, etc.)
- **State:** TanStack Query (server state) + Zustand (UI state)
- **Mobile-first:** Always build at small screen first, add `md:` / `lg:` breakpoints for larger screens
- **Keep it simple:** No unnecessary abstractions. Flat component files. Only extract a component when it's reused 2+ times.

---

## 13. Component File Structure

```
src/components/
├── layout/
│   ├── app-shell.tsx          # Mobile: header + content + bottom bar
│   ├── sidebar.tsx            # Desktop: left nav
│   ├── bottom-nav.tsx         # Mobile: 5-tab bar
│   ├── header.tsx             # Gradient header with greeting + balance
│   └── notification-bell.tsx  # Bell icon with unread badge
├── recognition/
│   ├── recognition-card.tsx   # Feed item card
│   ├── recognition-form.tsx   # Create recognition (budget display, quick-select pills, threshold warning)
│   ├── badge-selector.tsx     # Horizontal badge pill selector
│   └── feed-filters.tsx       # Pill tab filter bar
├── wallet/
│   ├── balance-cards.tsx      # Personal + peer + departmental balance display
│   ├── activity-chart.tsx     # Bar chart for daily/weekly coin activity
│   ├── transaction-list.tsx   # Paginated activity items with category filters
│   ├── reward-card.tsx        # Catalog item card
│   ├── reward-detail.tsx      # Full product page with "How To Redeem"
│   ├── redeem-dialog.tsx      # Confirmation bottom sheet
│   └── redeem-result.tsx      # Success/failure screen after redemption
├── profile/
│   └── user-profile.tsx       # Avatar, stats, recent activity
├── admin/
│   ├── budget-table.tsx       # Department budget management table
│   ├── user-table.tsx         # Employee management table
│   ├── csv-upload.tsx         # File upload dialog with progress
│   ├── org-settings-form.tsx  # Branding + config form
│   ├── rule-form.tsx          # Coin engine rule editor
│   └── api-key-manager.tsx    # Webhook key list + create
├── manager/
│   ├── approval-card.tsx      # Pending approval with actions
│   ├── reject-dialog.tsx      # Rejection reason + quick tags bottom sheet
│   ├── approval-history.tsx   # Resolved approvals with status badges
│   └── budget-card.tsx        # Department budget with countdown
└── ui/                        # shadcn/ui primitives (already installed)
```
