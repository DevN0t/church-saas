import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgxSonnerToaster} from 'ngx-sonner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
})
export class AppComponent {
  title = 'pibaf';
}
