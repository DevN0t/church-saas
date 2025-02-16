import {Component, HostListener, Input} from '@angular/core';
import {NgClass, NgForOf, NgStyle} from '@angular/common';
import {PastorType} from '../../../types/pastor.type';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgStyle
  ],
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  @Input() images: PastorType[] = [];

  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() fontColor: string = '#000000';
  currentIndex = 0;
  visibleImages = 3; // Quantidade de imagens visíveis por padrão

  ngOnInit() {
    this.updateVisibleImages();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateVisibleImages();
  }

  updateVisibleImages() {
    this.visibleImages = window.innerWidth < 768 ? 1 : 3; // Se for menor que md (768px), mostra 1 imagem, senão 3
  }

  next() {
    if (this.currentIndex < this.images.length - this.visibleImages) {
      this.currentIndex++;
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
}
