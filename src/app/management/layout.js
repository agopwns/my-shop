"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

export default function AdminLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkAdminRole = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          redirect("/");
        }

        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        if (profile?.role !== "admin") {
          redirect("/");
        }

        setIsAdmin(true);
      } catch (error) {
        console.error("권한 확인 중 오류 발생:", error);
        redirect("/");
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminRole();
  }, [supabase]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (!isAdmin) {
    return null;
  }

  return <>{children}</>;
}
