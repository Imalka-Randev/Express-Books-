import { useState, type FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import { setCartOpen, toggleItemType, removeItem, updateRentDays, clearCart } from '../../store/cartSlice';
import { checkoutLibrary, fetchLibrary } from '../../store/librarySlice';
import { X, Search, Trash2, Plus, Minus, CheckSquare, Square, ArrowLeft, ArrowRight, ArrowRightLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import PaymentCard from '../payment/PaymentCard';

const CartModal: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector((state: RootState) => state.cart);
  const { rentedBooks } = useSelector((state: RootState) => state.library);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for toggling sections
  const [rentChecked, setRentChecked] = useState(true);
  const [buyChecked, setBuyChecked] = useState(true);

  // Delete mode state
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedForDelete, setSelectedForDelete] = useState<string[]>([]);

  // Checkout state
  const [isCheckout, setIsCheckout] = useState(false);
  const [focusedField, setFocusedField] = useState<'number' | 'name' | 'expiry' | 'cvv' | null>(null);
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  if (!isOpen) return null;

  // Filter items based on local search term
  const filteredItems = items.filter(item => 
    item.book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const rentItems = filteredItems.filter(item => item.type === 'rent');
  const buyItems = filteredItems.filter(item => item.type === 'buy');

  const handleClose = () => {
    setIsCheckout(false);
    dispatch(setCartOpen(false));
  };

  const handleToggle = (id: string) => {
    dispatch(toggleItemType(id));
  };

  const handleRemove = (id: string) => {
    dispatch(removeItem(id));
  };

  const handleUpdateDays = (id: string, currentDays: number, increment: number) => {
    const newDays = Math.max(7, currentDays + increment); // Minimum 7 days
    dispatch(updateRentDays({ id, days: newDays }));
  };

  const handleToggleDelete = (id: string) => {
    setSelectedForDelete(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleConfirmDelete = () => {
    selectedForDelete.forEach(id => dispatch(removeItem(id)));
    setDeleteMode(false);
    setSelectedForDelete([]);
  };

  // Price calculations
  const getRentPrice = (bookPrice: number, days: number) => {
    const extraDays = Math.max(0, days - 7);
    return bookPrice + (extraDays * 0.5);
  };

  const getBuyPriceInfo = (item: any) => {
    const isRented = rentedBooks.some((r: any) => {
      const rId = r.book?._id || r.book;
      return rId === item.book._id;
    });

    const discountAmount = isRented ? item.book.rentPrice * 0.5 : 0;
    const finalPrice = item.book.buyPrice - discountAmount;

    return { isRented, discountAmount, finalPrice };
  };

  const rentTotal = rentItems.reduce((acc, item) => acc + getRentPrice(item.book.rentPrice, item.rentDays || 7), 0);
  const buyTotal = buyItems.reduce((acc, item) => acc + getBuyPriceInfo(item).finalPrice, 0);

  const finalTotal = (rentChecked ? rentTotal : 0) + (buyChecked ? buyTotal : 0);

  const handlePay = () => {
    if (window.confirm(`Confirm payment of $${finalTotal.toFixed(2)}?`)) {
      const itemsToPurchase = [];
      if (rentChecked) itemsToPurchase.push(...rentItems);
      if (buyChecked) itemsToPurchase.push(...buyItems);
      
      dispatch(checkoutLibrary(itemsToPurchase) as any)
        .unwrap()
        .then(() => {
          dispatch(fetchLibrary() as any);
          dispatch(clearCart());
          setIsCheckout(false);
          dispatch(setCartOpen(false));
          alert("Payment successful! Your books have been added to your library.");
        })
        .catch((error: any) => {
          console.error("Checkout failed:", error);
          alert("Checkout failed: " + (error.message || error));
        });
    }
  };

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 animate-in fade-in duration-300">
      {/* Blurred Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={handleClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-white/90 dark:bg-[#112240]/90 backdrop-blur-2xl border border-gray-200 dark:border-white/10 shadow-2xl rounded-3xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-white/10">
          <div className="flex items-center gap-4">
            {isCheckout && (
              <button 
                onClick={() => setIsCheckout(false)}
                className="p-2 -ml-2 bg-gray-100 dark:bg-white/10 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
            )}
            <h2 className="text-3xl font-headline-lg font-bold text-gray-900 dark:text-white">
              {isCheckout ? 'Secure Checkout' : t('cart.title', 'Your Cart')}
            </h2>
          </div>
          <button 
            onClick={handleClose}
            className="p-2 bg-gray-100 dark:bg-white/10 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Main Content Area */}
        {!isCheckout ? (
          <>
            {/* Search Bar */}
            <div className="p-6 pb-2">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t('cart.searchPlaceholder', 'Filter cart items...')}
                  className="w-full h-12 pl-12 pr-4 bg-gray-100 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl text-gray-900 dark:text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>
            </div>

            {/* Columns Content */}
            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8 custom-scrollbar">
              
              {/* RENT COLUMN */}
              <div className={`flex flex-col gap-4 transition-all duration-300 ${!rentChecked ? 'opacity-40 grayscale' : ''}`}>
                <div className="flex items-center justify-between border-b-2 border-primary pb-2">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setRentChecked(!rentChecked)} className="text-primary hover:text-primary/80 transition-colors">
                      {rentChecked ? <CheckSquare size={24} /> : <Square size={24} />}
                    </button>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      RENT BOOKS ({rentItems.length})
                    </h3>
                  </div>
                  <span className="text-lg font-bold text-primary">${rentTotal.toFixed(2)}</span>
                </div>
                
                {rentItems.length === 0 && (
                  <p className="text-gray-500 dark:text-gray-400 italic text-sm py-4">No books selected for rent.</p>
                )}

                {rentItems.map(item => {
                  const days = item.rentDays || 7;
                  const price = getRentPrice(item.book.rentPrice, days);
                  return (
                    <div key={item.book._id} className="flex gap-4 p-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl shadow-sm hover:shadow-md transition-all relative min-h-[140px]">
                      <img src={item.book.coverImageUrl} alt={item.book.title} className="w-20 h-28 object-cover rounded-lg" />
                      <div className="flex-1 flex flex-col justify-between pr-8">
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white line-clamp-1 pr-6">{item.book.title}</h4>
                          <p className="text-sm text-gray-500">{item.book.author}</p>
                        </div>
                          
                        {/* Days Stepper and Price */}
                        <div className="mt-auto flex items-center gap-4 pt-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">Days:</span>
                            <div className="flex items-center gap-1 bg-gray-100 dark:bg-black/40 rounded-lg p-1">
                              <button 
                                disabled={!rentChecked}
                                onClick={() => handleUpdateDays(item.book._id, days, -1)}
                                className="p-1 rounded bg-white dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-700 dark:text-white disabled:opacity-50"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="font-bold text-sm w-5 text-center text-gray-900 dark:text-white">{days}</span>
                              <button 
                                disabled={!rentChecked}
                                onClick={() => handleUpdateDays(item.book._id, days, 1)}
                                className="p-1 rounded bg-white dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-700 dark:text-white disabled:opacity-50"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                          </div>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">${price.toFixed(2)}</p>
                        </div>
                      </div>

                      {/* Switch Button or Delete Checkbox - Middle Right */}
                      {deleteMode ? (
                        <button 
                          onClick={() => handleToggleDelete(item.book._id)}
                          className={`absolute top-1/2 -translate-y-1/2 right-3 w-8 h-8 rounded-full flex justify-center items-center transition-all shadow-md ${selectedForDelete.includes(item.book._id) ? 'bg-red-500 text-white' : 'bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-gray-400'}`}
                        >
                          {selectedForDelete.includes(item.book._id) ? <CheckSquare size={16} /> : <Square size={16} />}
                        </button>
                      ) : (
                        <button 
                          disabled={!rentChecked}
                          onClick={() => handleToggle(item.book._id)}
                          className="absolute top-1/2 -translate-y-1/2 right-3 w-8 h-8 bg-primary text-black rounded-full flex justify-center items-center hover:scale-110 active:scale-95 transition-all shadow-md disabled:opacity-50 disabled:hover:scale-100"
                          title="Switch to Buy"
                        >
                          <ArrowRight size={16} />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* BUY COLUMN */}
              <div className={`flex flex-col gap-4 transition-all duration-300 ${!buyChecked ? 'opacity-40 grayscale' : ''}`}>
                <div className="flex items-center justify-between border-b-2 border-primary pb-2">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setBuyChecked(!buyChecked)} className="text-primary hover:text-primary/80 transition-colors">
                      {buyChecked ? <CheckSquare size={24} /> : <Square size={24} />}
                    </button>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      BUY BOOKS ({buyItems.length})
                    </h3>
                  </div>
                  <span className="text-lg font-bold text-primary">${buyTotal.toFixed(2)}</span>
                </div>

                {buyItems.length === 0 && (
                  <p className="text-gray-500 dark:text-gray-400 italic text-sm py-4">No books selected to buy.</p>
                )}

                {buyItems.map(item => {
                  const { isRented, discountAmount, finalPrice } = getBuyPriceInfo(item);
                  
                  return (
                    <div key={item.book._id} className="flex gap-4 p-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl shadow-sm hover:shadow-md transition-all relative min-h-[140px]">
                      <img src={item.book.coverImageUrl} alt={item.book.title} className="w-20 h-28 object-cover rounded-lg" />
                      <div className="flex-1 flex flex-col justify-between pr-8">
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-white line-clamp-1 pr-6">{item.book.title}</h4>
                          <p className="text-sm text-gray-500">{item.book.author}</p>
                        </div>
                        <div className="mt-auto flex items-center pt-3 h-[40px]"> {/* Matches the height of the rent card's stepper */}
                          <p className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 flex-wrap">
                            ${finalPrice.toFixed(2)}
                            {isRented && (
                              <span className="text-[10px] bg-green-500/10 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-md border border-green-500/20 font-bold whitespace-nowrap">
                                50% Rent Rebate (-${discountAmount.toFixed(2)})
                              </span>
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Switch Button or Delete Checkbox - Middle Right */}
                      {deleteMode ? (
                        <button 
                          onClick={() => handleToggleDelete(item.book._id)}
                          className={`absolute top-1/2 -translate-y-1/2 right-3 w-8 h-8 rounded-full flex justify-center items-center transition-all shadow-md ${selectedForDelete.includes(item.book._id) ? 'bg-red-500 text-white' : 'bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-gray-400'}`}
                        >
                          {selectedForDelete.includes(item.book._id) ? <CheckSquare size={16} /> : <Square size={16} />}
                        </button>
                      ) : (
                        <button 
                          disabled={!buyChecked}
                          onClick={() => handleToggle(item.book._id)}
                          className="absolute top-1/2 -translate-y-1/2 right-3 w-8 h-8 bg-primary text-black rounded-full flex justify-center items-center hover:scale-110 active:scale-95 transition-all shadow-md disabled:opacity-50 disabled:hover:scale-100"
                          title="Switch to Rent"
                        >
                          <ArrowLeft size={16} />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Footer / Total */}
            <div className="p-6 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
              
              <div className="flex items-center gap-6 w-full md:w-auto overflow-x-auto custom-scrollbar pb-2 md:pb-0">
                {deleteMode ? (
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => { setDeleteMode(false); setSelectedForDelete([]); }} 
                      className="px-4 py-2 rounded-xl font-bold text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleConfirmDelete} 
                      disabled={selectedForDelete.length === 0} 
                      className="px-4 py-2 rounded-xl font-bold text-white bg-red-500 hover:bg-red-600 transition-all disabled:opacity-50"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setDeleteMode(true)} 
                    className="text-red-500 hover:text-red-600 font-bold flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-red-500/10 transition-colors shrink-0"
                  >
                    <Trash2 size={18} /> Clear Cart
                  </button>
                )}
                
                {!deleteMode && (
                  <div className="flex items-center gap-3 text-gray-500 font-bold uppercase text-sm whitespace-nowrap border-l border-gray-300 dark:border-gray-700 pl-6">
                    <span>Rent ({rentChecked ? rentItems.length : 0})</span>
                    <span className="text-gray-400">+</span>
                    <span>Buy ({buyChecked ? buyItems.length : 0})</span>
                    <span className="text-gray-400">=</span>
                    <span className="text-gray-900 dark:text-white">
                      {(rentChecked ? rentItems.length : 0) + (buyChecked ? buyItems.length : 0)} Items
                    </span>
                  </div>
                )}
              </div>

              <div className="w-full md:w-auto">
                {isAuthenticated ? (
                  <button 
                    onClick={() => setIsCheckout(true)}
                    disabled={finalTotal === 0 || deleteMode}
                    className="w-full md:w-auto px-8 py-4 bg-primary-container text-black font-bold text-lg rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
                  >
                    Checkout <span className="opacity-80">(${finalTotal.toFixed(2)})</span>
                  </button>
                ) : (
                  <div className="px-6 py-4 bg-gray-100 dark:bg-black/20 rounded-xl text-gray-700 dark:text-gray-300 font-medium border border-gray-200 dark:border-white/10 w-full text-center">
                    Please <Link to="/login" onClick={handleClose} className="text-primary hover:underline font-bold mx-1">log in</Link> to checkout your cart.
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 flex flex-col md:flex-row gap-8 custom-scrollbar">
            {/* Checkout Form - Left Column: Policies */}
            <div className="flex-1 flex flex-col gap-4 pr-0 md:pr-8 md:border-r border-gray-200 dark:border-white/10">
              <div className="bg-gray-50 dark:bg-black/20 p-4 rounded-xl border border-gray-200 dark:border-white/10">
                <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2 text-sm">
                  <span className="material-symbols-outlined text-[18px]">verified_user</span> Refund Policy
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
                  You can return these e-books for a full refund within 7 days of purchase, provided you have read less than 20% of the book. Audio books are non-refundable once downloaded.
                </p>
                <div className="bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 p-3 rounded-lg text-xs font-medium">
                  <p className="font-bold mb-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">sell</span> Rent-to-Own Rebate
                  </p>
                  <p>If you purchase a book you are currently renting, 50% of the rental price is automatically deducted from your purchase price!</p>
                </div>
              </div>

              {rentChecked && rentItems.length > 0 && (
                <div className="bg-primary/10 border border-primary/20 text-primary-dark dark:text-primary-fixed p-4 rounded-xl text-sm font-medium">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-lg">info</span>
                    <div>
                      <p className="mb-1">Base rent time is 1 week (7 days).</p>
                      <p className="mb-1">Each additional day adds $0.50 per book.</p>
                      <p>If not extended, it will be automatically removed from your private library.</p>
                    </div>
                  </div>
                </div>
              )}

              {copyrightNotice}
            </div>

            {/* Checkout Form - Right Column: Payment Details */}
            <div className="flex-1 flex flex-col gap-6">
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
                  onClick={handlePay}
                  className="w-full sm:w-auto px-12 bg-primary hover:bg-primary/90 dark:bg-primary-fixed text-white dark:text-gray-900 font-bold py-4 rounded-xl transition-all active:scale-[0.98] shadow-md flex justify-center items-center gap-2 text-lg"
                >
                  <span className="material-symbols-outlined text-[20px]">lock</span> Pay Securely (${finalTotal.toFixed(2)})
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CartModal;
