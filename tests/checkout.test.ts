import { describe, it, expect } from "@jest/globals";
import { Checkout } from "../src/checkout";
import { ThreeForTwoAppleTV } from "../src/pricingRules/ThreeForTwoAppleTV";
import { BulkDiscountSuperIPad } from "../src/pricingRules/BulkDiscountSuperIPad";

describe("Checkout System", () => {
  it("should calculate total for 3 Apple TVs and 1 VGA", () => {
    const co = new Checkout([new ThreeForTwoAppleTV()]);
    co.scan("atv");
    co.scan("atv");
    co.scan("atv");
    co.scan("vga");
    expect(co.total()).toBe(249.0); // 2 Apple TVs should be counted due to the 3-for-2 rule
  });

  it("should apply bulk discount for Super iPads", () => {
    const co = new Checkout([new BulkDiscountSuperIPad()]);
    co.scan("ipd");
    co.scan("ipd");
    co.scan("ipd");
    co.scan("ipd");
    co.scan("ipd");
    expect(co.total()).toBe(2499.95); // Bulk discount should apply after 4 iPads
  });

  it("should calculate total with mixed items", () => {
    const co = new Checkout([new ThreeForTwoAppleTV(), new BulkDiscountSuperIPad()]);
    co.scan("atv");
    co.scan("ipd");
    co.scan("ipd");
    co.scan("atv");
    co.scan("ipd");
    co.scan("ipd");
    co.scan("ipd");
    expect(co.total()).toBe(2718.95); // Mix of items with pricing rules applied
  });

  it("should calculate total for no items", () => {
    const co = new Checkout([new ThreeForTwoAppleTV(), new BulkDiscountSuperIPad()]);
    expect(co.total()).toBe(0.0); // No items should give total 0
  });

  it("should calculate total with no applicable rules", () => {
    const co = new Checkout([]);
    co.scan("mbp");
    co.scan("vga");
    expect(co.total()).toBe(1429.99); // Regular prices for MacBook Pro and VGA adapter
  });
});
