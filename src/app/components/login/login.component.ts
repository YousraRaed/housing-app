import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { login } from 'src/app/store/actions/auth.action';
import { selectAuthError } from 'src/app/store/selectors/auth.selector';
import { passwordValidator } from 'src/app/validators/password.validator';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error$: Observable<any>;
  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private store: Store
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: [
        '',
        [Validators.required, Validators.minLength(6), passwordValidator()],
      ],
    });
    this.error$ = this.store.select(selectAuthError);
  }

  ngOnInit(): void {}
  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.store.dispatch(login({ username, password }));
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
