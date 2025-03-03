'use client';

export default function LayoutAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-screen w-screen">
        {children}
    </div>
  )
}