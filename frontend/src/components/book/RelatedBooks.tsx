import { type FC } from 'react';
import { type Book } from '../../store/bookSlice';
import BookCard from '../ui/BookCard';

interface RelatedBooksProps {
  books: Book[];
}

const RelatedBooks: FC<RelatedBooksProps> = ({ books }) => {
  // If no books available, don't render section
  if (!books || books.length === 0) return null;

  return (
    <section className="mt-8 border-t border-gray-200 dark:border-white/10 pt-12 mb-12">
      <h2 className="font-headline-lg text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary dark:text-primary-fixed">auto_awesome</span> 
        Related by Author & Genre
      </h2>
      <div 
        className="relative w-full"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)'
        }}
      >
        <div className="flex overflow-x-auto gap-6 pb-8 px-4 snap-x snap-mandatory custom-scrollbar hide-scrollbar">
          {books.map((book) => (
            <div key={book._id} className="min-w-[280px] sm:min-w-[320px] max-w-[320px] snap-start shrink-0">
              <BookCard book={book} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedBooks;
