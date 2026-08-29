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
    <section id="home" className="min-h-[100dvh] flex flex-col items-center justify-between overflow-x-hidden" style={{ paddingBottom: '2.5rem' }}>
      
      {/* Top Middle Badge */}
      <div className="w-full max-w-7xl mx-auto flex justify-center pt-24 md:pt-28 lg:pt-32 pb-4">
        <ExpressLogo iconSize="clamp(1.5rem, 4.5vw, 3.5rem)" textSize="clamp(1.5rem, 4.5vw, 3.5rem)" />
      </div>

      {/* Middle: Text + Image - grows to fill remaining space */}
      <div className="flex-1 flex items-center w-full">
        <div className="max-w-7xl mx-auto w-full px-4 flex flex-col xl:flex-row items-center justify-center gap-6 xl:gap-8 2xl:gap-24">
          
          {/* Hero Imagery (Moved up on mobile) */}
          <div className="order-1 xl:order-2 w-full max-w-sm xl:max-w-lg xl:w-1/2 flex justify-center z-10 xl:translate-x-7">
            <HeroImages />
          </div>

          {/* Left Text & Buttons */}
          <div className="order-2 xl:order-1 flex flex-col justify-center space-y-4 xl:space-y-6 z-20 xl:-translate-y-8 xl:-translate-x-4 2xl:-translate-x-12 max-w-xl text-center xl:text-left">
            <h1 className="font-headline-lg text-3xl md:text-5xl xl:text-5xl 2xl:text-6xl text-gray-900 dark:text-white leading-tight font-bold flex flex-col">
              <span className="xl:whitespace-nowrap">{t('home.heroTitle', 'Your Private Library,')}</span>
              <span className="text-primary dark:text-primary-container italic font-normal xl:whitespace-nowrap">
                {t('home.heroSubtitle', 'Instant Access, Anywhere.')}
              </span>
            </h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-on-tertiary-fixed-variant max-w-lg mx-auto xl:mx-0">
              {t('home.heroDesc', 'Build your ultimate digital collection. Curated E-Books and Audiobooks for the sophisticated reader, available instantly on any device.')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center xl:justify-start gap-3 sm:gap-4 pt-2 max-w-[280px] sm:max-w-[380px] xl:max-w-none mx-auto xl:mx-0 w-full">
              <button 
                onClick={() => scrollToSection('community')}
                className="w-full sm:flex-1 xl:flex-none xl:w-auto px-4 md:px-8 py-3 md:py-4 text-[14px] sm:text-sm md:text-base bg-primary-container text-black font-bold rounded-xl shadow-lg hover:shadow-primary-container/40 hover:-translate-y-1 hover:bg-inverse-primary transition-all duration-300 active:scale-95 whitespace-nowrap"
              >
                {t('home.heroBtnPrimary', 'Join the Club')}
              </button>
              <button 
                onClick={() => scrollToSection('library')}
                className="w-full sm:flex-1 xl:flex-none xl:w-auto px-4 md:px-8 py-3 md:py-4 text-[14px] sm:text-sm md:text-base border-2 border-primary dark:border-secondary text-primary dark:text-secondary-fixed-dim font-bold rounded-xl hover:bg-primary/10 dark:hover:bg-secondary/10 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 active:scale-95 whitespace-nowrap"
              >
                {t('home.heroBtnSecondary', 'Browse Library')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Trusted Partners */}
      <div className="w-full mt-12 lg:mt-0">
        <TrustedPartners />
      </div>
    </section>
  );
};

export default HeroSection;
