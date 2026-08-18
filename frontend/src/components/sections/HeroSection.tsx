import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import HeroImages from '../ui/HeroImages';
import TrustedPartners from '../ui/TrustedPartners';
import ExpressLogo from '../ui/ExpressLogo';

const HeroSection: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/?scrollTo=${id}`);
    }
  };

  return (
    <section id="home" className="h-screen flex flex-col items-center justify-between overflow-hidden" style={{ paddingBottom: '2.5rem' }}>
      
      {/* Top Middle Badge */}
      <div className="w-full max-w-7xl mx-auto flex justify-center" style={{ paddingTop: '8rem' }}>
        <ExpressLogo iconSize="3.5rem" textSize="3.5rem" />
      </div>

      {/* Middle: Text + Image - grows to fill remaining space */}
      <div className="flex-1 flex items-center w-full">
        <div className="max-w-7xl mx-auto w-full px-4 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
          
          {/* Left Text & Buttons (Shifted slightly up and left) */}
          <div className="flex flex-col justify-center space-y-6 z-20 lg:-translate-y-8 lg:-translate-x-12 max-w-xl">
            <h1 className="font-headline-lg text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-white leading-tight font-bold flex flex-col">
              <span className="lg:whitespace-nowrap">{t('home.heroTitle', 'Your Private Library,')}</span>
              <span className="text-primary dark:text-primary-container italic font-normal lg:whitespace-nowrap">
                {t('home.heroSubtitle', 'Instant Access, Anywhere.')}
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-on-tertiary-fixed-variant max-w-lg">
              {t('home.heroDesc', 'Build your ultimate digital collection. Curated E-Books and Audiobooks for the sophisticated reader, available instantly on any device.')}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={() => scrollToSection('community')}
                className="px-8 py-4 bg-primary-container text-black font-bold rounded-xl shadow-lg hover:shadow-primary-container/40 hover:-translate-y-1 hover:bg-inverse-primary transition-all duration-300 active:scale-95"
              >
                {t('home.heroBtnPrimary', 'Join the Club')}
              </button>
              <button 
                onClick={() => scrollToSection('library')}
                className="px-8 py-4 border-2 border-primary dark:border-secondary text-primary dark:text-secondary-fixed-dim font-bold rounded-xl hover:bg-primary/10 dark:hover:bg-secondary/10 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 active:scale-95"
              >
                {t('home.heroBtnSecondary', 'Browse Library')}
              </button>
            </div>
          </div>

          {/* Hero Imagery (Shifted slightly right) */}
          <div className="w-full max-w-lg lg:w-1/2 flex justify-center z-10 lg:translate-x-7">
            <HeroImages />
          </div>
        </div>
      </div>

      {/* Bottom: Trusted Partners — no extra margin, section pb handles spacing */}
      <div className="w-full">
        <TrustedPartners />
      </div>
    </section>
  );
};

export default HeroSection;
