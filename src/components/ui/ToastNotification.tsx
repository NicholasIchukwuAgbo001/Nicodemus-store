import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastNotification: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <aside aria-label="Notifications" className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-md w-full pointer-events-none px-4">
      {toasts.map(toast => (
        <div
          key={toast.id}
          id={`toast-${toast.id}`}
          className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl shadow-2xl backdrop-blur-md border text-sm transition-all duration-300 transform translate-y-0 ${
            toast.type === 'success'
              ? 'bg-[#121212]/95 border-[#2A2A2A] text-white'
              : toast.type === 'error'
              ? 'bg-rose-950/95 border-rose-800 text-rose-100'
              : toast.type === 'warning'
              ? 'bg-amber-950/95 border-amber-800 text-amber-100'
              : 'bg-[#1E1E1E]/95 border-[#333333] text-zinc-100'
          }`}
        >
          <div className="flex items-center gap-3">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
            {toast.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-blue-400 shrink-0" />}
            <span className="font-medium tracking-wide">{toast.message}</span>
          </div>
          <button
            id={`btn-close-toast-${toast.id}`}
            onClick={() => removeToast(toast.id)}
            className="p-1 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </aside>
  );
};
