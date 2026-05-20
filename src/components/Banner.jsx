"use client";

import { Button } from "@heroui/react";
import {
  ArrowUpRight,
  ShieldAlert,
  Zap,
  Globe,
  HardDrive,
  Cpu,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const slidesData = [
  {
    kicker: "01 // SHARE YOUR STARTUP IDEA",
    titleMain: "Your idea deserve an",
    titleAccent: "Audience.",
    description:
      "Stop letting great ideas collect dust. Post your startup concept on IdeaVault and get real feedback from a community of builders, founders, and innovators.",
    primaryActionText: "Post Your First Idea",
    primaryActionHref: "/add-idea",
    metricValue: "200+",
    metricLabel: "New ideas posted every week",
    accentBlockBg:
      "bg-[#0C7779]/10 dark:bg-[#0C7779]/20 text-[#0C7779] dark:text-[#3BC1A8]",
    accentBlockIcon: <HardDrive className="w-8 h-8" />,
    accentBlockTitle: "Community Driven",
    accentBlockText:
      "Every idea gets real comments, honest feedback, and genuine engagement from people who care about innovation.",
    bgImage: "https://images.unsplash.com/photo-1758876021444-3885d0a2539f",
  },
  {
    kicker: "02 // VALIDATE BEFORE YOU BUILD",
    titleMain: "Get Feedback",
    titleAccent: "Before Launch.",
    description:
      "Get insights from real users before investing months into development. Validate demand, improve your concept, and refine your vision with community-driven feedback.",

    primaryActionText: "See Feedback",
    primaryActionHref: "/my-ideas",

    metricValue: "17000+",
    metricLabel: "Comments and feedback shared",

    accentBlockBg:
      "bg-[#005461]/10 dark:bg-[#005461]/20 text-[#005461] dark:text-[#3BC1A8]",

    accentBlockIcon: <ShieldAlert className="w-8 h-8" />,

    accentBlockTitle: "Real Feedback",
    accentBlockText:
      "Receive constructive criticism, feature suggestions, and market insights from entrepreneurs and innovators worldwide.",

    bgImage:
      "https://plus.unsplash.com/premium_photo-1663047145996-cdb1ef24a17a",
  },
  {
    kicker: "03 // DISCOVER & COLLABORATE",
    titleMain: "Find ideas worth",
    titleAccent: "Building.",
    description:
      "Explore trending startup ideas across Tech, Health, AI, Education and more. Comment, give feedback, and connect with the people behind the concepts.",
    primaryActionText: "Explore Ideas",
    primaryActionHref: "/ideas",
    metricValue: "2500+",
    metricLabel: "Active innovators on the platform",
    accentBlockBg:
      "bg-[#249E94]/10 dark:bg-[#249E94]/20 text-[#249E94] dark:text-[#3BC1A8]",
    accentBlockIcon: <Cpu className="w-8 h-8" />,
    accentBlockTitle: "Open Collaboration",
    accentBlockText:
      "Connect with founders, developers, and creators who share your vision and want to help ideas grow.",
    bgImage:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
  },
];

const ribbonItems = [
  {
    icon: <Zap className="w-3.5 h-3.5 text-[#3BC1A8] fill-[#3BC1A8]" />,
    text: "Project Vaulted",
  },
  {
    icon: <Globe className="w-3.5 h-3.5 text-[#249E94]" />,
    text: "Network Secure",
  },
];

const Banner = () => {
  return (
    <section className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-800 relative px-5">
      <div className="container mx-auto px-0">
        <Swiper
          pagination={{ clickable: true }}
          autoplay={{ delay: 8000, disableOnInteraction: false }}
          modules={[Pagination, Autoplay]}
          className="cleanSwiper"
        >
          {slidesData.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-150 items-stretch">
                {/* Left Content */}
                <div className="lg:col-span-7 py-10 flex flex-col justify-between border-b lg:border-b-0 border-gray-200 dark:border-gray-800 text-left bg-linear-to-br from-white to-gray-50/30 dark:from-gray-950 dark:to-gray-900/10">
                  {/* Kicker */}
                  <div className="font-mono text-xs tracking-widest text-gray-400 dark:text-gray-500 font-bold mb-8 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#249E94]" />
                    {slide.kicker}
                  </div>

                  {/* Main Content */}
                  <div className="space-y-6 my-auto pb-12">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-none text-gray-900 dark:text-white">
                      {slide.titleMain}{" "}
                      <span className="block text-transparent bg-clip-text bg-linear-to-r from-[#0C7779] via-[#249E94] to-[#3BC1A8] italic font-serif normal-case tracking-normal pt-2">
                        {slide.titleAccent}
                      </span>
                    </h1>

                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-xl font-normal leading-relaxed tracking-tight">
                      {slide.description}
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                      <Button
                        as="a"
                        href={slide.primaryActionHref}
                        className="px-8 h-14 bg-gray-950 dark:bg-white text-white dark:text-gray-950 font-bold tracking-tight text-md rounded-none border border-transparent hover:bg-transparent dark:hover:bg-transparent hover:text-gray-950 dark:hover:text-white hover:border-gray-950 dark:hover:border-white transition-all group"
                      >
                        {slide.primaryActionText}

                        <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Button>
                    </div>
                  </div>

                  {/* Banner bottom */}
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-900 flex items-center gap-3">
                    <ShieldAlert className="w-4 h-4 text-gray-400" />

                    <span className="font-mono text-[11px] text-gray-400 dark:text-gray-500">
                      Protected by end-to-end cryptographic timestamp protocols.
                    </span>
                  </div>
                </div>

                {/* Right Side */}
                <div className="lg:col-span-5 flex flex-col justify-between bg-gray-50/30 dark:bg-gray-900/10">
                  {/* Metric Block */}
                  <div className="p-8 md:p-12 border-b border-gray-200 dark:border-gray-800 flex-1 flex flex-col justify-center text-left relative overflow-hidden group/metric">
                    {/* Background Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out scale-100 group-hover/metric:scale-105"
                      style={{ backgroundImage: `url(${slide.bgImage})` }}
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-linear-to-tr from-black/70 via-black/20 to-transparent pointer-events-none" />

                    {/* Metric Content */}
                    <div className="relative z-10 select-none">
                      <div
                        className="text-6xl md:text-7xl font-black font-mono tracking-tighter text-[#249E94]"
                        style={{
                          textShadow:
                            "2px 2px 0px #fff, -2px -2px 0px #fff, 2px -2px 0px #fff, -2px 2px 0px #fff, 3px 3px 6px rgba(0,0,0,0.6)",
                        }}
                      >
                        {slide.metricValue}
                      </div>

                      <div
                        className="text-xs font-mono uppercase tracking-wider text-white mt-3 max-w-xs font-black"
                        style={{
                          textShadow:
                            "1px 1px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000, 2px 2px 5px rgba(0,0,0,0.9)",
                        }}
                      >
                        {slide.metricLabel}
                      </div>
                    </div>
                  </div>

                  {/* Accent Block */}
                  <div
                    className={`p-8 md:p-12 flex items-center gap-6 justify-between border-b border-gray-200 dark:border-gray-800 ${slide.accentBlockBg}`}
                  >
                    <div className="space-y-1">
                      <div className="font-bold text-sm uppercase tracking-wider font-mono">
                        {slide.accentBlockTitle}
                      </div>
                      <p className="text-xs opacity-80 max-w-xs leading-relaxed">
                        {slide.accentBlockText}
                      </p>
                    </div>
                    <div className="shrink-0 opacity-80">
                      {slide.accentBlockIcon}
                    </div>
                  </div>

                  {/* Bottom Ribbon */}
                  <div className="h-16 bg-gray-950 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex items-center overflow-hidden relative w-full">
                    <div className="animate-marquee-flow whitespace-nowrap flex items-center gap-8 text-white text-xs font-mono tracking-widest uppercase font-black opacity-80">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-center gap-8">
                          {ribbonItems.map((item, idx) => (
                            <span
                              key={idx}
                              className="flex items-center gap-2 shrink-0"
                            >
                              {item.icon}
                              {item.text}
                            </span>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Banner;
