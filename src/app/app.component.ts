import {AfterViewInit, Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgxSonnerToaster} from 'ngx-sonner';
import AOS from 'aos';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
})
export class AppComponent implements OnInit, AfterViewInit {


  ngOnInit(): void {
    AOS.init();
    window.addEventListener('load', AOS.refresh);
  }

  ngAfterViewInit(): void {
    AOS.refresh();
  }
}
