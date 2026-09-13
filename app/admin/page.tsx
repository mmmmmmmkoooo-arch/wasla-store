'use client';

import React, { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [visitorCount, setVisitorCount] = useState(0);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    // 1. جلب رقم الواتساب المحفوظ
    const storedPhone = localStorage.getItem('wasla_whatsapp_number') || '201025146867';
    setWhatsappNumber(storedPhone);

    // 2. قراءة عدد الزوار المحفوظ (أو زيادة العداد عند زيارة الصفحة)
    const storedCount = localStorage.getItem('wasla_visitor_count') || '1';
    setVisitorCount(parseInt(storedCount, 10));
  }, []);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    // حفظ رقم الواتساب الجديد
    localStorage.setItem('wasla_whatsapp_number', whatsappNumber);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const resetVisitors = () => {
    if (confirm('هل أنت تأكد من إعادة ضبط عداد الزوار إلى صفر؟')) {
      localStorage.setItem('wasla_visitor_count', '0');
      setVisitorCount(0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 rtl dir-rtl">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* الهيدر */}
        <div className="border-b border-gray-700 pb-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-emerald-400">لوحة تحكم منصة وصلها</h1>
          <span className="bg-emerald-950 text-emerald-300 text-sm px-3 py-1 rounded-full border border-emerald-800">
            أدمن
          </span>
        </div>

        {/* إحصائيات الموقع - عداد الزوار */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-sm">إجمالي عدد زوار الموقع</p>
              <h2 className="text-4xl font-extrabold text-white mt-2">{visitorCount} <span className="text-base font-normal text-emerald-400">زائر</span></h2>
            </div>
            <button 
              onClick={resetVisitors}
              className="text-xs text-red-400 hover:text-red-300 underline"
            >
              تصفير العداد
            </button>
          </div>
        </div>

        {/* تعديل رقم الواتساب */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
          <h2 className="text-xl font-semibold text-emerald-400 mb-4">إعدادات التواصل (الواتساب)</h2>
          
          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                رقم الواتساب المستلم للطلبات والدعم (اكتب الرقم بالكود الدولي بدون +)
              </label>
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="مثال: 201025146867"
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500 dir-ltr text-right"
                required
              />
              <p className="text-xs text-gray-400 mt-1">
                الرقم الحالي الذي سيتم تحويل الزوار إليه عبر زر الواتساب في الموقع.
              </p>
            </div>

            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              حفظ التعديلات
            </button>

            {savedSuccess && (
              <span className="mr-4 text-emerald-400 font-medium">
                ✓ تم حفظ رقم الواتساب الجديد بنجاح!
              </span>
            )}
          </form>
        </div>

      </div>
    </div>
  );
}