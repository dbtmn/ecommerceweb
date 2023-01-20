import {
    ADD_TO_BASKET,
    SUBTRACT_QUANTITY,
    ADD_QUANTITY
  } from "./actionTypes";
  import {
    AddToBasket,
    SubtractQuantity,
    AddQuantity,
  } from "./types";
  import { Item } from "../items/types";
  
  export const addToBasket = (product: Item, slug: string): AddToBasket => ({
    type: ADD_TO_BASKET,
    product,
    slug
  });
  
  export const subtractQuantity = (slug: string): SubtractQuantity => ({
    type: SUBTRACT_QUANTITY,
    slug
  });
  
  export const addQuantity = (slug: string): AddQuantity => ({
    type: ADD_QUANTITY,
    slug
  });
  