import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ThemeLanguageToggle from '../components/ThemeLanguageToggle';
import AuthImageSidebar from '../components/AuthImageSidebar';
import { useLogin } from '../hooks/useLogin';

const Login = () => {
  const { t } = useTranslation();
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    showPassword,
    setShowPassword,
    handleSubmit
  } = useLogin();

  return (
    // Main Page Container: Handles full screen layout, background colors, and centering
    <div className="bg-theme-light-bg dark:bg-theme-dark-bg min-h-screen text-gray-900 dark:text-white flex items-center justify-center p-4 md:p-8 transition-colors duration-300">
      
      {/* Absolute Header for Language and Theme Toggles */}
      <ThemeLanguageToggle className="absolute top-4 right-4 z-50 flex gap-4" />

      {/* Unified Glass Card: The main split-layout container with glassmorphism effect */}
      <div className="max-w-6xl w-full min-h-[80vh] flex flex-col md:flex-row items-stretch bg-white/80 dark:bg-white/5 backdrop-blur-xl shadow-2xl border border-gray-200 dark:border-white/10 rounded-[2rem] overflow-hidden">
        
        {/* Left Side: Image Canvas (Hidden on mobile devices) */}
        <AuthImageSidebar 
          title="Discover worlds together."
          subtitle="Premium library access delivered at the speed of thought."
          imageUrl="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1000&auto=format&fit=crop"
          imageAlt="Family reading together"
          className="hidden md:flex flex-1"
        />

        {/* Right Side: Login Form Container (Takes up remaining 50% width on desktop) */}
        <div className="flex-1 flex items-center justify-center relative p-8 md:p-12">
          
          {/* Inner Form Wrapper: Constrains the maximum width of the form elements */}
          <div className="w-full max-w-md">
            
            {/* Header Text Section: Title and subtitle text container */}
            <div className="text-center mb-10">
              {/* Notice how we use the 't' function to translate text! */}
              <h1 className="font-headline-lg text-3xl text-primary-fixed mb-2">{t('login.title')}</h1>
              <p className="font-body-md text-surface-dim">{t('login.subtitle')}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Error Message Container: Shows error message if login fails */}
              {error && <div className="p-3 bg-red-500/20 border border-red-500 text-red-500 rounded-xl text-center">{error}</div>}

              {/* Input Fields Wrapper: Adds vertical spacing between inputs */}
              <div className="space-y-4">
                
                {/* Email Input Group Container */}
                <div className="relative">
                  {/* Email Input Styling Wrapper: Glass background and focus ring for input */}
                  <div className="bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 flex items-center focus-within:border-blue-500 transition-all duration-200">
                    <span className="material-symbols-outlined text-gray-500 dark:text-surface-dim mr-3">mail</span>
                    <input 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email" 
                      placeholder={t('login.emailPlaceholder')} 
                      required 
                      className="block w-full border-0 bg-transparent p-0 text-black dark:text-white placeholder-gray-500 dark:placeholder-surface-dim/60 focus:ring-0 sm:text-sm outline-none"
                    />
                  </div>
                </div>

                {/* Password Input Group Container */}
                <div className="relative">
                  {/* Password Input Styling Wrapper: Glass background and focus ring for input */}
                  <div className="bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 flex items-center focus-within:border-blue-500 transition-all duration-200">
                    <span className="material-symbols-outlined text-gray-500 dark:text-surface-dim mr-3">lock</span>
                    <input 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} 
                      type={showPassword ? "text" : "password"} 
                      placeholder={t('login.passwordPlaceholder')} 
                      required 
                      className="block w-full border-0 bg-transparent p-0 text-black dark:text-white placeholder-gray-500 dark:placeholder-surface-dim/60 focus:ring-0 sm:text-sm outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                      <span className="material-symbols-outlined">{showPassword ? "visibility_off" : "visibility"}</span>
                    </button>
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="flex mx-auto w-[50%] justify-center rounded-xl bg-inverse-primary px-4 py-3 font-bold text-[#0a192f] shadow-sm hover:bg-primary-container transition-all disabled:opacity-50"
              >
                {isLoading ? 'Logging in...' : t('login.button')}
              </button>
            </form>

            <p className="mt-10 text-center font-body-md text-surface-dim">
              {t('login.noAccount')} <Link className="font-bold text-primary-fixed hover:text-primary-container transition-colors" to="/signup">{t('login.signupLink')}</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;