# CommercePulse

CommercePulse is a frontend-focused SaaS dashboard for tracking sales, orders, customers, and product performance for a fictional commerce business.

## Overview

This repository demonstrates a production-minded frontend application built with Next.js and TypeScript. The current phase combines a polished dashboard foundation with a complete read-only Orders workspace driven by URL state and a mock API boundary.

The demo workspace represents **Northstar Store**. All information is deterministic mock data designed for stable development, testing, and screenshots.

## Current Features

- Responsive SaaS shell with persistent desktop navigation and an accessible mobile drawer
- Overview dashboard with commerce metrics, a 30-day revenue chart, recent orders, and top products
- Orders workspace with debounced search by number, customer, or email
- URL-driven status and period filters, sorting, and real pagination
- Responsive desktop order table and mobile order cards
- Dedicated order details with item, payment, customer, and shipping summaries
- TanStack Query caching with loading, background-fetching, empty, error, and retry states
- Mock API with deterministic latency, controlled development errors, and paginated responses
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

Orders follows a replaceable data boundary:

```text
deterministic fixtures -> mock API -> TanStack Query hooks -> Orders UI
```

The mock API owns search, filtering, sorting, latency, and pagination. Production UI components never import the Orders dataset directly.

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

Unit and component tests cover dashboard presentation, Orders API behavior, query parameter normalization, status presentation, navigation, and asynchronous UI states. Playwright covers dashboard navigation, Orders search, filtering, pagination, details, preserved return state, and the mobile drawer.

Playwright requires a browser binary on the first run:

```bash
npx playwright install chromium
```

## Project Structure

```text
src/
|-- app/                       # App Router layouts and routes
|   `-- (dashboard)/           # Shared application shell
|-- components/
|   |-- layout/                # Navigation, header, and shell components
|   |-- providers/             # Application-level client providers
|   `-- ui/                    # Small shared visual primitives
|-- features/
|   |-- dashboard/             # Dashboard-specific components and tests
|   `-- orders/                # Fixtures, mock API, hooks, and Orders UI
|-- hooks/                     # Shared React hooks
|-- lib/                       # Reusable formatting utilities
|-- mocks/                     # Dashboard fixtures and projections
`-- types/                     # Shared domain types
e2e/                           # Playwright user flows
```

## Roadmap

- Product inventory and low-stock views
- Customer segmentation and detailed analytics
- Campaign performance reporting
- Validated settings forms
- Expanded component and end-to-end coverage
- CI quality pipeline

## Current Status

**Phase 2 — Orders Management**

The application foundation, overview experience, and read-only Orders management workflow are implemented. Product, customer, analytics, campaign, and settings workspaces intentionally remain concise placeholders for later phases.
