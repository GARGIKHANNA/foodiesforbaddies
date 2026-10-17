import React, { useState } from 'react';
import { MenuItem, CartItem } from '../types';

interface ItemCustomizerModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number, customization: any) => void;
  existingCartItem?: CartItem;
}

export const ItemCustomizerModal: React.FC<ItemCustomizerModalProps> = ({
  item,
  onClose,
  onAddToCart,
  existingCartItem,
}) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(existingCartItem ? existingCartItem.quantity : 1);
  const [selectedBun, setSelectedBun] = useState(
    existingCartItem?.customization?.bun || item.options?.buns?.[0] || 'Brioche Bun'
  );
  const [selectedDoneness, setSelectedDoneness] = useState(
    existingCartItem?.customization?.doneness || item.options?.doneness?.[1] || 'Medium-Well'
  );
  const [selectedAddons, setSelectedAddons] = useState<{ id: string; name: string; price: number }[]>(
    existingCartItem?.customization?.addons || []
  );
  const [specialInstructions, setSpecialInstructions] = useState(
    existingCartItem?.customization?.specialInstructions || ''
  );

  const toggleAddon = (addon: { id: string; name: string; price: number }) => {
    if (selectedAddons.some((a) => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const unitPrice = item.price + addonsTotal;
  const totalPrice = unitPrice * quantity;

  const handleSave = () => {
    onAddToCart(item, quantity, {
      bun: selectedBun,
      doneness: selectedDoneness,
      addons: selectedAddons,
      specialInstructions,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div
        className="w-full max-w-lg bg-[#ffffff] rounded-t-3xl sm:rounded-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with image */}
        <div className="relative h-56 sm:h-64 bg-[#ebe7e7] shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#ffffff]/90 backdrop-blur-md shadow-md flex items-center justify-center text-[#1c1b1b] hover:bg-white active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            {item.badge && (
              <span className="inline-block bg-[#b7122a] text-white text-[11px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mb-1">
                {item.badge.label}
              </span>
            )}
            <h2 className="text-xl sm:text-2xl font-bold leading-tight">{item.name}</h2>
            <div className="flex items-center gap-2 mt-1 text-white/90 text-sm">
              <span className="font-semibold text-lg text-white">${item.price.toFixed(2)}</span>
              <span>•</span>
              <span className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded text-xs">
                {item.calories} cal
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Customization Content */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1 no-scrollbar">
          <p className="text-sm text-[#5c5f60] leading-relaxed">{item.description}</p>

          {/* Bun Selection */}
          {item.options?.buns && item.options.buns.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-sm text-[#1c1b1b]">Choice of Bun</h3>
                <span className="text-xs bg-[#f0edec] text-[#5c5f60] px-2 py-0.5 rounded">Required</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {item.options.buns.map((bun) => (
                  <label
                    key={bun}
                    className={`flex items-center justify-between p-3 rounded-xl border text-sm cursor-pointer transition-all ${
                      selectedBun === bun
                        ? 'border-[#b7122a] bg-[#ffdad8]/30 font-medium'
                        : 'border-[#e1e3e4] bg-[#fcf9f8] hover:bg-[#f6f3f2]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="bun-choice"
                        checked={selectedBun === bun}
                        onChange={() => setSelectedBun(bun)}
                        className="w-4 h-4 text-[#b7122a] focus:ring-[#b7122a]"
                      />
                      <span className="text-[#1c1b1b]">{bun}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Doneness */}
          {item.options?.doneness && item.options.doneness.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-sm text-[#1c1b1b]">Patty Doneness / Heat</h3>
                <span className="text-xs bg-[#f0edec] text-[#5c5f60] px-2 py-0.5 rounded">Required</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {item.options.doneness.map((done) => (
                  <label
                    key={done}
                    className={`flex items-center justify-between p-3 rounded-xl border text-sm cursor-pointer transition-all ${
                      selectedDoneness === done
                        ? 'border-[#b7122a] bg-[#ffdad8]/30 font-medium'
                        : 'border-[#e1e3e4] bg-[#fcf9f8] hover:bg-[#f6f3f2]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="doneness-choice"
                        checked={selectedDoneness === done}
                        onChange={() => setSelectedDoneness(done)}
                        className="w-4 h-4 text-[#b7122a] focus:ring-[#b7122a]"
                      />
                      <span className="text-[#1c1b1b]">{done}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Premium Add-ons */}
          {item.options?.addons && item.options.addons.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-sm text-[#1c1b1b]">Gourmet Add-ons</h3>
                <span className="text-xs text-[#5c5f60]">Optional</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {item.options.addons.map((addon) => {
                  const isChecked = selectedAddons.some((a) => a.id === addon.id);
                  return (
                    <label
                      key={addon.id}
                      className={`flex items-center justify-between p-3 rounded-xl border text-sm cursor-pointer transition-all ${
                        isChecked
                          ? 'border-[#b7122a] bg-[#ffdad8]/30 font-medium'
                          : 'border-[#e1e3e4] bg-[#fcf9f8] hover:bg-[#f6f3f2]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleAddon(addon)}
                          className="w-4 h-4 rounded text-[#b7122a] focus:ring-[#b7122a]"
                        />
                        <span className="text-[#1c1b1b]">{addon.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-[#b7122a]">+${addon.price.toFixed(2)}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm text-[#1c1b1b]">Special Kitchen Instructions</h3>
            <textarea
              rows={2}
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. Extra crispy fries, sauce on the side, no onions..."
              className="w-full p-3 rounded-xl border border-[#e1e3e4] bg-[#fcf9f8] text-sm focus:border-[#b7122a] focus:ring-1 focus:ring-[#b7122a] outline-none resize-none"
            />
          </div>
        </div>

        {/* Footer with Quantity & Add Button */}
        <div className="p-4 bg-[#ffffff] border-t border-[#f0edec] flex items-center gap-4">
          <div className="flex items-center bg-[#f0edec] rounded-full px-2 py-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#5c5f60] active:scale-90 transition-transform"
            >
              <span className="material-symbols-outlined text-[18px]">remove</span>
            </button>
            <span className="w-8 text-center font-bold text-sm text-[#1c1b1b]">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#b7122a] active:scale-90 transition-transform"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
            </button>
          </div>

          <button
            onClick={handleSave}
            className="flex-1 h-12 bg-[#b7122a] hover:bg-[#db313f] text-white font-semibold rounded-full flex items-center justify-between px-6 shadow-md active:scale-[0.98] transition-all"
          >
            <span>{existingCartItem ? 'Update Order' : 'Add to Cart'}</span>
            <span className="tabular-nums font-bold">${totalPrice.toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
