import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";

export const locales = ["en", "vi"] as const;
export const defaultLocale = "en" as const;
export type Locale = (typeof locales)[number];

// Hàm helper để lấy tất cả các module i18n
async function getModuleMessages(locale: string) {
  const modulesPath = path.join(process.cwd(), "src/modules");
  const modules = fs.readdirSync(modulesPath);
  
  const messages: Record<string, any> = {};
  
  for (const module of modules) {
    const i18nPath = path.join(modulesPath, module, "i18n", "locales", locale);
    if (fs.existsSync(i18nPath)) {
      const files = fs.readdirSync(i18nPath);
      for (const file of files) {
        if (file.endsWith(".json")) {
          const namespace = file.replace(".json", "");
          messages[namespace] = (await import(`@/modules/${module}/i18n/locales/${locale}/${file}`)).default;
        }
      }
    }
  }
  
  return messages;
}

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) notFound();

  const moduleMessages = await getModuleMessages(locale as string);

  return {
    locale: locale as string,
    messages: {
      common: (await import(`@shared/i18n/locales/${locale}/common.json`)).default,
      ...moduleMessages,
    },
  };
}); 