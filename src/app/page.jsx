import { Button } from "@heroui/react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex  flex-col gap-4 items-center justify-center h-screen">
      <h2 className="text-3xl font-semibold text-purple-700">
        Project Initialized.
      </h2>
      <Button className="bg-purple-400 text-white">Click Me</Button>
    </div>
  );
}
