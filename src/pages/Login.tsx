import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useLocation } from "wouter";

export function Login() {
  const [name, setName] = useState("");
  const { login } = useAuth();
  const [_, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    // تسجيل الدخول بالاسم المدخل
    login(name);
    
    // التوجيه مباشرة لصفحة الملف الشخصي
    setLocation("/profile");
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 dir-rtl">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">تسجيل الدخول</h2>
          <p className="mt-2 text-sm text-gray-600">سجل الدخول للوصول لملفك الطبي</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 text-right mb-1">
              الاسم الكامل
            </label>
            <input
              id="name"
              type="text"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm text-right"
              placeholder="أدخل اسمك هنا (مثلاً: أحمد الزهراني)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              دخول
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
