'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setFadeOut(true), 1500);
    const timer2 = setTimeout(() => setShowSplash(false), 2000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const categories = [
    {
      title: 'شحن ألعاب إلكترونية',
      desc: 'شحن فورى وآمن لكل الألعاب (PUBG, Free Fire, Roblox, FC Mobile...)',
      icon: '🎮',
      link: '/games',
      badge: 'شحن فوري ⚡',
    },
    {
      title: 'المدفوعات والخدمات الرقمية',
      desc: 'دفع اشتراكات، بطاقات متجر، ودفع إلكتروني لأي موقع داخل وخارج مصر',
      icon: '💳',
      link: '/digital-payments',
      badge: 'عالمي ومحلي 🌍',
    },
    {
      title: 'صناعة ومونتاج الفيديو',
      desc: 'تحرير فيديوهات احترافية، إنترو سينمائي، وإعلانات تجارية',
      icon: '🎬',
      link: '/services/editing',
      badge: 'جودة 4K 🎥',
    },
    {
      title: 'تصميم وتطوير المواقع',
      desc: 'بناء متاجر إلكترونية ومواقع حديثة متوافقة مع جميع الشاشات',
      icon: '💻',
      link: '/services/web',
      badge: 'حلول برمجية 🚀',
    },
  ];

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 font-sans overflow-hidden relative select-none" dir="rtl">
      
      {/* 1. شاشة انيميشن البداية "وصلها" */}
      {showSplash && (
        <div
          className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050811] transition-all duration-500 ${
            fadeOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
          }`}
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-black text-slate-950 text-4xl shadow-2xl shadow-amber-500/30 mb-6 border border-amber-300/40 animate-pulse">
            و
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-amber-400 tracking-widest drop-shadow-[0_0_25px_rgba(245,158,11,0.6)]">
            وصلها
          </h1>
          <p className="text-slate-400 text-xs md:text-sm mt-4 tracking-[0.3em] font-bold uppercase">
            WASLHA STORE
          </p>
        </div>
      )}

      {/* 2. الهيدر الرئيسي */}
      <header className="relative z-20 border-b border-slate-800/80 bg-[#050811]/80 backdrop-blur-md sticky top-0">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center font-black text-slate-950 text-xl shadow-md">
              و
            </div>
            <div>
              <span className="text-xl font-black text-amber-400">وصلها</span>
              <span className="block text-[9px] text-slate-400 tracking-widest font-bold">DIGITAL STORE</span>
            </div>
          </div>
          <a
            href="https://wa.me/201025146867"
            target="_blank"
            rel="noreferrer"
            className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl transition shadow-lg hover:scale-105"
          >
            تواصل معنا 💬
          </a>
        </div>
      </header>

      {/* 3. كروت الأقسام */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-16 space-y-3">
          <span className="text-xs font-bold text-amber-400 tracking-widest uppercase bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20">
            مرحباً بك في متجر وصلها
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-100 tracking-tight">
            اختر القسم <span className="text-amber-400">المطلوب</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
            اضغط على أي قسم للانتقال للخدمات المتاحة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
              href={cat.link}
              className="group bg-slate-900/70 border border-slate-800 hover:border-amber-500/60 backdrop-blur-md rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-5">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-2xl group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors duration-300">
                    {cat.icon}
                  </div>
                  <span className="text-[11px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-3 py-1 rounded-full font-semibold">
                    {cat.badge}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-100 group-hover:text-amber-400 transition-colors duration-300 mb-2">
                  {cat.title}
                </h3>
                
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  {cat.desc}
                </p>
              </div>

              <div className="text-amber-400 font-bold text-sm flex items-center gap-2 group-hover:translate-x-[-6px] transition-transform duration-300">
                <span>تصفح كافة الخدمات</span>
                <span className="text-lg">←</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}