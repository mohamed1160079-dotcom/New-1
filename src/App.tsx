import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { LanguageProvider, useLang } from './context/LanguageContext';
import { CartProvider, useCart, Product } from './context/CartContext';
import { products } from './data/products';
import SplashScreen from './components/SplashScreen';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Categories from './components/Categories';
import ProductGrid from './components/ProductGrid';
import FlashSale from './components/FlashSale';
import PromoBanner from './components/PromoBanner';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import Checkout from './components/Checkout';
import OrderSuccess from './components/OrderSuccess';
import ProductDetails from './components/ProductDetails';
import ProductCard from './components/ProductCard';
import MobileBottomNav from './components/MobileBottomNav';

function AppContent() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCheckout = () => {
    setCartOpen(false);
    setCurrentPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderSuccess = () => {
    setCurrentPage('orderSuccess');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('productDetails');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromProduct = () => {
    setSelectedProduct(null);
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBuyNow = () => {
    setSelectedProduct(null);
    setCurrentPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showHeader = !['orderSuccess'].includes(currentPage);
  const showFooter = !['checkout', 'orderSuccess', 'productDetails'].includes(currentPage);
  const showBottomNav = !['checkout', 'orderSuccess', 'productDetails'].includes(currentPage);

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <SplashScreen isVisible={showSplash} />

      {showHeader && (
        <Header
          onCartOpen={() => setCartOpen(true)}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      )}

      <AnimatePresence mode="wait">
        {/* Home Page */}
        {currentPage === 'home' && (
          <main key="home">
            <Hero onShopNow={() => handlePageChange('shop')} />
            <Features />
            <Categories onCategoryClick={() => handlePageChange('shop')} />
            <ProductGrid
              title="🔥 الأكثر مبيعاً | Trending Now"
              limit={3}
              onProductClick={handleProductClick}
            />
            <PromoBanner onShopNow={() => handlePageChange('shop')} />
            <FlashSale onProductClick={handleProductClick} />
            <Testimonials />
          </main>
        )}

        {/* Shop Page */}
        {currentPage === 'shop' && (
          <main key="shop">
            <ProductGrid
              title="🛍️ جميع المنتجات | All Products"
              showFilter
              onProductClick={handleProductClick}
            />
          </main>
        )}

        {/* Sale Page */}
        {currentPage === 'sale' && (
          <main key="sale">
            <FlashSale onProductClick={handleProductClick} />
            <ProductGrid
              title="🏷️ عروض خاصة | Special Offers"
              onProductClick={handleProductClick}
            />
          </main>
        )}

        {/* About Page */}
        {currentPage === 'about' && (
          <main key="about" className="py-12 sm:py-16">
            <AboutSection />
          </main>
        )}

        {/* Wishlist Page */}
        {currentPage === 'wishlist' && (
          <main key="wishlist" className="py-12 sm:py-16">
            <WishlistSection onProductClick={handleProductClick} />
          </main>
        )}

        {/* Product Details Page */}
        {currentPage === 'productDetails' && selectedProduct && (
          <ProductDetails
            key="productDetails"
            product={selectedProduct}
            onBack={handleBackFromProduct}
            onQuickView={handleProductClick}
            onBuyNow={handleBuyNow}
          />
        )}

        {/* Checkout Page */}
        {currentPage === 'checkout' && (
          <Checkout
            key="checkout"
            onBack={() => handlePageChange('home')}
            onOrderSuccess={handleOrderSuccess}
          />
        )}

        {/* Order Success Page */}
        {currentPage === 'orderSuccess' && (
          <OrderSuccess key="orderSuccess" onBackHome={() => handlePageChange('home')} />
        )}
      </AnimatePresence>

      {showFooter && <Footer onPageChange={handlePageChange} />}

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={handleCheckout}
      />

      {/* Mobile Bottom Nav */}
      {showBottomNav && (
        <MobileBottomNav
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onCartOpen={() => setCartOpen(true)}
        />
      )}

      {/* Bottom padding for mobile nav */}
      {showBottomNav && <div className="h-16 md:hidden" />}
    </div>
  );
}

function AboutSection() {
  const { isRTL } = useLang();
  
  return (
    <div className="container mx-auto px-3 sm:px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-5 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-xl shadow-pink-200/50">
          M
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
          Mony Store
        </h1>
        <p className="text-sm sm:text-base text-pink-500 font-medium mb-6">✨ Limitless Elegance ✨</p>
        <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-8 shadow-sm border border-pink-50 text-start space-y-4">
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
            موني ستور هو وجهتك المفضلة للأزياء النسائية الفاخرة في مصر. نقدم لكِ تشكيلة واسعة من الملابس والإكسسوارات والعطور ومنتجات العناية بالبشرة والمكياج، كلها مختارة بعناية لتناسب ذوقك الراقي.
          </p>
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed" dir="ltr">
            Mony Store is your premier destination for luxury women's fashion in Egypt. We offer a wide selection of clothing, accessories, perfumes, skincare, and makeup products, all carefully curated to match your refined taste.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            {[
              { num: '10K+', label: isRTL ? 'عميلة سعيدة' : 'Happy Customers' },
              { num: '500+', label: isRTL ? 'منتج' : 'Products' },
              { num: '27', label: isRTL ? 'محافظة' : 'Governorates' },
              { num: '4.9⭐', label: isRTL ? 'تقييم' : 'Rating' },
            ].map((stat, i) => (
              <div key={i} className="bg-pink-50 rounded-xl p-3 text-center">
                <div className="text-lg sm:text-xl font-bold text-pink-600">{stat.num}</div>
                <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function WishlistSection({ onProductClick }: { onProductClick: (product: Product) => void }) {
  const { wishlist } = useCart();
  const { isRTL } = useLang();
  
  const wishlistProducts = products.filter((p: Product) => wishlist.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 text-center py-12">
        <div className="w-20 h-20 mx-auto mb-4 bg-pink-50 rounded-full flex items-center justify-center">
          <span className="text-3xl">💕</span>
        </div>
        <h2 className="text-lg font-bold text-gray-800 mb-2">
          {isRTL ? 'قائمة المفضلة فارغة' : 'Wishlist is empty'}
        </h2>
        <p className="text-sm text-gray-500">
          {isRTL ? 'أضيفي منتجاتك المفضلة هنا' : 'Add your favorite products here'}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-3 sm:px-4">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">
        💕 {isRTL ? 'المفضلة' : 'My Wishlist'}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {wishlistProducts.map((product: Product, i: number) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            index={i}
            onProductClick={onProductClick}
          />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </LanguageProvider>
  );
}

/* Product 3 videos added manually:
https://ik.imagekit.io/n9fgagbyoz/IMG_6963.MP4
https://ik.imagekit.io/n9fgagbyoz/Scene%20Builder%20-%20Create%20a%20cinematic%20luxury%20fashion%20promo%20video%20from%20the%20uploaded%20image_The%20vide.mp4
*/
