'use client';

export default function LayoutAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen min-w-screen h-screen w-screen">
        {children}
    </div>
  )
}