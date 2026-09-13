'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DigitalPaymentsPage() {
  const [serviceType, setServiceType] = useState('شحن / دفع إلكتروني عام');
  const [details, setDetails] = useState('');
  const [userPhone, setUserPhone] = useState('');

  const services = [
    { name: 'دفع اشتراكات وكورسات خارجية', icon: '🌍', desc: 'دفع في أي موقع/منصة عالمية بالدولار أو العملات الأجنبية' },
    { name: 'شحن بطاقات المتاجر (Google / Apple)', icon: '💳', desc: 'بطاقات جوجل بلاي، آبل آيتونز لكل الاستخدامات' },
    { name: 'بطاقات الألعاب (PlayStation / Xbox / Steam)', icon: '🎮', desc: 'شحن محافظ المتاجر وأكواد الهدايا' },
    { name: 'اشتراكات برامج وترفيه (ChatGPT, Netflix...)', icon: '🎬', desc: 'تفعيل الاشتراكات المدفوعة بسرعة وأمان' },
    { name: 'دفع أي تطبيق أو موقع خاص (داخل وخارج مصر)', icon: '🚀', desc: 'أي خدمة تحتاج دفع إلكتروني غير مدرجة بالمتجر' },
  ];

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `مرحباً متجر وصلها 👋%0Aأرغب في خدمة دفع إلكتروني / شحن خارجي:%0A- *نوع الخدمة:* ${serviceType}%0A- *تفاصيل الطلب والموقع:* ${details}%0A- *رقم التواصل:* ${userPhone}`;
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
          <div className="text-amber-400 font-black text-lg">قسم المدفوعات والخدمات الرقمية 🌍</div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pt-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-slate-100 mb-3">
            خدمات الدفع الإلكتروني <span className="text-amber-400">(داخل وخارج مصر)</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            نوفر لك خدمة الدفع والشحن لأي موقع، تطبيق، بطاقة، أو اشتراك عالمي بسهولة وأمان تام.
          </p>
        </div>

        {/* انواع الخدمات */}
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

        {/* نموذج الطلب */}
        <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur-md">
          <h3 className="text-lg font-bold text-slate-100 mb-6 flex items-center gap-2">
            <span>📝</span> طلب دفع أو شحن خاص
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
              <label className="block text-xs font-bold text-slate-400 mb-2">تفاصيل الطلب ورابط الموقع/التطبيق إن وجد:</label>
              <textarea
                rows={4}
                required
                placeholder="اكتب هنا اسم الموقع، الكورس، أو البطاقة والمبلغ المطلوب بالظبط..."
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
              <span>إرسال طلب الدفع الخاص</span>
              <span>💬</span>
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}