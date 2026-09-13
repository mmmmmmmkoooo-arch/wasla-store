'use client';

import React, { useState } from 'react';
import { saveOrderToGoogleSheets } from "../services/googlesheetsService";
interface Game {
  id: string;
  name: string;
  category: string;
}

// قائمة شاملة للألعاب والخدمات الرقمية (أكثر من 50 لعبة) بدون أسعار
const gamesList: Game[] = [
  { id: 'pubg', name: 'ببجي موبايل (PUBG Mobile)', category: 'ألعاب قتال' },
  { id: 'freefire', name: 'فري فاير (Free Fire)', category: 'ألعاب قتال' },
  { id: 'roblox', name: 'روبلوكس (Roblox)', category: 'ألعاب عالم مفتوح' },
  { id: 'cod', name: 'كول أوف ديوتي (Call of Duty)', category: 'ألعاب قتال' },
  { id: 'valorant', name: 'فالورانت (Valorant)', category: 'ألعاب PC' },
  { id: 'league', name: 'ليج أوف ليجندز (League of Legends)', category: 'ألعاب PC' },
  { id: 'fifa', name: 'فيفا / إي إيه سبورتس FC', category: 'ألعاب رياضية' },
  { id: 'eFootball', name: 'بيس / eFootball', category: 'ألعاب رياضية' },
  { id: 'clash', name: 'كلاش أوف كلانس (Clash of Clans)', category: 'ألعاب استراتيجية' },
  { id: 'clash_royale', name: 'كلاش رويال (Clash Royale)', category: 'ألعاب استراتيجية' },
  { id: 'brawl', name: 'براول ستارز (Brawl Stars)', category: 'ألعاب أكشن' },
  { id: 'genshin', name: 'جينشين إمباكت (Genshin Impact)', category: 'ألعاب آر بي جي' },
  { id: 'mobile_legends', name: 'موبايل ليجندز (Mobile Legends)', category: 'ألعاب MOBA' },
  { id: 'hayday', name: 'هاي داي (Hay Day)', category: 'ألعاب محاكاة' },
  { id: 'ludo', name: 'لودو كينج (Ludo King)', category: 'ألعاب كاجوال' },
  { id: 'yalla_ludo', name: 'يلا لودو (Yalla Ludo)', category: 'ألعاب كاجوال' },
  { id: '8ball', name: '8 بول بول (8 Ball Pool)', category: 'ألعاب رياضية' },
  { id: 'fortnite', name: 'فورتنايت (Fortnite)', category: 'ألعاب قتال' },
  { id: 'minecraft', name: 'ماين كرافت (Minecraft)', category: 'ألعاب عالم مفتوح' },
  { id: 'apex', name: 'أبيكس ليجندز (Apex Legends)', category: 'ألعاب قتال' },
  { id: 'steam', name: 'بطاقات ستيم (Steam Wallet)', category: 'بطاقات رقمية' },
  { id: 'playstation', name: 'بطاقات بلايستيشن (PlayStation)', category: 'بطاقات رقمية' },
  { id: 'xbox', name: 'بطاقات إكس بوكس (Xbox)', category: 'بطاقات رقمية' },
  { id: 'razer', name: 'بطاقات رازر جولد (Razer Gold)', category: 'بطاقات رقمية' },
  { id: 'google_play', name: 'جوجل بلاي (Google Play)', category: 'بطاقات رقمية' },
  { id: 'apple', name: 'آبل آيتونز (iTunes / Apple)', category: 'بطاقات رقمية' },
  { id: 'nintendo', name: 'نينتندو (Nintendo eShop)', category: 'بطاقات رقمية' },
  { id: 'likee', name: 'لايكي (Likee Diamonds)', category: 'تطبيقات بث' },
  { id: 'tiktok', name: 'تيك توك (TikTok Coins)', category: 'تطبيقات بث' },
  { id: 'bigo', name: 'بيجو لايف (Bigo Live)', category: 'تطبيقات بث' },
  { id: 'tango', name: 'تانجو (Tango)', category: 'تطبيقات بث' },
  { id: 'top_top', name: 'تاوب تاوب (TopTop)', category: 'تطبيقات بث' },
  { id: 'yoho', name: 'يوهو (YoHo)', category: 'تطبيقات بث' },
  { id: 'mico', name: 'ميكو لايف (Mico Live)', category: 'تطبيقات بث' },
  { id: 'sugo', name: 'سوجو (Sugo)', category: 'تطبيقات بث' },
  { id: 'soul', name: 'سول (Soul)', category: 'تطبيقات بث' },
  { id: 'chamber', name: 'تشامبر (Chamber)', category: 'تطبيقات بث' },
  { id: 'weplay', name: 'وي بلاي (WePlay)', category: 'ألعاب كاجوال' },
  { id: 'chami', name: 'تشامي (Chami)', category: 'تطبيقات بث' },
  { id: 'olamet', name: 'أولاميت (Olamet)', category: 'تطبيقات بث' },
  { id: 'chamet', name: 'تشاميت (Chamet)', category: 'تطبيقات بث' },
  { id: 'poppo', name: 'بوبو لايف (Poppo Live)', category: 'تطبيقات بث' },
  { id: 'up_live', name: 'أب لايف (UpLive)', category: 'تطبيقات بث' },
  { id: 'stream_kar', name: 'ستريم كار (StreamKar)', category: 'تطبيقات بث' },
  { id: 'star_maker', name: 'ستار ميكر (StarMaker)', category: 'تطبيقات بث' },
  { id: 'hola', name: 'هولا (Hola)', category: 'تطبيقات بث' },
  { id: 'farlight', name: 'فارلايت 84 (Farlight 84)', category: 'ألعاب قتال' },
  { id: 'arena_breakout', name: 'أرينا بريك أوت (Arena Breakout)', category: 'ألعاب قتال' },
  { id: 'undawn', name: 'أن داون (Undawn)', category: 'ألعاب بقاء' },
  { id: 'blood_strike', name: 'بلود سترايك (Blood Strike)', category: 'ألعاب قتال' },
  { id: 'stumble_guys', name: 'ستامبل جايز (Stumble Guys)', category: 'ألعاب كاجوال' },
  { id: 'identity_v', name: 'آيدينتيتي (Identity V)', category: 'ألعاب رعب' },
  { id: 'honkai', name: 'هونكاي ستار ريل (Honkai: Star Rail)', category: 'ألعاب آر بي جي' },
];

export default function GamesPage() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [packOrAmount, setPackOrAmount] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [phone, setPhone] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // تصفية الألعاب بناءً على البحث
  const filteredGames = gamesList.filter((game) =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGame || !packOrAmount || !playerId || !phone) {
      alert('يرجى اختيار اللعبة وكتابة الكمية المطلوبة وتفاصيل الحساب ورقم الهاتف');
      return;
    }

    setIsSubmitting(true);

    const orderData = {
      category: 'الألعاب والتطبيقات',
      item: selectedGame.name,
      quantityOrPack: packOrAmount,
      accountInfo: playerId,
      phone: phone,
      date: new Date().toLocaleString('ar-EG'),
    };

    await saveOrderToGoogleSheets(orderData);

    const whatsappNumber = '201025146867';
    const message = `طلب جديد من المتجر 🎮:\n- اللعبة/التطبيق: ${selectedGame.name}\n- الكمية/الباقة: ${packOrAmount}\n- ID/الحساب: ${playerId}\n- رقم الهاتف: ${phone}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    setIsSubmitting(false);
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0d1b2a] text-white p-6 rtl" dir="rtl">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* هيدر الصفحة */}
        <header className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-cyan-400">قسم شحن الألعاب والتطبيقات الرقمية</h1>
          <p className="text-slate-400 text-sm">اختر اللعبة أو التطبيق من القائمة وسجل طلب الشحن فوراً</p>
          
          {/* مربع البحث */}
          <div className="max-w-md mx-auto pt-2">
            <input
              type="text"
              placeholder="بحث عن لعبة أو تطبيق..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1b263b] border border-cyan-500/30 rounded-xl p-3 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 text-sm shadow-inner"
            />
          </div>
        </header>

        {/* شبكة الكروت (Grid) لـ +50 لعبة بدون أسعار */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-[420px] overflow-y-auto p-2 border border-slate-800 rounded-2xl bg-[#1b263b]/40">
          {filteredGames.map((game) => {
            const isSelected = selectedGame?.id === game.id;
            return (
              <button
                key={game.id}
                onClick={() => setSelectedGame(game)}
                className={`p-4 rounded-xl border text-center transition flex flex-col items-center justify-center space-y-1 h-24 ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-500/20 text-cyan-200 shadow-lg shadow-cyan-500/20 scale-105'
                    : 'border-slate-700/60 bg-[#1b263b] text-slate-200 hover:border-cyan-500/50 hover:bg-[#27374d]'
                }`}
              >
                <span className="font-bold text-sm line-clamp-2">{game.name}</span>
                <span className="text-[10px] text-cyan-400/80">{game.category}</span>
              </button>
            );
          })}
        </div>

        {/* نموذج الطلب المخصص للعبة المختارة */}
        {selectedGame ? (
          <form onSubmit={handleSubmit} className="bg-[#1b263b] p-6 rounded-2xl border border-cyan-500/40 space-y-5 max-w-2xl mx-auto shadow-2xl">
            <div className="text-center border-b border-slate-700 pb-3">
              <h2 className="text-lg font-bold text-cyan-400">
                تسجيل طلب: {selectedGame.name}
              </h2>
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">حدد الباقة أو الكمية المطلوبة:</label>
              <input
                type="text"
                required
                value={packOrAmount}
                onChange={(e) => setPackOrAmount(e.target.value)}
                placeholder="مثال: 660 شدة / 100 جوهرة / 500 كوينز"
                className="w-full bg-[#0d1b2a] border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-400 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">معرف الحساب (Player ID / الإيميل / الرابط):</label>
              <input
                type="text"
                required
                value={playerId}
                onChange={(e) => setPlayerId(e.target.value)}
                placeholder="أدخل ID الحساب أو المعرف الخاص بك"
                className="w-full bg-[#0d1b2a] border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-400 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">رقم الواتساب للتأكيد والاستلام:</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="010XXXXXXXX"
                className="w-full bg-[#0d1b2a] border border-slate-700 rounded-lg p-3 text-white focus:outline-none focus:border-cyan-400 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold p-3 rounded-xl transition text-base shadow-lg shadow-emerald-500/20 disabled:opacity-50"
            >
              {isSubmitting ? 'جاري تسجيل الطلب...' : 'تأكيد الطلب عبر الواتساب'}
            </button>
          </form>
        ) : (
          <div className="text-center p-6 border border-dashed border-slate-700 rounded-2xl max-w-2xl mx-auto">
            <p className="text-slate-400 text-sm">👆 اضغط على أي لعبة أو تطبيق من القائمة أعلاه لإظهار نموذج الطلب</p>
          </div>
        )}

      </div>
    </div>
  );
}