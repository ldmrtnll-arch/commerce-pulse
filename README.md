# CommercePulse

CommercePulse is a frontend-focused SaaS dashboard for tracking sales, orders, customers, products, and inventory for a fictional commerce business.

## Overview

This repository demonstrates a production-minded frontend application built with Next.js and TypeScript. The current phase combines a polished dashboard foundation with complete read-only Orders, Products, Customers, Analytics, and Campaigns workspaces driven by URL state and mock API boundaries.

The demo workspace represents **Northstar Store**. All information is deterministic mock data designed for stable development, testing, and screenshots.

## Current Features

- Responsive SaaS shell with persistent desktop navigation and an accessible mobile drawer
- Overview dashboard with commerce metrics, a 30-day revenue chart, recent orders, and top products derived from the catalog
- Orders workspace with debounced search, URL-driven filters and sorting, pagination, and dedicated order details
- Products workspace backed by a deterministic catalog of 72 products across six categories
- Product search by name or SKU, lifecycle and stock filters, sorting, and real pagination
- Independent lifecycle and stock-health indicators, inventory metrics, and accessible stock-level visualization
- Responsive desktop product table and mobile product cards
- Dedicated product details with catalog, inventory, pricing, and performance summaries
- Cross-domain fixture integrity between Order items and Product IDs/SKUs
- Customer aggregates derived from the 90 existing Orders, enriched by deterministic profiles
- Customer segmentation with New, Returning, Loyal, and At risk behavioral groups
- Customer search, acquisition and segment filters, value-based sorting, URL state, and pagination
- Lifetime value, average order value, deterministic recency, and global customer metrics
- Dedicated customer details with contact information, segment insight, and real order history
- Cross-feature navigation from Customer Details to the existing Order Details with safe return state
- Analytics periods for the latest 7, 30, and 90 days, anchored to the deterministic Aug 28, 2026 dataset reference date
- Net-sales, order, average-order-value, and active-customer KPIs with equal-length prior-period comparisons
- Zero-filled daily revenue series plus product, category, customer-segment, acquisition-channel, and order-status insights
- Cross-feature navigation from Analytics top products to Product Details with the selected period preserved
- A reconciled Overview whose 30-day sales, orders, AOV, revenue series, and top products share the Analytics source of truth
- A deterministic portfolio of 30 campaigns across Draft, Scheduled, Active, Paused, and Completed lifecycle states
- First-touch campaign attribution aligned with existing acquisition channels and real Customers and Orders
- Campaign budget, spend, attributed revenue, eligible orders, acquired customers, utilization, and ROAS metrics
- Campaign search, status/channel filters, performance sorting, URL state, pagination, and responsive desktop/mobile presentation
- Dedicated Campaign Details with performance, budget, information, and attributed-customer sections
- Safe cross-feature navigation from Campaign Details to the existing Customer Details and back
- TanStack Query caching with loading, background-fetching, empty, error, and retry states
- Mock APIs with deterministic latency, controlled development errors, and paginated responses
- Professional placeholder pages for future product areas
- Custom 404 page and global product metadata

## Tech Stack

- Next.js App Router and React
- TypeScript in strict mode
- Tailwind CSS
- TanStack Query
- Recharts
- Lucide React
- Radix UI Dialog
- React Hook Form and Zod (prepared for upcoming forms)
- Vitest, React Testing Library, and jsdom
- Playwright
- ESLint

## Architecture

Server Components are the default. Client Components are limited to interactive or browser-dependent areas such as charts, navigation controls, and TanStack Query consumers. Domain code is grouped under `features`, while shared visual primitives remain under `components/ui`.

Orders and Products follow the same replaceable data boundary:

```text
deterministic fixtures -> mock API -> TanStack Query hooks -> domain UI
```

Each mock API owns its search, filtering, sorting, latency, and pagination. Production UI components never import the complete fixture datasets directly. Shared concerns such as latency, safe return URLs, badges, and pagination live outside individual domains.

Customers intentionally begins from an existing domain relationship instead of an independent fixture dataset:

```text
Orders -> customer aggregation + deterministic profiles -> customer mock API -> TanStack Query -> Customer UI
```

Identity, order count, lifetime value, average order value, first and last order, and recency are derived once from Orders. Profiles only supply complementary fields such as phone, join date, and acquisition channel.

Analytics composes the three established domains without duplicating them:

```text
Orders + Products + customer aggregates -> analytics aggregation -> mock API -> TanStack Query -> Analytics UI
```

The selectable periods are inclusive UTC calendar windows ending on the Orders fixture reference date (`2026-08-28`). Each comparison window has the same number of days and ends immediately before its current window begins. Net sales include pending, processing, shipped, and delivered orders, while cancelled and refunded orders contribute to order counts and status distribution but not revenue or AOV. Product and category sales use item totals, so they are intentionally labeled as merchandise/product sales and may differ from order net sales after shipping, tax, discounts, cancellation, or refund rules. Active customers are unique customers who created any order in the period; their current derived segment and acquisition channel come from the Customer domain.

Campaigns introduces a deterministic marketing domain while preserving existing customer and order ownership:

```text
Customers + Acquisition Channels + Orders
                    -> first-touch attribution
                    -> campaign aggregation
                    -> mock API
                    -> TanStack Query
                    -> Campaign UI
```

Each attributed customer belongs to at most one campaign whose channel matches the customer acquisition channel. Direct and Organic Search customers remain unattributed. As a simple first-touch model, a campaign receives all available economically eligible orders from its attributed customers, including repeat orders outside the campaign date range; no multi-touch or date-window weighting is attempted. Attributed revenue and orders reuse the shared net-sales eligibility rule: pending, processing, shipped, and delivered orders are included; cancelled and refunded orders are excluded. ROAS is attributed revenue divided by spend and is unavailable when spend is zero. Budget utilization is spend divided by budget; deterministic fixtures never overspend.

## Getting Started

### Prerequisites

- Node.js 20.9 or newer
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Validate TypeScript without emitting files |
| `npm run test` | Start Vitest in watch mode |
| `npm run test:run` | Run unit and component tests once |
| `npm run test:e2e` | Run the Playwright suite |

## Testing

Unit and component tests cover dashboard presentation, the Orders, Products, Customers, Analytics, and Campaigns boundaries, URL normalization, inclusive date windows, revenue eligibility, attribution integrity, ROAS, budget rules, zero-filled time series, cross-domain integrity, semantic tables, status presentation, navigation, and asynchronous UI states. Playwright covers complete Orders, Products, Customers, Analytics, and Campaigns flows, including cross-feature navigation with preserved return state.

Playwright requires a browser binary on the first run:

```bash
npx playwright install chromium
```

## Project Structure

```text
src/
|-- app/                       # App Router layouts and routes
|   `-- (dashboard)/           # Shared application shell and domain routes
|-- components/
|   |-- layout/                # Navigation, header, and shell components
|   |-- providers/             # Application-level client providers
|   `-- ui/                    # Shared badges, cards, buttons, and pagination
|-- features/
|   |-- dashboard/             # Dashboard-specific components and tests
|   |-- orders/                # Orders fixtures, mock API, hooks, and UI
|   |-- products/              # Products fixtures, inventory rules, API, hooks, and UI
|   |-- customers/             # Profiles, aggregation, segments, API, hooks, and UI
|   |-- analytics/             # Periods, cross-domain aggregation, API, hooks, and insight UI
|   `-- campaigns/             # Fixtures, attribution, metrics, API, hooks, list, and details
|-- hooks/                     # Shared React hooks
|-- lib/                       # Reusable formatting and mock API utilities
|-- mocks/                     # Dashboard fixtures and product projections
`-- types/                     # Shared domain types
e2e/                           # Playwright user flows
```

## Roadmap

- Custom date ranges, comparison controls, and exportable reports
- Validated settings forms
- Final accessibility and interaction polish
- Expanded component and end-to-end coverage
- CI quality pipeline

## Current Status

**Phase 6 — Campaign Management & Marketing Performance**

The application foundation, overview experience, read-only Orders workflow, Products and Inventory management, derived Customer Management and Segmentation workflow, cross-domain Analytics, and read-only Campaign Management are implemented. Settings remains the final placeholder for the next phase.
