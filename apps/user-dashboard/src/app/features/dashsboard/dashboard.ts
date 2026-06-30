import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboardHero } from "./components/hero/dashboard-hero";

@Component({
  selector: 'cm-dashboard',
  imports: [DashboardHero],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Dashboard {}
