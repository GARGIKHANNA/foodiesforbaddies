export interface MenuItem {
  id: string;
  name: string;
  category: 'Bestsellers' | 'Smash Burgers' | 'Sides & Loaded Fries' | 'Beverages & Shakes';
  description: string;
  price: number;
  calories: number;
  image: string;
  badge?: {
    label: string;
    type: 'popular' | 'spicy' | 'chef' | 'new';
  };
  options?: {
    buns?: string[];
    doneness?: string[];
    addons?: { id: string; name: string; price: number }[];
    dips?: string[];
  };
}

export interface CartCustomization {
  bun?: string;
  doneness?: string;
  addons?: { id: string; name: string; price: number }[];
  dip?: string;
  specialInstructions?: string;
}

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  quantity: number;
  customization?: CartCustomization;
  unitPrice: number;
  totalPrice: number;
}

export type AppScreen = 'menu' | 'cart' | 'tracking' | 'discover';

export interface Restaurant {
  id: string;
  name: string;
  cuisines: string[];
  priceRange: string;
  rating: number;
  ratingCount: string;
  deliveryTime: string;
  distance: string;
  deliveryFee: number;
  bannerImage: string;
  logoImage: string;
  promoCode: string;
  promoDiscountPercent: number;
  address: string;
}

export interface OrderState {
  orderId: string;
  status: 'confirmed' | 'preparing' | 'on_the_way' | 'delivered';
  placedAt: string;
  estimatedDeliveryTime: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  serviceFee: number;
  tip: number;
  total: number;
  driver: {
    name: string;
    rating: number;
    deliveriesCount: number;
    vehicle: string;
    photo: string;
    phone: string;
  };
}
