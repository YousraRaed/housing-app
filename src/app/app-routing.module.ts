import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AddUpdateHouseComponent } from './pages/add-update-house/add-update-house.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  {
    path: 'house/add',
    component: AddUpdateHouseComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'house/edit/:id',
    component: AddUpdateHouseComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
