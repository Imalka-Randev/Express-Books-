import { useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { type Book } from '../../store/bookSlice';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../../store/store';
import { addItem } from '../../store/cartSlice';
import CartButton from './CartButton';

interface BookCardProps {
  book: Book;
}

const BookCard: FC<BookCardProps> = ({ book }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showBuyPrice, setShowBuyPrice] = useState(false);
  const publishedYear = book?.publishedDate ? new Date(book.publishedDate).getFullYear() : '';
  const { purchasedBooks, rentedBooks } = useSelector((state: RootState) => state.library);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  
  const isOwned = purchasedBooks.some(p => p._id === book._id || ((p as any).book && (p as any).book._id === book._id));
  const rentedItem = rentedBooks.find(r => r.book._id === book._id);
  const isRented = !!rentedItem;
  
  let daysLeft = 0;
  if (isRented && rentedItem?.dueDate) {
    const dueDate = new Date(rentedItem.dueDate);
    const now = new Date();
    const timeDiff = dueDate.getTime() - now.getTime();
    daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  const handleTogglePrice = (type: 'buy' | 'rent', e: React.MouseEvent) => {
    e.stopPropagation();
    setShowBuyPrice(type === 'buy');
    
    // Auto-update cart item type if it's already in the cart
    if (cartItems.some(item => item.book._id === book._id)) {
      dispatch(addItem({ book, type }));
    }
  };

  const handleCardClick = () => {
    navigate(`/book/${book._id}`, { 
      state: { defaultPaymentType: showBuyPrice ? 'buy' : 'rent' } 
    });
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group relative bg-white dark:bg-[#112240] rounded-xl overflow-hidden shadow-xl hover:shadow-primary-container/10 transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-white/10 cursor-pointer"
    >
      <div className="h-[240px] sm:h-[280px] md:h-[320px] relative overflow-hidden bg-gray-100 dark:bg-black/20">
        <img 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          alt={book.title} 
          src={book.coverImageUrl} 
        />
        <div className="absolute top-3 left-3 z-10">
          <CartButton 
            book={book} 
            type={showBuyPrice ? 'buy' : 'rent'} 
            className="w-9 h-9 bg-white/90 dark:bg-[#112240]/90 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-full shadow-lg hover:scale-110 active:scale-95" 
          />
        </div>

        {/* Ownership Tags */}
        <div className="absolute top-2 right-2 z-10 flex flex-col gap-1 items-end">
          {isOwned && (
            <span className="bg-green-500 text-white px-2 py-0.5 text-[10px] font-bold rounded-sm uppercase shadow-sm">
              {t('bookCard.owned', 'Owned')}
            </span>
          )}
          {isRented && !isOwned && daysLeft > 0 && (
            <div className="flex items-center bg-blue-500/90 backdrop-blur-sm text-white px-1.5 py-0.5 rounded-sm shadow-md">
              <span className="material-symbols-outlined text-[12px] mr-0.5 animate-pulse">hourglass_empty</span>
              <span className="text-[9px] font-bold uppercase tracking-wider whitespace-nowrap">
                {t('bookCard.daysLeft', { days: daysLeft, defaultValue: '{{days}}d Left' })}
              </span>
            </div>
          )}
        </div>

      </div>
      <div className="p-4 sm:p-6">
        <h3 className="font-headline-lg text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-primary dark:group-hover:text-primary-container transition-colors line-clamp-1">
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-white-dim mb-4 italic line-clamp-1">
          {t('home.byAuthor', { author: book.author })} {publishedYear && `• ${publishedYear}`}
        </p>
        <div className="flex justify-between items-center mt-2">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 font-bold uppercase tracking-wide">
              {showBuyPrice ? t('bookCard.buyPrice', 'Buy Price') : t('bookCard.rentPrice', 'Rent Price')}
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
              {t('bookCard.rent', 'Rent')}
            </button>
            <button
              onClick={(e) => handleTogglePrice('buy', e)}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                showBuyPrice
                  ? 'bg-primary-container text-black shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
              }`}
            >
              {t('bookCard.buy', 'Buy')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
