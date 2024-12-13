import { PricingRule, Product } from "../catalogue";

// This class handles the 3-for-2 pricing rule for Apple TVs.
export class ThreeForTwoAppleTV implements PricingRule {
  calculate(items: string[], catalogue: Record<string, Product>): number {
    let count = 0;
    for (const item of items) {
      if (item === "atv") {
        count++;
      }
    }
    const price = catalogue.atv.price;
    const discountedCount = count - Math.floor(count / 3);
    return discountedCount * price;
  }
}