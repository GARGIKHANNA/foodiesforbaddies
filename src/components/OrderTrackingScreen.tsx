import React, { useState, useEffect } from 'react';
import { OrderState } from '../types';
import { ChatModal } from './ChatModal';

interface OrderTrackingScreenProps {
  order: OrderState;
  onBackToMenu: () => void;
  onUpdateOrderStatus: (status: OrderState['status']) => void;
}

export const OrderTrackingScreen: React.FC<OrderTrackingScreenProps> = ({
  order,
  onBackToMenu,
  onUpdateOrderStatus,
}) => {
  const [showChat, setShowChat] = useState<boolean>(false);
  const [showReceipt, setShowReceipt] = useState<boolean>(false);
  const [callAlert, setCallAlert] = useState<string | null>(null);

  // Status step progression helper
  const stages: { key: OrderState['status']; label: string; sub: string; icon: string }[] = [
    {
      key: 'confirmed',
      label: 'Order Confirmed',
      sub: 'Smash & Bun accepted the order',
      icon: 'receipt_long',
    },
    {
      key: 'preparing',
      label: 'Kitchen Prepping',
      sub: 'Searing aged patties & frying rosemary truffle fries',
      icon: 'skillet',
    },
    {
      key: 'on_the_way',
      label: 'Out for Delivery',
      sub: 'Marcus is riding on the Honda Zoomer E-Scooter',
      icon: 'two_wheeler',
    },
    {
      key: 'delivered',
      label: 'Delivered to Doorstep',
      sub: 'Package placed safely at 742 Evergreen Terrace',
      icon: 'home',
    },
  ];

  const currentStageIndex = stages.findIndex((s) => s.key === order.status);

  // Helper to advance stage for demonstration
  const advanceStage = () => {
    if (order.status === 'confirmed') onUpdateOrderStatus('preparing');
    else if (order.status === 'preparing') onUpdateOrderStatus('on_the_way');
    else if (order.status === 'on_the_way') onUpdateOrderStatus('delivered');
    else onUpdateOrderStatus('confirmed');
  };

  const handleCall = () => {
    setCallAlert(`Connecting to ${order.driver.name} at ${order.driver.phone}...`);
    setTimeout(() => setCallAlert(null), 3000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fcf9f8] text-[#1c1b1b]">
      {/* Call toast */}
      {callAlert && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#1c1b1b] text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm animate-bounce">
          <span className="material-symbols-outlined text-[#ffdad8] text-[20px]">call</span>
          {callAlert}
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#fcf9f8]/95 backdrop-blur-md border-b border-[#f0edec] px-4 py-3.5 flex items-center justify-between max-w-2xl mx-auto w-full">
        <button
          onClick={onBackToMenu}
          aria-label="Back to restaurant"
          className="w-10 h-10 rounded-full bg-[#f6f3f2] hover:bg-[#f0edec] flex items-center justify-center transition-transform active:scale-95"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </button>
        <div className="text-center">
          <span className="text-[11px] font-bold text-[#b7122a] uppercase tracking-wider">
            Live Order Tracking
          </span>
          <h1 className="font-bold text-base text-[#1c1b1b]">Order #{order.orderId}</h1>
        </div>
        <button
          onClick={() => setShowReceipt(!showReceipt)}
          className="w-10 h-10 rounded-full bg-[#f6f3f2] hover:bg-[#f0edec] flex items-center justify-center transition-transform active:scale-95"
        >
          <span className="material-symbols-outlined text-[20px]">receipt</span>
        </button>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-4 space-y-4 pb-28">
        {/* Interactive Delivery Map Card */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#f0edec] relative">
          <div className="relative h-60 w-full bg-[#e8ece9] overflow-hidden">
            {/* SVG Visualized Road Map */}
            <svg
              className="w-full h-full object-cover"
              viewBox="0 0 400 240"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#b7122a" />
                  <stop offset="100%" stopColor="#db313f" />
                </linearGradient>
              </defs>

              {/* Map background grid representing city blocks */}
              <rect x="0" y="0" width="400" height="240" fill="#f4f6f4" />
              {/* City Parks & Greenery */}
              <path
                d="M 20 20 Q 80 40 120 20 T 160 80 Q 80 100 20 60 Z"
                fill="#d8e8dc"
                opacity="0.8"
              />
              <path
                d="M 280 140 Q 340 130 380 180 T 320 230 Q 260 210 280 140 Z"
                fill="#d8e8dc"
                opacity="0.8"
              />

              {/* City Streets & Avenues */}
              <path
                d="M 0 50 L 400 50 M 0 120 L 400 120 M 0 190 L 400 190"
                stroke="#e1e4e1"
                strokeWidth="10"
                fill="none"
              />
              <path
                d="M 60 0 L 60 240 M 150 0 L 150 240 M 240 0 L 240 240 M 330 0 L 330 240"
                stroke="#e1e4e1"
                strokeWidth="10"
                fill="none"
              />

              {/* Diagonal Arterial Boulevard */}
              <path
                d="M 30 220 L 370 20"
                stroke="#d3d7d3"
                strokeWidth="14"
                fill="none"
                strokeLinecap="round"
              />

              {/* Active Delivery Route Polyline */}
              <path
                d="M 60 120 L 150 120 L 150 50 L 240 50 L 240 120 L 330 120 L 330 190"
                stroke="url(#routeGrad)"
                strokeWidth="5"
                strokeDasharray="6 4"
                fill="none"
                strokeLinecap="round"
                className="animate-pulse"
              />

              {/* Restaurant Origin Marker */}
              <g transform="translate(60, 120)">
                <circle r="14" fill="#b7122a" />
                <circle r="6" fill="#ffffff" />
                <text x="-25" y="-18" fontSize="10" fontWeight="bold" fill="#1c1b1b">
                  Smash & Bun
                </text>
              </g>

              {/* Destination Customer Marker */}
              <g transform="translate(330, 190)">
                <circle r="14" fill="#1c1b1b" />
                <circle r="6" fill="#006762" />
                <text x="-10" y="26" fontSize="10" fontWeight="bold" fill="#1c1b1b">
                  Home (Apt 4B)
                </text>
              </g>

              {/* Dynamic Courier Position based on status */}
              {order.status === 'confirmed' && (
                <g transform="translate(60, 120)">
                  <circle r="18" fill="#ffdad8" opacity="0.6" className="animate-ping" />
                </g>
              )}

              {order.status === 'preparing' && (
                <g transform="translate(105, 120)">
                  <circle r="16" fill="#ffdad8" opacity="0.7" className="animate-ping" />
                  <circle r="12" fill="#b7122a" />
                  <text x="-12" y="4" fontSize="12" fill="#ffffff">
                    🍳
                  </text>
                  <text x="-30" y="-18" fontSize="9" fontWeight="bold" fill="#b7122a">
                    Food In Prep
                  </text>
                </g>
              )}

              {order.status === 'on_the_way' && (
                <g transform="translate(240, 75)">
                  <circle r="18" fill="#ffdad8" opacity="0.7" className="animate-ping" />
                  <circle r="14" fill="#b7122a" />
                  <text x="-12" y="4" fontSize="12" fill="#ffffff">
                    🛵
                  </text>
                  <text x="-20" y="-18" fontSize="10" fontWeight="bold" fill="#b7122a">
                    Marcus (3 min away)
                  </text>
                </g>
              )}

              {order.status === 'delivered' && (
                <g transform="translate(330, 190)">
                  <circle r="22" fill="#006762" opacity="0.4" className="animate-ping" />
                  <circle r="16" fill="#006762" />
                  <text x="-10" y="5" fontSize="14" fill="#ffffff">
                    ✓
                  </text>
                </g>
              )}
            </svg>

            {/* Floating ETA Badge */}
            <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md rounded-2xl px-3.5 py-2 shadow-md border border-[#f0edec] flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[#b7122a] text-[22px]">
                {order.status === 'delivered' ? 'check_circle' : 'schedule'}
              </span>
              <div>
                <p className="text-[10px] text-[#5c5f60] font-semibold uppercase">
                  {order.status === 'delivered' ? 'Delivered At' : 'Estimated Arrival'}
                </p>
                <p className="text-sm font-extrabold text-[#1c1b1b] tabular-nums">
                  {order.status === 'delivered'
                    ? '11:18 PM (Delivered)'
                    : `20-25 mins • by ${order.estimatedDeliveryTime}`}
                </p>
              </div>
            </div>

            {/* Stage Fast-Forward Toggle (Interactive Simulator) */}
            <div className="absolute top-3 right-3">
              <button
                onClick={advanceStage}
                className="bg-[#1c1b1b]/90 hover:bg-[#1c1b1b] text-white text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1 active:scale-95 transition-all"
                title="Click to preview next delivery stage"
              >
                <span>Simulate: Next Step</span>
                <span className="material-symbols-outlined text-[14px]">fast_forward</span>
              </button>
            </div>
          </div>

          {/* Current Status Banner */}
          <div className="p-4 bg-white flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#b7122a]">
                Step {currentStageIndex + 1} of 4
              </span>
              <h2 className="text-base font-extrabold text-[#1c1b1b]">
                {stages[currentStageIndex].label}
              </h2>
              <p className="text-xs text-[#5c5f60] mt-0.5">{stages[currentStageIndex].sub}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#ffdad8]/70 text-[#b7122a] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[26px]">
                {stages[currentStageIndex].icon}
              </span>
            </div>
          </div>
        </div>

        {/* Timeline Stepper */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#f0edec] space-y-4">
          <h3 className="text-xs font-bold text-[#5c5f60] uppercase tracking-wider">
            Order Progress Timeline
          </h3>

          <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#f0edec]">
            {stages.map((stage, idx) => {
              const isPast = idx < currentStageIndex;
              const isCurrent = idx === currentStageIndex;
              return (
                <div key={stage.key} className="relative flex items-start gap-3">
                  {/* Dot */}
                  <div
                    className={`absolute -left-6 top-0.5 w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 ${
                      isPast
                        ? 'bg-[#b7122a] border-[#b7122a] text-white'
                        : isCurrent
                        ? 'bg-white border-[#b7122a] text-[#b7122a] animate-pulse'
                        : 'bg-white border-[#dcd9d9] text-[#5c5f60]'
                    }`}
                  >
                    {isPast && (
                      <span className="material-symbols-outlined text-[12px] font-bold">check</span>
                    )}
                    {isCurrent && <div className="w-2 h-2 rounded-full bg-[#b7122a]" />}
                  </div>

                  <div>
                    <h4
                      className={`text-xs sm:text-sm font-bold ${
                        isCurrent
                          ? 'text-[#b7122a]'
                          : isPast
                          ? 'text-[#1c1b1b]'
                          : 'text-[#5c5f60]/70'
                      }`}
                    >
                      {stage.label}
                    </h4>
                    <p className="text-[11px] text-[#5c5f60]">{stage.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Courier Driver Card */}
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-[#f0edec] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={order.driver.photo}
                alt={order.driver.name}
                className="w-13 h-13 rounded-2xl object-cover ring-2 ring-[#ffdad8]"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -bottom-1 -right-1 bg-[#b7122a] text-white p-0.5 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-[12px]">two_wheeler</span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-bold text-[#1c1b1b]">{order.driver.name}</h4>
                <div className="flex items-center text-[11px] text-[#5c5f60] bg-[#f0edec] px-1.5 py-0.2 rounded">
                  <span
                    className="material-symbols-outlined text-[12px] text-[#b7122a]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span>{order.driver.rating}</span>
                </div>
              </div>
              <p className="text-[11px] text-[#5c5f60] mt-0.5">{order.driver.vehicle}</p>
              <p className="text-[10px] text-[#006762] font-medium">1,420 deliveries completed</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCall}
              aria-label="Call driver"
              className="w-10 h-10 rounded-full bg-[#f0edec] hover:bg-[#ffdad8] text-[#1c1b1b] flex items-center justify-center active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">call</span>
            </button>
            <button
              onClick={() => setShowChat(true)}
              aria-label="Chat with driver"
              className="w-10 h-10 rounded-full bg-[#b7122a] hover:bg-[#db313f] text-white flex items-center justify-center shadow-md active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">chat</span>
            </button>
          </div>
        </div>

        {/* Collapsible Receipt Breakdown */}
        {showReceipt && (
          <div className="bg-white rounded-3xl p-4 shadow-sm border border-[#f0edec] space-y-3 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-[#f0edec]">
              <h3 className="text-xs font-bold text-[#1c1b1b]">Order Receipt Details</h3>
              <span className="text-xs text-[#5c5f60]">Placed at {order.placedAt}</span>
            </div>

            <div className="divide-y divide-[#f0edec] text-xs">
              {order.items.map((ci) => (
                <div key={ci.cartItemId} className="py-2 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-[#1c1b1b]">{ci.quantity}x</span>{' '}
                    <span>{ci.item.name}</span>
                    {ci.customization?.addons && ci.customization.addons.length > 0 && (
                      <p className="text-[11px] text-[#5c5f60] pl-4">
                        +{ci.customization.addons.map((a) => a.name).join(', ')}
                      </p>
                    )}
                  </div>
                  <span className="font-semibold tabular-nums">${ci.totalPrice.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-[#f0edec] space-y-1 text-xs text-[#5c5f60]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="tabular-nums text-[#1c1b1b]">${order.subtotal.toFixed(2)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-[#006762] font-semibold">
                  <span>SMASH20 Discount</span>
                  <span className="tabular-nums">-${order.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery & Service</span>
                <span className="tabular-nums text-[#1c1b1b]">
                  ${(order.deliveryFee + order.serviceFee).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Courier Tip</span>
                <span className="tabular-nums text-[#1c1b1b]">${order.tip.toFixed(2)}</span>
              </div>
              <div className="pt-1.5 border-t border-[#f0edec] flex justify-between font-extrabold text-sm text-[#1c1b1b]">
                <span>Total Paid</span>
                <span className="text-[#b7122a] tabular-nums">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Button: Return to Menu or Order Again */}
        <button
          onClick={onBackToMenu}
          className="w-full h-12 bg-white hover:bg-[#f6f3f2] border border-[#e1e3e4] text-[#1c1b1b] rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">restaurant_menu</span>
          Return to Smash & Bun Menu
        </button>
      </main>

      {/* Driver Chat Modal */}
      {showChat && (
        <ChatModal
          driverName={order.driver.name}
          driverPhoto={order.driver.photo}
          onClose={() => setShowChat(false)}
        />
      )}
    </div>
  );
};
