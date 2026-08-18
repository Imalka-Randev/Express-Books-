import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProfileRentedBooksProps {
  rentedBooks: any[];
}

const ProfileRentedBooks: FC<ProfileRentedBooksProps> = ({ rentedBooks }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 font-display-lg">Rented Books</h1>
        <p className="text-gray-400">Track your active rentals, due dates, and return books.</p>
      </header>

      {rentedBooks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 bg-[#112240]/40 rounded-2xl border border-white/5">
          <span className="material-symbols-outlined text-6xl mb-4 opacity-50">history_edu</span>
          <p className="text-lg font-bold text-white mb-2">No active rentals</p>
          <p className="text-sm max-w-md text-center mb-6">You don't have any books currently rented. Need something to read for a short time?</p>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-500 transition-all active:scale-95 shadow-lg shadow-blue-500/20"
          >
            Explore Rentals
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rentedBooks.map((item) => {
            // Mock a due date based on the rent period logic
            const dueDate = new Date();
            dueDate.setDate(dueDate.getDate() + (item.rentDays || 7));
            
            return (
              <div key={item.book._id} className="bg-[#112240] rounded-xl p-4 shadow-sm flex gap-4 items-start group border border-white/10 relative overflow-hidden">
                <div className="w-24 h-36 flex-shrink-0 shadow-lg rounded-sm overflow-hidden cursor-pointer" onClick={() => navigate(`/book/${item.book._id}`)}>
                  <img 
                    alt={item.book.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    src={item.book.coverImageUrl}
                  />
                </div>
                <div className="flex-1 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <span className="bg-primary-container text-black text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
                        Rented
                      </span>
                      <span className="text-xs font-bold text-gray-400">{item.rentDays || 7} Days</span>
                    </div>
                    <h4 
                      className="font-bold text-[16px] leading-tight text-white mb-1 group-hover:text-primary-container transition-colors cursor-pointer line-clamp-2"
                      onClick={() => navigate(`/book/${item.book._id}`)}
                    >
                      {item.book.title}
                    </h4>
                    <p className="text-[13px] text-gray-400 mb-2 line-clamp-1">{item.book.author}</p>
                  </div>
                  
                  <div className="mt-auto">
                    <div className="flex items-center gap-2 mb-3 bg-red-500/10 text-red-400 px-3 py-1.5 rounded-lg border border-red-500/20">
                      <span className="material-symbols-outlined text-[16px]">schedule</span>
                      <span className="text-xs font-bold">Due: {dueDate.toLocaleDateString()}</span>
                    </div>
                    <button className="w-full text-center py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-bold rounded-lg transition-colors border border-white/10">
                      Extend Rental
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProfileRentedBooks;
