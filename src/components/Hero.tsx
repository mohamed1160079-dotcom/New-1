import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onShopNow: () => void;
}

export default function Hero({ onShopNow }: HeroProps) {
  const { t, isRTL } = useLang();

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Decorative Elements */}
      <div className="absolute top-10 right-5 w-48 sm:w-72 h-48 sm:h-72 bg-pink-200/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 left-5 w-64 sm:w-96 h-64 sm:h-96 bg-rose-200/20 rounded-full blur-3xl" />
      
      {/* Floating circles - Hidden on small mobile */}
      <motion.div 
        animate={{ y: [-8, 8, -8] }} 
        transition={{ duration: 4, repeat: Infinity }}
        className="hidden sm:block absolute top-24 right-[20%] w-3 h-3 rounded-full bg-pink-300/40"
      />
      <motion.div 
        animate={{ y: [8, -8, 8] }} 
        transition={{ duration: 5, repeat: Infinity }}
        className="hidden sm:block absolute top-40 left-[15%] w-2.5 h-2.5 rounded-full bg-rose-300/50"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center min-h-[480px] sm:min-h-[560px] lg:min-h-[620px] py-8 sm:py-10 gap-6 lg:gap-10">
          {/* Text Content */}
          <div className={`flex-1 text-center lg:text-start ${isRTL ? 'lg:text-right' : 'lg:text-left'} order-2 lg:order-1`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/70 backdrop-blur-sm rounded-full text-pink-600 text-[11px] sm:text-xs font-medium mb-4 sm:mb-5 border border-pink-100 shadow-sm"
              >
                <Sparkles size={14} className="text-pink-400" />
                {t('hero.subtitle')}
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-5"
              >
                <span className="text-gray-800">{t('hero.title1')}</span>
                <br />
                <span className="text-gradient">{t('hero.title2')}</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-500 text-sm sm:text-base max-w-md mx-auto lg:mx-0 mb-6 leading-relaxed"
              >
                {t('hero.desc')}
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start"
              >
                <button 
                  onClick={onShopNow}
                  className="group w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white rounded-xl sm:rounded-2xl font-semibold text-sm shadow-xl shadow-pink-200/40 hover:shadow-pink-300/50 transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2 overflow-hidden"
                >
                  <span>{t('hero.shopNow')}</span>
                  {isRTL ? <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" /> : <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />}
                </button>
                <button 
                  onClick={onShopNow}
                  className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 bg-white/80 backdrop-blur-sm border border-pink-200 text-pink-600 rounded-xl sm:rounded-2xl font-semibold text-sm hover:bg-pink-50 hover:border-pink-300 transition-all duration-300"
                >
                  {t('hero.newArrivals')}
                </button>
              </motion.div>

              {/* Stats */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-6 sm:gap-8 mt-8 justify-center lg:justify-start"
              >
                {[
                  { num: '10K+', label: isRTL ? 'عميلة سعيدة' : 'Happy Customers' },
                  { num: '500+', label: isRTL ? 'منتج' : 'Products' },
                  { num: '4.9', label: isRTL ? 'تقييم' : 'Rating ⭐' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-lg sm:text-xl font-bold text-pink-600">{stat.num}</div>
                    <div className="text-[10px] sm:text-xs text-gray-400 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Hero Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 relative w-full max-w-[280px] sm:max-w-[340px] lg:max-w-md order-1 lg:order-2"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-pink-200/30 border-2 sm:border-4 border-white/60">
                <img
                  src="https://images.pexels.com/photos/23172133/pexels-photo-23172133.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                  alt="Mony Store Fashion"
                  className="w-full h-[280px] sm:h-[360px] lg:h-[440px] object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-500/15 to-transparent" />
              </div>

              {/* Floating Card 1 */}
              <motion.div 
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 3, repeat: Infinity }}
                className={`absolute -bottom-3 sm:-bottom-4 ${isRTL ? '-right-2 sm:-right-6' : '-left-2 sm:-left-6'} bg-white rounded-xl sm:rounded-2xl shadow-xl shadow-pink-100/40 p-2.5 sm:p-3 border border-pink-50`}
              >
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg sm:rounded-xl flex items-center justify-center text-white text-sm sm:text-base">✓</div>
                  <div>
                    <div className="text-[9px] sm:text-[10px] text-gray-400">{isRTL ? 'توصيل سريع' : 'Fast Delivery'}</div>
                    <div className="text-[10px] sm:text-xs font-bold text-gray-700">{isRTL ? '2-4 أيام' : '2-4 Days'}</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Card 2 */}
              <motion.div 
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 4, repeat: Infinity }}
                className={`absolute top-4 sm:top-6 ${isRTL ? '-left-2 sm:-left-6' : '-right-2 sm:-right-6'} bg-white rounded-xl sm:rounded-2xl shadow-xl shadow-pink-100/40 p-2 sm:p-2.5 border border-pink-50`}
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-xl sm:text-2xl">🇪🇬</span>
                  <div>
                    <div className="text-[8px] sm:text-[9px] text-gray-400">{isRTL ? 'شحن لكل' : 'Shipping to'}</div>
                    <div className="text-[9px] sm:text-[10px] font-bold text-gray-700">{isRTL ? 'محافظات مصر' : 'All Egypt'}</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
