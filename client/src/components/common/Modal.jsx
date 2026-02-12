import React from "react";
import { X } from "lucide-react";

export default function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden zoom-in duration-200">
        {/* Header Modal */}
        <div className="bg-slate-800 p-4 flex justify-between items-center">
          <h2 className="text-white font-semibold flex items-center gap-2">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Isi Modal (Children) */}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
