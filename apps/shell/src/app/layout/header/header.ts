import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Button } from '@car-marketplace/ui';

@Component({
  selector: 'cm-header',
  imports: [RouterLink, RouterLinkActive, Button],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  protected readonly navLinks = [
    { label: 'Home',         route: '/listings', exact: true  },
    { label: 'Browse Cars',  route: '/listings', exact: false },
    { label: 'AI Assistant', route: '/chatbot',  exact: false },
  ];
}
