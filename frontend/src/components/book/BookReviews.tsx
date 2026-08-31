import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

const BookReviews: FC = () => {
  const { t } = useTranslation();
  return (
    <section className="mt-8 border-t border-gray-200 dark:border-white/10 pt-12">
      <h2 className="font-headline-lg text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary dark:text-primary-fixed">forum</span> 
        {t('reviews.title', 'Reader Reviews')}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Review 1 */}
        <div className="bg-white dark:bg-[#112240] p-6 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <img 
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d" 
              alt="User Avatar" 
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-label-md font-bold text-gray-900 dark:text-white">Sarah J.</p>
              <div className="flex text-primary dark:text-primary-fixed text-sm">
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
            </div>
          </div>
          <p className="font-body-md text-gray-700 dark:text-gray-300 line-clamp-4 leading-relaxed">
            {t('reviews.review1', "A truly transformative read. The way the author structures the narrative makes complex concepts completely accessible. I couldn't put it down and have already recommended it to all my colleagues!")}
          </p>
        </div>

        {/* Review 2 - Highlighted */}
        <div className="bg-gradient-to-br from-primary-container/30 to-transparent dark:from-primary/10 dark:to-transparent dark:bg-[#112240] p-6 rounded-2xl border border-primary/20 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-primary dark:bg-primary-fixed text-white dark:text-on-primary-fixed px-3 py-1 rounded-bl-lg font-bold text-xs flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">workspace_premium</span> {t('reviews.topContributor', 'Top Contributor')}
          </div>
          <div className="flex items-center gap-4 mb-4">
            <img 
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d" 
              alt="User Avatar" 
              className="w-12 h-12 rounded-full object-cover border-2 border-primary dark:border-primary-fixed"
            />
            <div>
              <p className="font-label-md font-bold text-gray-900 dark:text-white flex items-center gap-2">
                Michael T.
              </p>
              <div className="flex text-primary dark:text-primary-fixed text-sm">
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[16px]">star_half</span>
              </div>
            </div>
          </div>
          <p className="font-body-md text-gray-700 dark:text-gray-300 line-clamp-4 leading-relaxed">
            {t('reviews.review2', 'The Express Book delivery was incredible—arrived just 45 minutes after I ordered. The book itself is a masterpiece of modern literature, providing insights that are rarely found in this genre.')}
          </p>
        </div>

        {/* Review 3 */}
        <div className="bg-white dark:bg-[#112240] p-6 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4 mb-4">
            <img 
              src="https://i.pravatar.cc/150?u=a04258114e29026702d" 
              alt="User Avatar" 
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-label-md font-bold text-gray-900 dark:text-white">Elena R.</p>
              <div className="flex text-primary dark:text-primary-fixed text-sm">
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
            </div>
          </div>
          <p className="font-body-md text-gray-700 dark:text-gray-300 line-clamp-4 leading-relaxed">
            {t('reviews.review3', "Beautiful edition with the gold foil spine. The physical quality of the book matches the brilliance of the words inside. A must-have for any serious collector's library!")}
          </p>
        </div>
      </div>
      <button className="mt-6 text-primary hover:text-primary/80 dark:text-primary-fixed dark:hover:text-primary-fixed-dim font-bold font-label-md flex items-center gap-1 transition-colors">
        {t('reviews.readAll', 'Read all reviews')} <span className="material-symbols-outlined">arrow_forward</span>
      </button>
    </section>
  );
};

export default BookReviews;
