import { useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { type Book } from '../../store/bookSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../store/cartSlice';
import { type RootState } from '../../store/store';
import { ShoppingCart } from 'lucide-react';

interface BookCardProps {
  book: Book;
}

const BookCard: FC<BookCardProps> = ({ book }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showBuyPrice, setShowBuyPrice] = useState(false);
  const publishedYear = book?.publishedDate ? new Date(book.publishedDate).getFullYear() : '';
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  
  const isInCart = cartItems.some(item => item.book._id === book._id);

  const handleTogglePrice = (type: 'buy' | 'rent', e: React.MouseEvent) => {
    e.stopPropagation();
    setShowBuyPrice(type === 'buy');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(addItem({ book, type: showBuyPrice ? 'buy' : 'rent' }));
  };

  const handleCardClick = () => {
    navigate(`/book/${book._id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group relative bg-white dark:bg-[#112240] rounded-xl overflow-hidden shadow-xl hover:shadow-primary-container/10 transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-white/10 cursor-pointer"
    >
      <div className="h-[320px] relative overflow-hidden bg-gray-100 dark:bg-black/20">
        <img 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          alt={book.title} 
          src={book.coverImageUrl} 
        />
        <div className="absolute top-3 left-3 z-10">
          <button 
            onClick={handleAddToCart}
            className="w-9 h-9 flex items-center justify-center bg-white/90 dark:bg-[#112240]/90 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all"
          >
            <ShoppingCart size={18} strokeWidth={2.5} className={isInCart ? 'text-yellow-500 dark:text-yellow-400' : 'text-gray-700 dark:text-gray-300'} />
          </button>
        </div>

      </div>
      <div className="p-6">
        <h3 className="font-headline-lg text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-primary dark:group-hover:text-primary-container transition-colors line-clamp-1">
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-white-dim mb-4 italic line-clamp-1">
          {t('home.byAuthor', { author: book.author })} {publishedYear && `• ${publishedYear}`}
        </p>
        <div className="flex justify-between items-center mt-2">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wide">
              {showBuyPrice ? 'Buy Price' : 'Rent Price'}
            </span>
            <span className="font-bold text-lg text-primary dark:text-primary-fixed-dim">
              ${showBuyPrice ? (book?.buyPrice?.toFixed(2) || '0.00') : (book?.rentPrice?.toFixed(2) || '0.00')}
            </span>
          </div>
          
          <div className="flex bg-gray-200 dark:bg-surface-variant/30 rounded-lg p-1">
            <button
              onClick={(e) => handleTogglePrice('rent', e)}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                !showBuyPrice
                  ? 'bg-primary-container text-black shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
              }`}
            >
              Rent
            </button>
            <button
              onClick={(e) => handleTogglePrice('buy', e)}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                showBuyPrice
                  ? 'bg-primary-container text-black shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
              }`}
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
