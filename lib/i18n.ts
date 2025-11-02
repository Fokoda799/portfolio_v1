import { I18nText, I18nArray } from '@/types/database';


/**
 * Get translated text with automatic fallback
 * @param i18nField - The i18n field from database
 * @param locale - Current locale (e.g., 'en', 'fr', 'ar')
 * @param fallbackLocale - Fallback locale (default: 'en')
 * @returns Translated string
 */
export function getTranslation(
  i18nField: I18nText | undefined,
  locale: string,
  fallbackLocale: string = 'en'
): string {
  if (!i18nField) return '';
  
  return (
    i18nField[locale] || 
    i18nField[fallbackLocale] || 
    i18nField.en || 
    ''
  );
}

/**
 * Get translated array with automatic fallback
 * @param i18nField - The i18n array field from database
 * @param locale - Current locale
 * @param fallbackLocale - Fallback locale (default: 'en')
 * @returns Translated array
 */
export function getTranslationArray(
  i18nField: I18nArray | undefined,
  locale: string,
  fallbackLocale: string = 'en'
): string[] {
  if (!i18nField) return [];
  
  return (
    i18nField[locale] || 
    i18nField[fallbackLocale] || 
    i18nField.en || 
    []
  );
}

/**
 * Check if translation exists for a given locale
 */
export function hasTranslation(
  i18nField: I18nText | I18nArray | undefined,
  locale: string
): boolean {
  if (!i18nField) return false;
  return !!i18nField[locale];
}

/**
 * Get all available locales for a given i18n field
 */
export function getAvailableLocales(
  i18nField: I18nText | I18nArray | undefined
): string[] {
  if (!i18nField) return [];
  return Object.keys(i18nField).filter(key => 
    i18nField[key] !== undefined && i18nField[key] !== ''
  );
}