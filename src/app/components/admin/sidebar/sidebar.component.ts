import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BranchService} from '../../../services/branch.service';
import {BranchType} from '../../../types/branch.type';
import {ProfileType} from '../../../types/profile.type';
import {ProfileService} from '../../../services/profile.service';
import {lucideCross} from '@ng-icons/lucide';
import {provideIcons} from '@ng-icons/core';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [
    NgIf,
    NgClass
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  standalone: true
})
export class SidebarComponent implements OnInit{

  branch: BranchType = {
    alias: '', id: 0, logo: '', name: '', url: ''

  }

  profile: ProfileType = {
    avatar: '', name: ''

  }
  isMinistryOpen = false;

  isSidebarOpen: boolean = false;

  constructor(
    private router: Router,
    private branchService: BranchService,
    private profileService: ProfileService
  ) {
  }

  ngOnInit(): void {
     this.branchService.getBranch().subscribe(
      branch => this.branch = branch,
    );

     this.profileService.getProfile().subscribe(
      profile => this.profile = profile,
    );
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }



}
