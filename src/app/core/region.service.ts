import { Injectable, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

export type Region = 'PT' | 'CH' | 'SG';

const FRESENIUS_URL: Record<Region | 'default', string> = {
  default: 'https://freseniusmedicalcare.com/en',
  PT: 'https://www.nephrocare.pt',
  CH: 'https://www.nephrocare.ch',
  SG: 'https://freseniusmedicalcare.com/en-sg',
};

@Injectable({ providedIn: 'root' })
export class RegionService {
  private readonly router = inject(Router);
  readonly url = signal(this.router.url);
  readonly code = signal<Region | null>(this.read(this.router.url));

  constructor() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.url.set(this.router.url);
      this.code.set(this.read(this.router.url));
    });
  }

  freseniusUrl(): string {
    return FRESENIUS_URL[this.code() ?? 'default'];
  }

  commands(section = ''): string[] {
    const region = this.code();
    if (region && section) {
      return ['/', region, section];
    }
    if (region) {
      return ['/', region];
    }
    if (section) {
      return ['/', section];
    }
    return ['/'];
  }

  private read(url: string): Region | null {
    const segment = url.split('?')[0].split('#')[0].split('/').filter(Boolean)[0]?.toUpperCase();
    if (segment === 'PT' || segment === 'CH' || segment === 'SG') {
      return segment;
    }
    return null;
  }
}
