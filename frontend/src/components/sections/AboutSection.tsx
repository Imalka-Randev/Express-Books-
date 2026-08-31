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
        <div className="group bg-white/50 dark:bg-black/20 backdrop-blur-sm p-8 rounded-3xl border border-gray-200 dark:border-white/5 shadow-xl transition-all duration-300 hover:scale-105 hover:bg-primary-fixed dark:hover:bg-primary-container">
          <div className="w-14 h-14 bg-white text-black rounded-2xl flex items-center justify-center mb-6 shadow-md shadow-white/20 group-hover:bg-white group-hover:text-black dark:group-hover:bg-[#0a192f] dark:group-hover:text-white transition-colors">
            <span className="material-symbols-outlined text-3xl">rocket_launch</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-black transition-colors">{t('about.missionTitle', 'Our Mission')}</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-black/80 transition-colors mb-5">
            {t('about.missionDesc', 'To make literature universally accessible through a seamless digital experience — eliminating the wait between discovering a book and turning its first page.')}
          </p>
          <ul className="space-y-2 mb-6">
            {(t('about.missionList', { returnObjects: true }) as string[]).map(item => (
              <li key={item} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 group-hover:text-black/70 transition-colors">
                <span className="material-symbols-outlined text-[16px] text-blue-500/75 dark:text-blue-400">check_circle</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-white/10 group-hover:border-black/20 transition-colors">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-container dark:text-primary-container group-hover:text-black transition-colors">{t('about.missionStat', '10,000+ books delivered')}</span>
            <span className="material-symbols-outlined text-[20px] text-primary-container group-hover:text-black transition-colors">arrow_forward</span>
          </div>
        </div>

        {/* Vision */}
        <div className="group bg-white/50 dark:bg-black/20 backdrop-blur-sm p-8 rounded-3xl border border-gray-200 dark:border-white/5 shadow-xl transition-all duration-300 hover:scale-105 hover:bg-primary-fixed dark:hover:bg-primary-container">
          <div className="w-14 h-14 bg-white text-black rounded-2xl flex items-center justify-center mb-6 shadow-md shadow-white/20 group-hover:bg-white group-hover:text-black dark:group-hover:bg-[#0a192f] dark:group-hover:text-white transition-colors">
            <span className="material-symbols-outlined text-3xl">visibility</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-black transition-colors">{t('about.visionTitle', 'Our Vision')}</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-black/80 transition-colors mb-5">
            {t('about.visionDesc', 'A world where communities are hyper-connected through shared digital libraries — where every book you desire is minutes away, in any language, on any device.')}
          </p>
          <ul className="space-y-2 mb-6">
            {(t('about.visionList', { returnObjects: true }) as string[]).map(item => (
              <li key={item} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 group-hover:text-black/70 transition-colors">
                <span className="material-symbols-outlined text-[16px] text-blue-500/75 dark:text-blue-400">check_circle</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-white/10 group-hover:border-black/20 transition-colors">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-container dark:text-primary-container group-hover:text-black transition-colors">{t('about.visionStat', '5,000+ active members')}</span>
            <span className="material-symbols-outlined text-[20px] text-primary-container group-hover:text-black transition-colors">arrow_forward</span>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="group bg-white/50 dark:bg-black/20 backdrop-blur-sm p-8 rounded-3xl border border-gray-200 dark:border-white/5 shadow-xl transition-all duration-300 hover:scale-105 hover:bg-primary-fixed dark:hover:bg-primary-container">
          <div className="w-14 h-14 bg-[#FFD700] text-black rounded-2xl flex items-center justify-center mb-6 shadow-md shadow-[#FFD700]/20 group-hover:bg-white group-hover:text-black dark:group-hover:bg-[#0a192f] dark:group-hover:text-[#FFD700] transition-colors">
            <span className="material-symbols-outlined text-3xl">gavel</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-black transition-colors">{t('about.termsTitle', 'Terms & Conditions')}</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-black/80 transition-colors mb-5">
            {t('about.termsDesc', 'We are committed to a safe, transparent, and respectful environment for all members of our growing digital community.')}
          </p>
          <ul className="space-y-2 mb-6">
            {(t('about.termsList', { returnObjects: true }) as string[]).map(item => (
              <li key={item} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 group-hover:text-black/70 transition-colors">
                <span className="material-symbols-outlined text-[16px] text-blue-500/75 dark:text-blue-400">check_circle</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-white/10 group-hover:border-black/20 transition-colors">
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-primary dark:text-secondary-fixed-dim group-hover:text-black transition-colors underline">{t('about.termsLink', 'Read full policy')}</a>
            <span className="material-symbols-outlined text-[20px] text-primary-container group-hover:text-black transition-colors">description</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
