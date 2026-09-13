'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function WebServicePage() {
  const [serviceType, setServiceType] = useState('تطوير متجر إلكتروني متكامل');
  const [details, setDetails] = useState('');
  const [userPhone, setUserPhone] = useState('');

  const services = [
    { name: 'تطوير متاجر إلكترونية', icon: '🛒', desc: 'متاجر سريعة وحديثة تدعم الدفع والواجهات العربية/الإنجليزية' },
    { name: 'تصميم مواقع تعريفية للشركات والخدمات', icon: '🌐', desc: 'صفحات هبوط عالية الجودة لإبراز علامتك التجارية' },
    { name: 'تطوير تطبيقات ويب المخصصة (Next.js / React)', icon: '💻', desc: 'أنظمة متكاملة وأدوات خاصة حسب طلبك' },
    { name: 'صيانة وتحسين أداء المواقع (SEO & Speed)', icon: '⚡', desc: 'رفع سرعة الموقع وتحسين ظهوره في محركات البحث' },
  ];

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `مرحباً متجر وصلها 👋%0Aأرغب في خدمة تصميم وتطوير المواقع:%0A- *نوع الخدمة:* ${serviceType}%0A- *تفاصيل المشروع:* ${details}%0A- *رقم التواصل:* ${userPhone}`;
    window.open(`https://wa.me/201025146867?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 font-sans pb-20" dir="rtl">
      <header className="border-b border-slate-800/80 bg-[#050811]/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-300 hover:text-amber-400 transition">
            <span>←</span>
            <span className="text-sm font-bold">الرئيسية</span>
          </Link>
          <div className="text-amber-400 font-black text-lg">قسم تصميم وتطوير المواقع 💻</div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pt-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-slate-100 mb-3">
            خدمات <span className="text-amber-400">البرمجة وتطوير المواقع</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            نبني لك مواقع ومتاجر حديثة وبأعلى معايير السرعة والأمان.
          </p>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {services.map((s, idx) => (
            <div
              key={idx}
              onClick={() => setServiceType(s.name)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                serviceType === s.name
                  ? 'border-amber-400 bg-amber-500/10 shadow-lg shadow-amber-500/10'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
              }`}
            >
              <div className="text-3xl mb-3">{s.icon}</div>
              <h3 className="font-bold text-slate-100 text-base mb-1">{s.name}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </section>

        <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur-md">
          <h3 className="text-lg font-bold text-slate-100 mb-6 flex items-center gap-2">
            <span>📝</span> طلب مشروع برمجي
          </h3>

          <form onSubmit={handleOrder} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2">نوع الخدمة المحددة:</label>
              <input
                type="text"
                readOnly
                value={serviceType}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-amber-400 text-sm font-bold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2">تفاصيل الفكرة والمواصفات المطلوبة:</label>
              <textarea
                rows={4}
                required
                placeholder="اكتب مواصفات الموقع أو المتجر والخصائص التي ترغب بوجودها..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 text-sm focus:border-amber-400 focus:outline-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2">رقم الواتساب للتواصل:</label>
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
              <span>إرسال طلب المشروع</span>
              <span>💬</span>
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}