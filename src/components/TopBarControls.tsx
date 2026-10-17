import React from 'react';
import { AppScreen } from '../types';

interface TopBarControlsProps {
  currentScreen: AppScreen;
  onSelectScreen: (screen: AppScreen) => void;
  cartCount: number;
  isMobileFrame: boolean;
  onToggleFrame: () => void;
  onResetDemo: () => void;
}

export const TopBarControls: React.FC<TopBarControlsProps> = ({
  currentScreen,
  onSelectScreen,
  cartCount,
  isMobileFrame,
  onToggleFrame,
  onResetDemo,
}) => {
  return (
    <nav aria-label="App screen controls" className="bg-[#1c1b1b] text-white px-3 py-2 text-xs flex flex-wrap items-center justify-between gap-2 shadow-md z-50">
      {/* Screen Navigation Quick Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        <span className="text-[#ebe7e7]/60 font-semibold uppercase tracking-wider text-[10px] hidden sm:inline mr-1">
          Screen:
        </span>
        <button
          onClick={() => onSelectScreen('menu')}
          className={`px-2.5 py-1 rounded-lg font-semibold transition-all flex items-center gap-1 ${
            currentScreen === 'menu'
              ? 'bg-[#b7122a] text-white shadow-sm'
              : 'bg-[#313030] text-[#ebe7e7] hover:bg-[#454748]'
          }`}
        >
          <span className="material-symbols-outlined text-[15px]">restaurant</span>
          <span>Restaurant Menu</span>
        </button>

        <button
          onClick={() => onSelectScreen('cart')}
          className={`px-2.5 py-1 rounded-lg font-semibold transition-all flex items-center gap-1 ${
            currentScreen === 'cart'
              ? 'bg-[#b7122a] text-white shadow-sm'
              : 'bg-[#313030] text-[#ebe7e7] hover:bg-[#454748]'
          }`}
        >
          <span className="material-symbols-outlined text-[15px]">shopping_bag</span>
          <span>Cart {cartCount > 0 && `(${cartCount})`}</span>
        </button>

        <button
          onClick={() => onSelectScreen('tracking')}
          className={`px-2.5 py-1 rounded-lg font-semibold transition-all flex items-center gap-1 ${
            currentScreen === 'tracking'
              ? 'bg-[#b7122a] text-white shadow-sm'
              : 'bg-[#313030] text-[#ebe7e7] hover:bg-[#454748]'
          }`}
        >
          <span className="material-symbols-outlined text-[15px]">navigation</span>
          <span>Live Tracking</span>
        </button>

        <button
          onClick={() => onSelectScreen('discover')}
          className={`px-2.5 py-1 rounded-lg font-semibold transition-all flex items-center gap-1 ${
            currentScreen === 'discover'
              ? 'bg-[#b7122a] text-white shadow-sm'
              : 'bg-[#313030] text-[#ebe7e7] hover:bg-[#454748]'
          }`}
        >
          <span className="material-symbols-outlined text-[15px]">explore</span>
          <span>Discover</span>
        </button>
      </div>

      {/* Frame & Reset Tools */}
      <div className="flex items-center gap-2 ml-auto">
        <button
          onClick={onToggleFrame}
          className={`px-2.5 py-1 rounded-lg font-medium text-[11px] flex items-center gap-1 transition-all ${
            isMobileFrame ? 'bg-[#ffdad8] text-[#b7122a]' : 'bg-[#313030] text-[#ebe7e7] hover:bg-[#454748]'
          }`}
          title="Toggle Mobile Device Frame"
        >
          <span className="material-symbols-outlined text-[15px]">
            {isMobileFrame ? 'smartphone' : 'devices'}
          </span>
          <span className="hidden sm:inline">{isMobileFrame ? 'Phone Frame: ON' : 'Phone Frame: OFF'}</span>
        </button>

        <button
          onClick={onResetDemo}
          className="px-2 py-1 bg-[#313030] hover:bg-[#454748] text-[#ebe7e7] rounded-lg text-[11px] flex items-center gap-1 transition-all"
          title="Reset back to screenshot default values"
        >
          <span className="material-symbols-outlined text-[14px]">restart_alt</span>
          <span className="hidden md:inline">Reset State</span>
        </button>
      </div>
    </nav>
  );
};
