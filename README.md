# Checkout System

## Overview
This project implements a checkout system for a product catalogue with custom pricing rules. It allows scanning products, applying promotions, and calculating the total price.

## Features
- **Product Catalogue**: Contains details about products like price and name.
- **Pricing Rules**:
  - 3-for-2 deal on Apple TVs.
  - Bulk discount for Super iPads when purchasing more than 4.
- **Extendable Architecture**: Easily add new pricing rules by implementing the `PricingRule` interface.
- **Test Coverage**: Jest-based test suite for validating functionality.

## Project Structure
```
src/
├── catalogue.ts                 # Product details and interfaces
├── checkout.ts                  # Checkout class for processing items
├── pricingRules/                # Pricing rule implementations
│   ├── ThreeForTwoAppleTV.ts    # 3-for-2 pricing rule for Apple TVs
│   └── BulkDiscountSuperIPad.ts # Bulk discount for Super iPads
├── tests/                       # Unit tests
│   └── checkout.test.ts         # Jest test suite for Checkout system
index.ts                         # Entry point for the application
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <repository_folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application
The `index.ts` file serves as the entry point. You can run it to see the Checkout system in action.

1. Build and run the code:
   ```bash
   npx ts-node index.ts
   ```

### Running Tests
Run the Jest test suite to validate functionality:
```bash
npm test
```

## Usage
Modify the `index.ts` file to scan items and calculate totals based on your requirements. Example usage is provided below:

```typescript
import { Checkout } from "./src/checkout";
import { ThreeForTwoAppleTV } from "./src/pricingRules/ThreeForTwoAppleTV";
import { BulkDiscountSuperIPad } from "./src/pricingRules/BulkDiscountSuperIPad";

const co = new Checkout([new ThreeForTwoAppleTV(), new BulkDiscountSuperIPad()]);
co.scan("atv");
co.scan("ipd");
co.scan("ipd");
co.scan("atv");
co.scan("ipd");
co.scan("ipd");
co.scan("ipd");
console.log(`Total: $${co.total()}`);
```

## Extending Pricing Rules
To add a new pricing rule:
1. Create a new class in the `pricingRules/` folder.
2. Implement the `PricingRule` interface.
3. Override the `calculate` method with custom logic.
4. Add the rule to the `Checkout` instance.

Example:
```typescript
export class NewPricingRule implements PricingRule {
  calculate(items: string[], catalogue: Record<string, Product>): number {
    // Custom logic
    return 0;
  }
}
```

## License
This project is licensed under the MIT License.
