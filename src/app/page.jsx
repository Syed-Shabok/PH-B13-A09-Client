import Banner from "@/components/Banner";
import LiveStats from "@/components/LiveStats";
import ProjectTimeline from "@/components/ProjectTimeline";
import TrendingIdeas from "@/components/TrendingIdeas";
import { Button } from "@heroui/react";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner />
      <TrendingIdeas />
      <ProjectTimeline />
      <LiveStats />
    </div>
  );
}
