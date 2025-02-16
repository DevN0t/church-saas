import { Component } from '@angular/core';
import {NgForOf, NgStyle} from '@angular/common';

@Component({
  selector: 'app-missions-list-page',
  imports: [
    NgForOf
  ],
  templateUrl: './missions-list-page.component.html',
  standalone: true,
  styleUrl: './missions-list-page.component.css'
})
export class MissionsListPageComponent {

  people = [
    {
      name: 'João Silva',
      country: 'Brasil',
      avatar: 'https://img.daisyui.com/images/profile/demo/2@94.webp',
      company: 'Tech Solutions',
      jobTitle: 'Desenvolvedor Full Stack',
      favoriteColor: '#4A90E2'
    },
    {
      name: 'Maria Oliveira',
      country: 'Portugal',
      avatar: 'https://img.daisyui.com/images/profile/demo/3@94.webp',
      company: 'Web Innovators',
      jobTitle: 'UI/UX Designer',
      favoriteColor: '#D72638'
    },
    {
      name: 'Carlos Mendes',
      country: 'Espanha',
      avatar: 'https://img.daisyui.com/images/profile/demo/4@94.webp',
      company: 'Cloud Systems',
      jobTitle: 'Engenheiro de Software',
      favoriteColor: '#3B7D3C'
    },
    {
      name: 'Ana Costa',
      country: 'Argentina',
      avatar: 'https://img.daisyui.com/images/profile/demo/5@94.webp',
      company: 'Data Analytics',
      jobTitle: 'Cientista de Dados',
      favoriteColor: '#FFC107'
    }
  ];

  viewDetails(person: any): void {
    console.log('Detalhes de:', person);
    alert(`Nome: ${person.name}\nCargo: ${person.jobTitle}\nEmpresa: ${person.company}`);
  }
}
