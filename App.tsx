import React, { useState } from 'react';
import { UserData, AppState } from './types';
import InputForm from './components/InputForm';
import ResultCard from './components/ResultCard';
import { generateGraduationMessage } from './services/geminiService';
import { Sparkles, GraduationCap } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.INPUT);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [generatedMessage, setGeneratedMessage] = useState<string>('');
  const [daysRemaining, setDaysRemaining] = useState<number>(0);
  const [error, setError] = useState<string>('');

  const calculateDaysRemaining = (gradDateStr: string): number => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const gradDate = new Date(gradDateStr);
    gradDate.setHours(0, 0, 0, 0);

    const diffTime = gradDate.getTime() - today.getTime();
    // Round up to ensure if it's 0.1 days left, it shows 1 day, unless it's past/today.
    // If diffTime is 0, it's today.
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleFormSubmit = async (data: UserData) => {
    setUserData(data);
    setAppState(AppState.LOADING);
    
    // Calculate days logic
    let days = calculateDaysRemaining(data.graduationDate);
    // If the date is in the past, treat it as 0 (Graduation Day/Past Graduation) for the prompt's sake,
    // or we could add a logic for "Post Graduation". The prompt asks for "Days = 0" for graduation day.
    if (days < 0) days = 0; 
    setDaysRemaining(days);

    try {
      const message = await generateGraduationMessage(data.name, data.major, days);
      setGeneratedMessage(message);
      setAppState(AppState.RESULT);
    } catch (err) {
      setError('نأسف، حدث خطأ أثناء الاتصال بالمساعد الذكي. يرجى التحقق من اتصالك والمحاولة مرة أخرى.');
      setAppState(AppState.ERROR);
    }
  };

  const handleReset = () => {
    setUserData(null);
    setGeneratedMessage('');
    setDaysRemaining(0);
    setError('');
    setAppState(AppState.INPUT);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
         <div className="absolute top-10 left-10 text-blue-100 opacity-50 transform rotate-12"><GraduationCap size={120} /></div>
         <div className="absolute bottom-20 right-10 text-indigo-100 opacity-50 transform -rotate-12"><Sparkles size={100} /></div>
      </div>

      <div className="z-10 w-full max-w-4xl flex flex-col items-center">
        
        {/* Render Logic based on State */}
        {appState === AppState.INPUT && (
          <div className="animate-fade-in w-full flex justify-center">
             <InputForm onSubmit={handleFormSubmit} />
          </div>
        )}

        {appState === AppState.LOADING && (
          <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl shadow-lg animate-pulse border border-slate-100">
            <div className="relative w-24 h-24 mb-6">
              <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
              <Sparkles className="absolute inset-0 m-auto text-yellow-500 animate-bounce" size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">جاري صياغة رسالتك الملهمة...</h3>
            <p className="text-slate-500 mt-2">نستخدم الذكاء الاصطناعي لإعداد كلمات تليق بك</p>
          </div>
        )}

        {appState === AppState.RESULT && userData && (
           <ResultCard 
             userData={userData}
             message={generatedMessage}
             daysRemaining={daysRemaining}
             onReset={handleReset}
           />
        )}

        {appState === AppState.ERROR && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md text-center">
            <p className="text-red-600 font-medium mb-4">{error}</p>
            <button 
              onClick={handleReset}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              المحاولة مرة أخرى
            </button>
          </div>
        )}

      </div>
      
      {/* Footer */}
      <footer className="mt-12 text-slate-400 text-sm font-medium z-10">
        كانت معكم سارون 🎓
      </footer>
    </div>
  );
};

export default App;
