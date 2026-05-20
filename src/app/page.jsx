import Banner from "@/components/Banner";
import TrendingIdeas from "@/components/TrendingIdeas";
import { Button } from "@heroui/react";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner />
      <TrendingIdeas />
    </div>
  );
}
