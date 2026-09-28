import { NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { useLanguage, useTranslation } from '../../../core/i18n/use-translation';
import { RegionService } from '../../../core/region.service';

interface FooterLink {
  id: string;
  section: string;
}

@Component({
  selector: 'app-footer',
  imports: [RouterLink, NgTemplateOutlet],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly t = useTranslation('common').t;
  protected readonly language = useLanguage();
  protected readonly region = inject(RegionService);
  protected readonly year = new Date().getFullYear();
  protected readonly email = 'renally@supportal.health';
  protected readonly instagramUrl = 'https://www.instagram.com/renally.health?stkn=MTFjazEycWhlZXJoaw==';

  protected readonly columnLinks: FooterLink[] = [
    { id: 'home', section: '' },
    { id: 'talk', section: 'talk' },
    { id: 'mentor', section: 'mentor' },
    { id: 'faqs', section: 'faq' },
  ];
}
