import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext(null);

const initialState = {
  items: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const { product, quantity = 1 } = action.payload;
      const existing = state.items.find((i) => i.product.id === product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.id === product.id
              ? { ...i, quantity: Math.min(i.quantity + quantity, product.availableQuantity) }
              : i
          ),
        };
      }
      const lockedPrice = product.isHaatActive ? product.haatPrice : product.regularPrice;
      return {
        ...state,
        items: [
          ...state.items,
          {
            product,
            quantity,
            lockedPrice,
            isHaat: product.isHaatActive,
          },
        ],
      };
    }
    case 'UPDATE_QTY': {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        return { ...state, items: state.items.filter((i) => i.product.id !== productId) };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === productId ? { ...i, quantity } : i
        ),
      };
    }
    case 'REMOVE': {
      return {
        ...state,
        items: state.items.filter((i) => i.product.id !== action.payload.productId),
      };
    }
    case 'CLEAR':
      return { ...state, items: [] };
    case 'HYDRATE':
      return action.payload;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('local-cart');
      if (saved) {
        dispatch({ type: 'HYDRATE', payload: JSON.parse(saved) });
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('local-cart', JSON.stringify(state));
    } catch {}
  }, [state]);

  const addToCart = (product, quantity = 1) => {
    dispatch({ type: 'ADD', payload: { product, quantity } });
  };

  const updateQty = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QTY', payload: { productId, quantity } });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE', payload: { productId } });
  };

  const clearCart = () => dispatch({ type: 'CLEAR' });

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce((sum, i) => sum + i.lockedPrice * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        itemCount,
        subtotal,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
