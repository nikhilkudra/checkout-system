export const products = {
  ipd: { name: "Super iPad", price: 549.99 },
  mbp: { name: "MacBook Pro", price: 1399.99 },
  atv: { name: "Apple TV", price: 109.50 },
  vga: { name: "VGA adapter", price: 30.00 },
};

// Interfaces
export interface Product {
  name: string;
  price: number;
}

export interface PricingRule {
  calculate(items: string[], catalogue: Record<string, Product>): number;
}
