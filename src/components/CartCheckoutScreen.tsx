import React, { useState } from 'react';
import { CartItem, Restaurant, OrderState } from '../types';

interface CartCheckoutScreenProps {
  restaurant: Restaurant;
  cartItems: CartItem[];
  onUpdateQuantity: (item: any, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onBackToMenu: () => void;
  onPlaceOrder: (order: OrderState) => void;
  promoApplied: boolean;
  onApplyPromo: (code: string) => void;
  onRemovePromo: () => void;
}

export const CartCheckoutScreen: React.FC<CartCheckoutScreenProps> = ({
  restaurant,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onBackToMenu,
  onPlaceOrder,
  promoApplied,
  onApplyPromo,
  onRemovePromo,
}) => {
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [promoInput, setPromoInput] = useState<string>('');
  const [tipAmount, setTipAmount] = useState<number>(3.0);
  const [paymentMethod, setPaymentMethod] = useState<'apple_pay' | 'card'>('apple_pay');
  const [deliveryNote, setDeliveryNote] = useState<string>('Leave at door, please ring bell.');
  const [isPlacing, setIsPlacing] = useState<boolean>(false);

  const subtotal = cartItems.reduce((acc, ci) => acc + ci.totalPrice, 0);
  const discount = promoApplied ? subtotal * 0.2 : 0;
  const deliveryFee = orderType === 'delivery' ? restaurant.deliveryFee : 0;
  const serviceFee = subtotal > 0 ? 1.85 : 0;
  const grandTotal = Math.max(0, subtotal - discount + deliveryFee + serviceFee + tipAmount);

  const handleApplyPromo = (code: string) => {
    if (code.trim().toUpperCase() === 'SMASH20') {
      onApplyPromo('SMASH20');
      setPromoInput('');
    } else {
      alert('Invalid promo code. Try "SMASH20" for 20% off!');
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setIsPlacing(true);

    const now = new Date();
    const est = new Date(now.getTime() + 22 * 60 * 1000);

    const newOrder: OrderState = {
      orderId: `SB-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'confirmed',
      placedAt: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedDeliveryTime: est.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      items: [...cartItems],
      subtotal,
      discount,
      deliveryFee,
      serviceFee,
      tip: tipAmount,
      total: grandTotal,
      driver: {
        name: 'Marcus Vance',
        rating: 4.96,
        deliveriesCount: 1420,
        vehicle: 'Honda Zoomer E-Scooter (Red)',
        photo:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBr4KnYpJg-1xYXhmz4_sOOq2feaU3xMAOSkAwYzRuONUpy3NS1MMkmciIL9oW3AGxPKR0vvL-xXJ4eAAwuFT4NubJXBlPoaLrthvcr4cliMp2mfVKo3AP3V3UmkebWTZ9MFvJDhNeNotZ3TAfIIQKXjQy3dKXDKaDmmv2tyidLnH7Fzk1xmCCD_LX8yZ4Dbq9gt1CyBseyV8mMpOAH3vfFh6pqpG8Bn1m27HfBONM6J3DAuTAW2FDbXw',
        phone: '+1 (555) 382-9011',
      },
    };

    setTimeout(() => {
      setIsPlacing(false);
      onPlaceOrder(newOrder);
    }, 900);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fcf9f8] text-[#1c1b1b]">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#fcf9f8]/95 backdrop-blur-md border-b border-[#f0edec] px-4 py-3.5 flex items-center justify-between max-w-2xl mx-auto w-full">
        <button
          onClick={onBackToMenu}
          aria-label="Back to menu"
          className="w-10 h-10 rounded-full bg-[#f6f3f2] hover:bg-[#f0edec] flex items-center justify-center transition-transform active:scale-95"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </button>
        <div className="text-center">
          <h1 className="font-bold text-base text-[#1c1b1b]">Checkout & Cart</h1>
          <p className="text-[11px] text-[#5c5f60]">{restaurant.name}</p>
        </div>
        <div className="w-10" />
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-4 space-y-4 pb-32">
        {/* Delivery / Pickup Tab */}
        <div className="bg-[#f0edec] p-1 rounded-2xl flex items-center gap-1">
          <button
            onClick={() => setOrderType('delivery')}
            className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
              orderType === 'delivery'
                ? 'bg-white text-[#1c1b1b] shadow-sm'
                : 'text-[#5c5f60] hover:text-[#1c1b1b]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">delivery_dining</span>
            Delivery (20-25 min)
          </button>
          <button
            onClick={() => setOrderType('pickup')}
            className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
              orderType === 'pickup'
                ? 'bg-white text-[#1c1b1b] shadow-sm'
                : 'text-[#5c5f60] hover:text-[#1c1b1b]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">storefront</span>
            Pickup (10-15 min)
          </button>
        </div>

        {/* Address Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#f0edec] space-y-2.5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#ffdad8] text-[#b7122a] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">location_on</span>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#5c5f60] uppercase tracking-wider">
                  {orderType === 'delivery' ? 'Delivering to Home' : 'Pickup Address'}
                </p>
                <p className="text-sm font-bold text-[#1c1b1b]">
                  {orderType === 'delivery'
                    ? '742 Evergreen Terrace, Apt 4B'
                    : restaurant.address}
                </p>
              </div>
            </div>
            <button className="text-xs font-semibold text-[#b7122a] hover:underline">
              Change
            </button>
          </div>

          {orderType === 'delivery' && (
            <div className="pt-2 border-t border-[#f0edec] flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#5c5f60]">edit_note</span>
              <input
                type="text"
                value={deliveryNote}
                onChange={(e) => setDeliveryNote(e.target.value)}
                placeholder="Add drop-off note for courier..."
                className="text-xs text-[#1c1b1b] bg-transparent flex-1 outline-none placeholder:text-[#5c5f60]"
              />
            </div>
          )}
        </div>

        {/* Cart Items List */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#f0edec] space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#f0edec]">
            <h2 className="text-sm font-bold text-[#1c1b1b]">
              Order Summary ({cartItems.reduce((s, i) => s + i.quantity, 0)})
            </h2>
            <button
              onClick={onBackToMenu}
              className="text-xs font-bold text-[#b7122a] flex items-center gap-1 hover:underline"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              Add More Items
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="py-8 text-center text-[#5c5f60]">
              <span className="material-symbols-outlined text-3xl mb-1">shopping_basket</span>
              <p className="text-sm">Your cart is empty.</p>
              <button
                onClick={onBackToMenu}
                className="mt-3 px-4 py-1.5 bg-[#b7122a] text-white text-xs font-bold rounded-full"
              >
                Explore Menu
              </button>
            </div>
          ) : (
            <div className="divide-y divide-[#f0edec]">
              {cartItems.map((cartItem) => (
                <div key={cartItem.cartItemId} className="py-3 flex items-start gap-3">
                  <img
                    src={cartItem.item.image}
                    alt={cartItem.item.name}
                    className="w-16 h-16 rounded-xl object-cover bg-[#f0edec] shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-semibold text-[#1c1b1b] truncate pr-2">
                        {cartItem.item.name}
                      </h3>
                      <span className="text-sm font-bold text-[#1c1b1b] tabular-nums">
                        ${cartItem.totalPrice.toFixed(2)}
                      </span>
                    </div>

                    {/* Customizations summary */}
                    {cartItem.customization && (
                      <div className="text-[11px] text-[#5c5f60] mt-0.5 space-y-0.5">
                        {cartItem.customization.bun && <span>{cartItem.customization.bun}</span>}
                        {cartItem.customization.doneness && (
                          <span> • {cartItem.customization.doneness}</span>
                        )}
                        {cartItem.customization.addons && cartItem.customization.addons.length > 0 && (
                          <div className="text-[#b7122a]">
                            + {cartItem.customization.addons.map((a) => a.name).join(', ')}
                          </div>
                        )}
                        {cartItem.customization.specialInstructions && (
                          <div className="italic">Note: "{cartItem.customization.specialInstructions}"</div>
                        )}
                      </div>
                    )}

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="bg-[#f0edec] rounded-full px-2 py-0.5 flex items-center gap-2">
                        <button
                          onClick={() => {
                            if (cartItem.quantity === 1) {
                              onRemoveItem(cartItem.cartItemId);
                            } else {
                              onUpdateQuantity(cartItem.item, -1);
                            }
                          }}
                          className="w-5 h-5 flex items-center justify-center text-[#5c5f60] active:scale-90"
                        >
                          <span className="material-symbols-outlined text-[14px]">remove</span>
                        </button>
                        <span className="text-xs font-bold text-[#1c1b1b] min-w-[12px] text-center tabular-nums">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(cartItem.item, 1)}
                          className="w-5 h-5 flex items-center justify-center text-[#b7122a] active:scale-90"
                        >
                          <span className="material-symbols-outlined text-[14px]">add</span>
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(cartItem.cartItemId)}
                        className="text-xs text-[#ba1a1a] hover:underline flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[14px]">delete</span>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Promo Code Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#f0edec] space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#1c1b1b] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#b7122a]">local_offer</span>
              Promotions & Vouchers
            </span>
            {promoApplied && (
              <button
                onClick={onRemovePromo}
                className="text-xs font-semibold text-[#ba1a1a] hover:underline"
              >
                Remove code
              </button>
            )}
          </div>

          {promoApplied ? (
            <div className="bg-[#006762]/10 border border-[#006762]/20 rounded-xl p-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006762] text-[18px]">verified</span>
                <div>
                  <span className="font-bold text-[#006762]">SMASH20</span>
                  <span className="text-[#5c5f60] ml-1.5">applied • 20% OFF subtotal</span>
                </div>
              </div>
              <span className="font-bold text-[#006762] tabular-nums">-${discount.toFixed(2)}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                placeholder="Enter promo code (e.g. SMASH20)"
                className="flex-1 px-3 py-2 text-xs bg-[#f0edec] rounded-xl outline-none focus:ring-1 focus:ring-[#b7122a] uppercase font-medium"
              />
              <button
                onClick={() => handleApplyPromo(promoInput || 'SMASH20')}
                className="px-4 py-2 bg-[#1c1b1b] hover:bg-[#313030] text-white text-xs font-semibold rounded-xl active:scale-95 transition-transform"
              >
                Apply
              </button>
            </div>
          )}
        </div>

        {/* Courier Tip Selector */}
        {orderType === 'delivery' && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#f0edec] space-y-2.5">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xs font-bold text-[#1c1b1b]">Tip Your Courier</h3>
                <p className="text-[11px] text-[#5c5f60]">100% of your tip goes to your driver</p>
              </div>
              <span className="text-xs font-bold text-[#b7122a] tabular-nums">
                +${tipAmount.toFixed(2)}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[2, 3, 4, 5].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setTipAmount(amt)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    tipAmount === amt
                      ? 'bg-[#b7122a] text-white shadow-sm'
                      : 'bg-[#f0edec] text-[#1c1b1b] hover:bg-[#ebe7e7]'
                  }`}
                >
                  ${amt}.00
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Cost Breakdown */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#f0edec] space-y-2 text-xs">
          <div className="flex justify-between text-[#5c5f60]">
            <span>Items Subtotal</span>
            <span className="font-medium tabular-nums text-[#1c1b1b]">${subtotal.toFixed(2)}</span>
          </div>
          {promoApplied && (
            <div className="flex justify-between text-[#006762] font-semibold">
              <span>Promotion (20% OFF)</span>
              <span className="tabular-nums">-${discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-[#5c5f60]">
            <span>Delivery Fee</span>
            <span className="font-medium tabular-nums text-[#1c1b1b]">
              {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between text-[#5c5f60]">
            <span>Service & Regulatory Fee</span>
            <span className="font-medium tabular-nums text-[#1c1b1b]">
              ${serviceFee.toFixed(2)}
            </span>
          </div>
          {orderType === 'delivery' && (
            <div className="flex justify-between text-[#5c5f60]">
              <span>Courier Tip</span>
              <span className="font-medium tabular-nums text-[#1c1b1b]">
                ${tipAmount.toFixed(2)}
              </span>
            </div>
          )}
          <div className="pt-2 border-t border-[#f0edec] flex justify-between items-center text-sm">
            <span className="font-bold text-[#1c1b1b]">Total Amount</span>
            <span className="font-extrabold text-lg text-[#b7122a] tabular-nums">
              ${grandTotal.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Payment Method Selector */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#f0edec] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1c1b1b] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">credit_card</span>
            </div>
            <div>
              <p className="text-xs font-bold text-[#1c1b1b]">Apple Pay</p>
              <p className="text-[11px] text-[#5c5f60]">Linked to Visa •••• 4242</p>
            </div>
          </div>
          <span className="text-xs font-semibold text-[#b7122a] hover:underline cursor-pointer">
            Change
          </span>
        </div>
      </main>

      {/* Floating Bottom Place Order CTA */}
      <div className="fixed bottom-0 inset-x-0 bg-white/90 backdrop-blur-md border-t border-[#f0edec] p-4 z-40">
        <div className="max-w-2xl mx-auto">
          <button
            disabled={cartItems.length === 0 || isPlacing}
            onClick={handleCheckout}
            className="w-full h-13 rounded-full bg-[#b7122a] hover:bg-[#db313f] disabled:opacity-50 text-white font-bold text-sm sm:text-base flex items-center justify-between px-6 shadow-xl active:scale-[0.99] transition-all"
          >
            <span>{isPlacing ? 'Confirming Order...' : 'Place Order'}</span>
            <div className="flex items-center gap-2">
              <span className="tabular-nums font-extrabold">${grandTotal.toFixed(2)}</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
