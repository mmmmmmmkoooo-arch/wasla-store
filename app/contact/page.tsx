'use client';

import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 font-sans pb-20" dir="rtl">
      {/* الهيدر */}
      <header className="border-b border-slate-800/80 bg-[#050811]/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-300 hover:text-amber-400 transition">
            <span>←</span>
            <span className="text-sm font-bold">الرئيسية</span>
          </Link>
          <div className="text-amber-400 font-black text-lg">متجر وصلها 👋</div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 pt-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-black text-slate-100 mb-3">
            تواصل <span className="text-amber-400">معنا</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base">
            فريق متجر وصلها متواجد دائمًا لخدمتك والإجابة على أي استفسارات تخص الشحن، الخدمات الرقمية، والتصميم.
          </p>
        </div>

        {/* بطاقات التواصل */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <a
            href="https://wa.me/201025146867"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 rounded-2xl transition-all flex flex-col items-center text-center group"
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">💬</div>
            <h3 className="font-bold text-slate-100 text-lg mb-1">الواتساب المباشر</h3>
            <p className="text-slate-400 text-xs mb-3">للتنفيذ السريع والمحادثة المباشرة</p>
            <span className="text-emerald-400 font-mono text-sm font-bold">01025146867</span>
          </a>

          <a
            href="tel:01025146867"
            className="p-6 bg-slate-900/80 border border-slate-800 hover:border-amber-400/50 rounded-2xl transition-all flex flex-col items-center text-center group"
          >
            <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📞</div>
            <h3 className="font-bold text-slate-100 text-lg mb-1">الاتصال الهاتفي</h3>
            <p className="text-slate-400 text-xs mb-3">متاحين لاستقبال الاستفسارات</p>
            <span className="text-amber-400 font-mono text-sm font-bold">01025146867</span>
          </a>
        </div>

        {/* معلومات الدعم */}
        <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6 text-center">
          <h4 className="font-bold text-amber-400 mb-2">⚡ ساعات العمل والخدمة</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            نعمل على مدار الساعة لاستقبال طلباتكم، ويتم تنفيذ عمليات الشحن والخدمات الفورية خلال دقائق معدودة من تأكيد الطلب عبر الواتساب.
          </p>
        </div>
      </main>
    </div>
  );
}