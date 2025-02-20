import { Component } from '@angular/core';
import {SidebarComponent} from '../../../components/admin/sidebar/sidebar.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [
    SidebarComponent,
    RouterOutlet
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  standalone: true
})
export class HomePageComponent {

}
