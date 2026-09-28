import enCommon from './locales/en/common.json' with { type: 'json' };
import gswCommon from './locales/gsw/common.json' with { type: 'json' };
import ptCommon from './locales/pt/common.json' with { type: 'json' };

export type Lang = 'en' | 'pt' | 'gsw';

export const LANGS: Lang[] = ['en', 'pt', 'gsw'];

export const LANG_LABELS: Record<Lang, string> = {
  en: 'English',
  pt: 'Português (PT)',
  gsw: 'Schwiizerdütsch',
};

type Dictionary = Record<string, string>;

// Add a namespace by creating locales/<lang>/<namespace>.json for every language and registering it here.
export const NAMESPACES = {
  common: { en: enCommon, pt: ptCommon, gsw: gswCommon },
} satisfies Record<string, Record<Lang, Dictionary>>;

export type Namespace = keyof typeof NAMESPACES;
