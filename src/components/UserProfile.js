"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserProfile() {
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

    // 유저 상태 변경 감지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (!user) return null;

  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarImage src={user.user_metadata.avatar_url} />
        <AvatarFallback>사용자</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-medium">{user.user_metadata.name}</p>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
      <Button variant="outline" onClick={handleSignOut} className="">
        로그아웃
      </Button>
    </div>
  );
}
