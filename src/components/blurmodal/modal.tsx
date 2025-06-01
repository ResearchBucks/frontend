// components/modal.tsx
"use client";

import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  // Close modal when pressing ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Blurred background */}
      <div 
        className="fixed inset-0 bg-black/20 bg-opacity-50 backdrop-blur-xs" 
        onClick={onClose}
      />
      
      {/* Modal content */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <div 
          className="relative bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
          onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
        >
          {children}
        </div>
      </div>
    </div>
  );
}