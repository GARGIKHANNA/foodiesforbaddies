import React, { useState } from 'react';
import { Restaurant } from '../types';
import { OTHER_RESTAURANTS } from '../data/menuData';

interface DiscoverScreenProps {
  onSelectRestaurant: (restaurant: Restaurant) => void;
  cartItemCount: number;
  onOpenCart: () => void;
}

export const DiscoverScreen: React.FC<DiscoverScreenProps> = ({
  onSelectRestaurant,
  cartItemCount,
  onOpenCart,
}) => {
  const [activeCuisine, setActiveCuisine] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const cuisines = ['All', 'Burgers', 'American', 'Fast Food', 'Ramen', 'Pizza'];

  const filteredRestaurants = OTHER_RESTAURANTS.filter((r) => {
    const matchesCuisine =
      activeCuisine === 'All' || r.cuisines.some((c) => c.toLowerCase() === activeCuisine.toLowerCase());
    const matchesSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.cuisines.some((c) => c.toLowerCase().includes(search.toLowerCase()));
    return matchesCuisine && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#fcf9f8] text-[#1c1b1b] pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#fcf9f8]/95 backdrop-blur-md border-b border-[#f0edec] px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              alt="Crave Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1Xh-_mYLI3Jd1G80EmzjzlrcBmSt-1Jo2V2cGaqqxN0rwX89HND9aB_dDgdzAYQgN_AweSO41z1qW-J0h9aY87nXo4y_Nr6t0784mkHmmU2GdmozqeaaxNyKrlf8rwvcHEogjsapSQ-To_9--aiI4NQo0DM3CmUkkKNlBSCE46tWHgfbW6PLsJ6ul6mBnnIJfCVyO3uBZIgTfmUdrllYF5EhPw54seDC9NS1NM41QR39nP0kk-0w90rybE"
            />
            <div>
              <p className="text-[10px] text-[#5c5f60] font-bold uppercase tracking-wider">
                Delivering Now
              </p>
              <div className="flex items-center gap-1 font-bold text-xs sm:text-sm text-[#1c1b1b] cursor-pointer">
                <span>742 Evergreen Terrace</span>
                <span className="material-symbols-outlined text-[16px]">expand_more</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cartItemCount > 0 && (
              <button
                onClick={onOpenCart}
                className="w-10 h-10 rounded-full bg-[#ffdad8] text-[#b7122a] flex items-center justify-center relative active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                <span className="absolute -top-1 -right-1 bg-[#b7122a] text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              </button>
            )}
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#ffdad8]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBr4KnYpJg-1xYXhmz4_sOOq2feaU3xMAOSkAwYzRuONUpy3NS1MMkmciIL9oW3AGxPKR0vvL-xXJ4eAAwuFT4NubJXBlPoaLrthvcr4cliMp2mfVKo3AP3V3UmkebWTZ9MFvJDhNeNotZ3TAfIIQKXjQy3dKXDKaDmmv2tyidLnH7Fzk1xmCCD_LX8yZ4Dbq9gt1CyBseyV8mMpOAH3vfFh6pqpG8Bn1m27HfBONM6J3DAuTAW2FDbXw"
            />
          </div>
        </div>
      </header>

      {/* Main Discover Content */}
      <main className="max-w-3xl mx-auto w-full px-4 pt-4 space-y-5">
        {/* Search Input */}
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-3.5 text-[#5c5f60] text-[20px]">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search restaurants, burgers, ramen, drinks..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#f0edec] text-xs sm:text-sm text-[#1c1b1b] placeholder:text-[#5c5f60] outline-none focus:ring-2 focus:ring-[#b7122a]"
          />
        </div>

        {/* Featured Promo Banner */}
        <div
          onClick={() => onSelectRestaurant(OTHER_RESTAURANTS[0])}
          className="relative rounded-3xl overflow-hidden shadow-md cursor-pointer group bg-gradient-to-r from-[#b7122a] to-[#410007] text-white p-5 flex flex-col justify-between min-h-[140px]"
        >
          <div className="relative z-10 max-w-[70%]">
            <span className="inline-block bg-white/20 backdrop-blur-md text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2 text-[#ffdad8]">
              ⭐ Today's Top Choice
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
              Smash & Bun Craft Burgers
            </h2>
            <p className="text-xs text-white/90 mt-1">
              Use code <span className="font-bold underline text-white">SMASH20</span> for 20% off
              aged Angus beef & loaded truffle fries.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-2 mt-3 text-xs font-bold">
            <span className="bg-white text-[#b7122a] px-3 py-1 rounded-full shadow-sm">
              Order Now • 20-25 mins
            </span>
          </div>

          {/* Decorative Burger Cutout */}
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBR-MHE2BkSA0DUCGCF6xlXyzqAjBOoKJMrT4Kxi7v_Rb41PberrbIxSJatc2-9qIbIaHaY-ZkJiEH3oB0yX1UW-b7ahlFZwz8QxkF7BfZ-h3MsAUm1NfahiSXJMC-VnYWSvt3bj6cAfoxAj80RP-lVA6tui9NnTqnNbpxH-3gVMgcftVKCB5FLTWXmoiP9zZ5fJ4aMX0WkbLyDeOZYvh9K4-Fkmf7dP4_ANAHvvg54wkBj2YyD6_LDjg"
            alt="Burger"
            className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full object-cover border-4 border-white/20 shadow-xl group-hover:scale-105 transition-transform"
          />
        </div>

        {/* Cuisines Filters */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-[#5c5f60] uppercase tracking-wider">
            Explore Cuisines
          </h3>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {cuisines.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCuisine(c)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCuisine === c
                    ? 'bg-[#1c1b1b] text-white shadow-sm'
                    : 'bg-[#f0edec] text-[#1c1b1b] hover:bg-[#ebe7e7]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Restaurants Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-lg text-[#1c1b1b]">Popular Near You</h3>
            <span className="text-xs text-[#5c5f60]">{filteredRestaurants.length} places</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredRestaurants.map((resto) => (
              <div
                key={resto.id}
                onClick={() => onSelectRestaurant(resto)}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#f0edec] hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="relative h-44 bg-[#ebe7e7] overflow-hidden">
                  <img
                    src={resto.bannerImage}
                    alt={resto.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#1c1b1b]/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                    {resto.deliveryTime}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md rounded-full w-8 h-8 flex items-center justify-center text-[#b7122a] shadow-sm">
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      favorite
                    </span>
                  </div>
                </div>

                <div className="p-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-base text-[#1c1b1b] group-hover:text-[#b7122a] transition-colors">
                      {resto.name}
                    </h4>
                    <div className="flex items-center gap-1 bg-[#f6f3f2] px-2 py-0.5 rounded-full text-xs font-bold text-[#1c1b1b]">
                      <span
                        className="material-symbols-outlined text-[#b7122a] text-[14px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      {resto.rating}
                    </div>
                  </div>

                  <p className="text-xs text-[#5c5f60]">
                    {resto.cuisines.join(' • ')} • {resto.priceRange} • {resto.distance}
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-[#f0edec] text-xs">
                    <div className="flex items-center gap-1 text-[#5c5f60]">
                      <span className="material-symbols-outlined text-[16px]">delivery_dining</span>
                      <span>${resto.deliveryFee.toFixed(2)} Delivery</span>
                    </div>

                    <span className="text-[11px] font-bold text-[#b7122a] bg-[#ffdad8] px-2 py-0.5 rounded-md">
                      20% OFF with {resto.promoCode}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
