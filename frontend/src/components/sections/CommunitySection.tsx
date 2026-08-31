import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

const CommunitySection: FC = () => {
  const { t } = useTranslation();

  return (
    <section id="community" className="pt-24 pb-12 min-h-screen px-4 md:px-8">
      <div className="flex flex-col gap-12 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col gap-4 text-center md:text-left">
          <h2 className="font-headline-lg text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            {t('community.title', 'Discover Communities')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            {t('community.subtitle', 'Experience curated speed, together. Join reading clubs to share insights, discover rare titles faster, and connect with minds that match your pace.')}
          </p>
        </div>

        {/* Filter Chips */}
        <div 
          className="relative w-full"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 1%, black 99%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 1%, black 99%, transparent)'
          }}
        >
          <div className="flex gap-3 overflow-x-auto pb-2 px-4 custom-scrollbar hide-scrollbar snap-x">
            <button className="whitespace-nowrap snap-start px-4 py-2 rounded-full border-2 border-primary-container bg-primary-container/10 text-primary-fixed dark:text-primary-container font-label-sm font-bold shadow-sm transition-all hover:bg-primary-container hover:text-black">{t('community.trending', 'Trending Now')}</button>
            <button className="whitespace-nowrap snap-start px-4 py-2 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-[#16273b] text-gray-700 dark:text-white font-label-sm shadow-sm transition-all hover:bg-gray-50 dark:hover:bg-[#2d435e]">{t('community.fastReaders', 'Fast Readers')}</button>
            <button className="whitespace-nowrap snap-start px-4 py-2 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-[#16273b] text-gray-700 dark:text-white font-label-sm shadow-sm transition-all hover:bg-gray-50 dark:hover:bg-[#2d435e]">{t('community.classics', 'Classic Literature')}</button>
            <button className="whitespace-nowrap snap-start px-4 py-2 rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-[#16273b] text-gray-700 dark:text-white font-label-sm shadow-sm transition-all hover:bg-gray-50 dark:hover:bg-[#2d435e]">{t('community.sciFi', 'Sci-Fi Enthusiasts')}</button>
          </div>
        </div>

        {/* Community Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <article className="bg-white dark:bg-[#16273b] rounded-2xl shadow-xl hover:shadow-2xl border border-gray-200 dark:border-[#2d435e] overflow-hidden flex flex-col group hover:-translate-y-1 transition-transform duration-300">
            <div className="h-48 w-full relative">
              <div 
                className="bg-cover bg-center w-full h-full group-hover:scale-105 transition-transform duration-500" 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80')" }} 
              />

            </div>
            <div className="p-6 flex flex-col flex-1 gap-4">
              <div>
                <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">{t('community.club1Title', 'Sci-Fi Speed Readers')}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{t('community.club1Desc', 'Exploring the vastness of space, one rapid page turn at a time. Weekly deep dives into hard sci-fi.')}</p>
              </div>
              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-100 dark:border-[#2d435e]">
                <div className="flex items-center gap-1 text-gray-500">
                  <span className="material-symbols-outlined text-[18px]">group</span>
                  <span className="text-xs font-bold">1.2k {t('community.members', 'Members')}</span>
                </div>
                <div className="flex -space-x-2 ml-auto">
                  <img className="w-8 h-8 rounded-full border-2 border-white dark:border-[#16273b] object-cover ring-2 ring-transparent group-hover:ring-primary-container transition-all" alt="Avatar 1" src="https://i.pravatar.cc/150?u=1" />
                  <img className="w-8 h-8 rounded-full border-2 border-white dark:border-[#16273b] object-cover" alt="Avatar 2" src="https://i.pravatar.cc/150?u=2" />
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-[#2d435e] border-2 border-white dark:border-[#16273b] flex items-center justify-center text-xs font-bold text-gray-600 dark:text-white">+5</div>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button className="flex-1 bg-transparent border-2 border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-300 py-2 rounded-xl text-sm font-bold hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">{t('community.details', 'Details')}</button>
                <button className="flex-1 bg-primary-container text-black py-2 rounded-xl text-sm font-bold hover:bg-inverse-primary transition-colors">{t('community.join', 'Join Club')}</button>
              </div>
            </div>
          </article>

          {/* Card 2 */}
          <article className="bg-white dark:bg-[#16273b] rounded-2xl shadow-xl hover:shadow-2xl border border-gray-200 dark:border-[#2d435e] overflow-hidden flex flex-col group hover:-translate-y-1 transition-transform duration-300">
            <div className="h-48 w-full relative">
              <div 
                className="bg-cover bg-center w-full h-full group-hover:scale-105 transition-transform duration-500" 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80')" }} 
              />

            </div>
            <div className="p-6 flex flex-col flex-1 gap-4">
              <div>
                <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">{t('community.club2Title', 'The Classics Collective')}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{t('community.club2Desc', 'Savoring the foundational texts of modern literature. A slow-paced, thoughtful community for purists.')}</p>
              </div>
              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-100 dark:border-[#2d435e]">
                <div className="flex items-center gap-1 text-gray-500">
                  <span className="material-symbols-outlined text-[18px]">group</span>
                  <span className="text-xs font-bold">850 {t('community.members', 'Members')}</span>
                </div>
                <div className="flex -space-x-2 ml-auto">
                  <img className="w-8 h-8 rounded-full border-2 border-white dark:border-[#16273b] object-cover ring-2 ring-transparent group-hover:ring-primary-container transition-all" alt="Avatar 3" src="https://i.pravatar.cc/150?u=3" />
                  <img className="w-8 h-8 rounded-full border-2 border-white dark:border-[#16273b] object-cover" alt="Avatar 4" src="https://i.pravatar.cc/150?u=4" />
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-[#2d435e] border-2 border-white dark:border-[#16273b] flex items-center justify-center text-xs font-bold text-gray-600 dark:text-white">+3</div>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button className="flex-1 bg-transparent border-2 border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-300 py-2 rounded-xl text-sm font-bold hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">{t('community.details', 'Details')}</button>
                <button className="flex-1 bg-primary-container text-black py-2 rounded-xl text-sm font-bold hover:bg-inverse-primary transition-colors">{t('community.join', 'Join Club')}</button>
              </div>
            </div>
          </article>

          {/* Card 3 */}
          <article className="bg-white dark:bg-[#16273b] rounded-2xl shadow-xl hover:shadow-2xl border border-gray-200 dark:border-[#2d435e] overflow-hidden flex flex-col group hover:-translate-y-1 transition-transform duration-300">
            <div className="h-48 w-full relative">
              <div 
                className="bg-cover bg-center w-full h-full group-hover:scale-105 transition-transform duration-500" 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=800&q=80')" }} 
              />

            </div>
            <div className="p-6 flex flex-col flex-1 gap-4">
              <div>
                <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">{t('community.club3Title', 'Digital Nomads Library')}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">{t('community.club3Desc', 'Reading on the go. Focus on business, self-improvement, and tech-forward non-fiction.')}</p>
              </div>
              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-100 dark:border-[#2d435e]">
                <div className="flex items-center gap-1 text-gray-500">
                  <span className="material-symbols-outlined text-[18px]">group</span>
                  <span className="text-xs font-bold">3.4k {t('community.members', 'Members')}</span>
                </div>
                <div className="flex -space-x-2 ml-auto">
                  <img className="w-8 h-8 rounded-full border-2 border-white dark:border-[#16273b] object-cover ring-2 ring-transparent group-hover:ring-primary-container transition-all" alt="Avatar 5" src="https://i.pravatar.cc/150?u=5" />
                  <img className="w-8 h-8 rounded-full border-2 border-white dark:border-[#16273b] object-cover" alt="Avatar 6" src="https://i.pravatar.cc/150?u=6" />
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-[#2d435e] border-2 border-white dark:border-[#16273b] flex items-center justify-center text-xs font-bold text-gray-600 dark:text-white">+12</div>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button className="flex-1 bg-transparent border-2 border-gray-300 dark:border-gray-500 text-gray-700 dark:text-gray-300 py-2 rounded-xl text-sm font-bold hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">{t('community.details', 'Details')}</button>
                <button className="flex-1 bg-primary-container text-black py-2 rounded-xl text-sm font-bold hover:bg-inverse-primary transition-colors">{t('community.join', 'Join Club')}</button>
              </div>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
