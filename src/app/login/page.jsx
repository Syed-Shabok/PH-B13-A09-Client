import { Suspense } from "react";
import LoginClient from "./LoginClient";
import { BarLoader } from "react-spinners";

export const metadata = {
  title: "Login | IdeaVault",
};

const LoginPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col gap-3 items-center justify-center font-mono text-xs uppercase tracking-widest text-[var(--card-text-muted)] animate-pulse">
            <BarLoader color="#249E94" />
            // Loading...
          </div>
        </div>
      }
    >
      <LoginClient />
    </Suspense>
  );
};

export default LoginPage;
