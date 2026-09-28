import { inject } from '@angular/core';
import { I18nService } from './i18n.service';
import type { Lang, Namespace } from './translations';

/**
 * next-translate style access to translations. Call in a field initializer:
 *
 *   protected readonly t = useTranslation('common').t;
 *
 * then in the template: {{ t('HowItWorks') }} or {{ t('other:Key') }}.
 */
export function useTranslation(namespace: Namespace = 'common') {
  const i18n = inject(I18nService);
  return {
    t: (key: string): string => i18n.t(key, namespace),
    lang: i18n.lang.asReadonly(),
  };
}

/** Current language, the available languages, and a setter for a language switcher. */
export function useLanguage() {
  const i18n = inject(I18nService);
  return {
    lang: i18n.lang.asReadonly(),
    languages: i18n.languages,
    setLanguage: (lang: Lang): void => i18n.use(lang),
  };
}
