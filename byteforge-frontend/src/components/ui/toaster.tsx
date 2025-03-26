import React, { useState, useEffect, createContext, useContext } from "react";
import { X } from "lucide-react";

type ToastType = "default" | "success" | "error" | "warning" | "info";

interface Toast {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextProps {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, "id">) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { ...toast, id }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const Toaster: React.FC = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-0 right-0 p-4 z-50 max-w-md w-full">
      <div className="flex flex-col gap-2">
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );
};

const getBackgroundColor = (type: ToastType): string => {
  switch (type) {
    case "success":
      return "bg-green-100 border-green-500 text-green-800";
    case "error":
      return "bg-red-100 border-red-500 text-red-800";
    case "warning":
      return "bg-yellow-100 border-yellow-500 text-yellow-800";
    case "info":
      return "bg-blue-100 border-blue-500 text-blue-800";
    default:
      return "bg-white border-gray-200 text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300";
  }
};

const ToastItem: React.FC<{ toast: Toast; onClose: () => void }> = ({
  toast,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, toast.duration || 5000);

    return () => clearTimeout(timer);
  }, [toast, onClose]);

  return (
    <div
      className={`border-l-4 p-4 rounded-md shadow-md animate-slideIn ${getBackgroundColor(
        toast.type
      )}`}
      role="alert"
    >
      <div className="flex items-start justify-between">
        <div>
          {toast.title && <h3 className="font-semibold">{toast.title}</h3>}
          {toast.description && (
            <p className="text-sm mt-1">{toast.description}</p>
          )}
        </div>
        <button onClick={onClose} className="ml-4 p-1 hover:bg-black/5 rounded">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

// Add this to your global CSS
const globalCSS = `
@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slideIn {
  animation: slideIn 0.3s ease-out forwards;
}
`;

export default ToastProvider;
