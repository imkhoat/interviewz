"use client";

import AsyncWrapper from "@shared/components/extends/async-wrapper";

export default function CreateResumePage() {
  return (
    <AsyncWrapper>
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600">Select a template to get started</p>
          </div>
        </div>
      </div>
    </AsyncWrapper>
  )
} 