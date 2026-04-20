
The user is asking for the full list of specs used in the comparison chart on the homepage. This is a research/Q&A request, not an implementation task — no plan needed. Pulling directly from `src/components/ComparisonTable.tsx`.

## Comparison Chart — Full List of Specs

The chart compares three saunas: **Anywhere Sauna**, **Barrel Sauna (Costco)**, and **Nordica SaunaLife**.

### Main Table (always visible)
1. Standard Outlet (120V, 20A circuit breaker)
2. Full Body Heat
3. Renter Friendly
4. Permits / Landlord Approval
5. Setup Time
6. Where You Can Put It
7. All-in Cost

### Full Specs Table (shown when "See full comparison" expanded)
1. Exterior Dimensions
2. Heated Space
3. Wood Type
4. Longevity
5. Heater Included
6. Compatible with SuperHotSuperFast Heater (shipping 2027)
7. Unit Cost
8. Shipping Cost
9. Electrician Cost
10. Total Cost

Source: `src/components/ComparisonTable.tsx` (`mainRows` and `specRows` arrays).
