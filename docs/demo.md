# CommercePulse Demo Guide

This walkthrough takes approximately 5–10 minutes and highlights both product behavior and frontend engineering decisions.

## Suggested Walkthrough

1. Open **Overview** and inspect the reconciled 30-day sales snapshot, revenue series, top products, and recent orders.
2. Open **Orders**, filter by Delivered, search for a customer, and follow an order into its detail view. Return to confirm the URL state is preserved.
3. Open **Products**, filter for Low stock, inspect inventory indicators, and open a product detail.
4. Open **Customers**, select the Loyal segment, and inspect a customer's derived value metrics and real order history.
5. Change **Analytics** from 30 days to 7 days. Review how KPIs, charts, products, segments, statuses, and acquisition channels update together.
6. Open **Campaigns**, sort by ROAS, then inspect spend, attributed revenue, and the customers assigned through first-touch attribution.
7. Open **Settings**, trigger email validation, save one preference, reload, and confirm browser-local persistence. Change a field and switch sections to demonstrate the unsaved-changes dialog.

## Technical Talking Points

- **Why URL state?** Search, filters, sorting, pagination, and periods remain shareable and reconstruct correctly after reload.
- **Why deterministic fixtures?** Business metrics, screenshots, and tests remain stable without hiding application behavior behind arbitrary randomness.
- **Why TanStack Query with mock APIs?** The UI exercises asynchronous loading, caching, retries, and mutations through a boundary that can later be replaced by HTTP.
- **How does campaign attribution work?** A deterministic first-touch assignment connects each attributed customer to at most one channel-compatible campaign.
- **Why a Settings repository?** Components never access localStorage directly; schema validation and recovery remain centralized.
- **How are mobile tables handled?** Dense desktop tables become purpose-built cards and lists at smaller breakpoints while preserving the same actions and data.
