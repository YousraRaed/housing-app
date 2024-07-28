import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from './store/actions/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'housing-app';
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.initializeAuth());
  }
}
