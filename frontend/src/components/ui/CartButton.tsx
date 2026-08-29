import { type FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../../store/cartSlice';
import { type RootState } from '../../store/store';
import { ShoppingCart } from 'lucide-react';
import { type Book } from '../../store/bookSlice';

interface CartButtonProps {
  book: Book;
  type?: 'buy' | 'rent';
  className?: string;
  iconSize?: number;
}

const CartButton: FC<CartButtonProps> = ({ book, type = 'rent', className = '', iconSize = 18 }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { purchasedBooks } = useSelector((state: RootState) => state.library);

  const isOwned = purchasedBooks.some(p => p._id === book._id || (p.book && p.book._id === book._id));
  const isInCart = cartItems.some((item) => item.book._id === book._id);

  if (isOwned) {
    return null; // Hide the cart button if the user already owns the book
  }

  const handleToggleCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInCart) {
      dispatch(removeItem(book._id));
    } else {
      dispatch(addItem({ book, type }));
    }
  };

  return (
    <button
      onClick={handleToggleCart}
      className={`flex items-center justify-center transition-all ${className}`}
      title={isInCart ? 'Remove from cart' : 'Add to cart'}
    >
      <ShoppingCart
        size={iconSize}
        strokeWidth={2.5}
        className={isInCart ? 'text-primary' : 'text-gray-700 dark:text-gray-300'}
      />
    </button>
  );
};

export default CartButton;
