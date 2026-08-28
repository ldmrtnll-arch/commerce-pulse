# CommercePulse

CommercePulse is a frontend-focused SaaS dashboard for tracking sales, orders, customers, products, and inventory for a fictional commerce business.

## Overview

This repository demonstrates a production-minded frontend application built with Next.js and TypeScript. The current phase combines a polished dashboard foundation with complete read-only Orders and Products workspaces driven by URL state and mock API boundaries.

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

Unit and component tests cover dashboard presentation, the Orders and Products mock APIs, URL parameter normalization, stock-health boundaries, fixture integrity, status presentation, navigation, and asynchronous UI states. Playwright covers dashboard navigation, responsive navigation, Orders flows, Products search, filtering, pagination, and product details with preserved return state.

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
|   `-- products/              # Products fixtures, inventory rules, API, hooks, and UI
|-- hooks/                     # Shared React hooks
|-- lib/                       # Reusable formatting and mock API utilities
|-- mocks/                     # Dashboard fixtures and product projections
`-- types/                     # Shared domain types
e2e/                           # Playwright user flows
```

## Roadmap

- Customer segmentation and detailed analytics
- Campaign performance reporting
- Validated settings forms
- Expanded component and end-to-end coverage
- CI quality pipeline

## Current Status

**Phase 3 — Products & Inventory Management**

The application foundation, overview experience, read-only Orders workflow, and Products and Inventory management workflow are implemented. Customer, analytics, campaign, and settings workspaces intentionally remain concise placeholders for later phases.
