import React, { useState } from 'react';
import { MenuItem, CartItem, Restaurant } from '../types';

interface RestaurantDetailProps {
  restaurant: Restaurant;
  menuItems: MenuItem[];
  cartItems: CartItem[];
  onUpdateQuantity: (menuItem: MenuItem, delta: number) => void;
  onSelectItemForDetail: (menuItem: MenuItem) => void;
  onViewCart: () => void;
  onBackToDiscover: () => void;
  promoApplied: boolean;
  onApplyPromo: (code: string) => void;
}

export const RestaurantDetail: React.FC<RestaurantDetailProps> = ({
  restaurant,
  menuItems,
  cartItems,
  onUpdateQuantity,
  onSelectItemForDetail,
  onViewCart,
  onBackToDiscover,
  promoApplied,
  onApplyPromo,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Bestsellers');
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showMenuOptions, setShowMenuOptions] = useState<boolean>(false);

  const categories = ['Bestsellers', 'Smash Burgers', 'Sides & Loaded Fries', 'Beverages & Shakes'];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartPrice = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  // Filter items based on active category and optional search query
  const filteredItems = menuItems.filter((item) => {
    if (searchQuery.trim()) {
      return (
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedCategory === 'Bestsellers') {
      return item.category === 'Bestsellers' || item.badge?.type === 'popular';
    }
    return item.category === selectedCategory;
  });

  const getItemCount = (itemId: string) => {
    return cartItems
      .filter((ci) => ci.item.id === itemId)
      .reduce((sum, ci) => sum + ci.quantity, 0);
  };

  return (
    <div className="flex flex-col relative w-full bg-[#fcf9f8] min-h-screen text-[#1c1b1b]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#1c1b1b] text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[18px] text-[#ffdad8]">check_circle</span>
          {toastMessage}
        </div>
      )}

      {/* Fixed Header */}
      <header className="fixed top-0 w-full z-50 bg-[#fcf9f8]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 px-4 flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <button
              aria-label="Go back to discover"
              onClick={onBackToDiscover}
              className="w-11 h-11 rounded-full flex items-center justify-center text-[#1c1b1b] bg-[#f6f3f2] hover:bg-[#f0edec] transition-colors active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <img
              alt="Crave Food App Logo"
              className="h-7 w-auto object-contain cursor-pointer"
              src={restaurant.logoImage}
              onClick={onBackToDiscover}
            />
            <h1 className="font-semibold text-[17px] text-[#1c1b1b] truncate max-w-[180px]">
              Restaurant
            </h1>
          </div>

          <div className="flex items-center gap-2 relative">
            <button
              aria-label="Toggle search"
              onClick={() => setShowSearch(!showSearch)}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#1c1b1b] bg-[#f6f3f2] hover:bg-[#f0edec] transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">
                {showSearch ? 'close' : 'search'}
              </span>
            </button>

            <button
              aria-label="Restaurant options"
              onClick={() => setShowMenuOptions(!showMenuOptions)}
              className="w-11 h-11 rounded-full flex items-center justify-center text-[#1c1b1b] bg-[#f6f3f2] hover:bg-[#f0edec] transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">more_vert</span>
            </button>

            {/* Dropdown Options */}
            {showMenuOptions && (
              <div className="absolute right-0 top-13 w-52 bg-white rounded-2xl shadow-xl border border-[#f0edec] p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <button
                  onClick={() => {
                    setShowMenuOptions(false);
                    showToast('Smash & Bun is Open • 11:00 AM - 11:30 PM');
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#1c1b1b] hover:bg-[#f6f3f2] rounded-xl transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#5c5f60]">info</span>
                  Restaurant Info & Hours
                </button>
                <button
                  onClick={() => {
                    setShowMenuOptions(false);
                    showToast('Halal certified Angus beef & allergen menu available');
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#1c1b1b] hover:bg-[#f6f3f2] rounded-xl transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#5c5f60]">nutrition</span>
                  Dietary & Allergens
                </button>
                <button
                  onClick={() => {
                    setShowMenuOptions(false);
                    navigator.clipboard?.writeText(window.location.href);
                    showToast('Link copied to share with friends!');
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[#1c1b1b] hover:bg-[#f6f3f2] rounded-xl transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#5c5f60]">share</span>
                  Share Restaurant
                </button>
              </div>
            )}

            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#ffdad8]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBr4KnYpJg-1xYXhmz4_sOOq2feaU3xMAOSkAwYzRuONUpy3NS1MMkmciIL9oW3AGxPKR0vvL-xXJ4eAAwuFT4NubJXBlPoaLrthvcr4cliMp2mfVKo3AP3V3UmkebWTZ9MFvJDhNeNotZ3TAfIIQKXjQy3dKXDKaDmmv2tyidLnH7Fzk1xmCCD_LX8yZ4Dbq9gt1CyBseyV8mMpOAH3vfFh6pqpG8Bn1m27HfBONM6J3DAuTAW2FDbXw"
            />
          </div>
        </div>

        {/* Search Bar dropdown when opened */}
        {showSearch && (
          <div className="px-4 pb-3 max-w-4xl mx-auto">
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3.5 text-[#5c5f60] text-[20px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search burgers, fries, shakes, dips..."
                autoFocus
                className="w-full pl-10 pr-9 py-2 rounded-xl bg-[#f0edec] text-sm text-[#1c1b1b] placeholder:text-[#5c5f60] outline-none focus:ring-2 focus:ring-[#b7122a]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-[#5c5f60] hover:text-[#1c1b1b]"
                >
                  <span className="material-symbols-outlined text-[18px]">cancel</span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex flex-col relative w-full pt-16 pb-28 max-w-4xl mx-auto">
        {/* Hero Photographic Showcase */}
        <div className="relative w-full h-64 bg-[#ebe7e7] overflow-hidden">
          <img
            className="w-full h-full object-cover"
            alt="Sensational close up food photography of juicy double smash beef burgers with bubbling melted cheddar"
            src={restaurant.bannerImage}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b1b]/80 via-transparent to-black/30" />

          {/* Floating Hero Controls */}
          <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-auto">
            <button
              aria-label="Back to explore"
              onClick={onBackToDiscover}
              className="w-10 h-10 rounded-full bg-[#ffffff]/90 backdrop-blur-md shadow-md flex items-center justify-center text-[#1c1b1b] transition-transform active:scale-95 hover:bg-white"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <div className="flex items-center gap-2">
              <button
                aria-label="Bookmark restaurant"
                onClick={() => {
                  const next = !isBookmarked;
                  setIsBookmarked(next);
                  showToast(next ? 'Added to your Favorites ❤️' : 'Removed from Favorites');
                }}
                className="w-10 h-10 rounded-full bg-[#ffffff]/90 backdrop-blur-md shadow-md flex items-center justify-center text-[#1c1b1b] transition-transform active:scale-95 hover:bg-white"
              >
                <span
                  className={`material-symbols-outlined text-[20px] transition-colors ${
                    isBookmarked ? 'text-[#b7122a]' : 'text-[#1c1b1b]'
                  }`}
                  style={{ fontVariationSettings: isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {isBookmarked ? 'favorite' : 'favorite_border'}
                </span>
              </button>
              <button
                aria-label="Share restaurant"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: restaurant.name,
                      text: 'Order best smash burgers on Crave!',
                      url: window.location.href,
                    }).catch(() => {});
                  } else {
                    navigator.clipboard?.writeText(window.location.href);
                    showToast('Link copied to clipboard!');
                  }
                }}
                className="w-10 h-10 rounded-full bg-[#ffffff]/90 backdrop-blur-md shadow-md flex items-center justify-center text-[#1c1b1b] transition-transform active:scale-95 hover:bg-white"
              >
                <span className="material-symbols-outlined text-[20px]">share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Restaurant Meta Elevation Card (Asymmetric Layering) */}
        <div className="px-4 -mt-8 relative z-10">
          <div className="bg-[#ffffff] rounded-xl p-4 shadow-lg flex flex-col gap-3 border border-[#f0edec]/80">
            {/* Title & Rating */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col min-w-0">
                <h2 className="font-bold text-2xl text-[#1c1b1b] truncate tracking-tight">
                  {restaurant.name}
                </h2>
                <p className="text-xs sm:text-sm text-[#5c5f60] truncate mt-0.5">
                  {restaurant.cuisines.join(' • ')} • {restaurant.priceRange}
                </p>
              </div>
              <div className="flex items-center gap-1 bg-[#f6f3f2] px-2.5 py-1 rounded-full shrink-0">
                <span
                  className="material-symbols-outlined text-[#b7122a] text-[16px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span className="font-semibold text-xs text-[#1c1b1b]">{restaurant.rating}</span>
                <span className="text-xs text-[#5c5f60]">({restaurant.ratingCount})</span>
              </div>
            </div>

            {/* Quick Logistics Stats Pills */}
            <div className="flex items-center flex-wrap gap-2 pt-1">
              <div className="flex items-center gap-1.5 bg-[#f0edec] px-2.5 py-1 rounded-lg">
                <span className="material-symbols-outlined text-[#5b403f] text-[15px]">schedule</span>
                <span className="text-xs font-semibold text-[#5b403f]">{restaurant.deliveryTime}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#f0edec] px-2.5 py-1 rounded-lg">
                <span className="material-symbols-outlined text-[#5b403f] text-[15px]">near_me</span>
                <span className="text-xs font-semibold text-[#5b403f]">{restaurant.distance}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#f0edec] px-2.5 py-1 rounded-lg">
                <span className="material-symbols-outlined text-[#5b403f] text-[15px]">
                  delivery_dining
                </span>
                <span className="text-xs font-semibold text-[#5b403f]">
                  ${restaurant.deliveryFee.toFixed(2)} Delivery
                </span>
              </div>
            </div>

            {/* Active Coupon / Promo Banner */}
            <div className="bg-[#ffdad8]/60 rounded-lg p-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="material-symbols-outlined text-[#b7122a] text-[20px] shrink-0"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  local_offer
                </span>
                <p className="text-xs font-semibold text-[#410007] truncate">
                  Redeem 20% OFF with code{' '}
                  <span className="font-bold tracking-wider">{restaurant.promoCode}</span>
                </p>
              </div>
              <button
                onClick={() => {
                  onApplyPromo(restaurant.promoCode);
                  showToast(
                    promoApplied
                      ? 'Coupon already applied!'
                      : 'Promo code SMASH20 applied! 20% OFF added'
                  );
                }}
                className={`text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm shrink-0 active:scale-95 transition-transform ${
                  promoApplied
                    ? 'bg-[#006762] text-white'
                    : 'text-[#b7122a] bg-white hover:bg-[#ffdad8]'
                }`}
              >
                {promoApplied ? 'Applied ✓' : 'Apply'}
              </button>
            </div>
          </div>
        </div>

        {/* Sticky Category Navigation Bar */}
        <div className="sticky top-16 z-20 bg-[#fcf9f8]/95 backdrop-blur-md pt-3 pb-2 px-4 mt-3">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat && !searchQuery;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSearchQuery('');
                  }}
                  className={`px-4 h-9 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all active:scale-95 ${
                    isActive
                      ? 'bg-[#1c1b1b] text-white shadow-sm'
                      : 'bg-[#f0edec] text-[#1c1b1b] hover:bg-[#ebe7e7]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Dish Feed */}
        <div className="px-4 flex flex-col gap-3.5 mt-2">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-[#5c5f60] bg-white rounded-xl p-6">
              <span className="material-symbols-outlined text-4xl text-[#5c5f60]/40 mb-2">
                restaurant_menu
              </span>
              <p className="font-semibold text-sm">No items found matching "{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-3 text-xs text-[#b7122a] font-bold underline"
              >
                Clear search filter
              </button>
            </div>
          ) : (
            filteredItems.map((dish) => {
              const currentQty = getItemCount(dish.id);

              return (
                <div
                  key={dish.id}
                  className="bg-[#ffffff] rounded-xl p-4 shadow-sm flex items-center justify-between gap-3 relative overflow-visible border border-[#f0edec]/70 hover:shadow-md transition-shadow group"
                >
                  {/* Dish Info (clickable to open customizer) */}
                  <div
                    className="flex flex-col flex-1 min-w-0 pr-1 cursor-pointer"
                    onClick={() => onSelectItemForDetail(dish)}
                  >
                    {dish.badge && (
                      <div className="flex items-center gap-1.5 mb-1">
                        {dish.badge.type === 'popular' ? (
                          <span className="inline-flex items-center justify-center w-4 h-4 rounded-sm bg-[#ffdad6] text-[#b7122a]">
                            <span
                              className="material-symbols-outlined text-[12px]"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              local_fire_department
                            </span>
                          </span>
                        ) : null}
                        <span
                          className={`text-[10px] font-bold tracking-wide uppercase ${
                            dish.badge.type === 'chef'
                              ? 'text-[#006762]'
                              : dish.badge.type === 'new'
                              ? 'text-[#00837c]'
                              : 'text-[#b7122a]'
                          }`}
                        >
                          {dish.badge.label}
                        </span>
                      </div>
                    )}

                    <h3 className="font-semibold text-[17px] text-[#1c1b1b] line-clamp-1 group-hover:text-[#b7122a] transition-colors">
                      {dish.name}
                    </h3>
                    <p className="text-xs text-[#5c5f60] line-clamp-2 mt-0.5 leading-relaxed">
                      {dish.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2.5">
                      <span className="font-bold text-[17px] text-[#1c1b1b] tabular-nums">
                        ${dish.price.toFixed(2)}
                      </span>
                      <span className="text-[10px] font-medium text-[#5c5f60] bg-[#f0edec] px-2 py-0.5 rounded">
                        {dish.calories} cal
                      </span>
                    </div>
                  </div>

                  {/* Dish Photo & Stepper Button */}
                  <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-visible">
                    <div
                      className="w-full h-full rounded-xl overflow-hidden bg-[#f0edec] cursor-pointer"
                      onClick={() => onSelectItemForDetail(dish)}
                    >
                      <img
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        alt={dish.name}
                        src={dish.image}
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Stepper or Add button overlapping the bottom */}
                    <div className="absolute -bottom-2.5 inset-x-0 flex justify-center z-10">
                      {currentQty > 0 ? (
                        <div className="bg-[#ffffff] rounded-full shadow-md flex items-center px-1.5 py-0.5 gap-1.5 border border-[#f0edec]">
                          <button
                            aria-label={`Decrease ${dish.name}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              onUpdateQuantity(dish, -1);
                            }}
                            className="w-6 h-6 rounded-full flex items-center justify-center text-[#5c5f60] hover:bg-[#f0edec] active:scale-90 transition-transform"
                          >
                            <span className="material-symbols-outlined text-[16px]">remove</span>
                          </button>
                          <span className="text-xs font-bold text-[#1c1b1b] min-w-[12px] text-center tabular-nums">
                            {currentQty}
                          </span>
                          <button
                            aria-label={`Increase ${dish.name}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              onUpdateQuantity(dish, 1);
                            }}
                            className="w-6 h-6 rounded-full flex items-center justify-center text-[#b7122a] hover:bg-[#ffdad8]/50 active:scale-90 transition-transform"
                          >
                            <span className="material-symbols-outlined text-[16px]">add</span>
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onUpdateQuantity(dish, 1);
                          }}
                          className="bg-[#b7122a] hover:bg-[#db313f] text-white px-3 py-1 rounded-full shadow-md text-xs font-bold flex items-center gap-1 active:scale-95 transition-all"
                        >
                          <span className="material-symbols-outlined text-[16px]">add</span>
                          ADD
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Sticky Floating Cart Bar */}
        {totalItemsCount > 0 && (
          <div className="fixed bottom-4 inset-x-4 max-w-4xl mx-auto z-40 pointer-events-auto animate-in slide-in-from-bottom-4 duration-200">
            <div
              onClick={onViewCart}
              className="bg-[#b7122a] text-white rounded-full px-5 py-3 shadow-xl flex items-center justify-between transition-transform active:scale-[0.99] cursor-pointer hover:bg-[#db313f]"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-[20px] text-white"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    shopping_bag
                  </span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs sm:text-sm font-bold text-white">
                    {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} in cart
                  </span>
                  <span className="text-xs text-[#ffdad8] tabular-nums">
                    ${totalCartPrice.toFixed(2)} • Smash & Bun
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-white bg-white/15 px-3.5 py-1.5 rounded-full hover:bg-white/25 transition-colors">
                <span>View Cart</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
