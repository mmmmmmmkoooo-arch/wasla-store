'use client';

import React, { useState, useRef } from 'react';

// واجهة بيانات المحتوى والميديا
interface MediaContent {
  id: string;
  title: string;
  category: string;
  type: 'video' | 'image' | 'link';
  fileUrl: string;
  description: string;
  date: string;
}

// واجهة بيانات المنتجات والخدمات
interface ProductItem {
  id: string;
  name: string;
  section: string;
  price: string;
  status: 'متوفر' | 'غير متوفر';
}

export default function ComprehensiveAdminDashboard() {
  const [activeTab, setActiveTab] = useState<'media' | 'products' | 'orders' | 'settings'>('media');

  // --- 1. حالة إدارة الوسائط والفيديوهات المرفوعة ---
  const [mediaList, setMediaList] = useState<MediaContent[]>([
    {
      id: '1',
      title: 'فيديو توضيحي لكيفية الشحن',
      category: 'ألعاب',
      type: 'video',
      fileUrl: '',
      description: 'فيديو تشغيلي للعملاء يشرح طريقة الشحن',
      date: new Date().toLocaleDateString('ar-EG'),
    },
  ]);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('شروحات');
  const [mediaType, setMediaType] = useState<'video' | 'image' | 'link'>('video');
  const [linkUrl, setLinkUrl] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- 2. حالة إدارة المنتجات والخدمات ---
  const [products, setProducts] = useState<ProductItem[]>([
    { id: '1', name: 'ببجي موبايل (660 شدة)', section: 'شحن ألعاب', price: '415 ج.م', status: 'متوفر' },
    { id: '2', name: 'اشتراك شاهد VIP شهري', section: 'اشتراكات وخدمات', price: '80 ج.م', status: 'متوفر' },
    { id: '3', name: 'تصميم لوجو احترافي', section: 'تصميم ومونتاج', price: '350 ج.م', status: 'متوفر' },
  ]);

  const [prodName, setProdName] = useState('');
  const [prodSection, setProdSection] = useState('شحن ألعاب');
  const [prodPrice, setProdPrice] = useState('');

  // التعامل مع اختيار الملف من الكمبيوتر
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // إضافة فيديو أو ملف أو رابط جديد
  const handleAddMedia = (e: React.FormEvent) => {
    e.preventDefault();

    let finalUrl = '';

    if (mediaType === 'link') {
      if (!linkUrl) {
        alert('برجاء إدخال الرابط المطلوب');
        return;
      }
      finalUrl = linkUrl;
    } else {
      if (!selectedFile) {
        alert('برجاء اختيار ملف فيديو أو صورة من جهازك أولاً');
        return;
      }
      // إنشاء رابط مؤقت/محلي للملف المرفوع لتشغيله في الموقع فوراً
      finalUrl = URL.createObjectURL(selectedFile);
    }

    const newItem: MediaContent = {
      id: Date.now().toString(),
      title: title || (selectedFile ? selectedFile.name : 'محتوى جديد'),
      category,
      type: mediaType,
      fileUrl: finalUrl,
      description,
      date: new Date().toLocaleDateString('ar-EG'),
    };

    setMediaList([newItem, ...mediaList]);

    // إعادة ضبط النموذج
    setTitle('');
    setDescription('');
    setLinkUrl('');
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';

    alert('تم رفع المحتوى وتحديثه بنجاح!');
  };

  const handleDeleteMedia = (id: string) => {
    if (confirm('هل أنت تأكد من حذف هذا العنصر؟')) {
      setMediaList(mediaList.filter((item) => item.id !== id));
    }
  };

  // إضافة منتج جديد
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName || !prodPrice) {
      alert('يرجى إدخال اسم الخدمة/المنتج والسعر');
      return;
    }

    const newProd: ProductItem = {
      id: Date.now().toString(),
      name: prodName,
      section: prodSection,
      price: prodPrice,
      status: 'متوفر',
    };

    setProducts([newProd, ...products]);
    setProdName('');
    setProdPrice('');
    alert('تمت إضافة الخدمة بنجاح!');
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const toggleProductStatus = (id: string) => {
    setProducts(
      products.map((p) =>
        p.id === id ? { ...p, status: p.status === 'متوفر' ? 'غير متوفر' : 'متوفر' } : p
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#0a192f] text-white p-4 sm:p-6 rtl" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* الهيدر الرئيسي للوحة التحكم */}
        <header className="flex flex-col md:flex-row justify-between items-center border-b border-cyan-500/30 pb-5 gap-4 bg-[#112240] p-5 rounded-2xl border">
          <div>
            <h1 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
              <span>⚙️</span> لوحة التحكم الشاملة (Admin Control Panel)
            </h1>
            <p className="text-slate-400 text-xs mt-1">
              تحكم كامل بالرفع المباشر للفيديوهات، إدارة المنتجات، والطلبات
            </p>
          </div>

          {/* تبويبات التنقل */}
          <div className="flex flex-wrap gap-2 bg-[#0a192f] p-1.5 rounded-xl border border-slate-700">
            <button
              onClick={() => setActiveTab('media')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                activeTab === 'media'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              🎥 رفع الفيديوهات والوسائط
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                activeTab === 'products'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              🛒 إدارة الخدمات والمنتجات
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                activeTab === 'orders'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              📊 سجل الطلبات
            </button>
          </div>
        </header>

        {/* ================= 1. تبويب رفع الفيديوهات والوسائط المباشرة ================= */}
        {activeTab === 'media' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* كارت رفع ملف جديد من الكمبيوتر */}
            <div className="bg-[#112240] p-6 rounded-2xl border border-cyan-500/30 space-y-4 shadow-xl h-fit">
              <h2 className="text-base font-bold text-cyan-300 border-b border-slate-700 pb-2 flex items-center gap-2">
                <span>📤</span> رفع فيديو أو محتوى جديد
              </h2>

              <form onSubmit={handleAddMedia} className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">نوع المحتوى:</label>
                  <select
                    value={mediaType}
                    onChange={(e) => setMediaType(e.target.value as 'video' | 'image' | 'link')}
                    className="w-full bg-[#0a192f] border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="video">🎥 رفع ملف فيديو مباشر (MP4/MOV)</option>
                    <option value="image">🖼️ رفع صورة من الجهاز</option>
                    <option value="link">🔗 رابط خارجي / يوتيوب</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">عنوان الفيديو / المحتوى:</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="مثال: شرح الشحن أو فيديو ترويجي"
                    className="w-full bg-[#0a192f] border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">التصنيف / القسم:</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="مثال: ألعاب / عروض / إعلانات"
                    className="w-full bg-[#0a192f] border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                {/* خيار رفع ملف مباشر من الكمبيوتر */}
                {mediaType !== 'link' ? (
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">اختر الملف من جهازك:</label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept={mediaType === 'video' ? 'video/*' : 'image/*'}
                      onChange={handleFileChange}
                      className="w-full bg-[#0a192f] border border-slate-700 rounded-lg p-2 text-xs text-slate-300 file:ml-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-cyan-500 file:text-slate-950 file:font-bold hover:file:bg-cyan-400"
                    />
                    {selectedFile && (
                      <p className="text-[11px] text-emerald-400 mt-1">
                        تم اختيار: {selectedFile.name} ({Math.round(selectedFile.size / 1024 / 1024)} MB)
                      </p>
                    )}
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs text-slate-300 mb-1">رابط الفيديو أو الموقع:</label>
                    <input
                      type="url"
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full bg-[#0a192f] border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs text-slate-300 mb-1">وصف المقطع / التفاصيل:</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="ملاحظات أو وصف يظهر تحت الفيديو..."
                    className="w-full bg-[#0a192f] border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold p-3 rounded-xl transition text-xs shadow-md shadow-emerald-500/20"
                >
                  رفع ونشر فوراً 🚀
                </button>
              </form>
            </div>

            {/* عرض الفيديوهات والوسائط المرفوعة */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-base font-bold text-cyan-300 flex items-center justify-between">
                <span>🎬 المكتبة والوسائط المرفوعة ({mediaList.length})</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mediaList.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#112240] p-4 rounded-2xl border border-slate-700/80 space-y-3 flex flex-col justify-between shadow-md"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] bg-cyan-950 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded font-bold">
                          {item.category}
                        </span>
                        <span className="text-[10px] text-slate-400">{item.date}</span>
                      </div>

                      <h3 className="font-bold text-sm text-white">{item.title}</h3>

                      {/* مشغل الفيديو المباشر في حال رفع فيديو */}
                      {item.type === 'video' && item.fileUrl && (
                        <div className="rounded-xl overflow-hidden bg-black border border-slate-800">
                          <video src={item.fileUrl} controls className="w-full max-h-48 object-cover" />
                        </div>
                      )}

                      {/* عرض الصورة في حال رفع صورة */}
                      {item.type === 'image' && item.fileUrl && (
                        <div className="rounded-xl overflow-hidden bg-black border border-slate-800">
                          <img src={item.fileUrl} alt={item.title} className="w-full max-h-48 object-cover" />
                        </div>
                      )}

                      {/* عرض الرابط الخارجي */}
                      {item.type === 'link' && (
                        <a
                          href={item.fileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-cyan-400 underline break-all block"
                        >
                          {item.fileUrl}
                        </a>
                      )}

                      {item.description && (
                        <p className="text-xs text-slate-400">{item.description}</p>
                      )}
                    </div>

                    <div className="border-t border-slate-800 pt-3 flex justify-end">
                      <button
                        onClick={() => handleDeleteMedia(item.id)}
                        className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                      >
                        حذف العنصر 🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ================= 2. تبويب إدارة المنتجات والخدمات ================= */}
        {activeTab === 'products' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* إضافة منتج جديد */}
            <div className="bg-[#112240] p-6 rounded-2xl border border-cyan-500/30 space-y-4 shadow-xl h-fit">
              <h2 className="text-base font-bold text-cyan-300 border-b border-slate-700 pb-2">
                ➕ إضافة خدمة / منتج جديد
              </h2>

              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-300 mb-1">اسم الخدمة أو المنتج:</label>
                  <input
                    type="text"
                    required
                    value={prodName}
                    onChange={(e) => setProdName(e.target.value)}
                    placeholder="مثال: شحن 325 شدة"
                    className="w-full bg-[#0a192f] border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">القسم الرئيسي:</label>
                  <select
                    value={prodSection}
                    onChange={(e) => setProdSection(e.target.value)}
                    className="w-full bg-[#0a192f] border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="شحن ألعاب">شحن ألعاب</option>
                    <option value="اشتراكات وخدمات">اشتراكات وخدمات رقمية</option>
                    <option value="تصميم ومونتاج">تصميم ومونتاج</option>
                    <option value="برمجة ومواقع">برمجة ومواقع</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-300 mb-1">السعر (ج.م):</label>
                  <input
                    type="text"
                    required
                    value={prodPrice}
                    onChange={(e) => setProdPrice(e.target.value)}
                    placeholder="مثال: 210 ج.م"
                    className="w-full bg-[#0a192f] border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold p-3 rounded-xl transition text-xs shadow-md shadow-emerald-500/20"
                >
                  إضافة للمتجر 🛒
                </button>
              </form>
            </div>

            {/* قائمة المنتجات الحالية وتعديل حالتها */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-base font-bold text-cyan-300">📦 قائمة الخدمات والمنتجات ({products.length})</h2>

              <div className="bg-[#112240] rounded-2xl border border-slate-700/80 overflow-hidden">
                <table className="w-full text-right text-xs">
                  <thead className="bg-[#0a192f] text-slate-300 border-b border-slate-700">
                    <tr>
                      <th className="p-3">الخدمة</th>
                      <th className="p-3">القسم</th>
                      <th className="p-3">السعر</th>
                      <th className="p-3">الحالة</th>
                      <th className="p-3 text-center">التحكم</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-200">
                    {products.map((prod) => (
                      <tr key={prod.id} className="hover:bg-slate-800/40 transition">
                        <td className="p-3 font-semibold">{prod.name}</td>
                        <td className="p-3 text-cyan-400">{prod.section}</td>
                        <td className="p-3 font-bold">{prod.price}</td>
                        <td className="p-3">
                          <button
                            onClick={() => toggleProductStatus(prod.id)}
                            className={`px-2 py-1 rounded text-[10px] font-bold ${
                              prod.status === 'متوفر'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                            }`}
                          >
                            {prod.status}
                          </button>
                        </td>
                        <td className="p-3 text-center space-x-2 space-x-reverse">
                          <button
                            onClick={() => handleDeleteProduct(prod.id)}
                            className="bg-red-500/20 hover:bg-red-500/40 text-red-400 p-1.5 rounded transition"
                          >
                            حذف
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ================= 3. تبويب سجل الطلبات عبر Google Sheets ================= */}
        {activeTab === 'orders' && (
          <div className="bg-[#112240] p-6 rounded-2xl border border-cyan-500/30 space-y-4">
            <h2 className="text-base font-bold text-cyan-300">📊 متابعة وربط جدول الطلبات</h2>
            <p className="text-xs text-slate-400">
              جميع الطلبات المقدمة من العملاء عبر الموقع تسجل تلقائياً في حساب Google Sheets الخاص بك.
            </p>
            <div className="p-6 bg-[#0a192f] border border-slate-700 rounded-xl text-center space-y-4">
              <p className="text-sm text-slate-300">يمكنك الدخول مباشرة إلى جداول البيانات لمتابعة طلبات العملاء فور ورودها:</p>
              <a
                href="https://docs.google.com/spreadsheets"
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs transition shadow-lg shadow-emerald-500/20"
              >
                فتح Google Sheets لمتابعة الطلبات ↗
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}