import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import * as PortOne from "@portone/browser-sdk/v2";

export async function GET(request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    // 유저 정보 조회
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // URL에서 paymentId 파라미터 추출
    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get("paymentId");

    if (!paymentId) {
      return NextResponse.json(
        { error: "결제 ID가 필요합니다." },
        { status: 400 }
      );
    }

    // 포트원 결제 상태 확인
    // 1. 포트원 결제내역 단건조회 API 호출
    const paymentResponse = await fetch(
      `https://api.portone.io/payments/${encodeURIComponent(paymentId)}`,
      {
        headers: { Authorization: `PortOne ${process.env.PORTONE_API_SECRET}` },
      }
    );
    if (!paymentResponse.ok)
      throw new Error(`paymentResponse: ${await paymentResponse.json()}`);
    const payment = await paymentResponse.json();

    // purchases 테이블의 상태 업데이트
    const { data, error } = await supabase
      .from("purchases")
      .insert({
        user_id: user.id,
        status: "completed",
        payment_id: paymentId,
        amount: payment.amount.total,
      })
      .select();

    if (error) {
      throw error;
    }

    return NextResponse.json(
      { message: "결제가 성공적으로 처리되었습니다.", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("결제 처리 중 오류 발생:", error);
    return NextResponse.json(
      { error: "결제 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
