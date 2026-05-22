"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  Separator,
  TextField,
} from "@heroui/react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const LoginClient = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    if (data) {
      toast.success("Logged in successfully");
      router.push(callbackUrl);
    }

    if (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleSignin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: callbackUrl,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-[85vh] px-4 bg-[var(--card-bg)] text-[var(--card-text)]">
      <Card className="w-full max-w-md p-8 border border-[var(--card-border)] bg-[var(--card-bg-subtle)] rounded-none shadow-none group hover:border-[#249E94]/40 transition-all duration-300">
        {/* SECTION HEADER */}
        <div className="flex flex-col mb-8">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#249E94] font-bold block mb-1">
            // Access Gateway
          </span>
          <h2 className="text-2xl font-black uppercase tracking-tight">
            User Login
          </h2>
        </div>

        <Form onSubmit={onSubmit} className="flex w-full flex-col gap-6">
          {/* Email Field */}
          <TextField
            isRequired
            name="email"
            type="email"
            className="w-full flex flex-col gap-1"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="text-xs font-mono font-bold uppercase text-[var(--card-text-muted)] flex items-center justify-between">
              <span>Email Address</span>
              <span className="text-[10px] opacity-40">NET_ADDR</span>
            </Label>
            <Input
              placeholder="john@example.com"
              className="rounded-none border-[var(--card-border)] hover:border-[#249E94]/60 focus:border-[#249E94] transition-colors"
            />
            <FieldError className="text-xs text-red-500 font-mono mt-0.5" />
          </TextField>

          {/* Password Field */}
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            className="w-full flex flex-col gap-1"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }
              return null;
            }}
          >
            <Label className="text-xs font-mono font-bold uppercase text-[var(--card-text-muted)] flex items-center justify-between">
              <span>Secure Password</span>
              <span className="text-[10px] opacity-40">CRYPT_KEY</span>
            </Label>
            <Input
              placeholder="Enter your password"
              className="rounded-none border-[var(--card-border)] hover:border-[#249E94]/60 focus:border-[#249E94] transition-colors"
            />
            <Description className="text-[10px] font-mono text-[var(--card-text-muted)] opacity-80 mt-1 leading-normal">
              // Requires: 8+ chars, 1 uppercase, 1 digit
            </Description>
            <FieldError className="text-xs text-red-500 font-mono mt-0.5" />
          </TextField>

          {/* Submit Action Button */}
          <div className="flex gap-2 w-full">
            <Button
              type="submit"
              className="h-11 bg-[#249E94] text-white font-bold font-mono text-xs rounded-none hover:bg-[#0C7779] transition mt-2 w-full uppercase tracking-wider"
            >
              Login
            </Button>
          </div>
        </Form>

        {/* BRUTALIST SEPARATOR TRACK */}
        <div className="flex justify-center items-center gap-3 my-6 w-full">
          <Separator className="flex-1 bg-[var(--card-border)]/40" />
          <div className="whitespace-nowrap font-mono text-[9px] font-bold text-[var(--card-text-muted)] uppercase tracking-widest">
            Alt Auth Pathway
          </div>
          <Separator className="flex-1 bg-[var(--card-border)]/40" />
        </div>

        {/* Social Authentication Row */}
        <div>
          <Button
            onClick={handleGoogleSignin}
            variant="bordered"
            className="w-full h-11 rounded-none border-[var(--card-border)] text-[var(--card-text)] font-bold font-mono text-xs hover:bg-[#005461]/10 hover:border-[#249E94]/60 transition-colors uppercase tracking-wider"
          >
            <FcGoogle className="w-4 h-4 mr-2" /> Sign in with Google
          </Button>
        </div>

        {/* DECORATIVE CARD FOOTER STRIP */}
        <div className="mt-6 pt-4 border-t border-[var(--card-border)]/40 flex justify-end">
          <span className="w-2 h-2 bg-[var(--card-border)] group-hover:bg-[#249E94] transition-colors" />
        </div>
      </Card>
    </div>
  );
};

export default LoginClient;
