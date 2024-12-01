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

export default function Home() {
  return (
    <main className="flex flex-col gap-2 lg:gap-8 row-start-2 items-center w-full lg:max-w-3xl mx-auto lg:pt-8 px-2 pt-2">
      <div className="sticky top-0 z-50 w-full bg-background">
        <Navigation />
      </div>

      {/* Hero Section */}
      <Card className="relative w-full h-[550px] overflow-hidden border-0">
        <Image
          src="/hero-image.jpg"
          alt="Hero background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <CardHeader className="relative z-10 h-full flex flex-col gap-4 items-center justify-center text-white">
          <CardTitle className="text-4xl md:text-5xl font-bold text-white">
            Nextjs + Supabase + Cursor AI 를 조합한 풀스택 개발 코스
          </CardTitle>
          <CardDescription className="text-lg md:text-xl mb-6 text-left max-w-2xl text-gray-200">
            이제는 당신이 AI 툴과 함께 원하는 아이디어를 직접 만들어보세요.
            <div className="mt-4 space-y-2 text-sm text-left">
              <p>✨ AI 도구를 활용한 효율적인 개발 방법 학습</p>
              <p>💻 실전 프로젝트로 배우는 Next.js 13+ 완벽 가이드</p>
              <p>🔥 Supabase를 활용한 백엔드 서비스 구축 노하우</p>
              <p>🚀 배포부터 실제 서비스 런칭까지 모든 과정 완벽 정복</p>
            </div>
          </CardDescription>
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2">
              <Badge variant="destructive" className="text-lg">
                34% OFF
              </Badge>
              <span className="text-2xl line-through text-gray-400">
                150,000원
              </span>
            </div>
            <div className="text-3xl font-bold">99,000원</div>
          </div>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            자세히 보기
          </Button>
        </CardHeader>
      </Card>

      {/* 기존 콘텐츠 */}
      <div className="bg-red-500 w-full h-[2000px]">body</div>
    </main>
  );
}
