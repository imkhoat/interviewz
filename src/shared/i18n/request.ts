import { getRequestConfig } from 'next-intl/server';
import { locales, type Locale } from '../i18n/config';

async function getModuleMessages(locale: string) {
  try {
    // Load all messages from index.ts
    const messages = (await import(`./locales/${locale}/index`)).default;
    console.log('Loaded messages:', messages);
    return messages;
  } catch (error) {
    console.error('Error loading messages:', error);
    // Log the full error details
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return {};
  }
}

// This is the configuration for next-intl
export default getRequestConfig(async ({ locale }) => {
  const currentLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : 'en';
  console.log('Current locale:', currentLocale);
  
  const messages = await getModuleMessages(currentLocale);
  console.log('Final messages object:', messages);

  return {
    messages,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    locale: currentLocale,
    now: new Date()
  };
}); 