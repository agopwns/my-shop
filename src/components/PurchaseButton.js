"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function PurchaseButton({ courseId, price }) {
  const [isPurchasing, setIsPurchasing] = useState(false);
  const supabase = createClientComponentClient();

  const handlePurchase = async () => {
    try {
      setIsPurchasing(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("로그인이 필요합니다.");
        return;
      }

      const { data, error } = await supabase.from("purchases").insert([
        {
          user_id: user.id,
          course_id: courseId,
          amount: price,
          status: "completed",
        },
      ]);

      if (error) throw error;

      alert("구매가 완료되었습니다!");
    } catch (error) {
      console.error("구매 중 오류 발생:", error);
      alert("구매 처리 중 문제가 발생했습니다.");
    } finally {
      setIsPurchasing(false);
    }
  };

  return (
    <div className="fixed bottom-4 left-0 right-0 px-4 z-50 max-w-3xl mx-auto">
      <div className="bg-white p-4 rounded-lg shadow-lg border">
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold">수강권 구매하기</span>
          <span className="text-lg font-bold text-primary">
            {price.toLocaleString()}원
          </span>
        </div>
        <Button
          onClick={handlePurchase}
          disabled={isPurchasing}
          className="w-full"
        >
          {isPurchasing ? "처리중..." : "결제하기"}
        </Button>
      </div>
    </div>
  );
}
