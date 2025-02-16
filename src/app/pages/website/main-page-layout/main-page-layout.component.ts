import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HeaderComponent} from '../../../components/website/header/header.component';
import {RouterOutlet} from '@angular/router';
import {BranchService} from '../../../services/branch.service';
import {BannerService} from '../../../services/banner.service';
import {LayoutService} from '../../../services/layout.service';
import {LayoutType} from '../../../types/layout.type';
import {BannerType} from '../../../types/banner.type';
import {CarouselComponent} from '../../../components/website/carousel/carousel.component';
import {NgForOf, NgStyle} from '@angular/common';
import {MissionsType} from '../../../types/missions.type';
import {WorshipType} from '../../../types/worship.type';
import {PastorType} from '../../../types/pastor.type';
import {EventsType} from '../../../types/events.type';
import AOS from 'aos';

@Component({
  selector: 'app-main-page-layout',
  imports: [
    CarouselComponent,
    NgForOf,
    NgStyle
  ],
  templateUrl: './main-page-layout.component.html',
  standalone: true,
  styleUrl: './main-page-layout.component.css'
})
export class MainPageLayoutComponent implements AfterViewInit, OnInit{

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

  pastors: PastorType[] = [
    {
      id: 1,
      name: 'Pastor 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc. Nullam nec nunc nec nunc.',
      image:     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8FUq-nmpkWojW1bjk8F5uF55ys93JEIOdTg&s',
    },
    {
      id: 2,
      name: 'Pastor 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc. Nullam nec nunc nec nunc.',
      image: 'https://assets.website-files.com/5e4d1978346763004ee3ff5a/5e4d796a3d4f67b13ea0f197_image-lr-1.jpg'
    },{
      id: 3,
      name: 'Pastor 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc. Nullam nec nunc nec nunc.',
      image: 'https://assets.website-files.com/5e4d1978346763004ee3ff5a/5e4d796a3d4f67b13ea0f197_image-lr-1.jpg'
    },{
      id: 4,
      name: 'Pastor 4',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc. Nullam nec nunc nec nunc.',
      image: 'https://assets.website-files.com/5e4d1978346763004ee3ff5a/5e4d796a3d4f67b13ea0f197_image-lr-1.jpg'
    },{
      id: 5,
      name: 'Pastor 5',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc. Nullam nec nunc nec nunc.',
      image: 'https://assets.website-files.com/5e4d1978346763004ee3ff5a/5e4d796a3d4f67b13ea0f197_image-lr-1.jpg'
    },{
      id: 6,
      name: 'Pastor 6',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc. Nullam nec nunc nec nunc.',
      image: 'https://assets.website-files.com/5e4d1978346763004ee3ff5a/5e4d796a3d4f67b13ea0f197_image-lr-1.jpg'
    },{
      id: 7,
      name: 'Pastor 7',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc. Nullam nec nunc nec nunc.',
      image: 'https://assets.website-files.com/5e4d1978346763004ee3ff5a/5e4d796a3d4f67b13ea0f197_image-lr-1.jpg'
    },{
      id: 8,
      name: 'Pastor 8',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc. Nullam nec nunc nec nunc.',
      image: 'https://assets.website-files.com/5e4d1978346763004ee3ff5a/5e4d796a3d4f67b13ea0f197_image-lr-1.jpg'
    }]

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

  truncateContent(content: string, limit: number = 150): string {
    return content.length > limit ? content.substring(0, limit) + '...' : content;
  }

  constructor(
    private branchService: BranchService,
    private bannerService: BannerService,
    private layoutService: LayoutService) {
  }
  currentURL='';
  branch = {
    id: 0,
    logo: '',
    name: '',
    url: '',
    alias: ''
  };

  layout: LayoutType = {
    bannerFontColor: '#ffffff',
    fontHighlightColor: '#f87979',
    bgColor: '#ffffff',
    fontColor: '#000000',
    headerBgColor: '#ffffff'
  }


  banner: BannerType = {
    subtitle: '',
    image: '',
    id: 1,
    title: '',
    url: ''
  }
  getBranch(){
    this.currentURL = window.location.origin
    console.log(this.currentURL)

    this.branchService.getBranchPublic(this.currentURL + '/').subscribe(
      branch => {
        this.branch.id = branch.id;
        this.branch.logo = branch.logo;
        this.branch.url = branch.url;
        this.branch.name = branch.name;
        this.branch.alias = branch.alias;

        localStorage.setItem('alias', branch.alias);
      }
    );
  }

  getLayout(){
    this.layoutService.getLayoutPublic().subscribe(
      layouts => {
        this.layout.bannerFontColor = layouts.bannerFontColor;
        this.layout.bgColor = layouts.bgColor;
        this.layout.fontColor = layouts.fontColor;
        this.layout.fontHighlightColor = layouts.fontHighlightColor;
        this.layout.headerBgColor = layouts.headerBgColor;

      }
    );
  }

  getBanner(){
    this.bannerService.getBannerPublic().subscribe(
      banner => {
        this.banner = banner;
      }
    )
  }

  ngOnInit(): void {
    this.getBranch();
    this.getBanner();
    this.getLayout();
  }

  ngAfterViewInit(): void {
    AOS.refresh();
  }

}
