import { useLocation } from 'react-router-dom';
import ThemeLanguageToggle from '../components/ui/ThemeLanguageToggle';
import AuthImageSidebar from '../components/ui/AuthImageSidebar';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';

const AuthPage = () => {
  const location = useLocation();

  // Mode derived directly from URL
  const isSignup = location.pathname === '/signup';

  return (
    <div className="bg-theme-light-bg dark:bg-theme-dark-bg min-h-screen text-gray-900 dark:text-white flex items-center justify-center p-4 md:p-8 transition-colors duration-300">
      <ThemeLanguageToggle className="absolute top-4 right-4 z-50 flex gap-4" />

      {/* Unified Glass Card Container */}
      <div className="max-w-5xl w-full h-[700px] bg-white/80 dark:bg-white/5 backdrop-blur-xl shadow-2xl border border-gray-200 dark:border-white/10 rounded-[2rem] [perspective:3000px] relative">
        
        {/* DESKTOP LAYOUT (3D Book Flip) */}
        <div className="hidden md:flex w-full h-full absolute inset-0">
          
          {/* STATIC LEFT PAGE (Login Image) */}
          <div className="w-1/2 h-full absolute left-0 top-0 overflow-hidden rounded-l-[2rem]">
            <AuthImageSidebar 
              title="Discover worlds together."
              subtitle="Premium library access delivered at the speed of thought."
              imageUrl="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1000&auto=format&fit=crop"
              imageAlt="Family reading together"
              className="w-full h-full"
            />
          </div>

          {/* STATIC RIGHT PAGE (Signup Form) */}
          <div className={`w-1/2 h-full absolute right-0 top-0 overflow-y-auto hide-scrollbar rounded-r-[2rem] transition-opacity duration-0 delay-[750ms] ${isSignup ? 'opacity-100' : 'opacity-0'}`}>
            <SignupForm />
          </div>

          {/* DYNAMIC FLIPPING PAGE (Front: Login Form, Back: Signup Image) */}
          <div 
            className={`w-1/2 h-full absolute right-0 top-0 [transform-style:preserve-3d] transition-transform duration-[1500ms] ease-[cubic-bezier(0.645,0.045,0.355,1.000)] ${isSignup ? '-rotate-y-180 z-20' : 'rotate-y-0 z-20'}`}
            style={{ transformOrigin: 'left center' }}
          >
            {/* FRONT FACE: Login Form (Faces Right) */}
            <div className={`absolute inset-0 [-webkit-backface-visibility:hidden] [backface-visibility:hidden] overflow-y-auto hide-scrollbar rounded-r-[2rem] border-l border-gray-200 dark:border-white/10 transition-opacity duration-0 delay-[750ms] ${isSignup ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <LoginForm />
              
              {/* Optional page shadow for realism on the right side */}
              <div className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${isSignup ? 'opacity-100 bg-black/20' : 'opacity-0'}`} />
            </div>

            {/* BACK FACE: Signup Image (Faces Left, revealed when flipped) */}
            <div className={`absolute inset-0 [-webkit-backface-visibility:hidden] [backface-visibility:hidden] rotate-y-180 overflow-hidden rounded-l-[2rem] border-r border-gray-200 dark:border-white/10 bg-gray-900 shadow-[inset_-20px_0_50px_rgba(0,0,0,0.5)] transition-opacity duration-0 delay-[750ms] ${isSignup ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
               <AuthImageSidebar 
                 title="Join the Exchange."
                 subtitle="Connect with a global community of readers. Share stories, discover new worlds."
                 imageUrl="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000&auto=format&fit=crop"
                 imageAlt="Community book sharing"
                 className="w-full h-full"
               />
               <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-transparent to-transparent w-24 right-0 pointer-events-none"></div>
            </div>
          </div>
          
        </div>

        {/* MOBILE LAYOUT (Standard Card Flip) */}
        <div 
          className="md:hidden w-full h-[750px] absolute inset-0 [transform-style:preserve-3d] transition-transform duration-[1200ms] ease-in-out"
          style={{ transform: isSignup ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        >
           {/* Front: Login */}
           <div className={`absolute inset-0 [-webkit-backface-visibility:hidden] [backface-visibility:hidden] overflow-y-auto hide-scrollbar transition-opacity duration-0 delay-[600ms] ${isSignup ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <LoginForm />
           </div>

           {/* Back: Signup */}
           <div className={`absolute inset-0 [-webkit-backface-visibility:hidden] [backface-visibility:hidden] rotate-y-180 overflow-y-auto hide-scrollbar transition-opacity duration-0 delay-[600ms] ${isSignup ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <SignupForm />
           </div>
        </div>

      </div>
    </div>
  );
};

export default AuthPage;
