import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useLocation } from "wouter";
import { User, Calendar, Phone } from "lucide-react";

export function Login() {
  const { login } = useAuth();
  const [_, setLocation] = useLocation();

  // 1. حالة لتخزين البيانات الثلاثة
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: ""
  });

  // دالة لتحديث البيانات عند الكتابة
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // التأكد من أن الحقول ليست فارغة
    if (!formData.name || !formData.age) return;
    
    // تسجيل الدخول
    login(formData.name);
    
    // (اختياري) حفظ البيانات الإضافية لاستخدامها في صفحة الملف الشخصي
    localStorage.setItem("user_full_details", JSON.stringify(formData));
    
    // التوجيه للملف الشخصي
    setLocation("/profile");
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 dir-rtl">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">بيانات المريض</h2>
          <p className="mt-2 text-sm text-gray-600">أدخل بياناتك لفتح الملف الطبي</p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          
          {/* حقل الاسم */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 text-right mb-1">الاسم الكامل</label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="block w-full pr-10 pl-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-right"
                placeholder="الاسم الرباعي"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* حقل العمر */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 text-right mb-1">العمر</label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="age"
                name="age"
                type="number"
                required
                className="block w-full pr-10 pl-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-right"
                placeholder="العمر"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* حقل رقم الهاتف */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 text-right mb-1">رقم الجوال</label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="block w-full pr-10 pl-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-right"
                placeholder="05xxxxxxxx"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-md mt-6"
          >
            تسجيل ودخول
          </button>
        </form>
      </div>
    </div>
  );
}
