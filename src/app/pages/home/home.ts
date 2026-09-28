import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { useTranslation } from '../../core/i18n/use-translation';
import { RegionService } from '../../core/region.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly t = useTranslation('common').t;
  protected readonly region = inject(RegionService);

  protected readonly topics = ['topic1', 'topic2', 'topic3', 'topic4', 'topic5'];

  protected readonly steps = [
    { icon: 'assets/images/svg/addContact.svg', title: 'step1Title', body: 'step1Body' },
    { icon: 'assets/images/svg/iconChat.svg', title: 'step2Title', body: 'step2Body' },
    { icon: 'assets/images/svg/eye.svg', title: 'step3Title', body: 'step3Body' },
  ];
}
