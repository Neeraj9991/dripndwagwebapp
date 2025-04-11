// lib/wixClientModules.ts
import { products, collections } from "@wix/stores";
import { orders } from "@wix/ecom";
import { members } from "@wix/members";
import { items } from "@wix/data";

import { currentCart } from "@wix/ecom";

export const wixModules = {
  products,
  collections,
  currentCart, // ✅ Required for cart actions
  orders,
  members,
  items,
};

export type WixModules = typeof wixModules;
