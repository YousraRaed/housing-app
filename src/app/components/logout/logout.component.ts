import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth/auth.service';
import { logout } from 'src/app/store/actions/auth.action';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent {
  constructor(public authService: AuthService, private store: Store) {}

  logout() {
    this.store.dispatch(logout());
  }
}
