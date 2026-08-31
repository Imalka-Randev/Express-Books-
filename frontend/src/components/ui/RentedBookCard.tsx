import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface RentedBookCardProps {
  item: {
    book: any;
    dueDate: string;
  };
  onExtend: (bookId: string) => void;
  isHistory?: boolean;
}

const RentedBookCard: FC<RentedBookCardProps> = ({ item, onExtend, isHistory = false }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const book = item.book || item; // Fallback just in case

  // Calculate days left
  const calculateDaysLeft = (dueDateStr: string) => {
    const due = new Date(dueDateStr);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysLeft = calculateDaysLeft(item.dueDate);
  const formattedDate = new Date(item.dueDate).toLocaleDateString(undefined, {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="relative flex p-4 rounded-xl border transition-all bg-white dark:bg-[#112240] border-gray-200 dark:border-white/10 shadow-lg group hover:border-primary/30 dark:hover:border-primary-container/30 w-full md:w-[450px]">
      
      {/* Extend Rental Button (Top Right) */}
      {!isHistory && (
        <div className="absolute top-4 right-4">
          <button 
            onClick={() => onExtend(book._id)}
            className="px-3 md:px-4 py-1.5 md:py-2 bg-[#FFD700] hover:bg-[#FFC000] text-black text-xs md:text-sm font-bold rounded-lg transition-colors shadow-md"
          >
            <span className="md:hidden">{t('rentedBookCard.extend', 'Extend')}</span>
            <span className="hidden md:inline">{t('rentedBookCard.extendRental', 'Extend Rental')}</span>
          </button>
        </div>
      )}

      {/* Book Cover */}
      <div 
        className="w-24 shrink-0 aspect-[2/3] rounded-lg overflow-hidden shadow-md cursor-pointer mr-5 relative group-hover:shadow-primary-container/20 transition-all"
        onClick={() => navigate(`/book/${book._id}`)}
      >
        <img
          src={book.coverImageUrl}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Cover Overlay for navigation hint */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
           <span className="material-symbols-outlined text-white">visibility</span>
        </div>
      </div>

      {/* Book Details */}
      <div className="flex-1 flex flex-col justify-center min-w-0 mt-3 md:mt-2">
        {/* Due Date (Moved up to replace Rented tag) */}
        <div className="mb-1">
          <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
            {isHistory ? t('rentedBookCard.returned', 'Returned:') : t('rentedBookCard.due', 'Due:')} {formattedDate}
          </span>
        </div>
        
        {/* Title & Author */}
        <h3 
          className="font-bold text-lg text-gray-900 dark:text-white cursor-pointer hover:underline line-clamp-1 pr-20 md:pr-[120px]"
          onClick={() => navigate(`/book/${book._id}`)}
        >
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-1 pr-20 md:pr-[120px]">{book.author}</p>

        {/* Remaining Time Section */}
        {!isHistory && (
          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border w-fit mt-auto ${
            daysLeft <= 3 
              ? 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400' 
              : 'bg-primary/10 border-primary/20 text-primary-fixed-dim dark:bg-[#FFD700]/10 dark:border-[#FFD700]/20 dark:text-[#FFD700]'
          } font-bold text-xs md:text-sm`}>
            <span className="material-symbols-outlined text-[14px] md:text-[16px]">hourglass_empty</span>
            {daysLeft > 0 ? t('rentedBookCard.daysLeft', { days: daysLeft, defaultValue: '{{days}}D LEFT' }) : t('rentedBookCard.overdue', 'OVERDUE')}
          </div>
        )}
      </div>

    </div>
  );
};

export default RentedBookCard;
