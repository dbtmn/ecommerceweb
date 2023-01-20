import {
    ADD_TO_BASKET,
    SUBTRACT_QUANTITY,
    ADD_QUANTITY,
  } from "./actionTypes";
  import { ShoppingBasketItem, ShoppingBasketActions, ShoppingBasketState } from "./types";
  import roundDecimal from "../../helpers/roundDecimal";
  
  const initialState: ShoppingBasketState = {
    addedProducts: [],
    total: 0
  };
  
 const shoppingBasketReducer = (state = initialState, action: ShoppingBasketActions) => {
    switch (action.type) {
      case ADD_TO_BASKET:
        let addedItem = state.addedProducts.find(product => product.slug === action.slug);
        if (addedItem) {
          addedItem.quantity += 1
          addedItem.subPrice = roundDecimal(addedItem.subPrice + addedItem.price);
          let total = roundDecimal(state.total + addedItem.price);
          return {
            ...state,
            total
          }
        }
        else {
          let newAddedItem: ShoppingBasketItem = {
            price: action.product.price,
            subPrice: action.product.price,
            name: action.product.name,
            slug: action.product.slug,
            quantity: 1
          };
          const total = roundDecimal(state.total + newAddedItem.price);
          return {
            ...state,
            addedProducts: [...state.addedProducts, newAddedItem],
            total
          }
  
        }
      case ADD_QUANTITY:
        const itemToAddQuantity = state.addedProducts.find(product => product.slug === action.slug);
  
        if (itemToAddQuantity) {
          itemToAddQuantity.quantity += 1;
          itemToAddQuantity.subPrice = roundDecimal(itemToAddQuantity.subPrice + itemToAddQuantity.price);
          let total = roundDecimal(state.total + itemToAddQuantity.price);
          return {
            ...state,
            total
          }
        }
        return {
          ...state
        };
      case SUBTRACT_QUANTITY:
        const itemToSubtractQuantity = state.addedProducts.find(product => product.slug === action.slug);
        let remainingProducts = state.addedProducts.filter(product => product.slug !== action.slug);
        const total = roundDecimal(state.total - itemToSubtractQuantity!.price);
  
        if (itemToSubtractQuantity && itemToSubtractQuantity.quantity > 1) {
          let newAddedItem: ShoppingBasketItem = {
            price: itemToSubtractQuantity.price,
            subPrice: roundDecimal(itemToSubtractQuantity.subPrice - itemToSubtractQuantity.price),
            name: itemToSubtractQuantity.name,
            slug: itemToSubtractQuantity.slug,
            quantity: itemToSubtractQuantity.quantity -= 1
          };
          return {
            ...state,
            addedProducts: [...remainingProducts, newAddedItem],
            total
          }
        } else {
          return {
            ...state,
            addedProducts: remainingProducts,
            total
          }
        }
      default:
        return {
          ...state,
        };
    }
  };

  export default shoppingBasketReducer;