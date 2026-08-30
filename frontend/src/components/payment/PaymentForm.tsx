import { type FC } from 'react';
import PaymentCard from './PaymentCard';

import { usePaymentForm } from '../../hooks/usePaymentForm';

interface PaymentFormProps {
  onPaySecurely: () => void;
  isProcessing?: boolean;
}

const PaymentForm: FC<PaymentFormProps> = ({ onPaySecurely, isProcessing }) => {
  const {
    focusedField,
    setFocusedField,
    cardData,
    handleInputChange,
    isValidExpiry,
    isFormValid
  } = usePaymentForm();

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
            value={cardData.number}
            placeholder="0000 0000 0000 0000" 
            maxLength={19}
            className={`w-full bg-gray-50 dark:bg-white/5 border rounded-xl p-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all font-mono ${cardData.number.length > 0 && cardData.number.replace(/\s/g, '').length !== 16 ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-white/10'}`}
            onFocus={() => setFocusedField('number')}
            onBlur={() => setFocusedField(null)}
            onChange={handleInputChange}
          />
          {cardData.number.length > 0 && cardData.number.replace(/\s/g, '').length !== 16 && (
            <p className="text-red-500 text-xs mt-1">Card number must be exactly 16 digits.</p>
          )}
        </div>
        <div className="col-span-2">
          <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">Cardholder Name</label>
          <input 
            type="text" 
            name="name"
            value={cardData.name}
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
            value={cardData.expiry}
            placeholder="MM/YY" 
            maxLength={5}
            className={`w-full bg-gray-50 dark:bg-white/5 border rounded-xl p-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all font-mono ${cardData.expiry.length === 5 && !isValidExpiry(cardData.expiry) ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-white/10'}`}
            onFocus={() => setFocusedField('expiry')}
            onBlur={() => setFocusedField(null)}
            onChange={handleInputChange}
          />
          {cardData.expiry.length === 5 && !isValidExpiry(cardData.expiry) && (
            <p className="text-red-500 text-xs mt-1">Invalid expiry date.</p>
          )}
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">CVV</label>
          <input 
            type="password" 
            name="cvv"
            value={cardData.cvv}
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
          disabled={isProcessing || !isFormValid}
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
