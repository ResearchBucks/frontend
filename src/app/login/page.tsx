import { LoginForm } from "@/components/login-form";

export default function LoginPage({ onSwitch }: { onSwitch: () => void }) {
  return (
    <div className="flex flex-1  items-center justify-center">
      <div className="w-full max-w-xs">
        <LoginForm onSwitch={onSwitch} />
      </div>
    </div>
  );
}
