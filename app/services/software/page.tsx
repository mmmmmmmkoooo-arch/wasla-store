'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveOrderToGoogleSheets } from '@/googlesheetsService';

export default function SoftwarePage() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState('ChatGPT Plus');
  const [userEmail, setUserEmail] = useState('');
  const [duration, setDuration] = useState('شهر واحد');
  const [userPhone, setUserPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = [
    { name: 'ChatGPT Plus', icon: '🤖', desc: 'اشتراكات ذكاء اصطناعي وتفعيل على حسابك' },
    { name: 'Canva Pro', icon: '🎨', desc: 'اشتراكات كانفا بروفيشينال للأفراد والفرق' },
    { name: 'Windows / Office Keys', icon: '💻', desc: 'سيريال أصلي لويندوز وأوفيس بتفعيل مدى الحياة' },
    { name: 'Google One / Drive', icon: '☁️', desc: 'مساحات تخزين سحابية لمكتبة جوجل' },
    { name: 'Netflix / Streaming', icon: '🎬', desc: 'حسابات واشتراكات منصات البث والأفلام' },
    { name: 'برنامج / خدمة أخرى', icon: '🧩', desc: 'اكتب اسم البرنامج أو الاشتراك المطلوبة بالأسفل' },
  ];

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderData = {
      category: 'برمجيات واشتراكات',
      item: selectedService,
      accountInfo: userEmail,
      quantityOrPack: duration,
      phone: userPhone,
      date: new Date().toLocaleString('ar-EG'),
    };

    try {
      await saveOrderToGoogleSheets(orderData);
    } catch (err) {
      console.log('حدث خطأ أثناء الحفظ في الشيت، سيتم التحويل للواتساب مباشرة');
    }

    const message = `مرحباً متجر وصلها 👋%0Aأرغب في شراء / تفعيل خدمة برمجية:%0A- *الخدمة:* ${selectedService}%0A- *المدة / المدة المطلوبة:* ${duration}%0A- *البريد / الحساب المراد التفعيل عليه:* ${userEmail}%0A- *رقم التواصل:* ${userPhone}`;
    window.open(`https://wa.me/201025146867?text=${message}`, '_blank');

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 font-sans pb-20" dir="rtl">
      <header className="border-b border-slate-800/80 bg-[#050811]/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-slate-300 hover:text-amber-400 transition cursor-pointer"
          >
            <span>←</span>
            <span className="text-sm font-bold">رجوع</span>
          </button>
          <div className="text-amber-400 font-black text-lg">البرمجيات والاشتراكات 💻</div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pt-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-black text-slate-100 mb-3">
            البرمجيات والاشتراكات <span className="text-amber-400">الرقمية</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
            احصل على اشتراكات رسمية وتفعيلات أصلية بأفضل الأسعار وبضمان كامل.
          </p>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {services.map((s, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedService(s.name)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                selectedService === s.name
                  ? 'border-amber-400 bg-amber-500/10 shadow-lg shadow-amber-500/10 scale-[1.02]'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div>
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="font-bold text-slate-100 text-base mb-1">{s.name}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{s.desc}</p>
              </div>
              <div className="mt-4 text-xs font-semibold text-amber-400">
                {selectedService === s.name ? '✓ محدد حالياً' : 'اضغط للتحديد'}
              </div>
            </div>
          ))}
        </section>

        <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 backdrop-blur-md max-w-2xl mx-auto">
          <h3 className="text-lg font-bold text-slate-100 mb-6 flex items-center gap-2 border-b border-slate-800 pb-4">
            <span>⚡</span> نموذج طلب الاشتراك
          </h3>

          <form onSubmit={handleOrder} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2">الخدمة / البرنامج المحدد:</label>
              <input
                type="text"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-amber-400 text-sm font-bold focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2">مدة الاشتراك / النوع:</label>
              <input
                type="text"
                required
                placeholder="مثال: شهر / سنة / مفتاح تفعيل..."
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 text-sm focus:border-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-2">الإيميل المراد التفعيل عليه (إن وجد):</label>
              <input
                type="email"
                placeholder="example@gmail.com"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 text-sm focus:border-amber-400 focus:outline-none"
              />
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
              disabled={isSubmitting}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl text-sm transition shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
            >
              <span>{isSubmitting ? 'جاري تسجيل الطلب...' : 'إرسال الطلب عبر الواتساب'}</span>
              <span>💬</span>
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}