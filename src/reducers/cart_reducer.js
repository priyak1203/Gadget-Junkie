import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions';

const cart_reducer = (state, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART: {
      const { id, color, amount, product } = payload;
      const tempItem = state.cart.find((i) => i.id === id + color);
      if (tempItem) {
        const tempCart = state.cart.map((cartItem) => {
          if (cartItem.id === id + color) {
            let newAmount = cartItem.amount + amount;
            if (newAmount > cartItem.max) {
              newAmount = cartItem.max;
            }
            // cartItem.amount = newAmount;
            return { ...cartItem, amount: newAmount };
          }

          return cartItem;
        });
        return { ...state, cart: tempCart };
      } else {
        const newItem = {
          id: id + color,
          name: product.name,
          color,
          amount,
          image: product.images[0].url,
          price: product.price,
          max: product.stock,
        };
        return { ...state, cart: [...state.cart, newItem] };
      }
    }

    case REMOVE_CART_ITEM: {
      const tempCart = state.cart.filter((cartItem) => cartItem.id !== payload);
      return { ...state, cart: tempCart };
    }

    case CLEAR_CART: {
      return { ...state, cart: [] };
    }

    case TOGGLE_CART_ITEM_AMOUNT: {
      const { id, value } = payload;
      const tempCart = state.cart.map((item) => {
        if (item.id === id) {
          if (value === 'inc') {
            let newAmount = item.amount + 1;
            if (newAmount > item.max) {
              newAmount = item.max;
            }
            return { ...item, amount: newAmount };
          }

          if (value === 'dec') {
            let newAmount = item.amount - 1;
            if (newAmount < 1) {
              newAmount = 1;
            }
            return { ...item, amount: newAmount };
          }
        }
        return item;
      });
      return { ...state, cart: tempCart };
    }

    case COUNT_CART_TOTALS: {
      const { total_items, total_amount } = state.cart.reduce(
        (total, item) => {
          total.total_items += item.amount;
          total.total_amount += item.amount * item.price;
          return total;
        },
        { total_amount: 0, total_items: 0 }
      );
      return { ...state, total_items, total_amount };
    }

    default: {
      throw new Error(`No matching "${type}" - action type`);
    }
  }
};

export default cart_reducer;
