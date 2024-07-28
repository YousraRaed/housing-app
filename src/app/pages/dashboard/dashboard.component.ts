import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectIsAuthenticated } from 'src/app/store/selectors/auth.selector';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  isAuthenticated$: Observable<boolean>;

  constructor(private router: Router, private store: Store) {
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
  }

  openAddHouse() {
    this.router.navigate(['/house/add']);
  }
}
