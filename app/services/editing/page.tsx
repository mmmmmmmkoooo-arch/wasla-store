'use client';

import React, { useEffect, useState } from 'react';

export default function EditingServicePage() {
  const [videos, setVideos] = useState<string[]>([]);

  useEffect(() => {
    const savedVideos = JSON.parse(localStorage.getItem('wasla_montage_videos') || '[]');
    setVideos(savedVideos);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8 rtl dir-rtl">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-emerald-400 border-b border-gray-800 pb-4">
          معرض أعمال المونتاج
        </h1>

        {videos.length === 0 ? (
          <p className="text-gray-400">لا توجد فيديوهات معروضة حالياً.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((videoUrl, index) => (
              <div key={index} className="bg-gray-900 p-4 rounded-xl border border-gray-800 shadow-lg">
                <video src={videoUrl} controls className="w-full h-56 object-cover rounded-lg" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}