"use client"
import { LoginForm } from "@/components/login-form";
import { useState } from "react";
import ResetRequest from "../passwordReset/resetRequest/page";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export default function LoginPage({ onSwitch, onCloseModal }: { onSwitch: () => void; onCloseModal: () => void }) {
  const [showResetModal, setShowResetModal] = useState(false);

  return (
    <>
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-xs">
          <LoginForm
            onSwitch={onSwitch}
            onForgotPassword={() => setShowResetModal(true)}
          />
        </div>
      </div>

{showResetModal && <ResetRequest onClose={() => setShowResetModal(false)} />}

    </>
  );
}

