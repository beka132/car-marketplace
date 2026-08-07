import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Button, Input } from '@car-marketplace/ui';

@Component({
  selector: 'cm-dashboard-hero',
  imports: [Button, Input],
  templateUrl: './dashboard-hero.html',
  styleUrl: './dashboard-hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardHero {}
