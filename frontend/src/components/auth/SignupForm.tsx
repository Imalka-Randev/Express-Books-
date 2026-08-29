import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useSignup } from '../../hooks/useSignup';

const SignupForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    fullName, setFullName,
    email, setEmail,
    password, setPassword,
    error, isLoading,
    showPassword, setShowPassword,
    handleSubmit
  } = useSignup();

  return (
    <div className="w-full min-h-full flex flex-col items-center justify-center p-8 md:p-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center md:text-left">
          <h1 className="font-headline-lg text-3xl mb-2">{t('signup.title')}</h1>
          <p className="font-body-md text-gray-600 dark:text-surface-dim">{t('signup.subtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && <div className="p-3 bg-red-500/20 border border-red-500 text-red-500 rounded-xl text-center">{error}</div>}

          <div>
            <label className="block font-bold text-sm text-gray-700 dark:text-surface-dim mb-1" htmlFor="fullName">{t('signup.nameLabel')}</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">person</span>
              <input value={fullName} onChange={(e) => setFullName(e.target.value)} id="fullName" placeholder={t('signup.namePlaceholder')} required type="text" className="w-full pl-10 pr-4 py-3 bg-transparent border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-all text-black dark:text-white" />
            </div>
          </div>

          <div>
            <label className="block font-bold text-sm text-gray-700 dark:text-surface-dim mb-1" htmlFor="email">{t('signup.emailLabel')}</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">mail</span>
              <input value={email} onChange={(e) => setEmail(e.target.value)} id="email" placeholder={t('signup.emailPlaceholder')} required type="email" className="w-full pl-10 pr-4 py-3 bg-transparent border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-all text-black dark:text-white" />
            </div>
          </div>

          <div>
            <label className="block font-bold text-sm text-gray-700 dark:text-surface-dim mb-1" htmlFor="password">{t('signup.passwordLabel')}</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">lock</span>
              <input value={password} onChange={(e) => setPassword(e.target.value)} id="password" placeholder={t('signup.passwordPlaceholder')} required minLength={8} type={showPassword ? "text" : "password"} className="w-full pl-10 pr-10 py-3 bg-transparent border border-gray-300 dark:border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-all text-black dark:text-white" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors">
                <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
              </button>
            </div>
          </div>

          <div className="pt-4">
            <button disabled={isLoading} type="submit" className="w-full bg-primary-container text-black font-bold py-3.5 rounded-lg hover:bg-inverse-primary transition-all flex items-center justify-center gap-2 disabled:opacity-50">
              {isLoading ? 'Creating...' : t('signup.button')}
              <span className="material-symbols-outlined text-sm font-bold">arrow_forward</span>
            </button>
          </div>
        </form>

        <div className="mt-8 text-center border-t border-gray-200 dark:border-white/10 pt-6">
          <p className="text-gray-600 dark:text-surface-dim">
            {t('signup.haveAccount')} 
            <Link to="/login" onClick={(e) => { e.preventDefault(); navigate('/login'); }} className="text-primary hover:underline ml-2 font-bold">{t('signup.loginLink')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
