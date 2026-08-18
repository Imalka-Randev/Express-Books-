import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

const AboutSection: FC = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="pt-24 pb-12 min-h-[80vh] flex flex-col justify-center px-4 md:px-8">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-headline-lg font-bold text-gray-900 dark:text-white mb-6">
          {t('about.title', 'About Express Books')}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 font-body-lg max-w-2xl mx-auto leading-relaxed">
          {t('about.subtitle', 'We bridge the gap between traditional reading and modern convenience. Instantly access the E-Books and Audiobooks you love.')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {/* Mission */}
        <div className="group bg-white/50 dark:bg-black/20 backdrop-blur-sm p-8 rounded-3xl border border-gray-200 dark:border-white/5 shadow-xl transition-all duration-300 hover:scale-105 hover:bg-primary dark:hover:bg-primary-container">
          <div className="w-14 h-14 bg-primary-container text-black rounded-2xl flex items-center justify-center mb-6 shadow-md shadow-primary/20 group-hover:bg-white dark:group-hover:bg-black group-hover:text-primary dark:group-hover:text-primary-container transition-colors">
            <span className="material-symbols-outlined text-3xl">rocket_launch</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-white dark:group-hover:text-black transition-colors">Our Mission</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-white/90 dark:group-hover:text-black/80 transition-colors mb-5">
            To make literature universally accessible through a seamless digital experience — eliminating the wait between discovering a book and turning its first page.
          </p>
          <ul className="space-y-2 mb-6">
            {['Zero delivery wait time', 'Available on all devices', 'Curated for every reader', 'Affordable memberships'].map(item => (
              <li key={item} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 group-hover:text-white/80 dark:group-hover:text-black/70 transition-colors">
                <span className="material-symbols-outlined text-[16px] text-primary-container group-hover:text-white dark:group-hover:text-black">check_circle</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-white/10 group-hover:border-white/30 dark:group-hover:border-black/20 transition-colors">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-container dark:text-primary-container group-hover:text-white dark:group-hover:text-black transition-colors">10,000+ books delivered</span>
            <span className="material-symbols-outlined text-[20px] text-primary-container group-hover:text-white dark:group-hover:text-black transition-colors">arrow_forward</span>
          </div>
        </div>

        {/* Vision */}
        <div className="group bg-white/50 dark:bg-black/20 backdrop-blur-sm p-8 rounded-3xl border border-gray-200 dark:border-white/5 shadow-xl transition-all duration-300 hover:scale-105 hover:bg-primary dark:hover:bg-primary-container">
          <div className="w-14 h-14 bg-secondary text-white rounded-2xl flex items-center justify-center mb-6 shadow-md shadow-secondary/20 group-hover:bg-white dark:group-hover:bg-black group-hover:text-secondary dark:group-hover:text-secondary-container transition-colors">
            <span className="material-symbols-outlined text-3xl">visibility</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-white dark:group-hover:text-black transition-colors">Our Vision</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-white/90 dark:group-hover:text-black/80 transition-colors mb-5">
            A world where communities are hyper-connected through shared digital libraries — where every book you desire is minutes away, in any language, on any device.
          </p>
          <ul className="space-y-2 mb-6">
            {['Global reader community', 'Multilingual support', 'Decentralized library system', 'AI-powered recommendations'].map(item => (
              <li key={item} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 group-hover:text-white/80 dark:group-hover:text-black/70 transition-colors">
                <span className="material-symbols-outlined text-[16px] text-primary-container group-hover:text-white dark:group-hover:text-black">check_circle</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-white/10 group-hover:border-white/30 dark:group-hover:border-black/20 transition-colors">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-container dark:text-primary-container group-hover:text-white dark:group-hover:text-black transition-colors">5,000+ active members</span>
            <span className="material-symbols-outlined text-[20px] text-primary-container group-hover:text-white dark:group-hover:text-black transition-colors">arrow_forward</span>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="group bg-white/50 dark:bg-black/20 backdrop-blur-sm p-8 rounded-3xl border border-gray-200 dark:border-white/5 shadow-xl transition-all duration-300 hover:scale-105 hover:bg-primary dark:hover:bg-primary-container">
          <div className="w-14 h-14 bg-gray-900 text-white dark:bg-white dark:text-black rounded-2xl flex items-center justify-center mb-6 shadow-md shadow-gray-900/20 group-hover:bg-white dark:group-hover:bg-black group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
            <span className="material-symbols-outlined text-3xl">gavel</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-white dark:group-hover:text-black transition-colors">Terms & Conditions</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-white/90 dark:group-hover:text-black/80 transition-colors mb-5">
            We are committed to a safe, transparent, and respectful environment for all members of our growing digital community.
          </p>
          <ul className="space-y-2 mb-6">
            {['Fair usage policy', 'No hidden charges', 'Your data stays private', 'Cancel anytime, no fees'].map(item => (
              <li key={item} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 group-hover:text-white/80 dark:group-hover:text-black/70 transition-colors">
                <span className="material-symbols-outlined text-[16px] text-primary-container group-hover:text-white dark:group-hover:text-black">check_circle</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-white/10 group-hover:border-white/30 dark:group-hover:border-black/20 transition-colors">
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-primary dark:text-secondary-fixed-dim group-hover:text-white dark:group-hover:text-black transition-colors underline">Read full policy</a>
            <span className="material-symbols-outlined text-[20px] text-primary-container group-hover:text-white dark:group-hover:text-black transition-colors">description</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
