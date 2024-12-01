import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Navigation() {
  return (
    <Tabs defaultValue="products" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="products">상품</TabsTrigger>
        <TabsTrigger value="management">관리</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
