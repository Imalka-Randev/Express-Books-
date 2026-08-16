import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ThemeLanguageToggle from '../components/ThemeLanguageToggle';
import AuthImageSidebar from '../components/AuthImageSidebar';
import { useSignup } from '../hooks/useSignup';

const Signup = () => {
  const { t } = useTranslation();
  const {
    fullName,
    setFullName,
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    showPassword,
    setShowPassword,
    handleSubmit
  } = useSignup();

  return (
    // Main Page Container: Handles full screen layout, background colors, and centering
    <div className="bg-theme-light-bg dark:bg-theme-dark-bg min-h-screen text-gray-900 dark:text-white flex items-center justify-center p-4 md:p-8 transition-colors duration-300">
      
      {/* Absolute Header for Language and Theme Toggles */}
      <ThemeLanguageToggle className="absolute top-4 right-4 z-50 flex gap-4" />

      {/* Unified Glass Card: The main split-layout container with glassmorphism effect */}
      <div className="max-w-6xl w-full min-h-[80vh] flex flex-col md:flex-row items-stretch bg-white/80 dark:bg-white/5 backdrop-blur-xl shadow-2xl border border-gray-200 dark:border-white/10 rounded-[2rem] overflow-hidden">
        
        {/* Left Side: Image Canvas (Hidden on mobile devices) */}
        <AuthImageSidebar 
          title="Join the Exchange."
          subtitle="Connect with a global community of readers. Share stories, discover new worlds, and experience curated speed."
          imageUrl="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1000&auto=format&fit=crop"
          imageAlt="Community book sharing"
          className="hidden md:flex flex-1"
        />

        {/* Right Side: Sign Up Form Container (Takes up remaining 50% width on desktop) */}
        <div className="flex-1 flex items-center justify-center relative p-8 md:p-12">
          
          {/* Inner Form Wrapper: Constrains the maximum width of the form elements */}
          <div className="w-full max-w-md">
            
            {/* Header Text Section: Title and subtitle text container */}
            <div className="mb-8 text-center md:text-left">
              <h1 className="font-headline-lg text-3xl mb-2">{t('signup.title')}</h1>
              <p className="font-body-md text-gray-600 dark:text-surface-dim">{t('signup.subtitle')}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Error Message Container: Shows error message if signup fails */}
              {error && <div className="p-3 bg-red-500/20 border border-red-500 text-red-500 rounded-xl text-center">{error}</div>}

              {/* Full Name Input Group */}
              <div>
                <label className="block font-bold text-sm text-gray-700 dark:text-surface-dim mb-1" htmlFor="fullName">{t('signup.nameLabel')}</label>
                {/* Full Name Input Styling Wrapper */}
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">person</span>
                  <input 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-transparent border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-all" 
                    id="fullName" 
                    placeholder={t('signup.namePlaceholder')} 
                    required 
                    type="text"
                  />
                </div>
              </div>

              {/* Email Input Group */}
              <div>
                <label className="block font-bold text-sm text-gray-700 dark:text-surface-dim mb-1" htmlFor="email">{t('signup.emailLabel')}</label>
                {/* Email Input Styling Wrapper */}
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">mail</span>
                  <input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-transparent border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-all" 
                    id="email" 
                    placeholder={t('signup.emailPlaceholder')} 
                    required 
                    type="email"
                  />
                </div>
              </div>

              {/* Password Input Group */}
              <div>
                <label className="block font-bold text-sm text-gray-700 dark:text-surface-dim mb-1" htmlFor="password">{t('signup.passwordLabel')}</label>
                {/* Password Input Styling Wrapper */}
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">lock</span>
                  <input 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 bg-transparent border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-all" 
                    id="password" 
                    placeholder={t('signup.passwordPlaceholder')} 
                    required 
                    minLength={8}
                    type={showPassword ? "text" : "password"}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1.5">{t('signup.passwordHint')}</p>
              </div>

              {/* Submit Button Wrapper */}
              <div className="pt-4">
                <button 
                  disabled={isLoading}
                  className="w-full bg-primary-container text-black font-bold py-3.5 rounded-lg hover:bg-inverse-primary transition-all flex items-center justify-center gap-2 disabled:opacity-50" 
                  type="submit"
                >
                  {isLoading ? 'Creating...' : t('signup.button')}
                  <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
                </button>
              </div>
            </form>

            {/* Login Link Footer Section */}
            <div className="mt-8 text-center border-t border-gray-200 dark:border-white/10 pt-6">
              <p className="text-gray-600 dark:text-surface-dim">
                {t('signup.haveAccount')} 
                {/* Notice the <Link> tag! This tells React Router to safely change the URL without reloading the browser */}
                <Link to="/login" className="text-blue-600 dark:text-primary-fixed hover:underline ml-2 font-bold">{t('signup.loginLink')}</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;