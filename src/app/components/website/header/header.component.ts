import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true
})
export class HeaderComponent {
  isMenuOpen = false; // Variável que controla a visibilidade do menu

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen; // Alterna a visibilidade do menu
  }


  @Input() logo! : string;
}
