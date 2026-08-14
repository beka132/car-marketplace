import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { AuthMode } from './auth.models';
import { Login } from './login/login';
import { Button } from '@car-marketplace/ui';

@Component({
  selector: 'cm-auth',
  imports: [Login, Button],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Auth {
  public authMode = signal<AuthMode>('login');

  public title = computed(() =>
    this.authMode() === 'login' ? 'Welcome back' : 'Create account',
  );
  public subtitle = computed(() =>
    this.authMode() === 'login'
      ? 'Sign in to your AutoDrive account'
      : 'Join thousands of car enthusiasts',
  );
  public switchPrompt = computed(() =>
    this.authMode() === 'login' ? "Don't have an account?" : 'Already have an account?',
  );
  public switchLabel = computed(() => (this.authMode() === 'login' ? 'Register' : 'Sign in'));

  public setMode(mode: AuthMode): void {
    this.authMode.set(mode);
  }

  public toggleMode(): void {
    this.authMode.set(this.authMode() === 'login' ? 'register' : 'login');
  }
}
