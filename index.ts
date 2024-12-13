import { Checkout } from "./src/checkout";
import { ThreeForTwoAppleTV } from "./src/pricingRules/ThreeForTwoAppleTV";
import { BulkDiscountSuperIPad } from "./src/pricingRules/BulkDiscountSuperIPad";

console.log("--- Checkout System ---");

// Helper function to scan multiple items at once
const scanItems = (checkout: Checkout, items: string[]) => {
    items.forEach(item => checkout.scan(item));
};

// Initialize Checkout with pricing rules
const pricingRules = [new ThreeForTwoAppleTV(), new BulkDiscountSuperIPad()];
const checkout = new Checkout(pricingRules);

// Define items to be scanned
const itemsToScan = [
    "atv", // Apple TV
    "atv", // Apple TV
    "atv", // Apple TV
    "ipd", // Super iPad
    "ipd", // Super iPad
    "ipd", // Super iPad
    "ipd", // Super iPad
    "ipd" , // Super iPad
    "vga",
];

// Scan items
scanItems(checkout, itemsToScan);

// Calculate and print the total
const total = checkout.total();
console.log(`Total: $${total.toFixed(2)}`);
