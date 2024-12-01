"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function KakaoLoginButton() {
  const [user, setUser] = useState(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleKakaoLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "kakao",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error("카카오 로그인 에러:", error.message);
    }
  };

  if (user) return null;

  return (
    <Button
      onClick={handleKakaoLogin}
      className="bg-[#FEE500] text-black hover:bg-[#FEE500]/90"
    >
      카카오톡으로 로그인
    </Button>
  );
}
