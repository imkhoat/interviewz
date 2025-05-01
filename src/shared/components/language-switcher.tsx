import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { Button } from '@shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@shared/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

// Mapping between English and Vietnamese paths
const pathMapping: Record<string, Record<string, string>> = {
  '/dashboard': {
    vi: '/trang-chu',
  },
  '/trang-chu': {
    en: '/dashboard',
  },
  // Add more mappings as needed
};

export function LanguageSwitcher() {
  const [, startTransition] = useTransition();
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const onSelectChange = (nextLocale: string) => {
    startTransition(() => {
      // Remove current locale from pathname if it exists
      const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '');
      
      // Get the mapped path for the new locale if it exists
      const mappedPath = pathMapping[pathWithoutLocale]?.[nextLocale] || pathWithoutLocale;
      
      // Add new locale to pathname
      router.replace(`/${nextLocale}${mappedPath}`);
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-9 px-0">
          <Globe className="h-4 w-4" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => onSelectChange('en')}
          className={currentLocale === 'en' ? 'bg-accent' : ''}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onSelectChange('vi')}
          className={currentLocale === 'vi' ? 'bg-accent' : ''}
        >
          Tiếng Việt
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 