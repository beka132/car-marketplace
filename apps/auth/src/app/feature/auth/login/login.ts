import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { form, required, submit } from '@angular/forms/signals';
import { Input, Button } from '@car-marketplace/ui';
import { ILoginForm } from './models/login.interface';

@Component({
  selector: 'cm-login',
  imports: [Input, Button],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {

  private loginModel = signal<ILoginForm>({
    username: '',
    password: '',
  });

  public loginForm = form(this.loginModel, (form) => {
    required(form.username, { message: 'Username is required' });
    required(form.password, { message: 'password is required' });
  });

  protected username = this.loginForm.username;
  protected password = this.loginForm.password;

  public submitForm() {
    submit(this.loginForm, async (field) => {
      console.log(field().value());
      field().reset({ username: '', password: '' });
      return undefined;
    });
  }
}
