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
import {MissionCreatePageComponent} from './pages/admin/mission-create-page/mission-create-page.component';
import {PastorsPageComponent} from './pages/admin/pastors-page/pastors-page.component';
import {PastorsCreatePageComponent} from './pages/admin/pastors-create-page/pastors-create-page.component';
import {EventsPageComponent} from './pages/admin/events-page/events-page.component';
import {EventsCreatePageComponent} from './pages/admin/events-create-page/events-create-page.component';

export const routes: Routes = [
  {
    path: '', component: MainPageComponent, children: [
      {
        path: '', component: MainPageLayoutComponent
      },

      {
        path: 'ministerios', component: MissionsPagesComponent
      },
    ]
  },
  {
    path: 'login', component: LoginComponent
  },

  {
    path: 'painel', component: HomePageComponent, canActivate: [AuthGuard], children: [
      {
        path: 'banner', component: BannerPageComponent
      },
      {
        path: 'ministerio/pagina', component: MissionsPageComponent
      },
      {
        path: '', component: MainDashboardPageComponent
      },
      {
        path: 'configuracoes', component: ConfigPageComponent
      },
      {
        path: 'perfil', component: ProfilePageComponent
      },
      {
        path: 'layout', component: LayoutPageComponent
      },
      {
        path: 'ministerio', component: MissionsListPageComponent
      },
      {
        path: 'ministerio/criar', component: MissionCreatePageComponent
      },
      {
        path: 'ministerio/editar/:id', component: MissionCreatePageComponent
      },
      {
        path: 'pastores', component: PastorsPageComponent
      },
      {
        path: 'pastores/criar', component: PastorsCreatePageComponent
      },
      {
        path: 'pastores/editar/:id', component: PastorsCreatePageComponent
      },
      {
        path: 'eventos', component: EventsPageComponent
      },
      {
        path: 'eventos/criar', component: EventsCreatePageComponent
      },
      {
        path: 'eventos/editar/:id', component: EventsCreatePageComponent
      },
    ]
  }
];
