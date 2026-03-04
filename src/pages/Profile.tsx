import React from "react";
import { useAuth } from "../contexts/AuthContext";

export function Profile() {
  const { user, logout } = useAuth();

  return (
    <div className="container mx-auto px-4 py-12 text-right dir-rtl">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-[#1a365d]">ملف المريض</h1>
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-xl">أهلاً بك، <span className="font-bold text-blue-600">{user?.name}</span></p>
          <p className="text-gray-600">عضوية ذهبية</p>
        </div>
        
        {/* هنا يمكنك لاحقاً وضع كود تصميم الصفحة الكامل */}
        
        <button 
          onClick={logout}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          تسجيل الخروج
        </button>
      </div>
    </div>
  );
}
