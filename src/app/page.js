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

export default function Home() {
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center w-full lg:max-w-3xl mx-auto pt-8">
      <Navigation />
      <div className="bg-red-500 w-full h-96">body</div>
    </main>
  );
}
