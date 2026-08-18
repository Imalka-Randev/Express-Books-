import { type FC, useState, useEffect } from 'react';

const books = [
  { id: 1, title: 'A Game of Thrones', cover: '/images/books/game-of-thrones.jpg', category: 'Fantasy' },
  { id: 2, title: 'Dune', cover: '/images/books/dune.jpg', category: 'Sci-Fi' },
  { id: 3, title: '1984', cover: '/images/books/1984.jpg', category: 'Classic' },
  { id: 4, title: 'The Hobbit', cover: '/images/books/the-hobbit.jpg', category: 'Fantasy' },
  { id: 5, title: 'Steve Jobs', cover: '/images/books/steve-jobs.jpg', category: 'Biography' },
];

const HeroImages: FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Automatic right-to-left rotation every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % books.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getCardStyle = (index: number) => {
    const diff = (index - activeIndex + books.length) % books.length;
    
    // diff === 0 : Active Center Book
    if (diff === 0) {
      return {
        transform: 'translateX(0) scale(1) rotateY(0deg)',
        zIndex: 30,
        opacity: 1,
        // Static golden glow instead of blinking
        className: 'border-l-[12px] border-l-[#d4af37] dark:border-l-[#b8860b] shadow-[0_0_40px_rgba(255,215,0,0.6)] ring-2 ring-primary-container hover:scale-105'
      };
    } 
    // diff === 1 : Right Book (Next in sequence, visually behind and to the right)
    else if (diff === 1) {
      return {
        transform: 'translateX(clamp(100px, 25vw, 160px)) scale(0.8) rotateY(-15deg)',
        zIndex: 20,
        opacity: 0.5,
        className: 'border-l-[10px] border-l-gray-300 dark:border-l-gray-800 shadow-[20px_0_30px_rgba(0,0,0,0.5)] brightness-75 hover:brightness-100 hover:-translate-y-2'
      };
    } 
    // diff === 4 : Left Book (Previous in sequence, visually behind and to the left)
    else if (diff === books.length - 1) {
      return {
        transform: 'translateX(clamp(-160px, -25vw, -100px)) scale(0.8) rotateY(15deg)',
        zIndex: 20,
        opacity: 0.5,
        className: 'border-l-[10px] border-l-gray-300 dark:border-l-gray-800 shadow-[-20px_0_30px_rgba(0,0,0,0.5)] brightness-75 hover:brightness-100 hover:-translate-y-2'
      };
    } 
    // Hidden Books (Waiting to cycle in)
    else {
      // Determine if it should hide to the right or left based on its distance
      const isRightSide = diff === 2;
      return {
        transform: `translateX(clamp(${isRightSide ? '160px' : '-240px'}, ${isRightSide ? '40vw' : '-40vw'}, ${isRightSide ? '240px' : '-160px'})) scale(0.6) rotateY(${isRightSide ? '-30deg' : '30deg'})`,
        zIndex: 10,
        opacity: 0,
        className: 'border-l-[10px] border-l-gray-800 pointer-events-none'
      };
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full max-w-lg h-[260px] sm:h-[350px] md:h-[450px] flex items-center justify-center [perspective:1200px] select-none">
        {books.map((book, index) => {
          const style = getCardStyle(index);
          
          return (
              <div
              key={book.id}
              onClick={() => setActiveIndex(index)}
              className={`absolute w-32 sm:w-48 md:w-64 lg:w-72 aspect-[2/3] transition-all duration-[1000ms] ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer rounded-r-lg rounded-l-sm bg-gray-900 overflow-hidden ${style.className}`}
              style={{
                transform: style.transform,
                zIndex: style.zIndex,
                opacity: style.opacity,
              }}
            >
              {/* Book Cover Image */}
              <img 
                src={book.cover} 
                alt={book.title}
                className="w-full h-full object-cover rounded-r-lg rounded-l-sm"
                draggable="false"
              />
              
              {/* Edge Shadow Highlight for realism (simulate the curve of a book cover near the spine) */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-white/10 pointer-events-none" />
            </div>
          );
        })}
      </div>

      {/* Category Text (Fade Up Animation) */}
      <div className="relative h-1 flex items-center justify-center w-full mt-4">
        {books.map((book, index) => (
          <p
            key={book.id}
            className={`absolute font-body-md text-xl md:text-2xl tracking-widest uppercase font-bold text-gray-900 dark:text-white transition-all duration-[800ms] ease-out
              ${index === activeIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 pointer-events-none'}
            `}
          >
            {book.category}
          </p>
        ))}
      </div>
    </div>
  );
};

export default HeroImages;
