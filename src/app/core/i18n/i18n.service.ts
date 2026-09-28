import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { RegionService } from '../region.service';
import { LANGS, LANG_LABELS, NAMESPACES, type Lang, type Namespace } from './translations';

const STORAGE_KEY = 'renally-lang';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly region = inject(RegionService);

  readonly languages = LANGS.map((id) => ({ id, label: LANG_LABELS[id] }));
  readonly lang = signal<Lang>(this.initialLang());

  constructor() {
    this.apply(this.lang());
  }

  /** Accepts `key` (uses the given namespace) or `namespace:key`, like next-translate. */
  t(key: string, namespace: Namespace = 'common'): string {
    const [ns, name] = key.includes(':') ? (key.split(':', 2) as [Namespace, string]) : [namespace, key];
    const dictionaries: Record<Lang, Record<string, string>> | undefined = NAMESPACES[ns];
    if (!dictionaries) {
      return key;
    }
    return dictionaries[this.lang()][name] ?? dictionaries.en[name] ?? key;
  }

  use(lang: Lang): void {
    this.lang.set(lang);
    this.apply(lang);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(STORAGE_KEY, lang);
    }
  }

  private initialLang(): Lang {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'pt' || stored === 'gsw') {
        return stored;
      }
    }
    const region = this.region.code();
    if (region === 'PT') {
      return 'pt';
    }
    if (region === 'CH') {
      return 'gsw';
    }
    return 'en';
  }

  private apply(lang: Lang): void {
    const htmlLang = lang === 'pt' ? 'pt' : lang === 'gsw' ? 'gsw' : 'en';
    this.document.documentElement.lang = htmlLang;
  }
}
