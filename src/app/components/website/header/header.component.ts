import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import AOS from 'aos';
import {NgIf, NgStyle} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    NgStyle,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true
})
export class HeaderComponent implements OnInit, AfterViewInit{

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  ngOnInit(): void {
    AOS.init();
    window.addEventListener('load', AOS.refresh);
  }
  ngAfterViewInit(): void {
    AOS.refresh();
  }

  constructor(private router: Router) {
  }



  @Input() logo! : string;

  @Input() headerBgColor: string = '#ffffffff';

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
