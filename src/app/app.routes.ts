import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserComponent } from './pages/user/user.component';
import { SectorComponent } from './pages/sector/sector.component';
import { OfficeComponent } from './pages/office/office.component';
import { ProcessComponent } from './pages/process/process.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users', component: UserComponent },
  { path: 'sector', component: SectorComponent },
  { path: 'office', component: OfficeComponent },
  { path: 'process', component: ProcessComponent },
  { path: '**', component: NotfoundComponent },
];
