
import { products, PricingRule } from "./catalogue";
import { BulkDiscountSuperIPad } from "./pricingRules/BulkDiscountSuperIPad";
import { ThreeForTwoAppleTV } from "./pricingRules/ThreeForTwoAppleTV";

// This class manages the checkout process, applies pricing rules, and calculates totals.
export class Checkout {
  private items: string[] = [];
  private pricingRules: PricingRule[];

  constructor(pricingRules: PricingRule[]) {
    this.pricingRules = pricingRules;
  }

  scan(item: string): void {
    this.items.push(item);
  }

  total(): number {
    let total = 0;

    // Apply pricing rules first
    for (const rule of this.pricingRules) {
      total += rule.calculate(this.items, products);
    }

    // Create a map to track how many times each item is processed
    const itemCounts: Record<string, number> = {};
    for (const item of this.items) {
      itemCounts[item] = (itemCounts[item] || 0) + 1;
    }

    // Calculate total for items without specific rules
    // Avoid double counting by checking if the item was already processed by a pricing rule
    for (const key in itemCounts) {
      if (key in products) {
        const count = itemCounts[key];
        const price = products[key as keyof typeof products].price;

        // Add the regular price only if no pricing rule was applied to this item
        if (!this.isItemDiscounted(key)) {
          total += count * price;
        }
      }
    }

    // Return the total rounded to 2 decimal places
    return parseFloat(total.toFixed(2));
  }

  // Check if the item price has been discounted by any rule
  private isItemDiscounted(item: string): boolean {
    // Loop through all pricing rules to check if any rule has applied to this item
    for (const rule of this.pricingRules) {
      if (rule instanceof BulkDiscountSuperIPad && item === "ipd") {
        return true;  // Bulk discount applies to iPad
      }
      if (rule instanceof ThreeForTwoAppleTV && item === "atv") {
        return true;  // 3-for-2 rule applies to Apple TV
      }
    }
    return false;
  }
}
