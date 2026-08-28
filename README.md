# CommercePulse

CommercePulse is a frontend-focused SaaS dashboard for tracking sales, orders, customers, and product performance for a fictional commerce business.

## Overview

This repository demonstrates a production-minded frontend foundation built with Next.js and TypeScript. The first phase establishes the product identity, responsive application shell, accessible navigation, typed dashboard data, reusable UI primitives, and automated test infrastructure.

The demo workspace represents **Northstar Store**. All dashboard information is deterministic mock data designed for stable development, testing, and screenshots.

## Current Features

- Responsive SaaS application shell with persistent desktop navigation
- Accessible mobile navigation drawer with keyboard and focus management
- Overview dashboard with four key commerce metrics
- Responsive 30-day revenue chart with formatted axes and tooltip
- Semantic recent-orders table with typed status badges
- Top-products ranking with units sold and revenue
- Functional period selector with 7, 30, and 90-day options
- Professional placeholder pages for planned product areas
- Custom 404 page and global product metadata

## Tech Stack

- Next.js (App Router) and React
- TypeScript in strict mode
- Tailwind CSS
- Recharts
- Lucide React
- Radix UI Dialog
- React Hook Form and Zod (installed for upcoming forms)
- TanStack Query (installed for the upcoming API layer)
- Vitest, React Testing Library, and jsdom
- Playwright
- ESLint

## Architecture

Server Components are the default. Client Components are limited to interactive or browser-dependent areas such as the chart, period control, active navigation, and mobile drawer. Domain-specific dashboard code lives under `features/dashboard`, shared visual primitives under `components/ui`, and deterministic fixtures under `mocks`.

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
| `npm run test:e2e` | Run the Playwright smoke suite |

## Testing

Component tests cover metric presentation, order status presentation, and navigation state. The Playwright smoke test verifies the overview content and navigation to the Orders workspace.

Playwright requires a browser binary on the first run:

```bash
npx playwright install chromium
```

## Project Structure

```text
src/
├── app/                       # App Router layouts and routes
│   └── (dashboard)/           # Shared authenticated-style application shell
├── components/
│   ├── layout/                # Navigation, header, shell components
│   └── ui/                    # Small shared visual primitives
├── features/
│   └── dashboard/             # Dashboard-specific components and tests
├── lib/                       # Reusable formatting utilities
├── mocks/                     # Typed deterministic fixtures
└── types/                     # Domain types
e2e/                           # Playwright smoke tests
```

## Roadmap

- Orders data layer with URL-driven search, filters, sorting, and pagination
- Product inventory and low-stock views
- Customer segmentation and detailed analytics
- Campaign performance reporting
- Validated settings forms
- Mock API integration with TanStack Query caching and error states
- Expanded component and end-to-end coverage
- CI quality pipeline

## Current Status

**Phase 1 — Foundation and Dashboard Shell**

The application foundation and overview experience are implemented. Feature workspaces beyond Overview intentionally remain concise placeholders for later phases.
