import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async (args) => {
  // Await the locale since it can be a Promise in some Next.js/next-intl environments
  let locale = await (args.locale || (args as any).requestLocale);

  // Validate that the incoming `locale` parameter is valid
  if (!locale || !routing.locales.includes(locale as any)) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
