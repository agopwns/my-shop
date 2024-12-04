"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function ManagementPage() {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalUsers: 0,
    recentPurchases: [],
    monthlyStats: [],
    monthlyAverage: 0,
  });
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchStats = async () => {
      // 총 매출액 조회
      const { data: salesData } = await supabase
        .from("purchases")
        .select("amount")
        .eq("status", "completed");

      const totalSales =
        salesData?.reduce((sum, purchase) => sum + purchase.amount, 0) || 0;

      // 총 사용자 수 조회
      const { count: userCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact" });

      // 최근 구매 내역 조회
      const { data: recentPurchases } = await supabase
        .from("purchases")
        .select("id, amount, created_at, user_id")
        .eq("status", "completed")
        .order("created_at", { ascending: false })
        .limit(5);

      // 사용자 정보 조회
      const userIds = recentPurchases.map((purchase) => purchase.user_id);
      const { data: userProfiles } = await supabase
        .from("profiles")
        .select("id, email, name")
        .in("id", userIds);

      // 사용자 정보를 recentPurchases에 매핑
      const purchasesWithProfiles = recentPurchases.map((purchase) => {
        const profile = userProfiles.find(
          (profile) => profile.id === purchase.user_id
        );
        return { ...purchase, profiles: profile };
      });

      // 월별 매출 통계 조회
      const { data: monthlyData } = await supabase
        .from("purchases")
        .select("amount, created_at")
        .eq("status", "completed");

      // 월별 데이터 가공
      const monthlyStats = monthlyData?.reduce((acc, purchase) => {
        const date = new Date(purchase.created_at);
        const yearMonth = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}`;

        if (!acc[yearMonth]) {
          acc[yearMonth] = 0;
        }
        acc[yearMonth] += purchase.amount;
        return acc;
      }, {});

      // 최근 6개월 데이터만 추출하고 배열로 변환
      const last6Months = Object.entries(monthlyStats || {})
        .sort((a, b) => b[0].localeCompare(a[0]))
        .slice(0, 6)
        .reverse();

      const monthlyAverage =
        last6Months.reduce((sum, [_, amount]) => sum + amount, 0) /
        last6Months.length;

      setStats({
        totalSales,
        totalUsers: userCount || 0,
        recentPurchases: purchasesWithProfiles || [],
        monthlyStats: last6Months || [],
        monthlyAverage: monthlyAverage || 0,
      });
    };

    fetchStats();
  }, [supabase]);

  const handleCancelPurchase = async (purchaseId) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // purchases 테이블의 status 업데이트
      const { error } = await supabase
        .from("purchases")
        .update({ status: "cancelled" })
        .eq("id", purchaseId)
        .eq("user_id", user.id)
        .select();

      if (error) throw error;

      // 성공적으로 업데이트되면 로컬 상태도 업데이트
      setStats((prevStats) => ({
        ...prevStats,
        recentPurchases: prevStats.recentPurchases.filter(
          (purchase) => purchase.id !== purchaseId
        ),
      }));

      alert("구매가 취소되었습니다.");
    } catch (error) {
      console.error("구매 취소 중 오류 발생:", error);
      alert("구매 취소 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold mb-6">관리자 대시보드</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>총 매출</CardTitle>
            <CardDescription>현재까지의 총 매출액</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {stats.totalSales.toLocaleString()}원
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>총 사용자</CardTitle>
            <CardDescription>등록된 총 사용자 수</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {stats.totalUsers.toLocaleString()}명
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>최근 구매 내역</CardTitle>
          <CardDescription>최근 5건의 구매 내역</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.recentPurchases.map((purchase) => (
              <div
                key={purchase.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium">
                    {purchase.profiles?.name || "알 수 없음"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {purchase.profiles?.email || "이메일 없음"}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-bold">
                    {purchase.amount.toLocaleString()}원
                  </p>
                  <button
                    onClick={() => handleCancelPurchase(purchase.id)}
                    className="px-3 py-1 text-sm text-red-500 hover:text-red-700 border border-red-500 hover:border-red-700 rounded"
                  >
                    취소
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>월별 매출</CardTitle>
          <CardDescription>최근 6개월 매출 현황</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full">
            {stats.monthlyStats.map(([month, amount], index) => (
              <div key={month} className="flex items-end gap-2 mb-2">
                <div className="w-24 text-sm text-gray-500">{month}</div>
                <div className="w-full">
                  <div
                    className="bg-primary/80 rounded h-8"
                    style={{
                      width: `${
                        (amount /
                          Math.max(...stats.monthlyStats.map(([_, v]) => v))) *
                        100
                      }%`,
                    }}
                  />
                </div>
                <div className="w-32 text-sm font-medium">
                  {amount.toLocaleString()}원
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>월 평균 매출</CardTitle>
          <CardDescription>최근 6개월 평균 매출액</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            {stats.monthlyAverage.toLocaleString()}원
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
