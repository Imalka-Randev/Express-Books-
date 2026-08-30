import { type FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RentedBookCard from '../ui/RentedBookCard';
import RentExtensionPayment from '../payment/RentExtensionPayment';
import { useSelector } from 'react-redux';
import { type RootState } from '../../store/store';

interface ProfileRentedBooksProps {
  rentedBooks: any[];
}

const ProfileRentedBooks: FC<ProfileRentedBooksProps> = ({ rentedBooks }) => {
  const navigate = useNavigate();
  const [extendingBookId, setExtendingBookId] = useState<string | null>(null);
  const { purchasedBooks } = useSelector((state: RootState) => state.library);

  const activeRentals: any[] = [];
  const rentalHistory: any[] = [];

  const isOwned = (bookId: string) => purchasedBooks.some(p => (p._id || (p as any).book?._id) === bookId);

  rentedBooks.forEach(item => {
    const bookId = item.book._id || item.book;
    if (isOwned(bookId)) return;

    if (!item.dueDate) {
      rentalHistory.push(item);
      return;
    }
    const dueDate = new Date(item.dueDate);
    if (isNaN(dueDate.getTime())) {
      rentalHistory.push(item);
      return;
    }
    
    const now = new Date();
    const timeDiff = dueDate.getTime() - now.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysLeft > 0) {
      activeRentals.push({ ...item, daysLeft, dueDate });
    } else {
      rentalHistory.push({ ...item, daysLeft, dueDate });
    }
  });

  return (
    <div className="w-full">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 font-display-lg">Rented Books</h1>
        <p className="text-gray-500 dark:text-gray-400">Track your active rentals, due dates, and return books.</p>
      </header>

      {activeRentals.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500 dark:text-gray-400 bg-white dark:bg-[#112240]/40 rounded-2xl border border-white/5 mb-12">
          <span className="material-symbols-outlined text-6xl mb-4 opacity-50">history_edu</span>
          <p className="text-lg font-bold text-gray-900 dark:text-white mb-2">No active rentals</p>
          <p className="text-sm max-w-md text-center mb-6">You don't have any books currently rented. Need something to read for a short time?</p>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-2.5 bg-blue-600 text-gray-900 dark:text-white font-bold rounded-full hover:bg-blue-500 transition-all active:scale-95 shadow-lg shadow-blue-500/20"
          >
            Explore Rentals
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap gap-6 mb-12">
          {activeRentals.map((item) => (
            <div key={item.book._id} className="flex flex-col gap-4 w-full md:w-auto">
              <RentedBookCard 
                item={item} 
                onExtend={(bookId) => setExtendingBookId(extendingBookId === bookId ? null : bookId)} 
              />
              {extendingBookId === item.book._id && (
                <div className="w-full max-w-[450px]">
                  <RentExtensionPayment 
                    bookId={item.book._id}
                    onSuccess={() => setExtendingBookId(null)}
                    onCancel={() => setExtendingBookId(null)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Rented History Section */}
      {rentalHistory.length > 0 && (
        <div className="mt-12">
          <header className="mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">history</span>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-display-lg">Rental History</h2>
          </header>
          <div className="flex flex-wrap gap-6 opacity-70">
            {rentalHistory.map((item, idx) => (
              <div key={`${item.book._id}-${idx}`} className="w-full md:w-auto">
                <RentedBookCard 
                  item={item} 
                  onExtend={(bookId) => navigate(`/book/${bookId}`)} 
                  isHistory={true}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileRentedBooks;
