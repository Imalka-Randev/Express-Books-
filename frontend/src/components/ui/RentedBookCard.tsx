import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface RentedBookCardProps {
  item: {
    book: any;
    dueDate: string;
  };
  onExtend: (bookId: string) => void;
  isHistory?: boolean;
}

const RentedBookCard: FC<RentedBookCardProps> = ({ item, onExtend, isHistory = false }) => {
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
    <div className="relative flex p-4 rounded-xl border transition-all bg-[#112240] border-white/10 shadow-lg group hover:border-primary-container/30 w-full md:w-[450px]">
      
      {/* Extend Rental Button (Top Right) */}
      {!isHistory && (
        <div className="absolute top-4 right-4">
          <button 
            onClick={() => onExtend(book._id)}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-bold rounded-lg transition-colors"
          >
            Extend Rental
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
      <div className="flex-1 flex flex-col justify-center">
        {/* Rented Tag */}
        <div className="mb-2">
          <span className={`px-2 py-0.5 text-[10px] font-bold rounded-sm uppercase ${
            isHistory 
              ? 'bg-gray-500/20 text-gray-400'
              : 'bg-[#FFD700] text-black'
          }`}>
            {isHistory ? 'Returned' : 'Rented'}
          </span>
        </div>
        
        {/* Title & Author */}
        <h3 
          className="font-bold text-lg text-[#FFD700] cursor-pointer hover:underline line-clamp-1"
          onClick={() => navigate(`/book/${book._id}`)}
        >
          {book.title}
        </h3>
        <p className="text-sm text-gray-400 mb-4">{book.author}</p>

        {/* Due Date Section */}
        <div className={`inline-flex items-center gap-4 px-4 py-2.5 rounded-lg border w-fit ${
          isHistory 
            ? 'bg-white/5 border-white/5 text-gray-400' 
            : daysLeft <= 3 
              ? 'bg-red-500/10 border-red-500/20 text-red-400'
              : 'bg-[#FFD700]/10 border-[#FFD700]/20 text-[#FFD700]'
        }`}>
          <div className="flex items-center gap-2 font-bold text-sm">
            <span className="material-symbols-outlined text-[18px]">
              {isHistory ? 'history' : 'schedule'}
            </span>
            <span>{isHistory ? 'Returned:' : 'Due:'} {formattedDate}</span>
          </div>

          {!isHistory && (
            <div className={`flex items-center gap-1.5 pl-4 border-l ${
              daysLeft <= 3 ? 'border-red-500/20 text-red-400' : 'border-[#FFD700]/20 text-[#FFD700]'
            } font-bold text-sm`}>
              <span className="material-symbols-outlined text-[16px]">hourglass_empty</span>
              {daysLeft > 0 ? `${daysLeft}D LEFT` : 'OVERDUE'}
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default RentedBookCard;
