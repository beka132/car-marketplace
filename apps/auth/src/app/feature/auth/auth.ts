import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cm-auth',
  imports: [],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Auth {}
