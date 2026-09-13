'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { saveOrderToGoogleSheets } from '../googlesheetsService';

export default function SoftwareService() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
const orderData = {
  serviceType: 'Software',
  name: formData.get('name') as string,
  phone: formData.get('phone') as string,
  details: formData.get('details') as string,
  date: new Date().toISOString(),
};

    try {
      await saveOrderToGoogleSheets(orderData);
      setSubmitted(true);
    } catch (err) {
      alert('حدث خطأ أثناء إرسال الطلب، يرجى المحاولة لاحقاً');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6 flex flex-col items-center">
      <div className="w-full max-w-md bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
        <Link href="/" className="text-yellow-400 hover:underline mb-4 inline-block">
          ← العودة للرئيسية
        </Link>
        <h1 className="text-2xl font-bold text-center mb-6">خدمة الاشتراكات والبرامج</h1>

        {submitted ? (
          <div className="text-center py-8">
            <p className="text-green-400 text-lg mb-4">تم إرسال طلبك بنجاح!</p>
            <button 
              onClick={() => setSubmitted(false)}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg font-bold"
            >
              طلب جديد
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">الاسم الكامل</label>
              <input required name="name" type="text" className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:outline-none focus:border-yellow-400" />
            </div>
            <div>
              <label className="block text-sm mb-1">رقم الهاتف / الواتساب</label>
              <input required name="phone" type="tel" className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:outline-none focus:border-yellow-400" />
            </div>
            <div>
              <label className="block text-sm mb-1">اسم البرنامج أو الاشتراك المطلوب</label>
              <textarea required name="details" rows={3} className="w-full p-2 bg-slate-700 rounded border border-slate-600 focus:outline-none focus:border-yellow-400" placeholder="مثال: Canva Pro, Office 365..."></textarea>
            </div>
            <button 
              disabled={loading}
              type="submit" 
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-lg transition-all"
            >
              {loading ? 'جاري الإرسال...' : 'تأكيد الطلب'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}