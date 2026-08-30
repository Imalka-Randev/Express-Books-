import { useState } from 'react';

export const usePaymentForm = () => {
  const [focusedField, setFocusedField] = useState<'number' | 'name' | 'expiry' | 'cvv' | null>(null);
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;
    
    if (name === 'number') {
      let digits = value.replace(/\D/g, '');
      if (digits.length > 16) digits = digits.slice(0, 16);
      value = digits.replace(/(\d{4})/g, '$1 ').trim();
    } else if (name === 'name') {
      value = value.replace(/[^a-zA-Z\s]/g, '');
    } else if (name === 'expiry') {
      let digits = value.replace(/\D/g, '');
      if (digits.length > 4) digits = digits.slice(0, 4);
      if (digits.length >= 3) {
        value = digits.slice(0, 2) + '/' + digits.slice(2);
      } else {
        value = digits;
      }
    } else if (name === 'cvv') {
      value = value.replace(/\D/g, '');
    }

    setCardData(prev => ({ ...prev, [name]: value }));
  };

  const isValidExpiry = (expiry: string) => {
    if (expiry.length !== 5) return false;
    const [month, year] = expiry.split('/');
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);
    return m >= 1 && m <= 12 && y >= 24;
  };

  const isFormValid = 
    cardData.number.replace(/\s/g, '').length === 16 &&
    cardData.name.trim().length > 0 &&
    isValidExpiry(cardData.expiry) &&
    cardData.cvv.length >= 3;

  return {
    focusedField,
    setFocusedField,
    cardData,
    handleInputChange,
    isValidExpiry,
    isFormValid
  };
};
