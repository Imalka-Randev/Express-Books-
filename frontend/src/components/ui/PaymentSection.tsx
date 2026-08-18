import { type FC, useState } from 'react';
import PaymentCard from './PaymentCard';
import { type Book } from '../../store/bookSlice';

interface PaymentSectionProps {
  book: Book;
}

const PaymentSection: FC<PaymentSectionProps> = ({ book }) => {
  const [purchaseMode, setPurchaseMode] = useState<'buy' | 'rent'>('buy');
  const [focusedField, setFocusedField] = useState<'number' | 'name' | 'expiry' | 'cvv' | null>(null);
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  const [addAudioBook, setAddAudioBook] = useState(false);
  const [extraRentDays, setExtraRentDays] = useState(0);

  let totalPrice = 0;
  if (purchaseMode === 'buy') {
    totalPrice = book.buyPrice;
    if (addAudioBook) totalPrice += 9.99;
  } else {
    totalPrice = book.rentPrice + (extraRentDays * 0.50);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData(prev => ({ ...prev, [name]: value }));
  };

  const copyrightNotice = (
    <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-xl border border-red-100 dark:border-red-900/20 mt-2">
      <h4 className="font-bold text-red-800 dark:text-red-400 mb-2 flex items-center gap-2 text-sm">
        <span className="material-symbols-outlined text-[18px]">gavel</span> Copyright Notice
      </h4>
      <ul className="text-xs text-red-700/80 dark:text-red-400/80 leading-relaxed list-disc pl-4 space-y-1">
        <li>Copying or distributing this e-book is strictly prohibited.</li>
        <li>Unauthorized sharing will lead to immediate account suspension.</li>
        <li>Violators face legal prosecution under copyright laws.</li>
      </ul>
    </div>
  );

  return (
    <section id="checkout-section" className="bg-white dark:bg-[#112240] p-6 md:p-12 rounded-3xl border border-gray-200 dark:border-white/10 shadow-2xl w-full flex flex-col md:flex-row my-12">
      
      {/* Left Column: Toggle & Info */}
      <div className="flex-1 w-full order-2 md:order-1 flex flex-col gap-6 md:pr-12 md:border-r border-gray-200 dark:border-white/10">
        <h3 className="font-headline-md text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <span className="material-symbols-outlined text-primary dark:text-primary-fixed">lock</span> Secure Checkout
        </h3>
        
        {/* Toggle Buy / Rent */}
        <div className="flex bg-gray-100 dark:bg-black/20 p-1 rounded-lg">
          <button 
            onClick={() => setPurchaseMode('buy')}
            className={`flex-1 py-3 font-bold rounded-md transition-colors ${purchaseMode === 'buy' ? 'bg-white dark:bg-white/10 shadow text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
          >
            Buy New
          </button>
          <button 
            onClick={() => setPurchaseMode('rent')}
            className={`flex-1 py-3 font-bold rounded-md transition-colors ${purchaseMode === 'rent' ? 'bg-white dark:bg-white/10 shadow text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
          >
            Rent
          </button>
        </div>

        {/* Buy Info (Only visible when buy is selected) */}
        <div className={`transition-all duration-300 flex flex-col gap-4 ${purchaseMode === 'buy' ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden pointer-events-none select-none m-0 p-0 border-0'}`}>
          <label className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer transition-colors">
            <div className="pt-1">
              <input 
                type="checkbox" 
                className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary dark:border-white/20 dark:bg-black/20 cursor-pointer"
                checked={addAudioBook}
                onChange={(e) => setAddAudioBook(e.target.checked)}
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-gray-900 dark:text-white">Add Audio Book</span>
                <span className="font-bold text-primary dark:text-primary-fixed">+$9.99</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Get the professionally narrated audio version to listen on the go.</p>
            </div>
          </label>
          
          <div className="bg-gray-50 dark:bg-black/20 p-4 rounded-xl border border-gray-200 dark:border-white/10">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2 text-sm">
              <span className="material-symbols-outlined text-[18px]">verified_user</span> Refund Policy
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              You can return this e-book for a full refund within 7 days of purchase, provided you have read less than 20% of the book. Audio books are non-refundable once downloaded.
            </p>
          </div>

          {copyrightNotice}
        </div>

        {/* Rent Message (Only visible when rent is selected) */}
        <div className={`transition-all duration-300 flex flex-col gap-4 ${purchaseMode === 'rent' ? 'opacity-100 h-auto' : 'opacity-0 h-0 overflow-hidden pointer-events-none select-none m-0 p-0 border-0'}`}>
          <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/20">
            <span className="font-bold text-gray-900 dark:text-white">
              <span className="text-yellow-500 dark:text-yellow-400">Extend</span> Return (+ Days)
            </span>
            <div className="flex items-center gap-4 bg-white dark:bg-[#112240] rounded-lg px-2 py-1 shadow-sm border border-gray-200 dark:border-white/10">
              <button 
                onClick={() => setExtraRentDays(Math.max(0, extraRentDays - 1))}
                className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-white/10 active:scale-95 transition-all text-primary font-bold text-xl"
              >
                -
              </button>
              <span className="font-bold w-4 text-center">{extraRentDays}</span>
              <button 
                onClick={() => setExtraRentDays(extraRentDays + 1)}
                className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-white/10 active:scale-95 transition-all text-primary font-bold text-xl"
              >
                +
              </button>
            </div>
          </div>
          
          <div className="bg-primary/10 border border-primary/20 text-primary-dark dark:text-primary-fixed p-4 rounded-xl text-sm font-medium">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-lg">info</span>
              <div>
                <p className="mb-1">Base rent time is 1 week (7 days).</p>
                <p className="mb-1">Each additional day adds $0.50.</p>
                <p>If not extended, it will be automatically removed from your private library.</p>
              </div>
            </div>
          </div>

          {copyrightNotice}
        </div>

        <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-white/10 mt-auto pt-6">
          <span className="font-title-md text-xl font-bold text-gray-900 dark:text-white">
            {purchaseMode === 'buy' ? 'Total' : `Rent (${7 + extraRentDays} Days)`}
          </span>
          <span className="font-headline-lg text-3xl font-bold text-primary dark:text-primary-fixed">
            ${totalPrice.toFixed(2)}
          </span>
        </div>

      </div>

      {/* Right Column: Card Visual, Form & Pay Button */}
      <div className="flex-1 w-full flex flex-col justify-start gap-8 perspective-1000 order-1 md:order-2 md:pl-12 mt-12 md:mt-0 pt-12 md:pt-0 border-t md:border-t-0 border-gray-200 dark:border-white/10">
        <div className="flex justify-center w-full">
          <PaymentCard 
            focusedField={focusedField}
            cardNumber={cardData.number}
            cardName={cardData.name}
            cardExpiry={cardData.expiry}
            cardCvv={cardData.cvv}
          />
        </div>

        <div className="grid grid-cols-2 gap-5 w-full">
          <div className="col-span-2">
            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">Card Number</label>
            <input 
              type="text" 
              name="number"
              placeholder="0000 0000 0000 0000" 
              maxLength={19}
              className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all font-mono"
              onFocus={() => setFocusedField('number')}
              onBlur={() => setFocusedField(null)}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2">
            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">Cardholder Name</label>
            <input 
              type="text" 
              name="name"
              placeholder="JOHN DOE" 
              className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all uppercase font-mono"
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">Expiry</label>
            <input 
              type="text" 
              name="expiry"
              placeholder="MM/YY" 
              maxLength={5}
              className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all font-mono"
              onFocus={() => setFocusedField('expiry')}
              onBlur={() => setFocusedField(null)}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">CVV</label>
            <input 
              type="text" 
              name="cvv"
              placeholder="123" 
              maxLength={3}
              className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all font-mono"
              onFocus={() => setFocusedField('cvv')}
              onBlur={() => setFocusedField(null)}
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        <div className="flex justify-end mt-4">
          <button className="w-full sm:w-auto px-12 bg-primary hover:bg-primary/90 dark:bg-primary-fixed text-white dark:text-gray-900 font-bold py-4 rounded-xl transition-all active:scale-[0.98] shadow-md flex justify-center items-center gap-2 text-lg">
            <span className="material-symbols-outlined text-[20px]">lock</span> Pay Securely
          </button>
        </div>
      </div>

    </section>
  );
};

export default PaymentSection;
