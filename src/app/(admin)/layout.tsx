import PageWrapper from "@/components/extends/page-wrapper";

export default function LayoutAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="layout-admin">
      <PageWrapper>
        {children}
      </PageWrapper>
    </div>
  )
}