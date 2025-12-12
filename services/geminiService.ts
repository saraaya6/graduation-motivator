import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateGraduationMessage = async (
  name: string,
  major: string,
  daysRemaining: number
): Promise<string> => {
  
  const modelId = 'gemini-2.5-flash';
  
  // Specific instruction based on the user's prompt requirements
  let prompt = "";
  
  if (daysRemaining <= 0) {
    // Case A: Graduation Day
    prompt = `
      الاسم: ${name}
      التخصص/الحلم: ${major}
      الأيام المتبقية: 0
      
      المهمة: اكتب رسالة تهنئة احتفالية رسمية جداً باللغة العربية.
      المتطلبات:
      1. استخدم الاسم والتخصص.
      2. أكد على وصول الطالب إلى حلمه.
      3. استخدم عبارة "ألف مبروك التخرج" بشكل بارز ومميز.
      4. استخدم عبارة "مهندس/ة المستقبل" (أو اللقب المناسب للتخصص مثل طبيب/ة المستقبل، معلم/ة المستقبل) كلقب تشريفي.
      5. اجعل النبرة مليئة بالفخر والإنجاز.
    `;
  } else {
    // Case B: Motivation Period
    prompt = `
      الاسم: ${name}
      التخصص/الحلم: ${major}
      الأيام المتبقية: ${daysRemaining}
      
      المهمة: اكتب رسالة تحفيز يومية قصيرة وموجهة باللغة العربية.
      المتطلبات:
      1. ابدأ الجملة الأولى حرفياً بـ: "تبقى لك ${daysRemaining} يومًا فقط على انطلاق مسيرتك المهنية يا ${name}!"
      2. قدم اقتباساً ملهماً أو تشجيعاً نفسياً يتعلق بـ ${major} والصبر على الدراسة.
      3. ذكّر الطالب في نهاية الرسالة بأنه سيكون "رائد/ة في مجال ${major}" أو اللقب المهني المستقبلي.
      4. اجعل النبرة حماسية، دافئة، ومشجعة.
    `;
  }

  const systemInstruction = "أنت مساعد شخصي ذكي متخصص في تحفيز الطلاب والاحتفال بتخرجهم. أنت تتحدث اللغة العربية بطلاقة وبلاغة. هدفك هو رفع المعنويات والاحتفال بالإنجازات.";

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7, // Creative yet focused
      }
    });

    return response.text || "حدث خطأ في توليد الرسالة. حاول مرة أخرى.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("فشل الاتصال بالمساعد الذكي.");
  }
};
