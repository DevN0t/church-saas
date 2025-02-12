import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HeaderComponent} from '../../../components/website/header/header.component';
import {MissionsType} from '../../../types/missions.type';
import {WorshipType} from '../../../types/worship.type';
import {EventsType} from '../../../types/events.type';
import {NgClass, NgForOf, NgIf, NgStyle} from '@angular/common';
import {PastorType} from '../../../types/pastor.type';
import {BranchType} from '../../../types/branch.type';
import {BranchService} from '../../../services/branch.service';
import {BannerType} from '../../../types/banner.type';
import {BannerService} from '../../../services/banner.service';

@Component({
  selector: 'app-main-page',
  imports: [
    HeaderComponent,
    NgForOf,
    NgStyle,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
  standalone: true
})
export class MainPageComponent implements OnInit  {

  churchName = 'Pibaf';

  branch: BranchType = {
    id: 1,
    logo: '',
    name: '',
    url: '',
    alias: ''

  };

  currentURL='';

  constructor(
    private branchService: BranchService,
    private bannerService: BannerService) {
  }

  banner: BannerType = {
    subtitle: '',
    image: '',
    id: 1,
    title: '',
    url: ''
  }



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
      image: 'https://assets.website-files.com/5e4d1978346763004ee3ff5a/5e4d796a3d4f67b13ea0f197_image-lr-1.jpg'
    },
    {
      id: 1,
      name: 'Pastor 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc. Nullam nec nunc nec nunc.',
      image: 'https://assets.website-files.com/5e4d1978346763004ee3ff5a/5e4d796a3d4f67b13ea0f197_image-lr-1.jpg'
    },{
      id: 1,
      name: 'Pastor 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc. Nullam nec nunc nec nunc.',
      image: 'https://assets.website-files.com/5e4d1978346763004ee3ff5a/5e4d796a3d4f67b13ea0f197_image-lr-1.jpg'
    },{
      id: 1,
      name: 'Pastor 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc. Nullam nec nunc nec nunc.',
      image: 'https://assets.website-files.com/5e4d1978346763004ee3ff5a/5e4d796a3d4f67b13ea0f197_image-lr-1.jpg'
    },{
      id: 1,
      name: 'Pastor 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc. Nullam nec nunc nec nunc.',
      image: 'https://assets.website-files.com/5e4d1978346763004ee3ff5a/5e4d796a3d4f67b13ea0f197_image-lr-1.jpg'
    },{
      id: 1,
      name: 'Pastor 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc. Nullam nec nunc nec nunc.',
      image: 'https://assets.website-files.com/5e4d1978346763004ee3ff5a/5e4d796a3d4f67b13ea0f197_image-lr-1.jpg'
    },{
      id: 1,
      name: 'Pastor 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget nunc. Nullam nec nunc nec nunc.',
      image: 'https://assets.website-files.com/5e4d1978346763004ee3ff5a/5e4d796a3d4f67b13ea0f197_image-lr-1.jpg'
    },{
      id: 1,
      name: 'Pastor 1',
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

  truncateContent(content: string, limit: number = 300): string {
    return content.length > limit ? content.substring(0, limit) + '...' : content;
  }


  getBranch(){
    this.branchService.getBranch(this.currentURL = window.location.href).subscribe(
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
  }
}
