import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HeaderComponent} from '../../components/header/header.component';
import {MissionsType} from '../../types/missions.type';
import {WorshipType} from '../../types/worship.type';
import {EventsType} from '../../types/events.type';
import {NgClass, NgForOf, NgIf, NgStyle} from '@angular/common';

@Component({
  selector: 'app-main-page',
  imports: [
    HeaderComponent,
    NgForOf,
    NgIf,
    NgClass,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
  standalone: true
})
export class MainPageComponent implements OnInit, AfterViewInit {

  @ViewChild('carouselContainer') carouselContainer!: ElementRef;


  currentIndex = 0;

  ngAfterViewInit() {
    this.centerActiveCard(); // Centraliza o card ativo após a inicialização da view
  }

  nextCard() {
    this.currentIndex = Math.min(this.currentIndex + 1, this.carouselCards.length - 3);
    this.centerActiveCard();
  }

  prevCard() {
    this.currentIndex = Math.max(this.currentIndex - 1, 0);
    this.centerActiveCard();
  }

  centerActiveCard() {
    setTimeout(() => {
      const activeCard = this.carouselContainer.nativeElement.querySelector('.snap-start.opacity-100');
      if (activeCard) {
        activeCard.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      }
    }, 0); // Use setTimeout para garantir que o DOM esteja atualizado
  }


  carouselCards = [
    { image: 'image1.jpg', title: 'Card 1', description: 'Description for card 1.' },
    { image: 'image2.jpg', title: 'Card 2', description: 'Description for card 2.' },
    { image: 'image3.jpg', title: 'Card 3', description: 'Description for card 3.' },
    { image: 'image4.jpg', title: 'Card 4', description: 'Description for card 4.' },
    // ... more cards
  ];

  churchName = 'Pibaf';


  missions: MissionsType = {
    id:1,
    title: 'Ministérios',
    description: 'Aqui você encontra todas as informações sobre os ministérios da Pibaf',
    image: 'https://assets.website-files.com/5e4d1978346763004ee3ff5a/5e4d796a3d4f67b13ea0f197_image-lr-1.jpg'
  };

  worship: WorshipType = {
    id:1,
    title: 'Cultos',
    description: 'Aqui você encontra todas as informações sobre os cultos da Pibaf',
    image: 'https://assets.website-files.com/5e4d1978346763004ee3ff5a/5e4d796a1ef8c50af8ccb8c0_image-lr-2.jpg'
  }

  events: EventsType[] = [
    {
      id: 1,
      title: 'Evento 1Evento 1Evento 1Evento 1',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc. Nullam nec nunc nec nunc.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc. Nullam nec nunc nec nunc.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc. Nullam nec nunc nec nunc.',
      image: 'https://assets.website-files.com/5e4d1978346763004ee3ff5a/5e4d796a3d4f67b13ea0f197_image-lr-1.jpg',
      date: '2021-09-01'

    },
    {
      id: 1,
      title: 'Evento 1Evento 1Evento 1Evento 1',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc. Nullam nec nunc nec nunc.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc. Nullam nec nunc nec nunc.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc. Nullam nec nunc nec nunc.',
      image: 'https://assets.website-files.com/5e4d1978346763004ee3ff5a/5e4d796a3d4f67b13ea0f197_image-lr-1.jpg',
      date: '2021-09-01'

    },
    {
      id: 1,
      title: 'Evento 1Evento 1Evento 1Evento 1',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc. Nullam nec nunc nec nunc.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc. Nullam nec nunc nec nunc.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc. Nullam nec nunc nec nunc.',
      image: 'https://assets.website-files.com/5e4d1978346763004ee3ff5a/5e4d796a3d4f67b13ea0f197_image-lr-1.jpg',
      date: '2021-09-01'

    },
    {
      id: 1,
      title: 'Evento 1Evento 1Evento 1Evento 1',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc. Nullam nec nunc nec nunc.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc. Nullam nec nunc nec nunc.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc. Nullam nec nunc nec nunc.',
      image: 'https://assets.website-files.com/5e4d1978346763004ee3ff5a/5e4d796a3d4f67b13ea0f197_image-lr-1.jpg',
      date: '2021-09-01'

    }
  ]

  truncateContent(content: string, limit: number = 300): string {
    return content.length > limit ? content.substring(0, limit) + '...' : content;
  }
  ngOnInit(): void {}




}
