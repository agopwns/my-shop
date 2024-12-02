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
import { UserProfile } from "@/components/UserProfile";
import { PurchaseButton } from "@/components/PurchaseButton";
import { COURSE_PRICE } from "@/constants/pricing";

export default function Home() {
  return (
    <main className="flex flex-col gap-2 lg:gap-8 row-start-2 items-center w-full lg:max-w-3xl mx-auto lg:pt-8 px-2 pt-2">
      {/* 상단 헤더 영역 */}
      <div className="flex justify-between w-full items-center">
        <h1 className="text-2xl font-bold">My Supa Code</h1>
        <div className="flex gap-4">
          <UserProfile />
          <KakaoLoginButton />
        </div>
      </div>

      <div className="sticky top-0 z-50 w-full bg-background">
        <Navigation />
      </div>

      {/* 히어로 섹션 */}
      <HeroSection />

      {/* 상세 내용 섹션 */}
      <Card className="w-full px-6 pb-36">
        <Markdown content={courseContent} />
      </Card>
      <PurchaseButton courseId="course_1" price={COURSE_PRICE.discounted} />
    </main>
  );
}
