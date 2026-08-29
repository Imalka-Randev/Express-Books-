import { type FC } from 'react';

interface ExpressLogoProps {
  iconSize?: string;
  textSize?: string;
}

const ExpressLogo: FC<ExpressLogoProps> = ({
  iconSize = '2rem',
  textSize = '2rem',
}) => {
  return (
    <div className="flex items-center gap-2">
     <span
        className="material-symbols-outlined dark:text-white"
        style={{ fontSize: iconSize }}
      >
        air
      </span>
      <span
        className="italic font-bold"
        style={{ fontSize: textSize, lineHeight: '1' }}
      >
        <span className="text-primary">Express</span>{' '}
        <span className="text-black dark:text-white">Books</span>
      </span>
      
       <span
        className="material-symbols-outlined text-primary"
        style={{ fontSize: iconSize }}
      >
        menu_book
      </span>
    </div>
  );
};

export default ExpressLogo;
