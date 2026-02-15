
import React, { useState, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Search, 
  ShoppingCart, 
  Menu, 
  Heart, 
  ChevronRight, 
  Plus, 
  X, 
  Star, 
  Zap, 
  Smartphone, 
  Laptop, 
  Headphones, 
  Gamepad2, 
  Tv,
  ArrowRight,
  ChevronLeft,
  Truck,
  ShieldCheck,
  Minus,
  MessageCircle,
  Clock,
  User,
  Package,
  MapPin,
  CreditCard,
  LogOut,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Eye,
  Settings,
  Filter,
  ArrowUpDown,
  Globe
} from 'lucide-react';

// --- Theme Tokens ---
const COLORS = {
  primary: '#0047FF', // Electric Blue
  secondary: '#0F172A', // Deep Slate
  accent: '#FF6B00', // Vibrant Orange
  success: '#10B981',
  error: '#EF4444',
  background: '#F8FAFC',
  divider: '#E2E8F0',
};

// --- i18n Dictionary ---
const TRANSLATIONS = {
  en: {
    searchPlaceholder: "Search gadgets...",
    heroTitle: "Future Tech, Today.",
    heroSub: "Premium gadgets from flagship brands at local prices.",
    shopDeals: "Shop Deals",
    topDeals: "Top Deals",
    featuredDeals: "Featured Deals",
    newArrivals: "New Arrivals",
    recentlyViewed: "Recently Viewed",
    allProducts: "All Products",
    viewAll: "View All",
    addToCart: "Add To Cart",
    checkout: "Proceed To Checkout",
    secureCheckout: "Secure Checkout",
    login: "Login Now",
    register: "Create Account",
    myWishlist: "My Wishlist",
    myOrders: "My Orders",
    account: "Account",
    saved: "Saved",
    cart: "Cart",
    freeDelivery: "Free Express Delivery",
    warranty: "Official Warranty",
    returningCustomer: "Returning customer? Click here to login",
    totalPrice: "Total Price",
    subtotal: "Subtotal",
    techDna: "Technical DNA",
    items: "items",
    all: "All"
  },
  fr: {
    searchPlaceholder: "Rechercher des gadgets...",
    heroTitle: "Futur Tech, Aujourd'hui.",
    heroSub: "Gadgets premium de marques phares aux prix locaux.",
    shopDeals: "Voir les Offres",
    topDeals: "Meilleures Ventes",
    featuredDeals: "Offres Vedettes",
    newArrivals: "Nouveautés",
    recentlyViewed: "Vus Récemment",
    allProducts: "Tous les Produits",
    viewAll: "Tout Voir",
    addToCart: "Ajouter au Panier",
    checkout: "Passer à la Caisse",
    secureCheckout: "Paiement Sécurisé",
    login: "Se Connecter",
    register: "Créer un Compte",
    myWishlist: "Ma Liste d'Envies",
    myOrders: "Mes Commandes",
    account: "Compte",
    saved: "Enregistré",
    cart: "Panier",
    freeDelivery: "Livraison Express Gratuite",
    warranty: "Garantie Officielle",
    returningCustomer: "Déjà client ? Cliquez ici pour vous connecter",
    totalPrice: "Prix Total",
    subtotal: "Sous-total",
    techDna: "ADN Technique",
    items: "articles",
    all: "Tout"
  }
};

// --- Types ---
type Product = {
  id: number;
  name: string;
  category: string;
  basePrice: number;
  promoPrice: number | null;
  image: string;
  badge: string | null;
  rating: number;
  reviews: number;
  freeDelivery: boolean;
  lowStock?: number;
  specs: Record<string, string>;
  description: string;
};

type View = 'home' | 'pdp' | 'wishlist' | 'account' | 'checkout' | 'category' | 'auth';

// --- Mock Data ---
const CATEGORIES = [
  { id: 'all', name_en: 'All', name_fr: 'Tout', icon: <Zap size={18} /> },
  { id: 'phones', name_en: 'Smartphones', name_fr: 'Smartphones', icon: <Smartphone size={18} /> },
  { id: 'laptops', name_en: 'Laptops', name_fr: 'PC Portables', icon: <Laptop size={18} /> },
  { id: 'audio', name_en: 'Audio', name_fr: 'Audio', icon: <Headphones size={18} /> },
  { id: 'gaming', name_en: 'Gaming', name_fr: 'Jeux Vidéo', icon: <Gamepad2 size={18} /> },
  { id: 'tv', name_en: 'TV & Home', name_fr: 'TV & Maison', icon: <Tv size={18} /> },
];

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Galaxy S24 Ultra 512GB Titanium Gray',
    category: 'phones',
    basePrice: 1200,
    promoPrice: 1099,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=600',
    badge: 'Sale',
    rating: 4.8,
    reviews: 124,
    freeDelivery: true,
    lowStock: 3,
    description: 'The ultimate Galaxy Ultra experience. Now with Galaxy AI, Titanium frame, and our brightest ever display.',
    specs: { 'Display': '6.8" Dynamic AMOLED 2X', 'Processor': 'Snapdragon 8 Gen 3', 'Memory': '12GB RAM' }
  },
  {
    id: 2,
    name: 'MacBook Pro 14" M3 Chip - 16GB RAM',
    category: 'laptops',
    basePrice: 1999,
    promoPrice: 1849,
    image: 'https://images.unsplash.com/photo-1517336714460-4c98882c3fae?auto=format&fit=crop&q=80&w=600',
    badge: 'New',
    rating: 4.9,
    reviews: 89,
    freeDelivery: true,
    description: 'The 14-inch MacBook Pro blasts forward with M3, an incredibly advanced chip.',
    specs: { 'Chip': 'Apple M3', 'Memory': '16GB Unified', 'Display': 'Liquid Retina XDR' }
  },
  {
    id: 3,
    name: 'Sony WH-1000XM5 Noise Cancelling',
    category: 'audio',
    basePrice: 399,
    promoPrice: 349,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600',
    badge: '-15%',
    rating: 4.7,
    reviews: 456,
    freeDelivery: false,
    description: 'Noise cancellation. Exceptional sound quality. Superior calls.',
    specs: { 'Driver': '30mm', 'Connectivity': 'Bluetooth 5.2', 'Battery': '30 Hours' }
  },
  {
    id: 4,
    name: 'PlayStation 5 Console DualSense',
    category: 'gaming',
    basePrice: 549,
    promoPrice: null,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=600',
    badge: null,
    rating: 5.0,
    reviews: 210,
    freeDelivery: true,
    description: 'Experience lightning-fast loading with an ultra-high speed SSD.',
    specs: { 'Storage': '825GB Custom SSD', 'Resolution': 'Up to 8K', 'FPS': 'Up to 120fps' }
  },
  {
    id: 5,
    name: 'JBL Flip 6 Waterproof Speaker',
    category: 'audio',
    basePrice: 129,
    promoPrice: 99,
    image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&q=80&w=600',
    badge: 'Sale',
    rating: 4.6,
    reviews: 32,
    freeDelivery: false,
    lowStock: 8,
    description: 'Bold sound for every adventure.',
    specs: { 'Output': '30W', 'Battery': '12 Hours', 'Rating': 'IP67 Waterproof' }
  },
  {
    id: 6,
    name: 'Apple Watch Series 9 GPS 45mm',
    category: 'phones',
    basePrice: 429,
    promoPrice: 399,
    image: 'https://images.unsplash.com/photo-1544117518-30df578096a4?auto=format&fit=crop&q=80&w=600',
    badge: 'Hot',
    rating: 4.8,
    reviews: 156,
    freeDelivery: true,
    description: 'Smarter. Brighter. Mightier.',
    specs: { 'Chip': 'S9 SiP', 'Brightness': '2000 nits', 'Material': 'Aluminum' }
  }
];

// --- Components ---

const Badge = ({ children, variant = 'blue' }: { children?: React.ReactNode, variant?: 'blue' | 'orange' }) => (
  <span 
    className={`absolute top-2 left-2 px-2 py-1 text-[10px] font-black uppercase tracking-wider rounded text-white z-10`}
    style={{ backgroundColor: variant === 'orange' ? COLORS.accent : COLORS.primary }}
  >
    {children}
  </span>
);

const PriceDisplay = ({ base, promo, isLarge = false }: { base: number, promo: number | null, isLarge?: boolean }) => (
  <div className="flex flex-col">
    {promo ? (
      <>
        <span className={`${isLarge ? 'text-sm' : 'text-[11px]'} text-slate-400 line-through leading-none mb-1`}>
          ${base.toLocaleString()}
        </span>
        <span className={`${isLarge ? 'text-2xl md:text-3xl' : 'text-lg'} font-black tracking-tight`} style={{ color: COLORS.accent }}>
          ${promo.toLocaleString()}
        </span>
      </>
    ) : (
      <span className={`${isLarge ? 'text-2xl md:text-3xl' : 'text-lg'} font-black text-slate-900 tracking-tight`}>
        ${base.toLocaleString()}
      </span>
    )}
  </div>
);

// --- Main App ---

export default function ElectronicStorefront() {
  const [lang, setLang] = useState<'en' | 'fr'>('en');
  const [view, setView] = useState<View>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(3);
  const [wishlist, setWishlist] = useState<number[]>([3, 5]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const t = TRANSLATIONS[lang];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggleWishlist = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setWishlist(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setView('pdp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigate = (newView: View, catId?: string) => {
    if (catId) setActiveCategory(catId);
    setView(newView);
    setIsCartOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Shared Components
  const ProductGrid = ({ items, title }: { items: Product[], title?: string }) => (
    <div className="mb-12">
      {title && (
        <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-4">
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight uppercase">{title}</h2>
          <button className="text-[10px] font-black text-[#0047FF] uppercase tracking-widest hover:underline">{t.viewAll}</button>
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {items.map(product => (
          <div 
            key={product.id} 
            onClick={() => handleProductClick(product)}
            className="group relative bg-white border border-slate-200 flex flex-col transition-all duration-300 hover:shadow-xl rounded-sm cursor-pointer"
          >
            <div className="relative aspect-square overflow-hidden bg-white p-3">
              <img src={product.image} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" />
              {product.badge && <Badge variant={product.badge.includes('%') || product.badge === 'Sale' ? 'orange' : 'blue'}>{product.badge}</Badge>}
              <button 
                onClick={(e) => toggleWishlist(e, product.id)}
                className={`absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm transition-all ${wishlist.includes(product.id) ? 'text-red-500' : 'text-slate-400 hover:text-red-500'}`}
              >
                <Heart size={14} fill={wishlist.includes(product.id) ? "currentColor" : "none"} />
              </button>
            </div>
            <div className="p-3 flex flex-col flex-grow border-t border-slate-50">
              <div className="flex items-center gap-1 mb-1">
                <Star size={10} className="fill-yellow-400 text-yellow-400" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{product.rating}</span>
              </div>
              <h3 className="text-[12px] font-bold text-slate-800 line-clamp-2 mb-2 min-h-[32px] leading-tight group-hover:text-[#0047FF] transition-colors uppercase tracking-tight">
                {product.name}
              </h3>
              <div className="mt-auto flex items-end justify-between">
                <PriceDisplay base={product.basePrice} promo={product.promoPrice} />
                <button 
                  className="p-2 text-white rounded-full shadow-md active:scale-90 transition-all z-10 hover:brightness-110"
                  style={{ backgroundColor: COLORS.primary }}
                  onClick={(e) => { e.stopPropagation(); setCartCount(c => c + 1); }}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderHome = () => (
    <>
      <section className="px-4 py-6 md:py-8">
        <div className="relative w-full h-[280px] md:h-[420px] rounded-2xl overflow-hidden flex items-center shadow-2xl" style={{ backgroundColor: COLORS.secondary }}>
          <div className="absolute inset-0 opacity-40">
            <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent"></div>
          </div>
          <div className="relative z-10 px-6 md:px-16 max-w-xl">
            <Badge variant="orange">Live Deals</Badge>
            <h1 className="text-3xl md:text-5xl font-black text-white mt-4 mb-6 leading-tight tracking-tighter uppercase">
              {t.heroTitle}
            </h1>
            <p className="text-slate-300 text-sm md:text-lg mb-10 font-medium leading-relaxed">{t.heroSub}</p>
            <button className="text-white px-8 py-4 rounded-lg font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 hover:brightness-110 active:scale-95 transition-all shadow-2xl" style={{ backgroundColor: COLORS.primary }}>
              {t.shopDeals} <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Homepage Filter Bar */}
      <section className="px-4 mb-8">
        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4">{lang === 'en' ? 'Top Departments' : 'Rayons Populaires'}</h2>
        <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 mask-fade-right">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full border whitespace-nowrap transition-all duration-200 min-h-[44px] ${
                activeCategory === cat.id ? 'bg-[#0047FF] border-[#0047FF] text-white shadow-lg' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-400 shadow-sm'
              }`}
            >
              <div className={activeCategory === cat.id ? 'text-white' : 'text-[#0047FF]'}>{cat.icon}</div>
              <span className="text-xs font-black uppercase tracking-widest">{lang === 'en' ? cat.name_en : cat.name_fr}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="px-4 py-4">
        <ProductGrid items={filteredProducts} title={activeCategory === 'all' ? t.featuredDeals : (lang === 'en' ? CATEGORIES.find(c => c.id === activeCategory)?.name_en : CATEGORIES.find(c => c.id === activeCategory)?.name_fr)} />
        {activeCategory === 'all' && (
          <>
            <ProductGrid items={PRODUCTS.slice(2, 6).concat(PRODUCTS.slice(0, 2))} title={t.newArrivals} />
            <ProductGrid items={PRODUCTS.slice(0, 4)} title={t.recentlyViewed} />
          </>
        )}
      </section>
    </>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="sticky top-0 z-[110] text-white shadow-2xl" style={{ backgroundColor: COLORS.secondary }}>
        <div className="max-w-[1280px] mx-auto px-4 h-16 md:h-20 flex items-center justify-between gap-4 md:gap-10">
          {/* Logo */}
          <div onClick={() => navigate('home')} className="flex items-center gap-3 cursor-pointer group flex-shrink-0">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center transition-transform group-hover:rotate-12" style={{ backgroundColor: COLORS.primary }}>
              <Zap size={20} fill="white" />
            </div>
            <div className="flex flex-col -space-y-1 hidden sm:block">
              <span className="text-lg md:text-xl font-black tracking-tighter">SOKOKART</span>
              <span className="text-[8px] font-black text-blue-400 tracking-[0.3em] uppercase opacity-80">Electronic</span>
            </div>
          </div>

          {/* Search */}
          <div className="flex-grow max-w-2xl relative hidden md:block">
            <input 
              type="text" 
              placeholder={t.searchPlaceholder}
              className="w-full h-11 bg-slate-800/80 border-none rounded-xl px-12 text-sm focus:ring-2 focus:ring-[#0047FF] transition-all outline-none placeholder-slate-500 font-bold"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => navigate('home')}
            />
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 md:gap-6 flex-shrink-0">
            {/* Lang Switcher */}
            <button 
              onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
              className="p-2 hover:bg-slate-800 rounded-full text-slate-400 flex items-center gap-2 group transition-colors"
            >
              <Globe size={20} className="group-hover:text-white" />
              <span className="text-[10px] font-black uppercase tracking-widest hidden lg:block group-hover:text-white">{lang === 'en' ? 'FR' : 'EN'}</span>
            </button>

            {/* Align Account & Wishlist */}
            <div className="flex items-center border-l border-slate-700 pl-4 md:pl-6 gap-3 md:gap-6">
              <button onClick={() => navigate('account')} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-all group">
                <User size={22} />
              </button>
              <button onClick={() => navigate('wishlist')} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-red-500 transition-all group relative">
                <Heart size={22} fill={view === 'wishlist' ? "currentColor" : "none"} />
                {wishlist.length > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-slate-900"></span>}
              </button>

              {/* Cart Icon Redesign - Badge in border/pop style */}
              <button 
                className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-blue-400 transition-all relative group" 
                onClick={() => setIsCartOpen(true)}
              >
                <div className="relative">
                  <ShoppingCart size={22} />
                  {cartCount > 0 && (
                    <span 
                      className="absolute -top-2 -right-2 min-w-[18px] h-[18px] text-[10px] font-black rounded-full flex items-center justify-center border-2 border-[#0F172A] shadow-xl text-white transform group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: COLORS.accent }}
                    >
                      {cartCount}
                    </span>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1280px] mx-auto min-h-screen">
        {view === 'home' ? renderHome() : (
          <div className="p-4 py-8">
            {/* Minimal Placeholder for other views to focus on Home requirements */}
            <button onClick={() => setView('home')} className="flex items-center gap-2 text-slate-500 font-black text-xs uppercase mb-8">
              <ChevronLeft size={16} /> Back
            </button>
            <h1 className="text-2xl font-black uppercase tracking-tight">{view}</h1>
            <p className="mt-4 text-slate-500 italic">This section is being refined according to SokoKart specs...</p>
          </div>
        )}
      </main>

      {/* Cart Drawer Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[200] bg-slate-900/90 backdrop-blur-md">
          <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-[-20px_0_100px_rgba(0,0,0,0.4)] flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-8 text-white flex items-center justify-between" style={{ backgroundColor: COLORS.secondary }}>
              <h2 className="text-xl font-black flex items-center gap-4 uppercase tracking-tighter"><ShoppingCart size={24} className="text-[#0047FF]" /> {t.cart}</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={24} /></button>
            </div>
            <div className="flex-grow p-8 text-center flex flex-col items-center justify-center opacity-40">
              <ShoppingCart size={64} className="mb-4 text-slate-200" />
              <p className="text-sm font-black uppercase tracking-[0.2em]">{lang === 'en' ? 'Cart Summary View' : 'Vue Récapitulative'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="text-slate-400 pt-32 pb-16 px-4" style={{ backgroundColor: COLORS.secondary }}>
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-20 mb-20 border-b border-slate-800 pb-20">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: COLORS.primary }}><Zap size={24} fill="white" /></div>
              <span className="text-3xl font-black text-white tracking-tighter">SOKOKART</span>
            </div>
            <p className="text-sm leading-relaxed opacity-60 font-medium">Africa's premium tech marketplace. English & French localized.</p>
          </div>
          <div>
            <h4 className="text-white font-black mb-10 uppercase text-xs tracking-[0.4em] opacity-80">{t.allProducts}</h4>
            <ul className="space-y-4 text-sm font-black uppercase tracking-widest">
              {CATEGORIES.slice(1).map(c => (
                <li key={c.id}><button onClick={() => navigate('category', c.id)} className="hover:text-white">{lang === 'en' ? c.name_en : c.name_fr}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black mb-10 uppercase text-xs tracking-[0.4em] opacity-80">Support</h4>
            <ul className="space-y-4 text-sm font-black uppercase tracking-widest opacity-60">
              <li>{lang === 'en' ? 'Help Center' : 'Centre d\'aide'}</li>
              <li>{lang === 'en' ? 'Shipping' : 'Livraison'}</li>
              <li>{lang === 'en' ? 'Privacy' : 'Confidentialité'}</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black mb-10 uppercase text-xs tracking-[0.4em] opacity-80">{lang === 'en' ? 'Secure Payments' : 'Paiements Sécurisés'}</h4>
            <div className="flex flex-wrap gap-2 mb-10">
               {['WAVE', 'ORANGE', 'MOMO', 'VISA'].map(pay => (
                 <span key={pay} className="bg-slate-800 px-3 py-2 rounded-lg text-[10px] font-black text-white border border-slate-700 tracking-widest">{pay}</span>
               ))}
            </div>
            <div className="flex items-center gap-3 text-[10px] font-black text-slate-600 uppercase tracking-widest">
              <ShieldCheck size={18} className="text-emerald-500" /> {lang === 'en' ? 'SECURE SSL' : 'SSL SÉCURISÉ'}
            </div>
          </div>
        </div>
        <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] opacity-20">© 2024 SokoKart Electronic. Built with High-Velocity Precision.</p>
      </footer>
    </div>
  );
}

// --- Mount Logic ---
const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<ElectronicStorefront />);
}
