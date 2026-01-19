import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, Loader2, Bot } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const AIHelper: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<
    { role: "user" | "ai"; text: string }[]
  >([
    {
      role: "ai",
      text: "Assalomu aleykum! Men Startup Ambassadors AI mentoriman. Loyihangiz bo'yicha qanday savollar bor?",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;

    const userMsg = message;
    setMessage("");
    setChatHistory((prev) => [...prev, { role: "user", text: userMsg }]);
    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(process.env.API_KEY as string);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        systemInstruction: `Siz "Startup Ambassadors Tashkent" klubining AI mentorisiz. 
          Sizning vazifangiz yoshlarga startup nima ekanligini tushuntirish, ularning g'oyalarini validatsiya qilishda yordam berish va klub haqida ma'lumot berish.
          Klubimiz Yoshlar ishlari agentligi va Yoshlar Ventures bilan hamkorlikda ishlaydi. 
          O'zbek tilida, do'stona, g'ayratli va professional tilda javob bering.`,
      });

      const result = await model.generateContent(userMsg);
      const response = await result.response;
      const aiResponse = response.text();

      setChatHistory((prev) => [...prev, { role: "ai", text: aiResponse }]);
    } catch (error: any) {
      console.error("AI Error:", error);
      let errorMsg = "Kechirasiz, xatolik yuz berdi.";
      if (!process.env.API_KEY) {
        errorMsg =
          "Tizimda API kaliti sozlanmagan. Iltimos, API_KEY o'zgaruvchisini tekshiring.";
      }
      setChatHistory((prev) => [...prev, { role: "ai", text: errorMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="logo-gradient text-white w-16 h-16 sm:w-18 sm:h-18 rounded-3xl shadow-2xl flex items-center justify-center hover:brightness-110 transition-all transform hover:scale-110 group relative p-4 btn-3d"
        >
          <div className="absolute -top-1 -right-1 bg-white w-5 h-5 rounded-full flex items-center justify-center border-2 border-orange-500">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
          </div>
          <Sparkles className="w-8 h-8" />
        </button>
      )}

      {isOpen && (
        <div className="bg-white w-[320px] sm:w-[420px] h-[550px] sm:h-[600px] rounded-[2.5rem] shadow-2xl flex flex-col border border-orange-100 overflow-hidden animate-in fade-in zoom-in duration-300">
          <div className="logo-gradient p-6 sm:p-8 flex items-center justify-between text-white">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-2 sm:p-3 rounded-2xl">
                <Bot size={24} />
              </div>
              <div>
                <div className="font-black text-base sm:text-lg tracking-tight uppercase">
                  AI MENTOR
                </div>
                <div className="text-[10px] opacity-90 font-bold uppercase tracking-widest flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  Online
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-2 rounded-xl transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-[#fffcf9]">
            {chatHistory.map((chat, i) => (
              <div
                key={i}
                className={`flex ${chat.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] p-4 sm:p-5 rounded-3xl text-xs sm:text-sm font-medium leading-relaxed shadow-sm ${
                    chat.role === "user"
                      ? "bg-orange-600 text-white rounded-tr-none shadow-orange-100"
                      : "bg-white text-gray-800 rounded-tl-none border border-orange-100"
                  }`}
                >
                  {chat.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-3xl rounded-tl-none border border-orange-100">
                  <Loader2 className="w-6 h-6 text-orange-600 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 sm:p-6 border-t border-orange-50 bg-white">
            <div className="flex items-center space-x-3 bg-orange-50/50 p-2 rounded-2xl border-2 border-transparent focus-within:border-orange-500 transition-all">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Savol bering..."
                className="flex-1 bg-transparent border-none outline-none text-xs sm:text-sm px-2 sm:px-4 text-gray-800 font-bold"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="logo-gradient text-white p-3 rounded-xl hover:brightness-110 disabled:opacity-50 transition-colors shadow-lg shadow-orange-100"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIHelper;
