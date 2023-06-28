import React, { useContext, useEffect, useReducer } from 'react';
import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions';
import reducer from '../reducers/cart_reducer';

const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem('cart')) || [];
};

const initialState = {
  cart: getLocalStorage(),
  total_items: 0,
  total_amount: 0,
  shipping_fee: 534,
};

const CartContext = React.createContext();

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: COUNT_CART_TOTALS });
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  // add to cart
  const addToCart = (id, color, amount, product) => {
    dispatch({ type: ADD_TO_CART, payload: { id, amount, color, product } });
  };

  // remove item
  const removeItem = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
  };

  // clear cart
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  // toggle amount
  const toggleAmount = (value, id) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { value, id } });
  };

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeItem, clearCart, toggleAmount }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { useCartContext, CartProvider };
