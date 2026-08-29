import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../../hooks/useLogin';

const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const {
    email, setEmail,
    password, setPassword,
    error, isLoading,
    showPassword, setShowPassword,
    handleSubmit
  } = useLogin();

  return (
    <div className="w-full min-h-full flex flex-col items-center justify-center p-8 md:p-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="font-headline-lg text-3xl text-primary-fixed mb-2">{t('login.title')}</h1>
          <p className="font-body-md text-black dark:text-surface-dim">{t('login.subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="p-3 bg-red-500/20 border border-red-500 text-red-500 rounded-xl text-center">{error}</div>}
          
          <div className="space-y-4">
            <div className="relative">
              <div className="bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 flex items-center focus-within:border-blue-500 transition-all duration-200">
                <span className="material-symbols-outlined text-gray-500 dark:text-surface-dim mr-3">mail</span>
                <input 
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  type="email" placeholder={t('login.emailPlaceholder')} required 
                  className="block w-full border-0 bg-transparent p-0 text-black dark:text-white placeholder-gray-500 dark:placeholder-surface-dim/60 focus:ring-0 sm:text-sm outline-none"
                />
              </div>
            </div>

            <div className="relative">
              <div className="bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 flex items-center focus-within:border-blue-500 transition-all duration-200">
                <span className="material-symbols-outlined text-gray-500 dark:text-surface-dim mr-3">lock</span>
                <input 
                  value={password} onChange={(e) => setPassword(e.target.value)} 
                  type={showPassword ? "text" : "password"} placeholder={t('login.passwordPlaceholder')} required 
                  className="block w-full border-0 bg-transparent p-0 text-black dark:text-white placeholder-gray-500 dark:placeholder-surface-dim/60 focus:ring-0 sm:text-sm outline-none"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-500 focus:outline-none">
                  <span className="material-symbols-outlined">{showPassword ? "visibility_off" : "visibility"}</span>
                </button>
              </div>
            </div>
          </div>

          <button type="submit" disabled={isLoading} className="flex mx-auto w-[50%] justify-center rounded-xl bg-inverse-primary px-4 py-3 font-bold text-[#0a192f] shadow-sm hover:bg-primary-container transition-all disabled:opacity-50">
            {isLoading ? 'Logging in...' : t('login.button')}
          </button>
        </form>

        <div className="mt-8 text-center text-sm font-label-md text-black dark:text-surface-dim">
          {t('login.noAccount')} <Link className="font-bold text-primary-fixed hover:text-primary-container transition-colors" to="/signup" onClick={(e) => { e.preventDefault(); navigate('/signup'); }}>{t('login.signupLink')}</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
