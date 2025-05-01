import "@shared/css/globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { Noto_Sans } from "next/font/google";

import QueryProvider from "@shared/components/contexts/query-provider";
import PageWrapper from "@shared/components/extends/page-wrapper";
import { Toaster } from "@shared/components/ui/toaster";
import { AuthActivityProvider } from "@shared/components/contexts/auth-activity-provider";
import { locales, defaultLocale } from '@shared/i18n/config';

import type { Metadata } from "next";

const font = Noto_Sans({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Interviewz",
  description: "Interviewz - A platform for conducting interviews",
};

export default async function RootLayout({
  children,
  params: { locale = defaultLocale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale?: string };
}>) {
  const messages = (await import(`@shared/i18n/locales/${locale}/index.ts`)).default;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${font.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <QueryProvider>
            <AuthActivityProvider>
              <PageWrapper>{children}</PageWrapper>
              <Toaster />
            </AuthActivityProvider>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
