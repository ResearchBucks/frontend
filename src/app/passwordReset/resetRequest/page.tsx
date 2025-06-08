"use client";
import { useState } from "react";
import { DialogTitle } from "@/components/ui/dialog";

export default function ResetRequest({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");

  const handleSendResetLink = () => {
    // Here you can call your reset email API
    console.log("Reset link sent to:", email);
    onClose(); // go back to login
  };

  return (
    <div className="flex flex-col">
      <DialogTitle>Reset Email</DialogTitle>
      <p className="text-sm text-gray-600 mb-4">
        Please enter your email to receive reset instructions.
      </p>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={handleSendResetLink}
        className="bg-main text-white px-4 py-2 rounded hover:bg-opacity-90"
      >
        Send Reset Link
      </button>
    </div>
  );
}
