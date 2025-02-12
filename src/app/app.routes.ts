import { Routes } from '@angular/router';
import {MainPageComponent} from './pages/website/main-page/main-page.component';
import {LoginComponent} from './pages/admin/login/login.component';
import {HomePageComponent} from './pages/admin/home-page/home-page.component';
import {BannerPageComponent} from './pages/admin/banner-page/banner-page.component';
import {MissionsPageComponent} from './pages/admin/missions-page/missions-page.component';
import {MainDashboardPageComponent} from './pages/admin/main-dashboard-page/main-dashboard-page.component';
import {AuthGuard} from './infra/authguard';

export const routes: Routes = [
  {
    path: '', component: MainPageComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'dashboard', component: HomePageComponent, canActivate: [AuthGuard], children: [
      {
        path: 'banner', component: BannerPageComponent
      },
      {
        path: 'missions', component: MissionsPageComponent
      },
      {
        path: '', component: MainDashboardPageComponent
      }
    ]
  }
];
