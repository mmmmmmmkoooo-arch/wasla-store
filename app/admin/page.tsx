'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [heroTitle, setHeroTitle] = useState('مرحباً بك في منصة وصلها');
  const [heroSubtitle, setHeroSubtitle] = useState('وجهتك الأولى لشحن الألعاب والخدمات الرقمية والمونتاج');
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    // جلب النصوص الديناميكية المحفوظة من الأدمن
    const savedTitle = localStorage.getItem('wasla_hero_title');
    const savedSubtitle = localStorage.getItem('wasla_hero_subtitle');
    const savedAnnouncement = localStorage.getItem('wasla_announcement');

    if (savedTitle) setHeroTitle(savedTitle);
    if (savedSubtitle) setHeroSubtitle(savedSubtitle);
    if (savedAnnouncement) setAnnouncement(savedAnnouncement);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white rtl dir-rtl flex flex-col justify-between">
      
      {/* شريط الإعلان العاجل العلوي */}
      {announcement && (
        <div className="bg-emerald-600 text-gray-950 font-bold text-center py-2 px-4 text-sm shadow-md animate-pulse">
          📢 {announcement}
        </div>
      )}

      {/* الواجهة الرئيسية */}
      <main className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-emerald-400 max-w-3xl leading-tight">
          {heroTitle}
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
          {heroSubtitle}
        </p>

        {/* أزرار الخدمات السريعة */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-xl pt-6">
          <Link href="/games" className="bg-gray-900 border border-emerald-600 hover:bg-emerald-600 hover:text-gray-950 p-4 rounded-xl transition-all font-bold">
            🎮 شحن الألعاب
          </Link>
          <Link href="/services/editing" className="bg-gray-900 border border-emerald-600 hover:bg-emerald-600 hover:text-gray-950 p-4 rounded-xl transition-all font-bold">
            🎬 خدمات المونتاج
          </Link>
          <Link href="/wallets" className="bg-gray-900 border border-emerald-600 hover:bg-emerald-600 hover:text-gray-950 p-4 rounded-xl transition-all font-bold">
            💳 المحافظ الرقمية
          </Link>
        </div>
      </main>

      {/* الفوتر */}
      <footer className="border-t border-gray-900 text-center py-4 text-xs text-gray-500">
        جميع الحقوق محفوظة لمنصة وصلها © 2026
      </footer>
    </div>
  );
}