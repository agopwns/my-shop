"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter, usePathname } from "next/navigation";

export function Navigation() {
  const [isAdmin, setIsAdmin] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAdminRole = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        setIsAdmin(profile?.role === "admin");
      }
    };

    checkAdminRole();
  }, [supabase]);

  const handleTabChange = (value) => {
    if (value === "management") {
      router.push("/management");
    } else {
      router.push("/");
    }
  };

  return (
    <Tabs
      defaultValue={pathname === "/management" ? "management" : "products"}
      className="w-full"
      onValueChange={handleTabChange}
    >
      <TabsList
        className={`grid w-full ${isAdmin ? "grid-cols-2" : "grid-cols-1"}`}
      >
        <TabsTrigger value="products">상품</TabsTrigger>
        {isAdmin && <TabsTrigger value="management">관리</TabsTrigger>}
      </TabsList>
    </Tabs>
  );
}
