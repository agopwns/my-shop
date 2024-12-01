import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Navigation } from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import { Markdown } from "@/components/Markdown";
import { courseContent } from "@/constants/courseContent";
import { HeroSection } from "@/components/HeroSection";
import { KakaoLoginButton } from "@/components/KakaoLoginButton";

export default function Home() {
  return (
    <main className="flex flex-col gap-2 lg:gap-8 row-start-2 items-center w-full lg:max-w-3xl mx-auto lg:pt-8 px-2 pt-2">
      {/* 카카오 로그인 버튼 */}
      <div className="flex justify-between w-full">
        <h1 className="text-2xl font-bold">My Supa Code</h1>
        <KakaoLoginButton />
      </div>

      <div className="sticky top-0 z-50 w-full bg-background">
        <Navigation />
      </div>

      {/* 히어로 섹션 */}
      <HeroSection />

      {/* 상세 내용 섹션 */}
      <Card className="w-full p-6">
        <Markdown content={courseContent} />
      </Card>
    </main>
  );
}
