import { type FC, useState } from 'react';
import PaymentForm from './PaymentForm';
import { useDispatch } from 'react-redux';
import { extendRentalAction, fetchLibrary } from '../../store/librarySlice';
import { type AppDispatch } from '../../store/store';

interface RentExtensionPaymentProps {
  bookId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const RentExtensionPayment: FC<RentExtensionPaymentProps> = ({ bookId, onSuccess, onCancel }) => {
  const [extraRentDays, setExtraRentDays] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const totalPrice = extraRentDays * 0.50;

  const handlePaySecurely = async () => {
    if (window.confirm(`Confirm payment of $${totalPrice.toFixed(2)} for ${extraRentDays} extra days?`)) {
      setIsProcessing(true);
      
      try {
        await dispatch(extendRentalAction({ bookId, daysToExtend: extraRentDays })).unwrap();
        await dispatch(fetchLibrary()).unwrap();
        if (onSuccess) onSuccess();
      } catch (error) {
        alert("Failed to process rent extension.");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  return (
    <section className="bg-white dark:bg-[#112240] p-6 md:p-8 rounded-3xl border border-gray-200 dark:border-white/10 shadow-2xl w-full flex flex-col my-12 animate-fade-in-up gap-8">
      
      {/* Left Column: Extension Info */}
      <div className="flex-1 w-full flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h3 className="font-headline-md text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-primary dark:text-primary-fixed">update</span> Extend Rental
          </h3>
          {onCancel && (
            <button 
              onClick={onCancel}
              className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          )}
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black/20">
          <span className="font-bold text-gray-900 dark:text-white">
            <span className="text-primary">Extend</span> Return (+ Days)
          </span>
          <div className="flex items-center gap-4 bg-white dark:bg-[#112240] rounded-lg px-2 py-1 shadow-sm border border-gray-200 dark:border-white/10">
            <button 
              onClick={() => setExtraRentDays(Math.max(1, extraRentDays - 1))}
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
              <p className="mb-1">Each additional day adds $0.50.</p>
              <p>Your new due date will be automatically updated upon successful payment.</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-white/10 mt-auto pt-6">
          <span className="font-title-md text-xl font-bold text-gray-900 dark:text-white">
            Extension Total
          </span>
          <span className="font-headline-lg text-3xl font-bold text-primary dark:text-primary-fixed">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Right Column: Payment Form */}
      <div className="flex-1 w-full flex flex-col justify-center">
        <PaymentForm onPaySecurely={handlePaySecurely} isProcessing={isProcessing} />
      </div>

    </section>
  );
};

export default RentExtensionPayment;
