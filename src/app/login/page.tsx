import { LoginForm } from "@/components/login-form";

export default function LoginPage({ onSwitch, onCloseModal }: { onSwitch: () => void ; onCloseModal: () =>void}) {
  return (
    <div className="flex flex-1  items-center justify-center">
      <div className="w-full max-w-xs">
        <LoginForm onSwitch={onSwitch} onCloseModal={onCloseModal} />
      </div>
    </div>
  );
}
