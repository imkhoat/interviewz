"use client"

import PageWrapper from '@/components/extends/page-wrapper';
import { usePageWrapper } from '@/hooks/use-page-wrapper';
export default function LayoutAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setupPageWrapperConfig } = usePageWrapper();
  setupPageWrapperConfig({header: true, sidebar: true, footer: false, title: false, description: false})
  return (
    <div className="layout-admin">
      <PageWrapper>
        {children}
      </PageWrapper>
    </div>
  )
}