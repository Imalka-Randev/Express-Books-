import { type FC, useState } from 'react';
import PaymentCard from './PaymentCard';

interface PaymentFormProps {
  onPaySecurely: () => void;
  isProcessing?: boolean;
}

const PaymentForm: FC<PaymentFormProps> = ({ onPaySecurely, isProcessing }) => {
  const [focusedField, setFocusedField] = useState<'number' | 'name' | 'expiry' | 'cvv' | null>(null);
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex-1 w-full flex flex-col justify-start gap-8 perspective-1000 mt-12 md:mt-0 pt-12 md:pt-0 border-t md:border-t-0 border-gray-200 dark:border-white/10">
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
        <button 
          onClick={onPaySecurely}
          disabled={isProcessing}
          className="w-full sm:w-auto px-12 bg-primary hover:bg-primary/90 dark:bg-primary-fixed text-white dark:text-gray-900 font-bold py-4 rounded-xl transition-all active:scale-[0.98] shadow-md flex justify-center items-center gap-2 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
          ) : (
            <span className="material-symbols-outlined text-[20px]">lock</span>
          )}
          {isProcessing ? 'Processing...' : 'Pay Securely'}
        </button>
      </div>
    </div>
  );
};

export default PaymentForm;
