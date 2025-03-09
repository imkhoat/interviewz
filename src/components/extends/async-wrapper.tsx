"use client";

import { ReactNode, Suspense } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle } from "lucide-react";

interface Props {
  children: ReactNode;
  error?: Error | null;
  loading?: boolean;
}

export default function AsyncWrapper({ children, error, loading }: Props) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
        <span className="ml-2 text-sm text-gray-600">Đang tải...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle>Đã xảy ra lỗi!</AlertTitle>
        <AlertDescription>{error.message || "Không thể tải dữ liệu."}</AlertDescription>
      </Alert>
    );
  }

  return <Suspense fallback={<LoadingFallback />}>{children}</Suspense>;
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center py-10">
      <Loader2 className="w-6 h-6 animate-spin text-primary" />
      <span className="ml-2 text-sm text-gray-600">Đang tải...</span>
    </div>
  );
}
