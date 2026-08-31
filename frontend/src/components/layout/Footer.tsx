import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer: FC = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-gray-50 dark:bg-[#0a192f] border-t border-gray-200 dark:border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="font-headline-lg text-2xl font-bold text-primary dark:text-primary-fixed hover:opacity-80 transition-opacity block mb-4">
            Express Book
          </Link>
          <p className="text-gray-600 dark:text-gray-400 max-w-sm mb-6">
            {t('footer.desc', 'Your private library, instantly accessible anywhere. Build your ultimate digital collection with curated E-Books and Audiobooks.')}
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white/5 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors">
              <span className="material-symbols-outlined">public</span>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white/5 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors">
              <span className="material-symbols-outlined">forum</span>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-200 dark:bg-white/5 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors">
              <span className="material-symbols-outlined">share</span>
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 dark:text-white mb-4">{t('footer.quickLinks', 'Quick Links')}</h4>
          <ul className="space-y-3">
            <li><a href="#home" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-fixed transition-colors">{t('nav.home', 'Home')}</a></li>
            <li><a href="#about" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-fixed transition-colors">{t('nav.about', 'About Us')}</a></li>
            <li><a href="#library" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-fixed transition-colors">{t('nav.library', 'Library')}</a></li>
            <li><a href="#community" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-fixed transition-colors">{t('nav.community', 'Community')}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 dark:text-white mb-4">{t('footer.legal', 'Legal')}</h4>
          <ul className="space-y-3">
            <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-fixed transition-colors">{t('footer.terms', 'Terms of Service')}</a></li>
            <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-fixed transition-colors">{t('footer.privacy', 'Privacy Policy')}</a></li>
            <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-fixed transition-colors">{t('footer.cookie', 'Cookie Policy')}</a></li>
            <li><a href="#contact" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-fixed transition-colors">{t('nav.contact', 'Contact Us')}</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-gray-200 dark:border-white/10 text-center flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500 dark:text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} {t('footer.rights', 'Express Books. All rights reserved.')}
        </p>
        <p className="text-gray-500 dark:text-gray-500 text-sm flex items-center justify-center gap-1">
          {t('footer.madeWith', 'Made with')} <span className="text-red-500 material-symbols-outlined text-[16px]">favorite</span> {t('footer.inSL', 'in Sri Lanka')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
