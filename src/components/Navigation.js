"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function Navigation() {
  const [isAdmin, setIsAdmin] = useState(false);
  const supabase = createClientComponentClient();

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

  return (
    <Tabs defaultValue="products" className="w-full">
      <TabsList
        className={`grid w-full ${isAdmin ? "grid-cols-2" : "grid-cols-1"}`}
      >
        <TabsTrigger value="products">상품</TabsTrigger>
        {isAdmin && <TabsTrigger value="management">관리</TabsTrigger>}
      </TabsList>
    </Tabs>
  );
}
