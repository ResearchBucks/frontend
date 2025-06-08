import { LoginForm } from "@/components/login-form";
import { useState } from "react";
import ResetRequest from "../passwordReset/resetRequest/page";

export default function LoginPage({ onSwitch, onCloseModal }: { onSwitch: () => void; onCloseModal: () => void }) {
  const [showResetRequest, setShowResetRequest] = useState(false);

  const handleForgotPassword = () => {
    setShowResetRequest(true);
  };

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full max-w-xs">
        {!showResetRequest ? (
          <LoginForm onSwitch={onSwitch} onForgotPassword={handleForgotPassword} />
        ) : (
          <ResetRequest onClose={() => setShowResetRequest(false)} />
        )}
      </div>
    </div>
  );
}

