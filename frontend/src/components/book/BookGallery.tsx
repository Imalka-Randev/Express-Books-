import { type FC } from 'react';

interface BookGalleryProps {
  coverImage: string;
  title: string;
}

const BookGallery: FC<BookGalleryProps> = ({ coverImage, title }) => {
  return (
    <div className="lg:col-span-5 flex justify-center sticky top-24">
      {/* Front Cover Container */}
      <div className="w-full max-w-[400px] relative aspect-[2/3] rounded-xl overflow-hidden shadow-2xl bg-inverse-surface dark:bg-surface-container-high border border-outline-variant/30 flex justify-center items-center group">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />
        <img
          src={coverImage}
          alt={`${title} Front Cover`}
          className="absolute inset-0 w-full h-full object-cover shadow-[-12px_0_24px_rgba(0,0,0,0.6)] transition-transform duration-700 group-hover:scale-[1.02]"
          draggable="false"
        />
      </div>
    </div>
  );
};

export default BookGallery;
