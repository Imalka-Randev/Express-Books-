import { type FC } from 'react';

const partners = [
  "Penguin Random House", "HarperCollins", "Macmillan", "Simon & Schuster", 
  "Scholastic", "Pearson", "Oxford", "Cambridge", "Disney Publishing", "Bloomsbury",
  "Hachette Book Group", "Pan Macmillan", "Wiley", "Springer Nature", "McGraw Hill",
  "Routledge", "Elsevier", "Cengage", "Taylor & Francis", "DK Publishing"
];

const TrustedPartners: FC = () => {
  return (
    <div className="w-full overflow-hidden flex flex-col items-center">
      <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-8">
        Our Trusted Partners
      </p>
      
      {/* Marquee Container */}
      <div className="w-full relative flex items-center max-w-[100vw] overflow-x-hidden">
        
        {/* Left fade gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-theme-light-bg dark:from-[#0a192f] to-transparent z-10"></div>

        {/* Scrolling Track */}
        <div className="flex gap-16 whitespace-nowrap animate-[marquee_40s_linear_infinite] px-8">
          {/* Duplicate the list twice for seamless looping */}
          {[...partners, ...partners].map((partner, idx) => (
            <div 
              key={idx} 
              className="flex flex-col items-center gap-2 text-xl font-headline-lg font-bold text-gray-600 dark:text-gray-300 opacity-80 hover:opacity-100 hover:text-primary dark:hover:text-primary-container transition-all"
            >
              <span className="material-symbols-outlined text-4xl">auto_stories</span>
              <span>{partner}</span>
            </div>
          ))}
        </div>

        {/* Right fade gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-theme-light-bg dark:from-[#0a192f] to-transparent z-10"></div>
      </div>
    </div>
  );
};

export default TrustedPartners;
