import React, { useState } from 'react';
import { UserData } from '../types';
import { GraduationCap, BookOpen, Calendar, ArrowLeft } from 'lucide-react';

interface InputFormProps {
  onSubmit: (data: UserData) => void;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [major, setMajor] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && major && date) {
      onSubmit({ name, major, graduationDate: date });
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white text-center">
        <div className="mx-auto bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
          <GraduationCap size={32} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold mb-2">رحلة التخرج</h1>
        <p className="text-blue-100 text-sm">أدخل بياناتك لتبدأ رحلة التحفيز</p>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">الاسم</label>
          <div className="relative">
            <input
              type="text"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 pr-10 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="مثال: سارة أحمد"
            />
            <div className="absolute left-3 top-3.5 text-slate-400">
              {/* Optional Icon placeholder on left for RTL input feeling */}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="major" className="block text-sm font-medium text-slate-700">التخصص / الحلم</label>
          <div className="relative">
            <div className="absolute right-3 top-3.5 text-slate-400 pointer-events-none">
              <BookOpen size={18} />
            </div>
            <input
              type="text"
              id="major"
              required
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              className="w-full px-4 py-3 pr-10 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="مثال: هندسة برمجيات"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="date" className="block text-sm font-medium text-slate-700">تاريخ التخرج المتوقع</label>
          <div className="relative">
             <div className="absolute right-3 top-3.5 text-slate-400 pointer-events-none">
              <Calendar size={18} />
            </div>
            <input
              type="date"
              id="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 pr-10 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-right"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30"
        >
          <span>ابدأ الرحلة</span>
          <ArrowLeft size={20} />
        </button>
      </form>
    </div>
  );
};

export default InputForm;
