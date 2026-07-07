import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Dashboard } from "./features/dashsboard/dashboard";

@Component({
  imports: [ RouterModule, Dashboard],
  selector: 'cm-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  protected title = 'user-dashboard';
}
