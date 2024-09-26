import LoginForm from "@/components/auth/login-form";
import { LogIn } from "lucide-react";

export default function LoginDisplay() {
  return (
    <div>
      <div className="w-full min-h-screen flex flex-col lg:grid lg:grid-cols-2">
        <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="hidden lg:block w-full max-w-[350px] space-y-8">
            <div className="flex text-center items-center justify-center gap-2">
              <LogIn />
              <h1 className="text-3xl font-bold">Login</h1>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
