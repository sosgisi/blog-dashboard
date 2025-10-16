'use client'

import { toastAtom } from "@/atoms/toast-atom";
import { useAtom } from "jotai";
import { useEffect } from "react";

export default function ToastNotification() {
    
    const [toasts, setToasts] = useAtom(toastAtom);

    useEffect(() => {
        if(toasts.length === 0) return;
        const timer = setTimeout(() => {
            setToasts(toasts.slice(1));
        }, 3000);
        return () => clearTimeout(timer);
    }, [toasts, setToasts]);

    return (
        <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
            {toasts.map((toast) => (
                <div key={toast.id} className={`px-4 py-2 rounded shadow-lg text-white 
                    ${toast.type === "success"
                        ? "bg-green-500"
                        : toast.type === "error"
                        ? "bg-red-500"
                        : "bg-gray-700"
                    }`}
                >
                    {toast.message}
                </div>
            ))}
        </div>
    );
}