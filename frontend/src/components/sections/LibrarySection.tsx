import { useState, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import { useHome } from '../../hooks/useHome';
import BookCard from '../ui/BookCard';

const LibrarySection: FC = () => {
  const { t } = useTranslation();
  const { books, isLoading, error, handleSearch } = useHome();
  const [activeFilter, setActiveFilter] = useState('');
  const [showAllGenres, setShowAllGenres] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const quickFilters = ['All', 'Science Fiction', 'Mystery', 'Business', 'Romance', 'Fantasy'];

  const onFilterClick = (filter: string) => {
    setActiveFilter(filter);
    setSearchTerm('');
    handleSearch(filter === 'All' ? '' : filter);
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setActiveFilter('');
    handleSearch(e.target.value);
  };

  // Get all unique genres from current books to create rows
  const allGenres = Array.from(new Set(books?.flatMap(b => b.genres || []) || [])).sort();

  return (
    <section id="library" className="pt-24 pb-12 min-h-screen px-4 md:px-8">
      {/* Search & Quick Filters */}
      <div className="mb-16">
        <div className="relative max-w-2xl mx-auto mb-8">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 z-10" size={24} />
          <input 
            value={searchTerm}
            onChange={onSearchChange}
            className="relative w-full h-14 pl-14 pr-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:border-primary dark:focus:border-primary-container focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-gray-500 dark:placeholder:text-gray-400 shadow-sm" 
            placeholder={t('home.searchPlaceholder', 'Search by title, author, or genre...')} 
            type="text" 
          />
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {quickFilters.map((filter) => (
            <button 
              key={filter}
              onClick={() => onFilterClick(filter)}
              className={`px-5 py-2 rounded-full font-label-md text-sm transition-all ${
                activeFilter === filter || (activeFilter === '' && filter === 'All')
                  ? 'bg-primary dark:bg-primary-container text-white dark:text-black shadow-md' 
                  : 'bg-gray-100 dark:bg-[#1a2b40] text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-[#2d435e] border border-gray-300 dark:border-[#2d435e]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Genre Rows */}
      <div className="space-y-16">
        {isLoading ? (
          <div className="flex justify-center p-12">
            <div className="w-12 h-12 border-4 border-primary dark:border-primary-container border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center p-12 text-red-500 font-label-md">{error}</div>
        ) : books?.length === 0 ? (
          <div className="text-center p-12 text-gray-500 dark:text-gray-400 font-body-lg">
            {t('home.noBooksFound', 'No books found. Try adjusting your search.')}
          </div>
        ) : (
          <>
            {/* Take first 3 genres unless showAllGenres is true */}
            {allGenres.slice(0, showAllGenres ? allGenres.length : 3).map(genre => {
              const genreBooks = books?.filter(b => b.genres?.includes(genre)) || [];
              if (genreBooks.length === 0) return null;

              return (
                <div key={genre} className="relative">
                  <h2 className="text-2xl font-headline-lg font-bold text-gray-900 dark:text-white mb-6 pl-2 border-l-4 border-secondary">
                    {genre}
                  </h2>
                  <div 
                    className="relative w-full"
                    style={{
                      maskImage: 'linear-gradient(to right, transparent, black 1%, black 99%, transparent)',
                      WebkitMaskImage: 'linear-gradient(to right, transparent, black 1%, black 99%, transparent)'
                    }}
                  >
                    <div className="flex overflow-x-auto gap-6 pb-8 px-4 snap-x snap-mandatory custom-scrollbar hide-scrollbar">
                      {genreBooks.map((book) => (
                        <div key={book._id} className="w-[240px] sm:w-[280px] md:w-[320px] snap-start shrink-0">
                          <BookCard book={book} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Show More / Show Less Toggle */}
            {allGenres.length > 3 && (
              <div className="flex justify-center mt-12">
                <button 
                  onClick={() => setShowAllGenres(!showAllGenres)}
                  className="px-8 py-3 rounded-full border-2 border-primary dark:border-secondary text-primary dark:text-secondary-fixed-dim font-bold hover:bg-primary/10 transition-colors"
                >
                  {showAllGenres ? 'Show Less Categories' : 'Show More Categories'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default LibrarySection;
