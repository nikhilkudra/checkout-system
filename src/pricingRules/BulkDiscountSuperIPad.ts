import { PricingRule, Product } from "../catalogue";

// This class applies a bulk discount for Super iPads if more than 4 are purchased.
export class BulkDiscountSuperIPad implements PricingRule {
  calculate(items: string[], catalogue: Record<string, Product>): number {
    let count = 0;
    for (const item of items) {
      if (item === "ipd") {
        count++;
      }
    }
    const price = count > 4 ? 499.99 : catalogue.ipd.price;
    return count * price;
  }
}