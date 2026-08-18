import { type FC } from 'react';

interface PaymentCardProps {
  focusedField: 'number' | 'name' | 'expiry' | 'cvv' | null;
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvv: string;
}

const PaymentCard: FC<PaymentCardProps> = ({ 
  focusedField, 
  cardNumber, 
  cardName, 
  cardExpiry, 
  cardCvv 
}) => {
  const isFlipped = focusedField === 'cvv';

  return (
    <div className="w-full max-w-[340px] aspect-[1.586/1] mx-auto perspective-1000 relative z-10 font-mono">
      <div 
        className={`w-full h-full relative preserve-3d transition-transform duration-700 ease-in-out shadow-2xl rounded-2xl ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front of Card */}
        <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-[#1a1f25] to-[#2c3e50] text-white rounded-2xl p-5 flex flex-col overflow-hidden border border-white/10">
          
          {/* Top Row: Chip and Logo */}
          <div className="flex justify-between items-start mb-auto">
            <div className="w-12 h-9 bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600 rounded-md opacity-90 border border-yellow-700/50"></div>
            <div className="text-xl font-bold italic tracking-wider opacity-90">VISA</div>
          </div>

          {/* Card Number */}
          <div className={`mt-2 text-2xl tracking-[0.2em] transition-all p-2 rounded -mx-2 ${
            focusedField === 'number' ? 'ring-2 ring-primary/60 bg-white/5' : ''
          }`}>
            {cardNumber || '•••• •••• •••• ••••'}
          </div>

          {/* Bottom Row: Name and Expiry */}
          <div className="flex justify-between items-end mt-2">
            <div className={`flex flex-col flex-1 p-2 rounded -mx-2 transition-all ${
              focusedField === 'name' ? 'ring-2 ring-primary/60 bg-white/5' : ''
            }`}>
              <span className="text-[10px] uppercase opacity-60 tracking-wider">Card Holder</span>
              <span className="text-sm tracking-widest truncate max-w-[180px]">
                {cardName || 'JOHN DOE'}
              </span>
            </div>
            
            <div className={`flex flex-col items-end p-2 rounded -mx-2 transition-all ${
              focusedField === 'expiry' ? 'ring-2 ring-primary/60 bg-white/5' : ''
            }`}>
              <span className="text-[10px] uppercase opacity-60 tracking-wider">Expires</span>
              <span className="text-sm tracking-widest">{cardExpiry || 'MM/YY'}</span>
            </div>
          </div>
          
          {/* Subtle background decoration */}
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none"></div>
        </div>

        {/* Back of Card */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-[#2c3e50] to-[#1a1f25] text-white rounded-2xl flex flex-col justify-start border border-white/10">
          {/* Magnetic Stripe */}
          <div className="w-full h-12 bg-black/80 mt-6"></div>
          
          <div className="px-6 mt-4 flex flex-col items-end">
            <span className="text-[10px] uppercase opacity-60 tracking-wider mb-1 pr-1">CVV</span>
            <div className="w-full h-10 bg-white/90 rounded text-gray-900 flex items-center justify-end px-3">
              <span className="text-sm italic mr-auto opacity-50">Authorized Signature</span>
              <span className="font-bold tracking-widest">{cardCvv || '•••'}</span>
            </div>
          </div>
          
          <div className="mt-auto p-4 text-[8px] opacity-40 text-center">
            This card is mock property for demo purposes. Not a real payment method.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
