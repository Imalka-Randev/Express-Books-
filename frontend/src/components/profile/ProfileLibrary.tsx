import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProfileLibraryProps {
  purchasedBooks: any[];
}

const ProfileLibrary: FC<ProfileLibraryProps> = ({ purchasedBooks }) => {
  const navigate = useNavigate();
  const ownedBooks = purchasedBooks;

  return (
    <div className="w-full">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2 font-display-lg">My Library</h1>
        <p className="text-gray-400">Access and manage all your purchased E-Books.</p>
      </header>

      {ownedBooks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 bg-[#112240]/40 rounded-2xl border border-white/5">
          <span className="material-symbols-outlined text-6xl mb-4 opacity-50">library_books</span>
          <p className="text-lg font-bold text-white mb-2">Your library is empty</p>
          <p className="text-sm max-w-md text-center mb-6">You haven't purchased any books yet. Browse our collection to start building your digital library.</p>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-2.5 bg-primary-container text-black font-bold rounded-full hover:bg-inverse-primary transition-all active:scale-95 shadow-lg shadow-primary-container/20"
          >
            Browse Books
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {ownedBooks.map((item) => (
            <div key={item.book._id} className="group flex flex-col gap-3 cursor-pointer" onClick={() => navigate(`/book/${item.book._id}`)}>
              <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-lg border border-white/10 group-hover:border-primary-container/50 transition-colors">
                <img
                  src={item.book.coverImageUrl}
                  alt={item.book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  <span className="bg-green-500 text-white px-2 py-0.5 text-[10px] font-bold rounded-sm uppercase shadow-sm">
                    Owned
                  </span>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-full p-3 transition-colors">
                    <span className="material-symbols-outlined text-[24px]">menu_book</span>
                  </button>
                </div>
              </div>
              <div>
                <p className="font-bold text-sm text-gray-200 group-hover:text-primary-container transition-colors line-clamp-1">{item.book.title}</p>
                <p className="text-xs text-gray-500 line-clamp-1">{item.book.author}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileLibrary;
