"use client";

import AsyncWrapper from "@shared/components/extends/async-wrapper";

export default function TemplatesPage() {
  return (
    <AsyncWrapper>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Template cards will be added here */}
        </div>
      </div>
    </AsyncWrapper>
  )
} 