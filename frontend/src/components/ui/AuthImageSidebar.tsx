import React from 'react';

interface AuthImageSidebarProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  imageAlt: string;
  className?: string;
}

const AuthImageSidebar: React.FC<AuthImageSidebarProps> = ({ 
  title, 
  subtitle, 
  imageUrl, 
  imageAlt,
  className = "" 
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img alt={imageAlt} className="absolute inset-0 w-full h-full object-cover" src={imageUrl} />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/90 to-transparent"></div>
      <div className="relative z-10 h-full flex flex-col justify-end p-12 text-white">
        <h2 className="font-display-lg text-4xl mb-4">{title}</h2>
        <p className="font-body-lg text-lg text-white/80 max-w-md">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImageSidebar;
