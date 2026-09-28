import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { useTranslation } from '../../../core/i18n/use-translation';
import { RegionService } from '../../../core/region.service';

interface NavItem {
  id: string;
  section: string;
  exact: boolean;
}

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly t = useTranslation('common').t;
  protected readonly region = inject(RegionService);
  protected readonly signInUrl = 'https://renally.supportal.health/login';

  protected readonly desktopLinks: NavItem[] = [
    { id: 'home', section: '', exact: true },
    { id: 'talk', section: 'talk', exact: false },
    { id: 'mentor', section: 'mentor', exact: false },
    { id: 'handbook', section: 'handbook', exact: false },
    { id: 'resources', section: 'resources', exact: false },
  ];

  protected readonly mobileLinks: NavItem[] = [
    { id: 'home', section: '', exact: true },
    { id: 'talk', section: 'talk', exact: false },
    { id: 'mentor', section: 'mentor', exact: false },
    { id: 'handbook', section: 'handbook', exact: false },
    { id: 'resources', section: 'resources', exact: false },
  ];
}
