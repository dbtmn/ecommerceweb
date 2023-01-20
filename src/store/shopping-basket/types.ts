import {
    ADD_TO_BASKET,
    SUBTRACT_QUANTITY,
    ADD_QUANTITY,
  } from "./actionTypes";
  import { Item } from "../items/types";
  
  export interface ShoppingBasketItem {
    price: number;
    subPrice: number;
    name: string;
    slug: string;
    quantity: number;
  }
  
  export interface ShoppingBasketState {
    addedProducts: ShoppingBasketItem[];
    total: number;
  }
  
  export interface AddToBasket {
    type: typeof ADD_TO_BASKET;
    product: Item;
    slug: string;
  }
  
  export interface SubtractQuantity {
    type: typeof SUBTRACT_QUANTITY;
    slug: string;
  }
  
  export interface AddQuantity {
    type: typeof ADD_QUANTITY;
    slug: string;
  }
  
  export type ShoppingBasketActions = AddToBasket | SubtractQuantity | AddQuantity;
  