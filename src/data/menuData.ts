import { MenuItem, Restaurant } from '../types';

export const RESTAURANT_DATA: Restaurant = {
  id: 'smash-bun-craft',
  name: 'Smash & Bun Craft Burgers',
  cuisines: ['American', 'Burgers', 'Fast Food'],
  priceRange: '$$',
  rating: 4.9,
  ratingCount: '1.4k+',
  deliveryTime: '20-25 mins',
  distance: '0.8 miles',
  deliveryFee: 1.99,
  promoCode: 'SMASH20',
  promoDiscountPercent: 20,
  address: '458 Grand Ave, Downtown Gourmet District',
  bannerImage:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCLV05H9YqVseffbvtgqSEwtjWaEHf1EOifLISsjgPdk-CI0t9Wjxk35TLRiJAaCcYNfjZ2a0BNfomV-JhOolib5e89e6I3NFMXDZVJrD0RUcoUuD3h9Ms9Rwyb8MEC__TR9Bnuw4NCX38SsWnH2Ko9rF-KQgyAZzx3anujXbJX6WqjWIDUoYzZx3o-NcLkmRd1WaSjC-Qyo1aXrUP8smTG8JPKuKqa1xfQV6CLPc0lvh9V6OcxXzxy1A',
  logoImage:
    'https://lh3.googleusercontent.com/aida/AEtjO1Xh-_mYLI3Jd1G80EmzjzlrcBmSt-1Jo2V2cGaqqxN0rwX89HND9aB_dDgdzAYQgN_AweSO41z1qW-J0h9aY87nXo4y_Nr6t0784mkHmmU2GdmozqeaaxNyKrlf8rwvcHEogjsapSQ-To_9--aiI4NQo0DM3CmUkkKNlBSCE46tWHgfbW6PLsJ6ul6mBnnIJfCVyO3uBZIgTfmUdrllYF5EhPw54seDC9NS1NM41QR39nP0kk-0w90rybE',
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'dish-1',
    name: 'Double Truffle Smash Burger',
    category: 'Bestsellers',
    description:
      'Two aged Angus beef patties, Swiss cheese, truffle garlic aioli, caramelized onions on toasted brioche.',
    price: 13.99,
    calories: 680,
    badge: {
      label: 'POPULAR',
      type: 'popular',
    },
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBR-MHE2BkSA0DUCGCF6xlXyzqAjBOoKJMrT4Kxi7v_Rb41PberrbIxSJatc2-9qIbIaHaY-ZkJiEH3oB0yX1UW-b7ahlFZwz8QxkF7BfZ-h3MsAUm1NfahiSXJMC-VnYWSvt3bj6cAfoxAj80RP-lVA6tui9NnTqnNbpxH-3gVMgcftVKCB5FLTWXmoiP9zZ5fJ4aMX0WkbLyDeOZYvh9K4-Fkmf7dP4_ANAHvvg54wkBj2YyD6_LDjg',
    options: {
      buns: ['Toasted Brioche Bun (Standard)', 'Potato Bun', 'Gluten-Free Lettuce Wrap'],
      doneness: ['Medium (Juicy pink center)', 'Medium-Well (Standard)', 'Well-Done (Crispy edges)'],
      addons: [
        { id: 'bacon', name: 'Thick Applewood Smoked Bacon', price: 1.99 },
        { id: 'extra-cheese', name: 'Extra Melted Swiss Cheese', price: 1.25 },
        { id: 'truffle-aioli', name: 'Extra Truffle Garlic Aioli', price: 0.95 },
        { id: 'jalapenos', name: 'Pickled Fire Jalapeños', price: 0.75 },
      ],
      dips: ['Truffle Garlic Mayo', 'Smoky Chipotle Aioli', 'House Smash Sauce'],
    },
  },
  {
    id: 'dish-2',
    name: 'Crispy Nashville Hot Chicken',
    category: 'Bestsellers',
    description:
      'Spicy buttermilk fried chicken thigh, creamy coleslaw, dill pickles, comeback sauce.',
    price: 11.5,
    calories: 740,
    badge: {
      label: 'SPICY',
      type: 'spicy',
    },
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAj7m3GSQsVY7a85hMbengrQp8BsyHfvF5pE-Ww_Qo59QxKD2N9LNyXI72s_uU4H3OjCqHwxTnXIMIUoYczqbzfbj0PV5ffJbAXFU5NYcFpIuEP5jqofRyqy8xNB68gJKvaSoPBot-Tju8A8zJSvBOgHvYQKKHVtEU39877hRj1M_ar-nNCsWcS4UrUZuqp7q9sZI5a7pjBVEnBnDYg9yZej40O2k8l7OWjg-LRG1NCI2O8p00Rsf3u8w',
    options: {
      buns: ['Buttered Potato Bun (Standard)', 'Toasted Brioche Bun', 'Lettuce Wrap'],
      doneness: ['Mildly Spicy (Level 1)', 'Nashville Hot (Level 2)', 'Inferno Reaper (Level 3)'],
      addons: [
        { id: 'extra-slaw', name: 'Extra Tangy Cabbage Slaw', price: 0.85 },
        { id: 'extra-pickles', name: 'Double Dill Pickles', price: 0.5 },
        { id: 'cheddar', name: 'Sharp Cheddar Melt', price: 1.25 },
      ],
      dips: ['Signature Comeback Sauce', 'Cool Buttermilk Ranch', 'Honey Mustard'],
    },
  },
  {
    id: 'dish-3',
    name: 'Loaded Parmesan Truffle Fries',
    category: 'Sides & Loaded Fries',
    description:
      'Crispy hand-cut fries, white truffle oil, grated parmesan, fresh rosemary.',
    price: 6.99,
    calories: 420,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDfkY2-gtN0Q57RNAlnL3Km6BgFa2LkwMtO3EEwVESYriINtx-MmXzgaBqv-o5tiHrv1UjvximnuLegcAnfiH6AuSjy24mHdaR5EyU_HJ0MRzQzXEl5AKSVfCMaAYu9OaetDydtWBRcJ7jsYAcsL2magC0xf_Bu46g8lyqJziPz5_yg73wkgUKGnxgV30d9pHBrO6EkiEZHKDpof4iYfXgcqhWbT7l4N4fIv-GbkAvxbUaUomnBfOSr0w',
    options: {
      addons: [
        { id: 'bacon-bits', name: 'Crispy Bacon Crumbs', price: 1.5 },
        { id: 'extra-parm', name: 'Double Grated Parmesan', price: 1.0 },
        { id: 'truffle-drizzle', name: 'Extra White Truffle Drizzle', price: 1.25 },
      ],
      dips: ['Truffle Garlic Mayo', 'Smoked Pepper Ketchup', 'Spicy Aioli'],
    },
  },
  {
    id: 'dish-4',
    name: 'Salted Caramel Pretzel Shake',
    category: 'Beverages & Shakes',
    description:
      'Hand-spun vanilla bean custard, salted caramel drizzle, crushed pretzels.',
    price: 5.99,
    calories: 510,
    badge: {
      label: "CHEF'S PICK",
      type: 'chef',
    },
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCLKqmfAHz-RDABK1lWKOd3gCniksQ9movoINVE5vMA3zMDyO3agg32V8vMOP35TmXdjbvdFbmIDck-Ks3UvSObF897TMzOxwj02Yx7kjfvxXsXNlQpJ5mI5AebTZMemXOSRwDVBxz4bCxtQDZgeL9v5pwEuW2VQcI0C2DX33EvWKxu9Rjo2S-RHI4socs66bSoPHMYh48q1XA8_2i7Ja-mY1O655CXO8DhGfUHk1591tv9W1T3i86mmA',
    options: {
      addons: [
        { id: 'extra-whip', name: 'Extra Whipped Cream', price: 0.6 },
        { id: 'malt', name: 'Malted Milk Powder Scoop', price: 0.75 },
        { id: 'extra-pretzels', name: 'Crushed Salty Pretzels', price: 0.5 },
      ],
    },
  },
  {
    id: 'dish-5',
    name: 'Classic Oklahoma Onion Smash',
    category: 'Smash Burgers',
    description:
      'Double smashed patties pressed wafer-thin with sweet yellow onions, American cheese, house sauce on toasted martin bun.',
    price: 12.5,
    calories: 640,
    badge: {
      label: 'POPULAR',
      type: 'popular',
    },
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCLV05H9YqVseffbvtgqSEwtjWaEHf1EOifLISsjgPdk-CI0t9Wjxk35TLRiJAaCcYNfjZ2a0BNfomV-JhOolib5e89e6I3NFMXDZVJrD0RUcoUuD3h9Ms9Rwyb8MEC__TR9Bnuw4NCX38SsWnH2Ko9rF-KQgyAZzx3anujXbJX6WqjWIDUoYzZx3o-NcLkmRd1WaSjC-Qyo1aXrUP8smTG8JPKuKqa1xfQV6CLPc0lvh9V6OcxXzxy1A',
    options: {
      buns: ['Martins Potato Roll (Standard)', 'Brioche', 'Lettuce Wrap'],
      doneness: ['Medium-Well', 'Well-Done Crisp Edges'],
      addons: [
        { id: 'patty-extra', name: 'Add 3rd Smash Patty', price: 3.5 },
        { id: 'bacon', name: 'Thick Applewood Bacon', price: 1.99 },
      ],
    },
  },
  {
    id: 'dish-6',
    name: 'Spicy Garlic Seasoned Waffle Fries',
    category: 'Sides & Loaded Fries',
    description:
      'Crispy lattice-cut waffle potato fries dusted with smoked paprika, garlic herb salt, served with jalapeño ranch.',
    price: 5.75,
    calories: 390,
    badge: {
      label: 'NEW',
      type: 'new',
    },
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDfkY2-gtN0Q57RNAlnL3Km6BgFa2LkwMtO3EEwVESYriINtx-MmXzgaBqv-o5tiHrv1UjvximnuLegcAnfiH6AuSjy24mHdaR5EyU_HJ0MRzQzXEl5AKSVfCMaAYu9OaetDydtWBRcJ7jsYAcsL2magC0xf_Bu46g8lyqJziPz5_yg73wkgUKGnxgV30d9pHBrO6EkiEZHKDpof4iYfXgcqhWbT7l4N4fIv-GbkAvxbUaUomnBfOSr0w',
  },
  {
    id: 'dish-7',
    name: 'Valrhona Triple Chocolate Shake',
    category: 'Beverages & Shakes',
    description:
      'Dark Belgian cocoa blended with rich Madagascar vanilla cream, dark chocolate ganache swirl, and chocolate cookie crumble.',
    price: 6.25,
    calories: 550,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCLKqmfAHz-RDABK1lWKOd3gCniksQ9movoINVE5vMA3zMDyO3agg32V8vMOP35TmXdjbvdFbmIDck-Ks3UvSObF897TMzOxwj02Yx7kjfvxXsXNlQpJ5mI5AebTZMemXOSRwDVBxz4bCxtQDZgeL9v5pwEuW2VQcI0C2DX33EvWKxu9Rjo2S-RHI4socs66bSoPHMYh48q1XA8_2i7Ja-mY1O655CXO8DhGfUHk1591tv9W1T3i86mmA',
  },
];

export const OTHER_RESTAURANTS: Restaurant[] = [
  RESTAURANT_DATA,
  {
    id: 'tokyo-ramen-lab',
    name: 'Tokyo Tonkotsu Ramen Lab',
    cuisines: ['Japanese', 'Ramen', 'Noodles'],
    priceRange: '$$',
    rating: 4.8,
    ratingCount: '980+',
    deliveryTime: '25-35 mins',
    distance: '1.4 miles',
    deliveryFee: 2.49,
    promoCode: 'RAMEN15',
    promoDiscountPercent: 15,
    address: '812 Cherry Blossom Walk, Little Tokyo',
    bannerImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAj7m3GSQsVY7a85hMbengrQp8BsyHfvF5pE-Ww_Qo59QxKD2N9LNyXI72s_uU4H3OjCqHwxTnXIMIUoYczqbzfbj0PV5ffJbAXFU5NYcFpIuEP5jqofRyqy8xNB68gJKvaSoPBot-Tju8A8zJSvBOgHvYQKKHVtEU39877hRj1M_ar-nNCsWcS4UrUZuqp7q9sZI5a7pjBVEnBnDYg9yZej40O2k8l7OWjg-LRG1NCI2O8p00Rsf3u8w',
    logoImage:
      'https://lh3.googleusercontent.com/aida/AEtjO1Xh-_mYLI3Jd1G80EmzjzlrcBmSt-1Jo2V2cGaqqxN0rwX89HND9aB_dDgdzAYQgN_AweSO41z1qW-J0h9aY87nXo4y_Nr6t0784mkHmmU2GdmozqeaaxNyKrlf8rwvcHEogjsapSQ-To_9--aiI4NQo0DM3CmUkkKNlBSCE46tWHgfbW6PLsJ6ul6mBnnIJfCVyO3uBZIgTfmUdrllYF5EhPw54seDC9NS1NM41QR39nP0kk-0w90rybE',
  },
  {
    id: 'napoli-woodfire',
    name: 'Napoli Woodfired Pizza',
    cuisines: ['Italian', 'Artisan Pizza', 'Pasta'],
    priceRange: '$$$',
    rating: 4.9,
    ratingCount: '2.1k+',
    deliveryTime: '30-40 mins',
    distance: '2.1 miles',
    deliveryFee: 2.99,
    promoCode: 'PIZZA20',
    promoDiscountPercent: 20,
    address: '102 Mulberry St, Old Town',
    bannerImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCLV05H9YqVseffbvtgqSEwtjWaEHf1EOifLISsjgPdk-CI0t9Wjxk35TLRiJAaCcYNfjZ2a0BNfomV-JhOolib5e89e6I3NFMXDZVJrD0RUcoUuD3h9Ms9Rwyb8MEC__TR9Bnuw4NCX38SsWnH2Ko9rF-KQgyAZzx3anujXbJX6WqjWIDUoYzZx3o-NcLkmRd1WaSjC-Qyo1aXrUP8smTG8JPKuKqa1xfQV6CLPc0lvh9V6OcxXzxy1A',
    logoImage:
      'https://lh3.googleusercontent.com/aida/AEtjO1Xh-_mYLI3Jd1G80EmzjzlrcBmSt-1Jo2V2cGaqqxN0rwX89HND9aB_dDgdzAYQgN_AweSO41z1qW-J0h9aY87nXo4y_Nr6t0784mkHmmU2GdmozqeaaxNyKrlf8rwvcHEogjsapSQ-To_9--aiI4NQo0DM3CmUkkKNlBSCE46tWHgfbW6PLsJ6ul6mBnnIJfCVyO3uBZIgTfmUdrllYF5EhPw54seDC9NS1NM41QR39nP0kk-0w90rybE',
  },
];
