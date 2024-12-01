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

const courseContent = `
# 강의 소개

Next.js와 Supabase를 활용한 실전 풀스택 개발 과정에 오신 것을 환영합니다. 이 과정은 현대적인 웹 개발의 모든 측면을 다루는 종합적인 학습 경험을 제공합니다.

## 이런 분들에게 추천합니다

- 웹 개발을 처음 시작하시는 분
- Next.js로 실제 서비스를 만들고 싶으신 분
- AI 도구를 활용한 개발 방법을 배우고 싶으신 분
- Supabase로 백엔드를 구축하고 싶으신 분

## 강의 특징

### 실전 중심 커리큘럼
- 실제 서비스 개발 과정을 그대로 체험
- 단계별로 완성되는 포트폴리오
- 현업에서 사용되는 최신 기술 스택 학습

### AI 도구 활용
- GitHub Copilot을 활용한 코딩
- Cursor AI의 효율적인 활용법
- AI 프롬프트 엔지니어링 기초

## 커리큘럼

### Part 1: 기초 세팅
- 개발 환경 구축
- Next.js 15 프로젝트 설정
- Tailwind CSS & Shadcn UI 활용

### Part 2: 핵심 기능 구현
- 사용자 인증 시스템
- 결제 시스템 연동
- 실시간 데이터 처리

### Part 3: 배포 및 운영
- Vercel 배포 프로세스
- 성능 최적화
- 에러 처리 및 모니터링

## 수강 방식

- 온라인 동영상 강의
- 실습 자료 제공
- 질문 답변 커뮤니티 지원
- 프로젝트 피드백 제공

## 강사 소개

10년 차 웹 개발자로서 다양한 서비스 개발 경험을 보유하고 있습니다. 현재 여러 스타트업에서 기술 자문을 제공하고 있으며, 개발자 교육에 깊은 관심을 가지고 있습니다.
`;

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
              <p>💻 실전 프로젝트로 배우는 Next.js 15+ 완벽 가이드</p>
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

      {/* 상세 내용 섹션 */}
      <Card className="w-full p-6">
        <Markdown content={courseContent} />
      </Card>
    </main>
  );
}
