'use client';

import React, { useState, useEffect } from 'react';

interface GameItem {
  id: string;
  name: string;
  price: string;
  image: string;
}

interface CustomField {
  id: string;
  label: string;
  placeholder: string;
  required: boolean;
}

export default function AdminDashboard() {
  // 1. الواتساب والعداد
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [visitorCount, setVisitorCount] = useState(0);

  // 2. اللوجو والواجهة
  const [logoUrl, setLogoUrl] = useState('');
  const [heroTitle, setHeroTitle] = useState('');
  const [heroSubtitle, setHeroSubtitle] = useState('');
  const [announcement, setAnnouncement] = useState('');

  // 3. قسم المونتاج
  const [videoInput, setVideoInput] = useState('');
  const [montageVideos, setMontageVideos] = useState<string[]>([]);

  // 4. إدارة الألعاب (Games)
  const [games, setGames] = useState<GameItem[]>([]);
  const [newGameName, setNewGameName] = useState('');
  const [newGamePrice, setNewGamePrice] = useState('');
  const [newGameImage, setNewGameImage] = useState('');

  // 5. إدارة الخانات المخصصة (Custom Fields)
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [fieldLabel, setFieldLabel] = useState('');
  const [fieldPlaceholder, setFieldPlaceholder] = useState('');

  // التنبيهات
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    // جلب البيانات المحفوظة عند فتح اللوحة
    setWhatsappNumber(localStorage.getItem('wasla_whatsapp') || '201025146867');
    setLogoUrl(localStorage.getItem('wasla_logo') || '');
    
    // عداد الزوار
    const count = parseInt(localStorage.getItem('wasla_visitor_count') || '0', 10);
    setVisitorCount(count);

    // واجهة الموقع
    setHeroTitle(localStorage.getItem('wasla_hero_title') || 'مرحباً بك في منصة وصلها');
    setHeroSubtitle(localStorage.getItem('wasla_hero_subtitle') || 'وجهتك الأولى لشحن الألعاب والخدمات الرقمية والمونتاج');
    setAnnouncement(localStorage.getItem('wasla_announcement') || 'خصم خاص 20% على خدمات المونتاج لفترة محدودة!');

    // الفيديوهات والألعاب والحقول المخصصة
    setMontageVideos(JSON.parse(localStorage.getItem('wasla_montage_videos') || '[]'));
    setGames(JSON.parse(localStorage.getItem('wasla_games_list') || '[]'));
    setCustomFields(JSON.parse(localStorage.getItem('wasla_custom_fields') || '[]'));
  }, []);

  const showStatus = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(''), 3000);
  };

  // --- حفظ إعدادات التواصل والواجهة ---
  const handleSavePhone = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('wasla_whatsapp', whatsappNumber);
    showStatus('✓ تم تحديث رقم الواتساب المخصص للواصل والتواصل بنجاح!');
  };

  const handleSaveHomeSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('wasla_hero_title', heroTitle);
    localStorage.setItem('wasla_hero_subtitle', heroSubtitle);
    localStorage.setItem('wasla_announcement', announcement);
    showStatus('✓ تم تحديث نصوص الواجهة والشريط الإعلاني بنجاح!');
  };

  // --- إدارة اللوجو ---
  const handleLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setLogoUrl(result);
        localStorage.setItem('wasla_logo', result);
        showStatus('✓ تم رفع اللوجو وتحديثه في المكان المخصص بالهيدر والموقع!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveLogoUrl = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('wasla_logo', logoUrl);
    showStatus('✓ تم حفظ رابط اللوجو الجديد وتطبيقه بالموقع!');
  };

  // --- إدارة قسم المونتاج ---
  const handleVideoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        const updated = [...montageVideos, result];
        setMontageVideos(updated);
        localStorage.setItem('wasla_montage_videos', JSON.stringify(updated));
        showStatus('✓ تم رفع الفيديو وإضافته فوراً لقسم المونتاج!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddVideoUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoInput.trim()) return;
    const updated = [...montageVideos, videoInput.trim()];
    setMontageVideos(updated);
    localStorage.setItem('wasla_montage_videos', JSON.stringify(updated));
    setVideoInput('');
    showStatus('✓ تم إضافة رابط الفيديو للمعرض!');
  };

  const handleDeleteVideo = (index: number) => {
    const updated = montageVideos.filter((_, i) => i !== index);
    setMontageVideos(updated);
    localStorage.setItem('wasla_montage_videos', JSON.stringify(updated));
    showStatus('✓ تم حذف الفيديو!');
  };

  // --- إدارة قسم الألعاب (Games Management) ---
  const handleAddGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGameName.trim()) return;
    const newGame: GameItem = {
      id: Date.now().toString(),
      name: newGameName,
      price: newGamePrice,
      image: newGameImage || '/placeholder-game.png'
    };
    const updatedGames = [...games, newGame];
    setGames(updatedGames);
    localStorage.setItem('wasla_games_list', JSON.stringify(updatedGames));
    setNewGameName('');
    setNewGamePrice('');
    setNewGameImage('');
    showStatus('✓ تم إضافة اللعبة الجديدة بنجاح لقسم الألعاب!');
  };

  const handleDeleteGame = (id: string) => {
    const updatedGames = games.filter(g => g.id !== id);
    setGames(updatedGames);
    localStorage.setItem('wasla_games_list', JSON.stringify(updatedGames));
    showStatus('✓ تم حذف اللعبة من القائمة!');
  };

  // --- إدارة الخانات والحقول المخصصة (Custom Fields) ---
  const handleAddCustomField = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fieldLabel.trim()) return;
    const newField: CustomField = {
      id: 'field_' + Date.now(),
      label: fieldLabel,
      placeholder: fieldPlaceholder,
      required: true
    };
    const updatedFields = [...customFields, newField];
    setCustomFields(updatedFields);
    localStorage.setItem('wasla_custom_fields', JSON.stringify(updatedFields));
    setFieldLabel('');
    setFieldPlaceholder('');
    showStatus('✓ تم إضافة الخانة المخصصة بنجاح باستمارات المتجر!');
  };

  const handleDeleteCustomField = (id: string) => {
    const updatedFields = customFields.filter(f => f.id !== id);
    setCustomFields(updatedFields);
    localStorage.setItem('wasla_custom_fields', JSON.stringify(updatedFields));
    showStatus('✓ تم حذف الخانة المخصصة!');
  };

  // تصفير عداد الزوار
  const handleResetVisitors = () => {
    if (confirm('هل أنت متأكد من إعادة ضبط عداد الزوار لـ 0؟')) {
      localStorage.setItem('wasla_visitor_count', '0');
      setVisitorCount(0);
      showStatus('✓ تم تصفير عداد الزوار!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 rtl dir-rtl font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* هيدر اللوحة */}
        <div className="border-b border-gray-700 pb-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-emerald-400">لوحة تحكم متجر وصلها الشاملة</h1>
            <p className="text-xs text-gray-400 mt-1">إدارة شاملة ولحظية لجميع أقسام ومحتويات المتجر</p>
          </div>
          <span className="bg-emerald-950 text-emerald-300 text-xs px-3 py-1 rounded-full border border-emerald-800">
            أدمن
          </span>
        </div>

        {statusMessage && (
          <div className="p-4 bg-emerald-950 border border-emerald-600 text-emerald-300 rounded-lg font-medium shadow-lg transition-all">
            {statusMessage}
          </div>
        )}

        {/* 📊 عداد الزوار */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg flex justify-between items-center">
          <div>
            <p className="text-gray-400 text-sm">إجمالي عدد زوار المتجر</p>
            <h2 className="text-4xl font-extrabold text-white mt-1">
              {visitorCount} <span className="text-base font-normal text-emerald-400">زائر</span>
            </h2>
          </div>
          <button
            onClick={handleResetVisitors}
            className="text-xs text-red-400 hover:text-red-300 bg-red-950/40 border border-red-800/50 px-3 py-2 rounded-lg transition-colors"
          >
            تصفير العداد
          </button>
        </div>

        {/* 📱 1. رقم الواتساب والدعم */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 space-y-4">
          <h2 className="text-xl font-semibold text-emerald-400">1. إدارة رقم الواتساب لاستلام الطلبات والتواصل</h2>
          <form onSubmit={handleSavePhone} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">رقم الهاتف بالكود الدولي (مثال: 201025146867):</label>
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white text-right dir-ltr focus:border-emerald-500 focus:outline-none"
                placeholder="201025146867"
                required
              />
            </div>
            <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-6 rounded-lg transition-colors">
              حفظ وتطبيق رقم الواتساب
            </button>
          </form>
        </div>

        {/* 🖼️ 2. إدارة اللوجو الشعار في مكانه المخصص */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 space-y-4">
          <h2 className="text-xl font-semibold text-emerald-400">2. تغيير وتعديل لوجو المتجر (شعار الهيدر)</h2>
          
          {logoUrl && (
            <div className="flex items-center space-x-4 space-x-reverse mb-2 bg-gray-900 p-3 rounded-lg border border-gray-700">
              <span className="text-sm text-gray-400">المعاينة الحالية للهيدر:</span>
              <img src={logoUrl} alt="Logo Preview" className="h-12 w-auto max-w-[160px] object-contain p-1" />
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">رفع صورة اللوجو مباشرة من جهازك:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoFileUpload}
                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-700 file:text-white hover:file:bg-emerald-600 cursor-pointer"
              />
            </div>

            <div className="text-center text-xs text-gray-500">أو يمكنك إضافة رابط مباشر للصورة</div>

            <form onSubmit={handleSaveLogoUrl} className="flex gap-2">
              <input
                type="text"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                className="flex-1 bg-gray-900 border border-gray-700 rounded-lg p-3 text-white text-right dir-ltr focus:border-emerald-500 focus:outline-none text-sm"
                placeholder="https://example.com/logo.png"
              />
              <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 rounded-lg transition-colors text-sm">
                حفظ الرابط
              </button>
            </form>
          </div>
        </div>

        {/* 🎬 3. قسم فيديوهات المونتاج في مكانها المخصص */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 space-y-4">
          <h2 className="text-xl font-semibold text-emerald-400">3. إدارة قسم المونتاج (رفع فيديوهات المعرض)</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">رفع ملف فيديو من جهازك مباشرة إلى المعرض:</label>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoFileUpload}
                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-emerald-700 file:text-white hover:file:bg-emerald-600 cursor-pointer"
              />
            </div>

            <div className="text-center text-xs text-gray-500">أو وضع رابط فيديو مباشر</div>

            <form onSubmit={handleAddVideoUrl} className="flex gap-2">
              <input
                type="text"
                value={videoInput}
                onChange={(e) => setVideoInput(e.target.value)}
                className="flex-1 bg-gray-900 border border-gray-700 rounded-lg p-3 text-white text-right dir-ltr focus:border-emerald-500 focus:outline-none text-sm"
                placeholder="ضع رابط الفيديو هنا"
              />
              <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 rounded-lg transition-colors text-sm">
                إضافة
              </button>
            </form>
          </div>

          <div className="mt-6">
            <h3 className="text-md font-medium mb-3 text-gray-300">الفيديوهات المعروضة بقسم المونتاج ({montageVideos.length}):</h3>
            <div className="space-y-2">
              {montageVideos.map((url, idx) => (
                <div key={idx} className="bg-gray-900 p-3 rounded-lg border border-gray-700 flex justify-between items-center dir-ltr">
                  <span className="text-xs text-gray-300 truncate max-w-md">
                    {url.startsWith('data:') ? 'فيديو مرفوع من الجهاز' : url}
                  </span>
                  <button
                    onClick={() => handleDeleteVideo(idx)}
                    className="text-xs bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded transition-colors"
                  >
                    حذف
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 🎮 4. قسم إضافة وإدارة الألعاب (Games Management) */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 space-y-4">
          <h2 className="text-xl font-semibold text-emerald-400">4. إدارة قسم الألعاب والشحن (إضافة ألعاب جديدة)</h2>
          
          <form onSubmit={handleAddGame} className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              value={newGameName}
              onChange={(e) => setNewGameName(e.target.value)}
              placeholder="اسم اللعبة (مثال: ببجي / فري فاير)"
              className="bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-emerald-500 focus:outline-none text-sm"
              required
            />
            <input
              type="text"
              value={newGamePrice}
              onChange={(e) => setNewGamePrice(e.target.value)}
              placeholder="السعر / الباقة"
              className="bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-emerald-500 focus:outline-none text-sm"
            />
            <input
              type="text"
              value={newGameImage}
              onChange={(e) => setNewGameImage(e.target.value)}
              placeholder="رابط صورة اللعبة (اختياري)"
              className="bg-gray-900 border border-gray-700 rounded-lg p-3 text-white dir-ltr text-right focus:border-emerald-500 focus:outline-none text-sm"
            />
            <button
              type="submit"
              className="md:col-span-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded-lg transition-colors text-sm"
            >
              + إضافة اللعبة لمتجر الألعاب
            </button>
          </form>

          <div className="mt-4">
            <h3 className="text-md font-medium mb-3 text-gray-300">الألعاب المتاحة حالياً ({games.length}):</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {games.map((game) => (
                <div key={game.id} className="bg-gray-900 p-3 rounded-lg border border-gray-700 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-emerald-300 text-sm">{game.name}</h4>
                    {game.price && <p className="text-xs text-gray-400">{game.price}</p>}
                  </div>
                  <button
                    onClick={() => handleDeleteGame(game.id)}
                    className="text-xs bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded transition-colors"
                  >
                    حذف
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 📝 5. إضافة خانات وحقول مخصصة في الاستمارات (Custom Fields) */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 space-y-4">
          <h2 className="text-xl font-semibold text-emerald-400">5. إضافة خانات وحقول جديدة لاستمارة الطلب</h2>
          
          <form onSubmit={handleAddCustomField} className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              value={fieldLabel}
              onChange={(e) => setFieldLabel(e.target.value)}
              placeholder="عنوان الخانة (مثال: معرف اللاعب / الـ ID)"
              className="bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-emerald-500 focus:outline-none text-sm"
              required
            />
            <input
              type="text"
              value={fieldPlaceholder}
              onChange={(e) => setFieldPlaceholder(e.target.value)}
              placeholder="النص التوضيحي داخل الخانة"
              className="bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-emerald-500 focus:outline-none text-sm"
            />
            <button
              type="submit"
              className="md:col-span-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded-lg transition-colors text-sm"
            >
              + إضافة الخانة الاستمارة
            </button>
          </form>

          <div className="mt-4">
            <h3 className="text-md font-medium mb-3 text-gray-300">الخانات المخصصة المضافة حالياً ({customFields.length}):</h3>
            <div className="space-y-2">
              {customFields.map((field) => (
                <div key={field.id} className="bg-gray-900 p-3 rounded-lg border border-gray-700 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-white text-sm">{field.label}</span>
                    {field.placeholder && <span className="text-xs text-gray-400 mr-2">({field.placeholder})</span>}
                  </div>
                  <button
                    onClick={() => handleDeleteCustomField(field.id)}
                    className="text-xs bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded transition-colors"
                  >
                    حذف الخانة
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 📢 6. التحكم بنصوص الواجهة والتنبيه الإعلاني */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 space-y-4">
          <h2 className="text-xl font-semibold text-emerald-400">6. التحكم بنصوص الواجهة والشريط الإعلاني</h2>
          <form onSubmit={handleSaveHomeSettings} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">شريط الإعلانات العاجل أعلى الموقع:</label>
              <input
                type="text"
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-emerald-500 focus:outline-none"
                placeholder="نص التنبيه الإعلاني أعلى الصفحة"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">العنوان الرئيسي للواجهة:</label>
              <input
                type="text"
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-1">الوصف الفرعي:</label>
              <textarea
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                rows={2}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 px-6 rounded-lg transition-colors">
              حفظ تغييرات الواجهة
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}