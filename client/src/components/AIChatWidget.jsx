import React, { useState } from "react";
import { MessageSquare, Send, X, Loader2 } from "lucide-react";
import Message from "./common/Message";
import useAI from "../hooks/useAI";

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");

  const { chatHistory, isLoading, askAI } = useAI();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    await askAI(question.trim());
    setQuestion("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Tombol Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#13A085] hover:bg-[#26B99A] text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-90"
        aria-label={isOpen ? "Tutup Chat" : "Buka Chat"}
      >
        {isOpen ? <X size={20} /> : <MessageSquare size={20} />}
      </button>

      {/* Kotak Chat */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-70 h-[350px] bg-white rounded-lg shadow-2xl flex flex-col border border-gray-300 overflow-hidden">
          {/* Header Chat */}
          <div className="bg-[#13A085] p-3 text-white flex items-center justify-between shadow-md">
            <h3 className="font-semibold text-lg">Cyber Ryu AI 🚀</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-[#26B99A]"
              aria-label="Tutup"
            >
              <X size={20} />
            </button>
          </div>

          {/* Isi Chat */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-gray-50">
            {chatHistory.map((msg, index) => (
              <Message key={index} role={msg.role} text={msg.text} />
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] px-4 py-2 rounded-xl text-sm bg-gray-200 text-gray-600 rounded-tl-none shadow-md flex items-center">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  AI sedang mengetik...
                </div>
              </div>
            )}
          </div>

          {/* Form Input */}
          <form onSubmit={handleSubmit} className="p-3 border-t">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Tanya tentang UKM Cyber..."
                disabled={isLoading}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#13A085] focus:border-[#13A085] outline-none disabled:bg-gray-100"
              />
              <button
                type="submit"
                disabled={isLoading || !question.trim()}
                className="bg-[#13A085] text-white p-2 rounded-lg hover:bg-[#26B99A] disabled:bg-gray-400 transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AIChatWidget;
