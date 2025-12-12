import React from 'react';
import { UserData } from '../types';
import { RefreshCw, Share2, Award, Clock, Star } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ResultCardProps {
  userData: UserData;
  message: string;
  daysRemaining: number;
  onReset: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ userData, message, daysRemaining, onReset }) => {
  const isGraduated = daysRemaining <= 0;

  return (
    <div className="w-full max-w-2xl animate-fade-in-up">
      {/* Header Section */}
      <div className={`relative overflow-hidden rounded-t-3xl p-8 text-center text-white shadow-lg ${isGraduated ? 'bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500' : 'bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700'}`}>
        
        {/* Decorative Circles */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-10 -translate-y-10 blur-xl animate-spin-slow" style={{ animationDuration: '25s' }}></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-10 translate-y-10 blur-xl animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }}></div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="bg-white/20 backdrop-blur-md p-4 rounded-full mb-4 shadow-inner animate-float">
            {isGraduated ? <Award size={48} className="text-yellow-100" /> : <Clock size={48} className="text-blue-100" />}
          </div>
          
          <div className="animate-scale-in opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            <h2 className="text-3xl font-extrabold mb-1">{userData.name}</h2>
            <p className="text-white/80 text-lg font-medium">{userData.major}</p>
          </div>
          
          <div className="mt-6 bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full border border-white/30 animate-scale-in opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            {isGraduated ? (
              <span className="font-bold text-xl inline-flex items-center gap-2">
                🎉 اليوم هو يوم الحصاد! 🎉
              </span>
            ) : (
              <span className="font-bold text-xl ltr:font-mono">
                 باقي <span className="text-yellow-300 text-2xl mx-1">{daysRemaining}</span> يوم
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white rounded-b-3xl shadow-xl p-8 border-x border-b border-slate-100">
        <div 
            className="prose prose-lg prose-indigo max-w-none text-right font-medium text-slate-700 leading-loose animate-fade-in-up opacity-0"
            style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
        >
          <ReactMarkdown>{message}</ReactMarkdown>
        </div>

        {/* Motivational / Celebratory Visual Element */}
        <div className="mt-8 flex justify-center">
            {isGraduated ? (
                 <div className="flex gap-2">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="text-yellow-400 fill-yellow-400 animate-bounce" style={{animationDelay: `${i * 150}ms`}} />
                    ))}
                 </div>
            ) : (
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden opacity-0 animate-fade-in" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
                    <div className="h-full bg-blue-500 w-3/4 animate-pulse rounded-full"></div>
                </div>
            )}
        </div>

        {/* Actions */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex gap-4 justify-center animate-fade-in opacity-0" style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}>
          <button 
            onClick={onReset}
            className="flex items-center gap-2 px-6 py-2.5 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors font-medium transform hover:scale-105 active:scale-95"
          >
            <RefreshCw size={18} />
            <span>بداية جديدة</span>
          </button>
          
          <button 
            className={`flex items-center gap-2 px-6 py-2.5 text-white rounded-full transition-all transform hover:-translate-y-1 hover:scale-105 active:scale-95 shadow-md ${isGraduated ? 'bg-orange-500 hover:bg-orange-600 shadow-orange-500/30' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/30'}`}
            onClick={() => {
                if (navigator.share) {
                    navigator.share({
                        title: 'رسالة التخرج',
                        text: message,
                    }).catch(console.error);
                } else {
                    alert('المشاركة غير مدعومة في هذا المتصفح، يمكنك نسخ النص.');
                }
            }}
          >
            <Share2 size={18} />
            <span>مشاركة الرسالة</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;