import {AfterViewInit, Component, OnInit} from '@angular/core';
import {CarouselComponent} from '../../../components/website/carousel/carousel.component';
import {NgForOf, NgStyle} from '@angular/common';
import {MissionsType} from '../../../types/missions.type';
import {WorshipType} from '../../../types/worship.type';
import {PastorType} from '../../../types/pastor.type';
import {EventsType} from '../../../types/events.type';
import {BranchService} from '../../../services/branch.service';
import {BannerService} from '../../../services/banner.service';
import {LayoutService} from '../../../services/layout.service';
import {LayoutType} from '../../../types/layout.type';
import {BannerType} from '../../../types/banner.type';
import AOS from 'aos';
import {MissionService} from '../../../services/mission.service';

@Component({
  selector: 'app-missions-pages',
  imports: [
    NgForOf,
    NgStyle
  ],
  templateUrl: './missions-pages.component.html',
  standalone: true,
  styleUrl: './missions-pages.component.css'
})
export class MissionsPagesComponent implements AfterViewInit, OnInit {

  missions: MissionsType[] = [

  ];


  truncateContent(content: string, limit: number = 150): string {
    return content.length > limit ? content.substring(0, limit) + '...' : content;
  }

  constructor(
    private branchService: BranchService,
    private bannerService: BannerService,
    private layoutService: LayoutService,
    private missionService: MissionService) {
  }

  currentURL = '';
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

  getMission(){
    this.missionService.getMissionListPublic().subscribe(
      missionService => {
        this.missions = missionService;
      }
    );
  }

  getBranch() {
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

  getLayout() {
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

  getBanner() {
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
    this.getMission();
  }

  ngAfterViewInit(): void {
    AOS.refresh();
  }
}
