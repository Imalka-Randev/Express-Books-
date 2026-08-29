import { type FC } from 'react';

const ProfileRightSidebar: FC = () => {
  return (
    <aside className="lg:col-span-4 flex flex-col gap-6">
      <h3 className="font-title-md text-xl font-bold text-gray-900 dark:text-white border-b border-white/20 pb-2">Curated for You</h3>
      
      {/* Featured Book 1 */}
      <div className="bg-white dark:bg-[#112240] rounded-xl p-4 shadow-sm flex gap-4 items-start group cursor-pointer hover:bg-white dark:bg-[#112240]/80 border border-gray-200 dark:border-white/10 transition-colors relative overflow-hidden">
        {/* Status Badge */}
        <div className="absolute top-2 left-2 bg-blue-500 text-gray-900 dark:text-white text-[10px] font-bold px-2 py-0.5 rounded-sm z-10 shadow-sm uppercase tracking-wider">PDF</div>
        <div className="w-20 h-28 flex-shrink-0 shadow-lg rounded-sm overflow-hidden">
          <img 
            alt="Book cover" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            src="https://m.media-amazon.com/images/I/81vpsIs58WL._AC_UF1000,1000_QL80_.jpg"
          />
        </div>
        <div className="flex-1">
          <h4 className="font-title-md text-[16px] leading-tight text-gray-900 dark:text-white mb-1 group-hover:text-primary-container transition-colors">The Quantum Architect</h4>
          <p className="font-body-md text-[13px] text-gray-500 dark:text-gray-400 mb-2">By Sarah Jenkins</p>
          <div className="flex gap-2">
            <span className="inline-block px-2 py-1 rounded bg-[#0a192f] text-gray-500 dark:text-gray-400 font-label-sm text-[10px] border border-white/20">Sci-Fi</span>
            <span className="inline-block px-2 py-1 rounded bg-[#0a192f] text-gray-500 dark:text-gray-400 font-label-sm text-[10px] border border-white/20">Trending</span>
          </div>
          <button className="mt-3 text-blue-300 font-label-sm text-xs font-bold hover:underline flex items-center gap-1 group-hover:text-primary-container transition-colors">
            View Details <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Featured Book 2 */}
      <div className="bg-white dark:bg-[#112240] rounded-xl p-4 shadow-sm flex gap-4 items-start group cursor-pointer hover:bg-white dark:bg-[#112240]/80 border border-gray-200 dark:border-white/10 transition-colors relative overflow-hidden">
        {/* Status Badge */}
        <div className="absolute top-2 left-2 bg-primary-container text-black text-[10px] font-bold px-2 py-0.5 rounded-sm z-10 shadow-sm uppercase tracking-wider">Rent</div>
        <div className="w-20 h-28 flex-shrink-0 shadow-lg rounded-sm overflow-hidden">
          <img 
            alt="Book cover" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            src="https://m.media-amazon.com/images/I/81Q1IUBte7L._AC_UF1000,1000_QL80_.jpg"
          />
        </div>
        <div className="flex-1">
          <h4 className="font-title-md text-[16px] leading-tight text-gray-900 dark:text-white mb-1 group-hover:text-primary-container transition-colors">Design Systems</h4>
          <p className="font-body-md text-[13px] text-gray-500 dark:text-gray-400 mb-2">By Marcus Cole</p>
          <div className="flex gap-2">
            <span className="inline-block px-2 py-1 rounded bg-[#0a192f] text-gray-500 dark:text-gray-400 font-label-sm text-[10px] border border-white/20">Non-Fiction</span>
          </div>
          <button className="mt-3 text-blue-300 font-label-sm text-xs font-bold hover:underline flex items-center gap-1 group-hover:text-primary-container transition-colors">
            View Details <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Ambient Decorative Element */}
      <div className="mt-auto h-32 rounded-xl relative overflow-hidden opacity-80 border border-gray-200 dark:border-white/10 bg-gradient-to-br from-[#0a192f] to-[#112240]">
        <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-primary-fixed/20 rounded-full blur-2xl"></div>
        <div className="absolute top-4 left-4 w-16 h-16 bg-blue-500/20 rounded-full blur-xl"></div>
        <div className="relative z-10 w-full h-full flex items-center justify-center p-4 text-center">
          <p className="font-headline-lg text-[16px] font-medium text-gray-600 dark:text-gray-300 italic">"A room without books is like a body without a soul."</p>
        </div>
      </div>
    </aside>
  );
};

export default ProfileRightSidebar;
