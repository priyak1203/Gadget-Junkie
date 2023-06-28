import {
  CLEAR_FILTERS,
  FILTER_PRODUCTS,
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  UPDATE_SORT,
} from '../actions';

const filter_reducer = (state, { type, payload }) => {
  switch (type) {
    case LOAD_PRODUCTS: {
      let maxprice = payload.map((p) => p.price);
      maxprice = Math.max(...maxprice);

      return {
        ...state,
        all_products: [...payload],
        filtered_products: [...payload],
        filters: {
          ...state.filters,
          max_price: maxprice,
          price: maxprice,
        },
      };
    }

    case SET_GRIDVIEW: {
      return { ...state, grid_view: true };
    }
    case SET_LISTVIEW: {
      return { ...state, grid_view: false };
    }

    case UPDATE_SORT: {
      return { ...state, sort: payload };
    }

    case SORT_PRODUCTS: {
      const { sort, filtered_products } = state;

      let tempProducts = [...filtered_products];

      if (sort === 'price-lowest') {
        // tempProducts = tempProducts.sort((a, b) => a.price - b.price);
        tempProducts = tempProducts.sort((a, b) => {
          if (a.price < b.price) {
            return -1;
          }
          if (a.price > b.price) {
            return 1;
          }
          return 0;
        });
      }

      if (sort === 'price-highest') {
        tempProducts = tempProducts.sort((a, b) => b.price - a.price);
      }

      if (sort === 'name-a') {
        tempProducts = tempProducts.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      }

      if (sort === 'name-z') {
        tempProducts = tempProducts.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      }

      return { ...state, filtered_products: tempProducts };
    }

    case UPDATE_FILTERS: {
      const { name, value } = payload;
      return { ...state, filters: { ...state.filters, [name]: value } };
    }

    case FILTER_PRODUCTS: {
      let { all_products } = state;
      const { text, category, company, color, price, shipping } = state.filters;

      let tempProducts = [...all_products];

      // Filtering
      // text
      if (text) {
        tempProducts = tempProducts.filter((product) =>
          product.name.toLowerCase().startsWith(text)
        );
      }

      // category
      if (category !== 'all') {
        tempProducts = tempProducts.filter(
          (product) => product.category === category
        );
      }

      // company
      if (company !== 'all') {
        tempProducts = tempProducts.filter(
          (product) => product.company === company
        );
      }

      // colors
      if (color !== 'all') {
        tempProducts = tempProducts.filter((product) =>
          product.colors.find((c) => c === color)
        );
      }

      // price
      tempProducts = tempProducts.filter((product) => product.price <= price);

      // shipping
      if (shipping) {
        tempProducts = tempProducts.filter(
          (product) => product.shipping === true
        );
      }
      return { ...state, filtered_products: tempProducts };
    }

    case CLEAR_FILTERS: {
      return {
        ...state,
        filters: {
          ...state.filters,
          text: '',
          category: 'all',
          company: 'all',
          color: 'all',
          price: state.filters.max_price,
          shipping: false,
        },
      };
    }

    default: {
      throw new Error(`No matching "${type}" - action type`);
    }
  }
};

export default filter_reducer;
