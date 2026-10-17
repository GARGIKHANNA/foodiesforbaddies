import React, { useState } from 'react';
import { MenuItem, CartItem, AppScreen, OrderState, Restaurant } from './types';
import { RESTAURANT_DATA, MENU_ITEMS } from './data/menuData';
import { RestaurantDetail } from './components/RestaurantDetail';
import { ItemCustomizerModal } from './components/ItemCustomizerModal';
import { CartCheckoutScreen } from './components/CartCheckoutScreen';
import { OrderTrackingScreen } from './components/OrderTrackingScreen';
import { DiscoverScreen } from './components/DiscoverScreen';
import { TopBarControls } from './components/TopBarControls';

export default function App() {
  // Initial cart items exactly matching the 2 items from the user's screenshot
  const initialCart: CartItem[] = [
    {
      cartItemId: 'item-1-initial',
      item: MENU_ITEMS[0], // Double Truffle Smash Burger
      quantity: 1,
      unitPrice: 13.99,
      totalPrice: 13.99,
      customization: {
        bun: 'Toasted Brioche Bun (Standard)',
        doneness: 'Medium-Well (Standard)',
        addons: [],
      },
    },
    {
      cartItemId: 'item-2-initial',
      item: MENU_ITEMS[1], // Crispy Nashville Hot Chicken
      quantity: 1,
      unitPrice: 11.5,
      totalPrice: 11.5,
      customization: {
        bun: 'Buttered Potato Bun (Standard)',
        doneness: 'Nashville Hot (Level 2)',
        addons: [],
      },
    },
  ];

  const [currentScreen, setCurrentScreen] = useState<AppScreen>('menu');
  const [activeRestaurant, setActiveRestaurant] = useState<Restaurant>(RESTAURANT_DATA);
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCart);
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);
  const [promoApplied, setPromoApplied] = useState<boolean>(false);
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(false);

  // Active Order State
  const [activeOrder, setActiveOrder] = useState<OrderState>({
    orderId: 'SB-8924',
    status: 'on_the_way',
    placedAt: '10:48 PM',
    estimatedDeliveryTime: '11:18 PM',
    items: initialCart,
    subtotal: 25.49,
    discount: 5.1,
    deliveryFee: 1.99,
    serviceFee: 1.85,
    tip: 3.0,
    total: 27.23,
    driver: {
      name: 'Marcus Vance',
      rating: 4.96,
      deliveriesCount: 1420,
      vehicle: 'Honda Zoomer E-Scooter (Red)',
      photo:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBr4KnYpJg-1xYXhmz4_sOOq2feaU3xMAOSkAwYzRuONUpy3NS1MMkmciIL9oW3AGxPKR0vvL-xXJ4eAAwuFT4NubJXBlPoaLrthvcr4cliMp2mfVKo3AP3V3UmkebWTZ9MFvJDhNeNotZ3TAfIIQKXjQy3dKXDKaDmmv2tyidLnH7Fzk1xmCCD_LX8yZ4Dbq9gt1CyBseyV8mMpOAH3vfFh6pqpG8Bn1m27HfBONM6J3DAuTAW2FDbXw',
      phone: '+1 (555) 382-9011',
    },
  });

  // Quantity stepper from main menu
  const handleUpdateQuantity = (menuItem: MenuItem, delta: number) => {
    const existingIndex = cartItems.findIndex((ci) => ci.item.id === menuItem.id);

    if (existingIndex > -1) {
      const updated = [...cartItems];
      const target = updated[existingIndex];
      const newQty = target.quantity + delta;

      if (newQty <= 0) {
        setCartItems(updated.filter((_, idx) => idx !== existingIndex));
      } else {
        target.quantity = newQty;
        target.totalPrice = target.unitPrice * newQty;
        setCartItems(updated);
      }
    } else if (delta > 0) {
      const newItem: CartItem = {
        cartItemId: `cart-${menuItem.id}-${Date.now()}`,
        item: menuItem,
        quantity: 1,
        unitPrice: menuItem.price,
        totalPrice: menuItem.price,
        customization: {
          bun: menuItem.options?.buns?.[0],
          doneness: menuItem.options?.doneness?.[0],
          addons: [],
        },
      };
      setCartItems([...cartItems, newItem]);
    }
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems(cartItems.filter((ci) => ci.cartItemId !== cartItemId));
  };

  // Add from Customization Modal
  const handleAddToCartFromModal = (menuItem: MenuItem, quantity: number, customization: any) => {
    const addonsTotal = (customization.addons || []).reduce(
      (sum: number, a: { price: number }) => sum + a.price,
      0
    );
    const unitPrice = menuItem.price + addonsTotal;
    const totalPrice = unitPrice * quantity;

    const newItem: CartItem = {
      cartItemId: `custom-${menuItem.id}-${Date.now()}`,
      item: menuItem,
      quantity,
      customization,
      unitPrice,
      totalPrice,
    };

    setCartItems([...cartItems, newItem]);
  };

  const handlePlaceOrder = (newOrder: OrderState) => {
    setActiveOrder(newOrder);
    setCartItems([]);
    setCurrentScreen('tracking');
  };

  const handleResetDemo = () => {
    setCartItems(initialCart);
    setPromoApplied(false);
    setCurrentScreen('menu');
  };

  const totalCartCount = cartItems.reduce((acc, ci) => acc + ci.quantity, 0);

  // Render current screen component
  const renderScreenContent = () => {
    switch (currentScreen) {
      case 'menu':
        return (
          <RestaurantDetail
            restaurant={activeRestaurant}
            menuItems={MENU_ITEMS}
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onSelectItemForDetail={(item) => setSelectedItemForModal(item)}
            onViewCart={() => setCurrentScreen('cart')}
            onBackToDiscover={() => setCurrentScreen('discover')}
            promoApplied={promoApplied}
            onApplyPromo={() => setPromoApplied(true)}
          />
        );
      case 'cart':
        return (
          <CartCheckoutScreen
            restaurant={activeRestaurant}
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onBackToMenu={() => setCurrentScreen('menu')}
            onPlaceOrder={handlePlaceOrder}
            promoApplied={promoApplied}
            onApplyPromo={() => setPromoApplied(true)}
            onRemovePromo={() => setPromoApplied(false)}
          />
        );
      case 'tracking':
        return (
          <OrderTrackingScreen
            order={activeOrder}
            onBackToMenu={() => setCurrentScreen('menu')}
            onUpdateOrderStatus={(status) => setActiveOrder({ ...activeOrder, status })}
          />
        );
      case 'discover':
        return (
          <DiscoverScreen
            onSelectRestaurant={(resto) => {
              setActiveRestaurant(resto);
              setCurrentScreen('menu');
            }}
            cartItemCount={totalCartCount}
            onOpenCart={() => setCurrentScreen('cart')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f0edec] flex flex-col font-sans">
      {/* Top Preview Controls Bar */}
      <TopBarControls
        currentScreen={currentScreen}
        onSelectScreen={(screen) => setCurrentScreen(screen)}
        cartCount={totalCartCount}
        isMobileFrame={isMobileFrame}
        onToggleFrame={() => setIsMobileFrame(!isMobileFrame)}
        onResetDemo={handleResetDemo}
      />

      {/* Main App Container */}
      <div className="flex-1 flex justify-center items-start sm:p-4 md:p-6 overflow-x-hidden">
        {isMobileFrame ? (
          /* Realistic Smartphone Bezel Container */
          <div className="w-[412px] min-h-[892px] max-h-[92vh] bg-black rounded-[48px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border-4 border-[#2b2a2a] flex flex-col relative my-auto overflow-hidden">
            {/* Dynamic Island / Camera Notch */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50 flex items-center justify-between px-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#1a1a1a]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#102030]/80" />
            </div>

            {/* Simulated Mobile Status Bar */}
            <div className="h-7 px-6 pt-1 flex items-center justify-between text-[11px] font-bold text-[#1c1b1b] bg-[#fcf9f8] z-40 rounded-t-[36px]">
              <span>9:41</span>
              <div className="flex items-center gap-1.5 text-xs">
                <span className="material-symbols-outlined text-[14px]">signal_cellular_alt</span>
                <span className="material-symbols-outlined text-[14px]">wifi</span>
                <span className="material-symbols-outlined text-[16px]">battery_full</span>
              </div>
            </div>

            {/* Screen Viewport with internal scroll */}
            <div className="flex-1 overflow-y-auto no-scrollbar rounded-b-[36px] bg-[#fcf9f8] relative">
              {renderScreenContent()}
            </div>

            {/* iOS Home Indicator Bar */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/60 rounded-full z-50 pointer-events-none" />
          </div>
        ) : (
          /* Responsive Viewport Mode */
          <div className="w-full max-w-xl bg-[#fcf9f8] min-h-screen shadow-xl rounded-none sm:rounded-3xl overflow-hidden relative border border-[#e1e3e4]">
            {renderScreenContent()}
          </div>
        )}
      </div>

      {/* Item Customizer Modal */}
      {selectedItemForModal && (
        <ItemCustomizerModal
          item={selectedItemForModal}
          onClose={() => setSelectedItemForModal(null)}
          onAddToCart={handleAddToCartFromModal}
        />
      )}
    </div>
  );
}
