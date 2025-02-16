import { Routes } from '@angular/router';
import {MainPageComponent} from './pages/website/main-page/main-page.component';
import {LoginComponent} from './pages/admin/login/login.component';
import {HomePageComponent} from './pages/admin/home-page/home-page.component';
import {BannerPageComponent} from './pages/admin/banner-page/banner-page.component';
import {MissionsPageComponent} from './pages/admin/missions-page/missions-page.component';
import {MainDashboardPageComponent} from './pages/admin/main-dashboard-page/main-dashboard-page.component';
import {AuthGuard} from './infra/authguard';
import {ConfigPageComponent} from './pages/admin/config-page/config-page.component';
import {ProfilePageComponent} from './pages/admin/profile-page/profile-page.component';
import {LayoutPageComponent} from './pages/admin/layout-page/layout-page.component';
import {MainPageLayoutComponent} from './pages/website/main-page-layout/main-page-layout.component';
import {MissionsPagesComponent} from './pages/website/missions-pages/missions-pages.component';
import {MissionsListPageComponent} from './pages/admin/missions-list-page/missions-list-page.component';

export const routes: Routes = [
  {
    path: '', component: MainPageComponent, children: [
      {
        path: '', component: MainPageLayoutComponent
      },

      {
        path: 'missions', component: MissionsPagesComponent
      },
    ]
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
      },
      {
        path: 'config', component: ConfigPageComponent
      },
      {
        path: 'profile', component: ProfilePageComponent
      },
      {
        path: 'layout', component: LayoutPageComponent
      },
      {
        path: 'services', component: MissionsListPageComponent
      }
    ]
  }
];
