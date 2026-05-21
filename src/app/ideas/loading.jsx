import { BarLoader } from "react-spinners";

export default function IdeasLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col gap-3 items-center justify-center font-mono text-xs uppercase tracking-widest text-[var(--card-text-muted)] animate-pulse">
        <BarLoader color="#249E94" />
        // Loading Ideas...
      </div>
    </div>
  );
}
