'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function EditingPage() {
  const [selectedService, setSelectedService] = useState('تصميم شعار (Logo Design)');
  const [details, setDetails] = useState('');
  const [userPhone, setUserPhone] = useState('');

  const services = [
    {
      name: 'تصميم شعار (Logo Design)',
      icon: '🎨',
      desc: 'تصميم شعارات وبصرية احترافية وشعار هاتف/موقع مميز وعصري مع تسليم كافة صيغ الملفات (PNG, SVG, AI).',
    },
    {
      name: 'مونتاج فيديوهات قصيرة (Reels / TikTok / Shorts)',
      icon: '📱',
      desc: 'مونتاج سريع وجذاب مع إضافة نصوص ديناميكية ومؤثرات صوتية تناسب المنصات السريعة.',
    },
    {
      name: 'مونتاج فيديوهات يوتيوب طويلة',
      icon: '🎬',
      desc: 'تحرير كامل للفيديوهات، تعديل الألوان، تصحيح الصوت، وإضافة انترو واوترو احترافي.',
    },
    {
      name: 'إنترو وانميشن سينمائي (Intro / Motion)',
      icon: '✨',
      desc: 'مقدمات فيديو ثنائية وثلاثية الأبعاد موشن جرافيك لإبراز شعارك وعلامتك التجارية.',
    },
    {
      name: 'إعلانات وتصاميم ترويجية',
      icon: '📢',
      desc: 'فيديوهات إعلانية وتصميم بروموهات ترويجية للمنتجات والخدمات والمتاجر الإلكترونية.',
    },
    {
      name: 'خدمة مونتاج / تصميم مخصصة',
      icon: '🛠️',
      desc: 'إذا كانت لديك فكرة محددة أو طلب خاص، اذكر تفاصيله وسنقوم بتنفيذه بدقة.',
    },
  ];

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `مرحباً متجر وصلها 👋%0Aأرغب في طلب خدمة مونتاج / تصميم:%0A- *الخدمة:* ${selectedService}%0A- *تفاصيل الطلب:* ${details}%0A- *رقم التواصل:* ${userPhone}`;
    window.open(`https://wa.me/201025146867?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 font-sans pb-20" dir="rtl">
      {/* الهيدر */}
      <header className="border-b border-slate-800/80 bg-[#050811]/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-300 hover:text-amber-400 transition">
            <span>←</span>
            <span className="text-sm font-bold">الرئيسية</span>
          </Link>
          <div className="text-amber-400 font-black text-lg">صناعة المونتاج والشعارات 🎬🎨</div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-black text-slate-100 mb-3">
            خدمات <span className="text-amber-400">المونتاج وتصميم الشعارات</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
            تصميم لوجوهات احترافية ومونتاج فيديوهات بجودة عالية لمساعدتك على إبراز هويتك وصناعة محتوى مميز.
          </p>
        </div>

        {/* شبكة الخدمات */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {services.map((s, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedService(s.name)}
              className={`p-6 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                selectedService === s.name
                  ? 'border-amber-400 bg-amber-500/10 shadow-lg shadow-amber-500/10 scale-[1.02]'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div>
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="font-bold text-slate-100 text-base mb-2">{s.name}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{s.desc}</p>
              </div>
              <div className="mt-5 text-xs font-semibold text-amber-400">
                {selectedService === s.name ? '✓ الخدمة المحددة' : 'اضغط للاختيار'}
              </div>
            </div>
          ))}
        </section>

        {/* نموذج الطلب */}
        <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur-md max-w-2xl mx-auto">
          <h3 className="text-lg font-bold text-slate-100 mb-6 flex items-center gap-2 border-b border-slate-800 pb-4">
            <span>✨</span> طلب الخدمة
          </h3>

          <form onSubmit={handleOrder} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2">الخدمة المحددة:</label>
              <input
                type="text"
                readOnly
                value={selectedService}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-amber-400 text-sm font-bold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2">تفاصيل الفكرة أو الطلب:</label>
              <textarea
                required
                rows={4}
                placeholder="اكتب هنا تفاصيل الشعار المطلوب (اسم الماركة/الألوان) أو تفاصيل الفيديو ومدته..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 text-sm focus:border-amber-400 focus:outline-none resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2">رقم الواتساب للتواصل والأستلام:</label>
              <input
                type="text"
                required
                placeholder="01025146867"
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl text-sm transition shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 mt-4"
            >
              <span>إرسال الطلب عبر الواتساب</span>
              <span>💬</span>
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}